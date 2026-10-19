import { Mail, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "917507559161";
const EMAIL = "sakshibpatil66@gmail.com";

export default function FloatingContactActions() {
  const whatsappText = encodeURIComponent(
    "Hello NOVADENT Dental Care, I would like to know more about your dental services."
  );

  return (
    <div className="novaFloatingActions" aria-label="NOVADENT quick contact">
      <a
        className="novaFloatingWhatsApp"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Message NOVADENT on WhatsApp"
        title="Message us on WhatsApp"
      >
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </a>

      <a
        className="novaFloatingEmail"
        href={`mailto:${EMAIL}?subject=${encodeURIComponent("NOVADENT Dental Enquiry")}`}
        aria-label="Email NOVADENT"
        title="Email NOVADENT"
      >
        <Mail size={19} />
        <span>Email</span>
      </a>
    </div>
  );
}
