const REQUEST_TIMEOUT_MS = 10000;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });

const cleanLine = (value, max = 250) =>
  String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);

const validEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const normalizePhone = (value) =>
  String(value ?? "")
    .replace(/[\s().-]/g, "")
    .trim();

const isValidPhone = (value) =>
  /^\+[1-9]\d{7,14}$/.test(value);

/* ---------------- SUPABASE ---------------- */

async function saveAppointmentToSupabase(appointment) {
  const supabaseUrl = String(
    process.env.SUPABASE_URL || ""
  ).trim().replace(/\/+$/, "");

  const supabaseKey = String(
    process.env.SUPABASE_SECRET_KEY || ""
  ).trim();

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment variables are missing.");
    return { success: false };
  }

  const appointmentId = `NOVA-${Date.now()}`;

  const record = {
    appointment_id: appointmentId,
    patient_name: appointment.name,
    phone: appointment.phone,
    email: appointment.email,
    service: appointment.service,
    doctor: appointment.doctor,
    appointment_date: appointment.date,
    appointment_time: appointment.time,
    message: appointment.message || null,
    status: "Pending",
  };

  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS
  );

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/appointments`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(record),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Supabase insert failed:", {
        status: response.status,
        message: errorText,
      });

      return { success: false };
    }

    return {
      success: true,
      appointmentId,
    };
  } catch (error) {
    console.error(
      "Supabase request failed:",
      error.message
    );

    return { success: false };
  } finally {
    clearTimeout(timer);
  }
}

/* ---------------- RESEND EMAIL ---------------- */

async function sendResendEmail({
  apiKey,
  from,
  to,
  subject,
  text,
  replyTo,
}) {
  if (!apiKey || !from || !to) {
    return {
      accepted: false,
      error: "Email configuration is incomplete.",
    };
  }

  const controller = new AbortController();

  const timer = setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS
  );

  try {
    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject,
          text,
          ...(replyTo ? { reply_to: replyTo } : {}),
        }),
        signal: controller.signal,
      }
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.id) {
      console.error("Resend email error:", {
        status: response.status,
        message: result.message,
      });

      return {
        accepted: false,
        error: result.message || "Email was not accepted.",
      };
    }

    return {
      accepted: true,
      id: result.id,
    };
  } catch (error) {
    console.error("Email request failed:", error.message);

    return {
      accepted: false,
      error: controller.signal.aborted
        ? "Email request timed out."
        : "Unable to reach the email provider.",
    };
  } finally {
    clearTimeout(timer);
  }
}

/* ---------------- APPOINTMENT HANDLER ---------------- */

export default async (req) => {
  if (req.method !== "POST") {
    return json(
      {
        success: false,
        message: "Method not allowed.",
      },
      405
    );
  }

  let data;

  try {
    data = await req.json();
  } catch {
    return json(
      {
        success: false,
        requestAccepted: false,
        message: "Please submit a valid appointment request.",
      },
      400
    );
  }

  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    return json(
      {
        success: false,
        requestAccepted: false,
        message: "Invalid appointment request.",
      },
      400
    );
  }

  const name = String(data.name ?? "").trim();

  const email = String(data.email ?? "")
    .trim()
    .toLowerCase();

  const phone = normalizePhone(data.phone);

  const doctor = cleanLine(
    data.doctor || "Any available doctor",
    150
  );

  const service = cleanLine(data.service, 120);

  const date = String(data.date ?? "").trim();

  const time = cleanLine(data.time, 80);

  const message = String(data.message ?? "")
    .trim()
    .slice(0, 1000);

  /* Validate required fields */

  if (
    !name ||
    name.length > 100 ||
    !validEmail(email) ||
    email.length > 150 ||
    !isValidPhone(phone) ||
    !service ||
    !date ||
    !time
  ) {
    return json(
      {
        success: false,
        requestAccepted: false,
        message:
          "Enter your name, valid email, phone number with country code, service, date and time.",
      },
      400
    );
  }

  /* Validate appointment date */

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return json(
      {
        success: false,
        requestAccepted: false,
        message: "Choose a valid appointment date.",
      },
      400
    );
  }

  const requestedDate = new Date(`${date}T00:00:00.000Z`);

  if (
    Number.isNaN(requestedDate.getTime()) ||
    requestedDate.toISOString().slice(0, 10) !== date
  ) {
    return json(
      {
        success: false,
        requestAccepted: false,
        message: "Choose a valid appointment date.",
      },
      400
    );
  }

  const todayInIndia = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  if (date < todayInIndia) {
    return json(
      {
        success: false,
        requestAccepted: false,
        message: "Choose today or a future appointment date.",
      },
      400
    );
  }

  /* Save appointment to Supabase first */

  const databaseResult = await saveAppointmentToSupabase({
    name,
    phone,
    email,
    doctor,
    service,
    date,
    time,
    message,
  });

  if (!databaseResult.success) {
    return json(
      {
        success: false,
        requestAccepted: false,
        message:
          "We couldn't save your appointment request. Please try again later.",
      },
      503
    );
  }

  /* Email configuration */

  const clinicEmail = String(
    process.env.APPOINTMENT_TO_EMAIL || ""
  ).trim();

  const fromEmail = String(
    process.env.APPOINTMENT_FROM_EMAIL || ""
  ).trim();

  const resendKey = String(
    process.env.RESEND_API_KEY || ""
  ).trim();

  /*
   * The appointment is already safely stored in Supabase.
   * Missing email configuration should not erase that request.
   */

  if (!clinicEmail || !fromEmail || !resendKey) {
    console.error(
      "Appointment saved, but email environment variables are missing."
    );

    return json({
      success: true,
      requestAccepted: true,
      appointmentId: databaseResult.appointmentId,
      message:
        "Your appointment request has been received. The team will contact you to confirm availability.",
      notifications: {
        clinicEmailAccepted: false,
        patientEmailAccepted: false,
        error: "Email notifications are not configured.",
      },
    });
  }

  /* Appointment details for the clinic email */

  const appointmentDetails = [
    `Appointment ID: ${databaseResult.appointmentId}`,
    `Patient: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Treatment: ${service}`,
    `Preferred doctor: ${doctor}`,
    `Requested date: ${date}`,
    `Requested time: ${time}`,
    `Additional note: ${message || "None"}`,
  ].join("\n");

  /* Send emails to the clinic and patient */

  const [clinicResult, patientResult] = await Promise.all([
    sendResendEmail({
      apiKey: resendKey,
      from: fromEmail,
      to: clinicEmail,
      replyTo: email,
      subject: "New NOVADENT appointment request",
      text: [
        "A new appointment request has been received.",
        "",
        "Please review the request and contact the patient to confirm availability.",
        "",
        appointmentDetails,
      ].join("\n"),
    }),

    sendResendEmail({
      apiKey: resendKey,
      from: fromEmail,
      to: email,
      subject: "We received your appointment request | NOVADENT",
      text: [
        `Hello ${name},`,
        "",
        "Thank you for contacting NOVADENT Dental Care.",
        "We have received your appointment request.",
        "",
        `Appointment ID: ${databaseResult.appointmentId}`,
        `Treatment: ${service}`,
        `Preferred doctor: ${doctor}`,
        `Requested date: ${date}`,
        `Requested time: ${time}`,
        "",
        "Your requested date and time are not confirmed yet. Our team will contact you after reviewing availability.",
        "",
        "Thank you,",
        "NOVADENT Dental Care",
      ].join("\n"),
    }),
  ]);

  const notifications = {
    clinicEmailAccepted: clinicResult.accepted,
    clinicEmailError: clinicResult.accepted
      ? null
      : clinicResult.error,

    patientEmailAccepted: patientResult.accepted,
    patientEmailError: patientResult.accepted
      ? null
      : patientResult.error,
  };

  /*
   * The appointment is already saved in Supabase.
   * Return the saved request even if an email fails.
   */

  return json({
    success: true,
    requestAccepted: true,
    appointmentId: databaseResult.appointmentId,
    message:
      "Your appointment request has been received. The team will contact you to confirm availability.",
    notifications,
  });
};