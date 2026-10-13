import Section from '@/components/ui/Section';
import TitreSection from '@/components/ui/TitreSection';

const EQUIPE = {
  direction: {
    id: 1,
    nom: 'Armelle ASSOGBA',
    role: 'PDG',
    pole: 'Direction générale',
    email: 'planetechsarlbenin@gmail.com',
    whatsapp: '22964549959',
  },

  services: [
    {
      id: 2,
      nom: 'Secrétariat',
      role: 'Service administratif',
      pole: 'Secrétariat',
    },
    {
      id: 3,
      nom: 'Comptabilité',
      role: 'Gestion comptable et financière',
      pole: 'Service de comptabilité',
    },
    {
      id: 4,
      nom: 'Technique',
      role: 'Études, réalisation et assistance technique',
      pole: 'Service technique',
    },
    {
      id: 5,
      nom: 'Commercial',
      role: 'Relation clients et développement commercial',
      pole: 'Service commercial',
    },
  ],
};

const initiales = (nom) =>
  nom
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((mot) => mot[0])
    .join('')
    .toUpperCase();

function CarteMembre({ membre, direction = false }) {
  return (
    <article
      className={`
        group
        relative
        w-full
        rounded-2xl
        border
        border-slate-100
        bg-white
        p-7
        text-center
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        ${direction ? 'max-w-sm' : ''}
      `}
    >
      {/* INITIALES */}
      <div className="relative mx-auto w-fit">
        <div
          className={`
            grid
            place-items-center
            rounded-full
            font-bold
            shadow-md
            ring-4
            ring-forest-50
            transition
            duration-300
            group-hover:scale-105
            ${
              direction
                ? 'h-24 w-24 bg-forest-700 text-2xl text-white'
                : 'h-20 w-20 bg-forest-50 text-xl text-forest-700'
            }
          `}
        >
          {initiales(membre.nom)}
        </div>

        {/* CONTACT DU PDG */}
        {direction && membre.email && membre.whatsapp && (
          <div
            className="
              absolute
              -bottom-2
              left-1/2
              flex
              -translate-x-1/2
              translate-y-2
              gap-2
              opacity-0
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            {/* EMAIL */}
            <a
              href={`mailto:${membre.email}`}
              title="Envoyer un email"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-white
                text-forest-700
                shadow-lg
                ring-1
                ring-slate-100
                transition
                hover:scale-110
                hover:bg-forest-700
                hover:text-white
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${membre.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Contacter sur WhatsApp"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-white
                text-green-600
                shadow-lg
                ring-1
                ring-slate-100
                transition
                hover:scale-110
                hover:bg-green-600
                hover:text-white
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.5 3.5A11.9 11.9 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.2-1.2-6.1-3.5-8.3ZM12.1 21.8h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 7 2.9 1.9 1.9 2.9 4.4 2.9 7 0 5.4-4.4 9.8-9.8 9.8Z" />
                <path d="M17.1 14.3c-.3-.2-1.7-.9-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.1 3.1c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.2-.3-.3-.6-.4Z" />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* INFORMATIONS */}
      <div className="mt-6">
        <h3
          className={`
            font-bold
            ${
              direction
                ? 'text-xl text-slate-900'
                : 'text-lg text-slate-900'
            }
          `}
        >
          {membre.nom}
        </h3>

        <p className="mt-2 text-sm font-semibold text-forest-700">
          {membre.role}
        </p>

        <div className="mt-4">
          <span
            className="
              inline-flex
              rounded-full
              bg-forest-50
              px-4
              py-1.5
              text-xs
              font-semibold
              text-forest-700
            "
          >
            {membre.pole}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Equipe() {
  const pdg = EQUIPE.direction;

  return (
    <Section fond="clair">
      <TitreSection
        titre="Notre équipe"
        chapo="Une équipe structurée autour de la direction générale et de quatre services complémentaires."
      />

      <div className="mt-12 flex flex-col items-center">

        {/* =========================
            DIRECTION / PDG
        ========================== */}
        <div className="flex flex-col items-center">
          <CarteMembre membre={pdg} direction />

          {/* LIGNE VERS LES SERVICES */}
          <div className="h-10 w-px bg-forest-200" />

          <div
            className="
              rounded-full
              border
              border-forest-100
              bg-forest-50
              px-5
              py-2
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-forest-700
            "
          >
            Services sous la direction du PDG
          </div>
        </div>

        {/* =========================
            SERVICES
        ========================== */}
        <div
          className="
            mt-10
            grid
            w-full
            max-w-6xl
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {EQUIPE.services.map((service) => (
            <CarteMembre
              key={service.id}
              membre={service}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}