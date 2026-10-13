export default function WhatsAppFlottant() {
  const whatsappUrl = 'https://wa.me/2290168681885';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter PLANETECH SARL sur WhatsApp"
      title="Contacter PLANETECH SARL sur WhatsApp"
      className="
        fixed bottom-6 right-6 z-[100]
        flex h-14 w-14 items-center justify-center
        rounded-full bg-[#25D366] text-white
        shadow-lg shadow-black/20
        transition-all duration-300
        hover:scale-110 hover:shadow-xl
        focus:outline-none focus:ring-4 focus:ring-[#25D366]/30
        sm:bottom-7 sm:right-7
      "
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.56 0 .25 5.31.25 11.83c0 2.08.54 4.11 1.57 5.9L.17 24l6.42-1.68a11.8 11.8 0 0 0 5.49 1.39h.01c6.51 0 11.82-5.31 11.82-11.83 0-3.16-1.23-6.13-3.39-8.4ZM12.09 21.7h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.21-3.81 1 1.02-3.71-.23-.38a9.84 9.84 0 1 1 8.4 4.67Zm5.39-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.29-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.49-1.77-1.66-2.07-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.03 1.01-1.03 2.46 0 1.45 1.05 2.85 1.2 3.05.15.2 2.07 3.16 5.01 4.43.7.3 1.25.48 1.67.62.7.22 1.33.19 1.83.12.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z" />
      </svg>

      {/* Petite animation */}
      <span
        className="
          absolute inset-0 rounded-full
          animate-ping bg-[#25D366]/30
          pointer-events-none
        "
      />
    </a>
  );
}