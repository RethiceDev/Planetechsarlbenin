import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import { ENTREPRISE, telHref } from '@/data/entreprise';
import { EXPERTISES } from '@/data/expertises';

export default function PiedDePage() {
  const annee = new Date().getFullYear();

  return (
    <footer className="bg-forest-800 text-forest-100">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* =====================================================
            IDENTITÉ
        ====================================================== */}
        <div className="space-y-4">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/images/logo.png`}
            alt={`${ENTREPRISE.nom} - Logo`}
            className="h-12 w-auto object-contain"
          />

          <p className="max-w-xs text-sm leading-relaxed">
            {ENTREPRISE.baseline}. Nous équipons, raccordons et maintenons les
            infrastructures des entreprises et des particuliers au Bénin.
          </p>
        </div>

        {/* =====================================================
            NOS DOMAINES
        ====================================================== */}
        <div>
          <h3 className="text-sm font-semibold text-white">
            Nos domaines
          </h3>

          <ul className="mt-4 space-y-2 text-sm">
            {EXPERTISES.map((e) => (
              <li key={e.slug}>
                <Link
                  to="/#expertises"
                  className="transition-colors hover:text-white"
                >
                  {e.titre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* =====================================================
            LE SITE
        ====================================================== */}
        <div>
          <h3 className="text-sm font-semibold text-white">
            Le site
          </h3>

          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="transition-colors hover:text-white"
              >
                Accueil
              </Link>
            </li>

            <li>
              <Link
                to="/a-propos"
                className="transition-colors hover:text-white"
              >
                À propos
              </Link>
            </li>

            <li>
              <Link
                to="/boutique"
                className="transition-colors hover:text-white"
              >
                Boutique
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="transition-colors hover:text-white"
              >
                Contact et devis
              </Link>
            </li>
          </ul>
        </div>

        {/* =====================================================
            NOUS JOINDRE + RÉSEAUX SOCIAUX
        ====================================================== */}
        <div>
          <h3 className="text-sm font-semibold text-white">
            Nous joindre
          </h3>

          <address className="mt-4 space-y-3 text-sm not-italic">
            <p>{ENTREPRISE.adresse}</p>

            <p className="flex flex-col gap-1">
              {ENTREPRISE.telephones.map((tel) => (
                <a
                  key={tel}
                  href={telHref(tel)}
                  className="transition-colors hover:text-white"
                >
                  {tel}
                </a>
              ))}
            </p>

            <a
              href={`mailto:${ENTREPRISE.email}`}
              className="block break-all transition-colors hover:text-white"
            >
              {ENTREPRISE.email}
            </a>

            <p className="text-forest-200/80">
              {ENTREPRISE.horaires}
            </p>
          </address>

          {/* RÉSEAUX SOCIAUX */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-white">
              Réseaux sociaux
            </h4>

      <div className="mt-3 flex items-center gap-3">

        {/* FACEBOOK */}
        <a
          href="https://www.facebook.com/planetechsarl/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook PLANETECH SARL"
          title="Facebook"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:bg-[#1877F2]"
          >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M13.5 21v-8h2.75l.4-3h-3.15V8.1c0-.87.24-1.46 1.49-1.46h1.59V3.95c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.05V10H7.6v3h2.68v8h3.22Z" />
          </svg>
        </a>

        {/* WHATSAPP */}
        <a
          href="https://wa.me/2290168681885"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp PLANETECH SARL"
          title="WhatsApp"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:bg-[#25D366]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
           >
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.56 0 .25 5.31.25 11.83c0 2.08.54 4.11 1.57 5.9L.17 24l6.42-1.68a11.8 11.8 0 0 0 5.49 1.39h.01c6.51 0 11.82-5.31 11.82-11.83 0-3.16-1.23-6.13-3.39-8.4ZM12.09 21.7h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.21-3.81 1 1.02-3.71-.23-.38a9.84 9.84 0 1 1 8.4 4.67Zm5.39-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.29-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.49-1.77-1.66-2.07-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.03 1.01-1.03 2.46 0 1.45 1.05 2.85 1.2 3.05.15.2 2.07 3.16 5.01 4.43.7.3 1.25.48 1.67.62.7.22 1.33.19 1.83.12.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z" />
          </svg>
        </a>

        {/* INSTAGRAM */}
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram PLANETECH SARL"
          title="Instagram"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:bg-[#E4405F]"
          >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden="true"
            >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>

        {/* TIKTOK */}
        <a
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok PLANETECH SARL"
          title="TikTok"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:bg-black"
          >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M15.3 3c.24 1.55 1.15 2.72 2.76 3.42.58.25 1.2.39 1.94.39v2.74c-.72.07-1.43-.03-2.12-.24a7.5 7.5 0 0 1-2.58-1.35v6.5c0 2.79-2.2 5.17-5.1 5.45A5.3 5.3 0 0 1 4.74 15c0-3.09 2.59-5.62 5.7-5.4.22.02.45.05.67.1v2.82a2.95 2.95 0 1 0 2.18 2.86V3h2.01Z" />
          </svg>
        </a>

      </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          COPYRIGHT
      ====================================================== */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-6 text-xs text-forest-200/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {annee} {ENTREPRISE.nom}.boscorethce Tous droits réservés.
          </p>

          <p>{ENTREPRISE.ville}</p>
        </div>
      </div>
    </footer>
  );
}
