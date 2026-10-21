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

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.APPOINTMENT_TO_EMAIL;
    const fromEmail = process.env.APPOINTMENT_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error(
        "Missing Resend environment variables."
      );

      return json(
        {
          success: false,
          message:
            "Appointment email is not configured. Please contact the clinic.",
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
          message:
            "Email could not be sent. Please try again later.",
        },
        502
      );
    }

    const emailResult = await emailResponse.json();

    return json({
      success: true,
      message: "Appointment request submitted successfully.",
      emailSent: true,
      whatsappSent: false,
      emailId: emailResult.id,
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
