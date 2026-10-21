
import twilio from "twilio";

export default async (req) => {
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

  if (req.method !== "POST") {
    return json(
      {
        success: false,
        message: "Method not allowed.",
      },
      405
    );
  }

  try {
    const data = await req.json();

    const name = String(data.name || "").trim();
    const phone = String(data.phone || "").trim();
    const email = String(data.email || "").trim();
    const doctor = String(
      data.doctor || "Any available doctor"
    ).trim();
    const service = String(data.service || "").trim();
    const date = String(data.date || "").trim();
    const time = String(data.time || "").trim();
    const message = String(data.message || "").trim();

    if (!name || !phone || !service || !date || !time) {
      return json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        400
      );
    }

    // 1. Send appointment email using Resend
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.APPOINTMENT_TO_EMAIL;
    const fromEmail = process.env.APPOINTMENT_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error("Resend environment variables are missing.");

      return json(
        {
          success: false,
          message: "Appointment email is not configured.",
        },
        500
      );
    }

    const emailResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          subject: "New NOVADENT Appointment Request",
          text: [
            "New appointment request received.",
            "",
            `Name: ${name}`,
            `Phone: ${phone}`,
            `Email: ${email || "Not provided"}`,
            `Doctor: ${doctor}`,
            `Service: ${service}`,
            `Date: ${date}`,
            `Time: ${time}`,
            `Message: ${message || "None"}`,
          ].join("\n"),
        }),
      }
    );

    if (!emailResponse.ok) {
      const details = await emailResponse.text();

      console.error("Resend API error:", details);

      return json(
        {
          success: false,
          message: "Appointment email could not be sent.",
        },
        502
      );
    }

    // 2. Send WhatsApp notifications using Twilio
    let patientWhatsAppSent = false;
    let clinicWhatsAppSent = false;

    try {
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const from = process.env.TWILIO_WHATSAPP_FROM;
      const clinicTo = process.env.CLINIC_WHATSAPP_TO;

      if (!sid || !token || !from) {
        throw new Error(
          "Twilio environment variables are missing."
        );
      }

      const client = twilio(sid, token);

      const toWhatsApp = (value) => {
        const number = String(value || "").trim();

        if (!number) return "";

        return number.startsWith("whatsapp:")
          ? number
          : `whatsapp:${number}`;
      };

      const patientTo = toWhatsApp(phone);
      const clinicNumber = toWhatsApp(clinicTo);

      const patientMessage = [
        `Hello ${name},`,
        "",
        "Your NOVADENT appointment request has been received.",
        `Service: ${service}`,
        `Doctor: ${doctor}`,
        `Requested date: ${date}`,
        `Requested time: ${time}`,
        "",
        "Our clinic will confirm your appointment shortly.",
        "Thank you for choosing NOVADENT Dental Care!",
      ].join("\n");

      if (patientTo) {
        try {
        await client.messages.create({
  from,
  to: patientTo,
  contentSid: "HXfe5ab5f00277942d4d4200328b4d403c",
});
          patientWhatsAppSent = true;
        } catch (err) {
          console.error("Patient WhatsApp error:", {
            message: err.message,
            code: err.code,
            status: err.status,
            moreInfo: err.moreInfo,
          });
        }
      }

      if (clinicNumber) {
        const clinicMessage = [
          "New NOVADENT appointment request",
          "",
          `Patient: ${name}`,
          `Phone: ${phone}`,
          `Email: ${email || "Not provided"}`,
          `Service: ${service}`,
          `Doctor: ${doctor}`,
          `Date: ${date}`,
          `Time: ${time}`,
          `Message: ${message || "None"}`,
        ].join("\n");

        try {
         await client.messages.create({
  from,
  to: clinicNumber,
  contentSid: "HXfe5ab5f00277942d4d4200328b4d403c",
});
          clinicWhatsAppSent = true;
        } catch (err) {
          console.error("Clinic WhatsApp error:", {
            message: err.message,
            code: err.code,
            status: err.status,
            moreInfo: err.moreInfo,
          });
        }
      }
    } catch (whatsappError) {
      console.error("Twilio WhatsApp configuration error:", {
        message: whatsappError.message,
        code: whatsappError.code,
        status: whatsappError.status,
      });
    }

    // Email succeeded even if WhatsApp delivery failed.
    return json({
      success: true,
      message:
        "Appointment request received. Email notification sent.",
      emailSent: true,
      patientWhatsAppSent,
      clinicWhatsAppSent,
    });
  } catch (error) {
    console.error("Appointment function error:", error);

    return json(
      {
        success: false,
        message: "Unable to process the appointment request.",
      },
      500
    );
  }
};
