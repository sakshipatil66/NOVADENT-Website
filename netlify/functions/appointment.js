import twilio from "twilio";

const REQUEST_TIMEOUT_MS = 10000;

/* =========================================
   RESPONSE HELPERS
========================================= */

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

const normalizePhone = (value) =>
  String(value ?? "")
    .replace(/^whatsapp:/i, "")
    .replace(/[\s().-]/g, "")
    .trim();

const isValidPhone = (value) =>
  /^\+[1-9]\d{7,14}$/.test(value);

const toWhatsAppAddress = (value) => {
  const number = normalizePhone(value);

  return isValidPhone(number)
    ? `whatsapp:${number}`
    : "";
};

const validEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/* =========================================
   TIMEOUT HELPER
========================================= */

const withTimeout = async (
  promise,
  label,
  timeoutMs = REQUEST_TIMEOUT_MS
) => {
  let timer;

  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          reject(
            new Error(`${label} timed out after ${timeoutMs} ms`)
          );
        }, timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
};

/* =========================================
   RESEND EMAIL
========================================= */

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
      console.error("Resend rejected an email:", {
        status: response.status,
        name: result.name,
        message: result.message,
      });

      return {
        accepted: false,
        error:
          result.message ||
          "The email provider did not accept the email.",
      };
    }

    return {
      accepted: true,
      id: result.id,
    };
  } catch (error) {
    console.error("Resend request failed:", error.message);

    return {
      accepted: false,
      error: controller.signal.aborted
        ? "Email request timed out."
        : "The email provider could not be reached.",
    };
  } finally {
    clearTimeout(timer);
  }
}

/* =========================================
   TWILIO WHATSAPP TEMPLATE
========================================= */

async function sendWhatsAppTemplate({
  client,
  from,
  to,
  contentSid,
  variables,
}) {
  if (!client) {
    return {
      queued: false,
      error: "Twilio client is not configured.",
    };
  }

  if (!from) {
    return {
      queued: false,
      error: "WhatsApp sender is missing or invalid.",
    };
  }

  if (!to) {
    return {
      queued: false,
      error: "WhatsApp recipient is missing or invalid.",
    };
  }

  if (!contentSid) {
    return {
      queued: false,
      error: "WhatsApp Content SID is not configured.",
    };
  }

  try {
    const result = await withTimeout(
      client.messages.create({
        from,
        to,
        contentSid,
        contentVariables: JSON.stringify(variables),
      }),
      "Twilio WhatsApp request"
    );

    const status = String(
      result.status || "accepted"
    ).toLowerCase();

    const failedStatuses = [
      "failed",
      "undelivered",
      "canceled",
      "cancelled",
    ];

    if (!result.sid || failedStatuses.includes(status)) {
      return {
        queued: false,
        error: `Twilio returned status: ${status}.`,
      };
    }

    console.info("Twilio accepted a WhatsApp message:", {
      sid: result.sid,
      status,
    });

    return {
      queued: true,
      status,
      sid: result.sid,
    };
  } catch (error) {
    console.error("Twilio WhatsApp request failed:", {
      code: error.code,
      status: error.status,
      message: error.message,
    });

    return {
      queued: false,
      error: error.code
        ? `Twilio error ${error.code}: ${error.message}`
        : error.message || "Twilio rejected the WhatsApp request.",
    };
  }
}

/* =========================================
   APPOINTMENT FUNCTION
========================================= */

export default async (req) => {
  /* Only POST requests are allowed */

  if (req.method !== "POST") {
    return json(
      {
        success: false,
        message: "Method not allowed.",
      },
      405
    );
  }

  /* Parse request */

  let data;

  try {
    data = await req.json();
  } catch {
    return json(
      {
        success: false,
        message: "Please submit a valid appointment request.",
      },
      400
    );
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return json(
      {
        success: false,
        message: "Invalid appointment request.",
      },
      400
    );
  }

  /* Read and sanitize form fields */

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

  const whatsappConsent = data.whatsappConsent === true;

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
        message:
          "Enter your name, valid email, phone with country code, service, date and time.",
      },
      400
    );
  }

  /* Validate appointment date */

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return json(
      {
        success: false,
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
        message: "Choose a valid appointment date.",
      },
      400
    );
  }

  /*
   * Use the Indian calendar date for the minimum-date
   * validation, regardless of the server's UTC timezone.
   */

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
        message: "Choose today or a future appointment date.",
      },
      400
    );
  }

  /* Require WhatsApp consent */

  if (!whatsappConsent) {
    return json(
      {
        success: false,
        message:
          "WhatsApp appointment consent is required for these notifications.",
      },
      400
    );
  }

  /* =========================================
     ENVIRONMENT VARIABLES
  ========================================= */

  const clinicEmail = String(
    process.env.APPOINTMENT_TO_EMAIL || ""
  ).trim();

  const fromEmail = String(
    process.env.APPOINTMENT_FROM_EMAIL || ""
  ).trim();

  const resendKey = String(
    process.env.RESEND_API_KEY || ""
  ).trim();

  const clinicPhone = String(
    process.env.CLINIC_PHONE || "+91 90000 12345"
  ).trim();

  const clinicPublicEmail = String(
    process.env.CLINIC_PUBLIC_EMAIL ||
      "info@novadentcare.com"
  ).trim();

  const accountSid = String(
    process.env.TWILIO_ACCOUNT_SID || ""
  ).trim();

  const authToken = String(
    process.env.TWILIO_AUTH_TOKEN || ""
  ).trim();

  const rawWhatsAppFrom = String(
    process.env.TWILIO_WHATSAPP_FROM || ""
  ).trim();

  const clinicWhatsAppTo = toWhatsAppAddress(
    process.env.CLINIC_WHATSAPP_TO
  );

  const patientTemplateSid = String(
    process.env.TWILIO_WHATSAPP_CONTENT_SID || ""
  ).trim();

  const clinicTemplateSid = String(
    process.env.CLINIC_WHATSAPP_CONTENT_SID || ""
  ).trim();

  const whatsappFrom = toWhatsAppAddress(rawWhatsAppFrom);

  /* =========================================
     INITIALIZE TWILIO
  ========================================= */

  let twilioClient = null;

  if (accountSid && authToken) {
    try {
      twilioClient = twilio(accountSid, authToken);
    } catch (error) {
      console.error(
        "Twilio client initialization failed:",
        error.message
      );
    }
  } else {
    console.warn(
      "Twilio credentials are missing from the environment."
    );
  }

  /* Appointment details */

  const appointmentDetails = [
    `Patient: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Treatment: ${service}`,
    `Preferred doctor: ${doctor}`,
    `Requested date: ${date}`,
    `Requested time: ${time}`,
    `Additional note: ${message || "None"}`,
  ].join("\n");

  /* =========================================
     NOTIFICATION STATUS
  ========================================= */

  const notifications = {
    clinicEmailAccepted: false,
    clinicEmailError: null,

    clinicWhatsAppQueued: false,
    clinicWhatsAppError: null,

    patientEmailAccepted: false,
    patientEmailError: null,

    patientWhatsAppQueued: false,
    patientWhatsAppError: null,
  };

  /* =========================================
     CLINIC EMAIL
  ========================================= */

  const clinicEmailPromise = sendResendEmail({
    apiKey: resendKey,
    from: fromEmail,
    to: clinicEmail,
    subject: "New NOVADENT appointment request",
    replyTo: email,
    text: [
      "A patient has submitted an appointment request.",
      "",
      "The requested date and time are not confirmed until the clinic confirms them.",
      "",
      appointmentDetails,
      "",
      `NOVADENT Dental Care · ${clinicPhone} · ${clinicPublicEmail}`,
    ].join("\n"),
  });

  /* =========================================
     PATIENT EMAIL
  ========================================= */

  const patientEmailPromise = sendResendEmail({
    apiKey: resendKey,
    from: fromEmail,
    to: email,
    subject: "NOVADENT received your appointment request",
    text: [
      `Hello ${name},`,
      "",
      "NOVADENT Dental Care has received your appointment request:",
      `Treatment: ${service}`,
      `Preferred doctor: ${doctor}`,
      `Requested date: ${date}`,
      `Requested time: ${time}`,
      message ? `Your note: ${message}` : "",
      "",
      "This is a request only. Your appointment is not confirmed until the clinic contacts you.",
      "",
      `NOVADENT Dental Care · ${clinicPhone} · ${clinicPublicEmail}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  /* =========================================
     CLINIC WHATSAPP
  ========================================= */

  const clinicWhatsAppPromise =
    clinicWhatsAppTo && clinicTemplateSid
      ? sendWhatsAppTemplate({
          client: twilioClient,
          from: whatsappFrom,
          to: clinicWhatsAppTo,
          contentSid: clinicTemplateSid,
          variables: {
            1: cleanLine(name),
            2: cleanLine(phone),
            3: cleanLine(email),
            4: cleanLine(service),
            5: cleanLine(date),
            6: cleanLine(time),
            7: cleanLine(doctor),
            8: cleanLine(message || "None"),
          },
        })
      : Promise.resolve({
          queued: false,
          error:
            !clinicWhatsAppTo
              ? "Clinic WhatsApp recipient is missing or invalid."
              : "Clinic WhatsApp template SID is missing.",
        });

  /* =========================================
     PATIENT WHATSAPP
  ========================================= */

  const patientWhatsAppTo = toWhatsAppAddress(phone);

  const patientWhatsAppPromise =
    patientTemplateSid
      ? sendWhatsAppTemplate({
          client: twilioClient,
          from: whatsappFrom,
          to: patientWhatsAppTo,
          contentSid: patientTemplateSid,
          variables: {
            1: cleanLine(name),
            2: cleanLine(service),
            3: cleanLine(date),
            4: cleanLine(time),
            5: cleanLine(doctor),
          },
        })
      : Promise.resolve({
          queued: false,
          error: "Patient WhatsApp template SID is missing.",
        });

  /* =========================================
     RUN ALL NOTIFICATIONS
  ========================================= */

  const [
    clinicEmailResult,
    patientEmailResult,
    clinicWhatsAppResult,
    patientWhatsAppResult,
  ] = await Promise.all([
    clinicEmailPromise,
    patientEmailPromise,
    clinicWhatsAppPromise,
    patientWhatsAppPromise,
  ]);

  /* Save email results */

  notifications.clinicEmailAccepted =
    clinicEmailResult.accepted === true;

  notifications.clinicEmailError =
    notifications.clinicEmailAccepted
      ? null
      : clinicEmailResult.error ||
        "Clinic email was not accepted.";

  notifications.patientEmailAccepted =
    patientEmailResult.accepted === true;

  notifications.patientEmailError =
    notifications.patientEmailAccepted
      ? null
      : patientEmailResult.error ||
        "Patient email was not accepted.";

  /* Save WhatsApp results */

  notifications.clinicWhatsAppQueued =
    clinicWhatsAppResult.queued === true;

  notifications.clinicWhatsAppError =
    notifications.clinicWhatsAppQueued
      ? null
      : clinicWhatsAppResult.error ||
        "Clinic WhatsApp message was not accepted.";

  notifications.patientWhatsAppQueued =
    patientWhatsAppResult.queued === true;

  notifications.patientWhatsAppError =
    notifications.patientWhatsAppQueued
      ? null
      : patientWhatsAppResult.error ||
        "Patient WhatsApp message was not accepted.";

  /* =========================================
     CHECK CLINIC NOTIFICATION
  ========================================= */

  const clinicNotified =
    notifications.clinicEmailAccepted ||
    notifications.clinicWhatsAppQueued;

  /*
   * Do not report a successful request if neither
   * clinic notification method accepted the request.
   */

  if (!clinicNotified) {
    return json(
      {
        success: false,
        requestAccepted: false,
        message:
          "We could not send your request to the clinic. Please call or email NOVADENT before trying again.",
        notifications,
      },
      502
    );
  }

  /* =========================================
     FINAL RESPONSE
  ========================================= */

  const allNotificationsAccepted =
    notifications.clinicEmailAccepted &&
    notifications.patientEmailAccepted &&
    notifications.clinicWhatsAppQueued &&
    notifications.patientWhatsAppQueued;

  return json(
    {
      success: true,
      requestAccepted: true,
      message:
        "NOVADENT has received your appointment request. The clinic must confirm your requested date and time.",
      notifications,
    },
    allNotificationsAccepted ? 200 : 207
  );
};