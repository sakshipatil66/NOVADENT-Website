import { Mail, MessageCircle } from "lucide-react";
import { CLINIC_PUBLIC_EMAIL, CLINIC_WHATSAPP_NUMBER } from "../config/clinicContact";

export default function FloatingContactActions() {
  const whatsappText = encodeURIComponent(
    "Hello NOVADENT Dental Care, I would like to know more about your dental services."
  );

  return (
    <div className="novaFloatingActions" aria-label="NOVADENT quick contact">
      {CLINIC_WHATSAPP_NUMBER && (
        <a
          className="novaFloatingWhatsApp"
          href={`https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${whatsappText}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Message NOVADENT on WhatsApp"
          title="Message us on WhatsApp"
        >
          <MessageCircle size={20} />
          <span>WhatsApp</span>
        </a>
      )}

      <a
        className="novaFloatingEmail"
        href={`mailto:${CLINIC_PUBLIC_EMAIL}?subject=${encodeURIComponent("NOVADENT Dental Enquiry")}`}
        aria-label="Email NOVADENT"
        title="Email NOVADENT"
      >
        <Mail size={19} />
        <span>Email</span>
      </a>
    </div>
  );
}
