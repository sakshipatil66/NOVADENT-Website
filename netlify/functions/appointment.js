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
      { success: false, message: "Method not allowed." },
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

    // 1. Send appointment email
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.APPOINTMENT_TO_EMAIL;
    const fromEmail = process.env.APPOINTMENT_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
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

    // 2. Send WhatsApp messages
    let patientWhatsAppSent = false;
    let clinicWhatsAppSent = false;

    try {
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const from = process.env.TWILIO_WHATSAPP_FROM;
      const clinicTo = process.env.CLINIC_WHATSAPP_TO;

      if (!sid || !token || !from) {
        throw new Error("Twilio environment variables are missing.");
      }

      const client = twilio(sid, token);

      const appointmentText = [
        "NOVADENT Dental Care - Appointment Request",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Doctor: ${doctor}`,
        `Service: ${service}`,
        `Date: ${date}`,
        `Time: ${time}`,
        `Message: ${message || "None"}`,
        "",
        "This is a request, not a confirmed appointment.",
      ].join("\n");

      const toWhatsApp = (value) => {
        const number = String(value || "").trim();

        if (!number) return "";

        return number.startsWith("whatsapp:")
          ? number
          : `whatsapp:${number}`;
      };

      const patientTo = toWhatsApp(phone);
      const clinicNumber = toWhatsApp(clinicTo);

      if (patientTo) {
        await client.messages.create({
          from,
          to: patientTo,
          body: appointmentText,
        });
        patientWhatsAppSent = true;
      }

      if (clinicNumber) {
        await client.messages.create({
          from,
          to: clinicNumber,
          body: appointmentText,
        });
        clinicWhatsAppSent = true;
      }
   } catch (whatsappError) {
  console.error("Twilio WhatsApp error details:", {
    message: whatsappError.message,
    code: whatsappError.code,
    status: whatsappError.status,
    moreInfo: whatsappError.moreInfo,
  });
}

    return json({
      success: true,
      message: "Appointment request submitted successfully.",
      emailSent: true,
      patientWhatsAppSent,
      clinicWhatsAppSent,
    });
  } catch (error) {
    console.error("Appointment function error:", error);

    return json(
      {
        success: false,
        message: "Unable to process appointment request.",
      },
      500
    );
  }
};