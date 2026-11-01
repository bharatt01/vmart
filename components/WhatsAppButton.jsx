import { site } from "../app/lib/site";

// Floating chat button. Handy for customers who want to ask if an item is in stock.
export default function WhatsAppButton() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Value Mart, ")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Value Mart on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3C7 3 3 6.6 3 11c0 2.2 1 4.2 2.6 5.6L4.5 21l4.2-1.7c1 .3 2.1.4 3.3.4 5 0 9-3.600 9-8.7S17 3 12 3Z" />
      </svg>
    </a>
  );
}
