const configuredWhatsAppNumber = String(
  import.meta.env.VITE_CLINIC_WHATSAPP_NUMBER || ""
).replace(/\D/g, "");

// Use the clinic's published phone number for click-to-chat unless a separate
// WhatsApp number is configured for the deployment.
export const CLINIC_WHATSAPP_NUMBER = /^\d{8,15}$/.test(configuredWhatsAppNumber)
  ? configuredWhatsAppNumber
  : "919000012345";

export const CLINIC_PUBLIC_EMAIL =
  import.meta.env.VITE_CLINIC_PUBLIC_EMAIL || "info@novadentcare.com";

export const createWhatsAppUrl = (message = "") =>
  `https://api.whatsapp.com/send?phone=${CLINIC_WHATSAPP_NUMBER}${
    message ? `&text=${encodeURIComponent(message)}` : ""
  }`;

export const createEmailDraftUrl = (subject, body = "") => {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${CLINIC_PUBLIC_EMAIL}?${params.toString()}`;
};
