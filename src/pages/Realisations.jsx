import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import Section from '@/components/ui/Section';
import TitreSection from '@/components/ui/TitreSection';

import { listerRealisations } from '@/services/realisationService';

export default function Realisations() {
  const [realisations, setRealisations] = useState([]);
  const [domaineActif, setDomaineActif] = useState('Tous');

  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  // =========================================================
  // CHARGEMENT
  // =========================================================

  useEffect(() => {
    let annule = false;

    const chargerRealisations = async () => {
      setChargement(true);
      setErreur('');

      try {
        const data = await listerRealisations();

        if (annule) {
          return;
        }

        const liste = Array.isArray(data)
          ? data
          : data?.realisations ?? [];

        setRealisations(liste);
      } catch (error) {
        console.error(
          'Erreur chargement réalisations :',
          error
        );

        if (!annule) {
          setErreur(
            "Les réalisations n'ont pas pu être chargées. Réessayez dans un instant."
          );
        }
      } finally {
        if (!annule) {
          setChargement(false);
        }
      }
    };

    chargerRealisations();

    return () => {
      annule = true;
    };
  }, []);

  // =========================================================
  // DOMAINES
  // =========================================================

  const domaines = useMemo(() => {
    const uniques = Array.from(
      new Set(
        realisations
          .map((realisation) => realisation.domaine)
          .filter(Boolean)
      )
    );

    return ['Tous', ...uniques];
  }, [realisations]);

  // =========================================================
  // FILTRAGE
  // =========================================================

  const realisationsFiltrees = useMemo(() => {
    if (domaineActif === 'Tous') {
      return realisations;
    }

    return realisations.filter(
      (realisation) =>
        realisation.domaine === domaineActif
    );
  }, [realisations, domaineActif]);

  // =========================================================
  // URL IMAGE
  // =========================================================

  const getImageUrl = (image) => {
    if (!image) {
      return '/images/placeholder-realisation.jpg';
    }

    if (
      image.startsWith('http://') ||
      image.startsWith('https://')
    ) {
      return image;
    }

    const chemin = image.replace(/^\/+/, '');

    return `${import.meta.env.VITE_BACKEND_URL}/storage/${chemin}`;
  };

  return (
    <>
      {/* =====================================================
          EN-TÊTE
      ====================================================== */}

      <Section
        fond="clair"
        className="pb-10 pt-16 md:pb-14 md:pt-20"
      >
        <p className="text-sm font-medium text-slate-muted">
          Réalisations
        </p>

        <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-forest-800 md:text-5xl">
          Nos réalisations
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-muted md:text-lg">
          Découvrez quelques-unes des réalisations effectuées
          par nos équipes dans nos différents domaines
          d’intervention.
        </p>
      </Section>

      {/* =====================================================
          GALERIE
      ====================================================== */}

      <Section className="pt-8 md:pt-12">

        <TitreSection
          titre="Découvrez notre savoir-faire"
          chapo="Une sélection de projets réalisés par nos équipes pour accompagner les entreprises et les particuliers."
        />

        {/* ===================================================
            CHARGEMENT
        ==================================================== */}

        {chargement && (
          <div className="mt-10 rounded-2xl border border-forest-100 bg-white py-16 text-center">
            <p className="text-sm text-slate-muted">
              Chargement des réalisations…
            </p>
          </div>
        )}

        {/* ===================================================
            ERREUR
        ==================================================== */}

        {erreur && (
          <div className="mt-10 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {erreur}
          </div>
        )}

        {!chargement && !erreur && (
          <>
            {/* =================================================
                FILTRES
            ================================================== */}

            {domaines.length > 1 && (
              <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
                {domaines.map((domaine) => (
                  <button
                    key={domaine}
                    type="button"
                    onClick={() =>
                      setDomaineActif(domaine)
                    }
                    className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      domaineActif === domaine
                        ? 'border-signal bg-signal text-white shadow-md'
                        : 'border-forest-100 bg-white text-forest-700 hover:border-signal hover:text-signal'
                    }`}
                  >
                    {domaine}
                  </button>
                ))}
              </div>
            )}

            {/* =================================================
                GALERIE
            ================================================== */}

            {realisationsFiltrees.length > 0 ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {realisationsFiltrees.map(
                  (realisation) => (
                    <article
                      key={realisation.id}
                      className="group overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      {/* PHOTO */}

                      <div className="relative aspect-[4/3] overflow-hidden bg-forest-50">

                        <img
                          src={getImageUrl(
                            realisation.image
                          )}
                          alt={realisation.titre}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src =
                              '/images/placeholder-realisation.jpg';
                          }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                        {/* DOMAINE */}

                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-forest-700 shadow-sm">
                          {realisation.domaine}
                        </span>

                        {/* ICÔNE */}

                        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-forest-700 shadow-md transition-all duration-300 group-hover:rotate-45">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>

                      {/* INFORMATIONS */}

                      <div className="p-5">

                        <h2 className="text-lg font-bold leading-snug text-forest-800">
                          {realisation.titre}
                        </h2>

                        <p className="mt-2 text-sm leading-relaxed text-slate-muted">
                          {realisation.description}
                        </p>

                      </div>
                    </article>
                  )
                )}

              </div>
            ) : (
              <div className="mt-10 rounded-2xl border border-dashed border-forest-200 p-10 text-center">
                <p className="font-semibold text-forest-700">
                  {realisations.length === 0
                    ? 'Aucune réalisation disponible pour le moment.'
                    : 'Aucune réalisation disponible pour ce domaine.'
                  }
                </p>
              </div>
            )}
          </>
        )}

      </Section>
    </>
  );
}