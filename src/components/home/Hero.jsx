import Bouton from '@/components/ui/Bouton';
import { ENTREPRISE, telHref } from '@/data/entreprise';

export default function Hero() {
  const images = [
    'https://www.sencampus.com/content/uploads/Ingenieur-en-telecommunications-850x478.png',
    'https://image.connexionfrance.com/410314.webp?format=jpg&height=642&imageId=410314&width=960',
    'https://www.travaux-second-oeuvre.com/wp-content/uploads/2025/05/Image_fx-2025-05-30T085951.788-1024x559.png',
    'https://www.etude-et-bilan-thermique.fr/img/tmp/44245f3ef79247b791a450fc92e13b37.jpg',
  ];

  return (
    <section className="relative overflow-hidden bg-forest-900 text-white">

      {/* ==============================
          IMAGES ARRIÈRE-PLAN
      ============================== */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
      >
        {images.map((image, index) => (
          <div
            key={image}
            className={`hero-slide absolute inset-0 bg-cover bg-center bg-no-repeat ${
              index === 0 ? 'hero-first' : ''
            }`}
            style={{
              backgroundImage: `url("${image}")`,
              animationDelay: `${index * 3}s`,
            }}
          />
        ))}

        {/* Voile transparent */}
        <div className="absolute inset-0 bg-forest-900/30" />

        {/* Dégradé pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/60 via-forest-900/20 to-transparent" />
      </div>

      {/* ==============================
          CONTENU
      ============================== */}
      <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

        <div>
          <p className="text-sm font-medium text-forest-100">
            {ENTREPRISE.baseline} · {ENTREPRISE.ville}
          </p>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]">
            Ne perdez pas de temps.<br />Nous avons la solution&nbsp;!
          </h1>

          <p className="mt-6 max-w-prose text-base leading-relaxed text-forest-100 sm:text-lg">
            Installation électrique, réseau d'entreprise, raccordement fibre, matériel informatique
            et travaux de bâtiment : une seule équipe prend en charge votre chantier, du devis à la
            mise en service.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Bouton to="/contact">
              Demander un devis
            </Bouton>

            <Bouton
              href={telHref(ENTREPRISE.telephones[0])}
              variante="clair"
            >
              Appeler {ENTREPRISE.telephones[0]}
            </Bouton>
          </div>
        </div>

        {/* Carte de réassurance */}
        <div className="rounded-2xl border border-white/20 bg-white/10 p-7 backdrop-blur-md shadow-xl">

          <h2 className="text-lg font-semibold text-white">
            Comment se passe une demande
          </h2>

          <ol className="mt-5 space-y-5">
            {[
              ['Vous décrivez le besoin', 'Par téléphone ou via le formulaire de devis.'],
              ['Nous chiffrons', 'Visite technique si nécessaire, puis devis détaillé.'],
              ['Nous intervenons', 'Pose, raccordement et recette, avec garantie.'],
            ].map(([titre, detail], index) => (
              <li
                key={titre}
                className="flex gap-4"
              >
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-signal text-sm font-bold text-white shadow-lg">
                  {index + 1}
                </span>

                <span>
                  <span className="block font-semibold text-white">
                    {titre}
                  </span>

                  <span className="text-sm text-forest-100">
                    {detail}
                  </span>
                </span>
              </li>
            ))}
          </ol>

        </div>
      </div>

      {/* ==============================
          ANIMATION RAPIDE
      ============================== */}
      <style>{`
        .hero-slide {
          opacity: 0;
          transform: scale(1.02);
          animation: heroImages 12s infinite ease-in-out;
        }

        /* Première image visible immédiatement */
        .hero-first {
          opacity: 1;
        }

        @keyframes heroImages {
          0% {
            opacity: 0;
          }

          5% {
            opacity: 1;
          }

          28% {
            opacity: 1;
          }

          33% {
            opacity: 0;
          }

          100% {
            opacity: 0;
          }
        }
      `}</style>

    </section>
  );
}