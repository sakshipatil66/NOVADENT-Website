import twilio from "twilio";

console.log("NOVADENT APPOINTMENT FILE LOADED");

const jsonResponse = (statusCode, data) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify(data),
});

function toWhatsAppAddress(value) {
  let number = String(value || "")
    .trim()
    .replace(/^whatsapp:/i, "")
    .replace(/[\s().-]/g, "");

  if (!number) return null;

  if (!number.startsWith("+")) {
    const digits = number.replace(/\D/g, "");
    number = digits.length === 10 ? `+91${digits}` : `+${digits}`;
  }

  if (!/^\+[1-9]\d{7,14}$/.test(number)) {
    return null;
  }

  return `whatsapp:${number}`;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, {
      success: false,
      message: "Method not allowed.",
    });
  }

  let appointment;

  try {
    appointment = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, {
      success: false,
      message: "Invalid appointment request.",
    });
  }

  const name = String(appointment.name || "").trim();
  const phone = String(appointment.phone || "").trim();
  const email = String(appointment.email || "").trim();
  const service = String(appointment.service || "").trim();
  const date = String(appointment.date || "").trim();
  const time = String(appointment.time || "").trim();
  const doctor = String(appointment.doctor || "").trim();
  const patientMessage = String(appointment.message || "").trim();

  if (!name || !phone || !service || !date || !time) {
    return jsonResponse(400, {
      success: false,
      message: "Please provide name, phone, service, date and time.",
    });
  }

  const {
    RESEND_API_KEY,
    APPOINTMENT_TO_EMAIL,
    APPOINTMENT_FROM_EMAIL,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_WHATSAPP_FROM,
    CLINIC_WHATSAPP_TO,
  } = process.env;

  // 1. Email notification to the clinic
  let emailSent = false;
  let emailError = null;

  if (
    RESEND_API_KEY &&
    APPOINTMENT_TO_EMAIL &&
    APPOINTMENT_FROM_EMAIL
  ) {
    try {
      const details = [
        "New NOVADENT appointment request",
        "",
        `Patient: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "Not provided"}`,
        `Service: ${service}`,
        `Preferred date: ${date}`,
        `Preferred time: ${time}`,
        `Doctor: ${doctor || "Not specified"}`,
        `Message: ${patientMessage || "None"}`,
        "",
        "This is a request, not a confirmed appointment.",
      ].join("\n");

      const html = `
        <h2>New NOVADENT Appointment Request</h2>
        <p><strong>Patient:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || "Not provided")}</p>
        <p><strong>Service:</strong> ${escapeHtml(service)}</p>
        <p><strong>Preferred date:</strong> ${escapeHtml(date)}</p>
        <p><strong>Preferred time:</strong> ${escapeHtml(time)}</p>
        <p><strong>Doctor:</strong> ${escapeHtml(doctor || "Not specified")}</p>
        <p><strong>Message:</strong> ${escapeHtml(patientMessage || "None")}</p>
        <p>This is a request, not a confirmed appointment.</p>
      `;

      const response = await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: APPOINTMENT_FROM_EMAIL,
            to: [APPOINTMENT_TO_EMAIL],
            subject: `New Appointment Request - ${name}`,
            text: details,
            html,
          }),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `Resend API error (${response.status}): ${errorDetails}`
        );
      }

      const emailResult = await response.json();
      emailSent = true;

      console.log("Appointment email accepted:", emailResult.id);
    } catch (error) {
      emailError = error.message;
      console.error("Resend email error:", emailError);
    }
  } else {
    emailError = "Resend environment variables are missing.";
    console.error(emailError);
  }

  // 2. WhatsApp notifications
  let whatsappPatientSent = false;
  let whatsappClinicSent = false;
  let whatsappPatientError = null;
  let whatsappClinicError = null;

  const patientTo = toWhatsAppAddress(phone);
  const clinicTo = toWhatsAppAddress(CLINIC_WHATSAPP_TO);
  const whatsappFrom = toWhatsAppAddress(TWILIO_WHATSAPP_FROM);

  console.log("=== NOVADENT WHATSAPP DEBUG ===");
  console.log("Twilio SID configured:", Boolean(TWILIO_ACCOUNT_SID));
  console.log("Twilio token configured:", Boolean(TWILIO_AUTH_TOKEN));
  console.log("WhatsApp sender valid:", Boolean(whatsappFrom));
  console.log("Patient number valid:", Boolean(patientTo));
  console.log("Clinic number valid:", Boolean(clinicTo));

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !whatsappFrom) {
    whatsappPatientError =
      "Twilio credentials or WhatsApp sender are missing.";
    whatsappClinicError = whatsappPatientError;

    console.error(whatsappPatientError);
  } else {
    try {
      const client = twilio(
        TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN
      );

      const patientBody = [
        `Hello ${name},`,
        "",
        "We have received your NOVADENT appointment request.",
        `Service: ${service}`,
        `Preferred date: ${date}`,
        `Preferred time: ${time}`,
        "",
        "Your appointment is not confirmed until the clinic confirms it.",
        "Thank you for choosing NOVADENT!",
      ].join("\n");

      const clinicBody = [
        "NEW NOVADENT APPOINTMENT REQUEST",
        "",
        `Patient: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "Not provided"}`,
        `Service: ${service}`,
        `Preferred date: ${date}`,
        `Preferred time: ${time}`,
        `Doctor: ${doctor || "Not specified"}`,
        `Message: ${patientMessage || "None"}`,
        "",
        "Please contact the patient to confirm the appointment.",
      ].join("\n");

      const sendWhatsApp = async (to, body, label) => {
        if (!to) {
          throw new Error(
            `${label} WhatsApp number is missing or invalid.`
          );
        }

        const result = await client.messages.create({
          from: whatsappFrom,
          to,
          body,
        });

        console.log(
          `${label} WhatsApp message status: ${result.status}; SID: ${result.sid}`
        );

        return result;
      };

      const [patientResult, clinicResult] = await Promise.allSettled([
        sendWhatsApp(patientTo, patientBody, "Patient"),
        sendWhatsApp(clinicTo, clinicBody, "Clinic"),
      ]);

      if (patientResult.status === "fulfilled") {
        whatsappPatientSent = true;
      } else {
        whatsappPatientError =
          patientResult.reason?.message ||
          "Patient WhatsApp message failed.";

        console.error(
          "Patient WhatsApp error:",
          whatsappPatientError
        );
      }

      if (clinicResult.status === "fulfilled") {
        whatsappClinicSent = true;
      } else {
        whatsappClinicError =
          clinicResult.reason?.message ||
          "Clinic WhatsApp message failed.";

        console.error(
          "Clinic WhatsApp error:",
          whatsappClinicError
        );
      }
    } catch (error) {
      whatsappPatientError =
        error.message || "Twilio WhatsApp setup failed.";
      whatsappClinicError = whatsappPatientError;

      console.error("Twilio setup error:", error.message);
    }
  }

  const whatsappSent =
    whatsappPatientSent && whatsappClinicSent;

  const success =
    emailSent || whatsappPatientSent || whatsappClinicSent;

  if (!success) {
    return jsonResponse(502, {
      success: false,
      message: "All notification attempts failed.",
      emailSent,
      emailError,
      whatsappSent,
      whatsappPatientSent,
      whatsappClinicSent,
      whatsappPatientError,
      whatsappClinicError,
    });
  }

  return jsonResponse(200, {
    success: true,
    message: "Appointment notification processing completed.",
    emailSent,
    emailError,
    whatsappSent,
    whatsappPatientSent,
    whatsappClinicSent,
    whatsappPatientError,
    whatsappClinicError,
  });
};