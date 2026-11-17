import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/links";

interface WhatsAppButtonProps {
  /** Digits only, including country code. */
  number: string;
  businessName: string;
}

/** Floating chat link. Uses wa.me, so it needs no backend or API key. */
export function WhatsAppButton({ number, businessName }: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(number, `Hello ${businessName}, I would like to know more.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
