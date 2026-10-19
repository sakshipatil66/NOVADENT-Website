
import { Resend } from "resend";

export default async (req) => {
  // Allow only appointment submissions
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Method not allowed.",
      }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const data = await req.json();

    const { name, email, phone, service, date, time, message } = data;

    if (!name || !email || !phone || !service || !date || !time) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please fill in all required fields.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.APPOINTMENT_TO_EMAIL;

    if (!apiKey || !toEmail) {
      console.error("Missing RESEND_API_KEY or APPOINTMENT_TO_EMAIL.");
      return new Response(
        JSON.stringify({
          success: false,
          message: "Appointment service is not configured yet.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: process.env.APPOINTMENT_FROM_EMAIL || "NOVADENT Website <onboarding@resend.dev>",
      to: [toEmail],
      subject: "New NOVADENT Appointment Request",
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Service: ${service}`,
        `Preferred date: ${date}`,
        `Preferred time: ${time}`,
        `Message: ${message || "No additional message"}`,
      ].join("\n"),
    });

    if (result.error) {
      console.error("Resend error:", result.error);

      return new Response(
        JSON.stringify({
          success: false,
          message: "Could not send the appointment request.",
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Appointment request received successfully.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Appointment function error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Unable to process the appointment request.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
