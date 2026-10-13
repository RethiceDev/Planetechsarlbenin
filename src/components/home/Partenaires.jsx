import { useEffect, useRef } from 'react';

import Section from '@/components/ui/Section';
import TitreSection from '@/components/ui/TitreSection';

const PARTENAIRES = [
  {
    id: 1,
    nom: 'NETIS Bénin',
    logo: 'https://www.google.com/s2/favicons?domain=netisgroup.net&sz=128',
    site_web: 'https://netisgroup.net/',
  },
  {
    id: 2,
    nom: 'Bénin Télécoms Services',
    logo: 'telecom.png',
    site_web: 'https://www.benintelecoms.bj/',
  },
  {
    id: 3,
    nom: 'SBIN',
    logo: 'https://www.google.com/s2/favicons?domain=sbin.bj&sz=128',
    site_web: 'https://www.sbin.bj/',
  },
  {
    id: 4,
    nom: 'NETIS Togo',
    logo: 'https://www.google.com/s2/favicons?domain=netisgroup.net&sz=128',
    site_web: 'https://netisgroup.net/',
  },
  {
    id: 5,
    nom: 'GIZ Bénin',
    logo: 'https://www.google.com/s2/favicons?domain=giz.de&sz=128',
    site_web: 'https://www.giz.de/en/regions/africa/benin',
  },
  {
    id: 6,
    nom: 'Plan International Bénin',
    logo: 'https://www.google.com/s2/favicons?domain=plan-international.org&sz=128',
    site_web: 'https://plan-international.org/benin/',
  },
  {
    id: 7,
    nom: 'DONGACO',
    logo: 'dongaco.png',
    site_web: 'https://www.dongaco.com/',
  },

  // ANCIEN PNH → NOUVELLE DÉNOMINATION PNHG
  {
    id: 8,
    nom: 'PNHG',
    logo: 'https://www.google.com/s2/favicons?domain=pn-bn.com&sz=128',
    site_web: 'https://www.pn-bn.com/',
  },

  {
    id: 9,
    nom: 'Isocel Télécom',
    logo: 'https://www.google.com/s2/favicons?domain=isoceltelecom.com&sz=128',
    site_web: 'https://isoceltelecom.com/',
  },

  // ANCIEN ASSI → NOUVELLE DÉNOMINATION ASIN
  {
    id: 10,
    nom: 'ASIN',
    logo: 'https://www.google.com/s2/favicons?domain=asin.bj&sz=128',
    site_web: 'https://asin.bj/',
  },

  {
    id: 11,
    nom: 'ANTP',
    logo: 'antp.png',
    site_web: '#',
  },

  {
    id: 12,
    nom: 'Direction générale des douanes',
    logo: 'douanes.png',
    site_web: 'https://douanes.gouv.bj/',
  },

  {
    id: 13,
    nom: 'COMAN SA',
    logo: 'https://www.google.com/s2/favicons?domain=apmterminals.com&sz=128',
    site_web: 'https://www.apmterminals.com/',
  },

  {
    id: 14,
    nom: 'COLAS',
    logo: 'https://www.google.com/s2/favicons?domain=colas.com&sz=128',
    site_web: 'https://www.colas.com/',
  },

  {
    id: 15,
    nom: 'SOGEA SATOM',
    logo: 'https://www.google.com/s2/favicons?domain=sogea-satom.com&sz=128',
    site_web: 'https://sogea-satom.com/fr/',
  },

  // NOUVEAUX PARTENAIRES
  {
    id: 16,
    nom: 'Moov Africa Bénin',
    logo: 'moov.png',
    site_web: 'https://www.moov-africa.bj/',
  },

  {
    id: 17,
    nom: 'PORTEO Bénin',
    logo: 'https://www.google.com/s2/favicons?domain=porteo-btp.com&sz=128',
    site_web: 'https://porteo-btp.com/',
  },

  {
    id: 18,
    nom: 'SOROUBAT Bénin',
    logo: 'https://www.google.com/s2/favicons?domain=groupesoroubat.com&sz=128',
    site_web: 'https://groupesoroubat.com/',
  },

  {
    id: 19,
    nom: 'SOROUBAT Togo',
    logo: 'https://www.google.com/s2/favicons?domain=groupesoroubat.com&sz=128',
    site_web: 'https://groupesoroubat.com/',
  },

  {
    id: 20,
    nom: 'UNITECH',
    logo: 'https://www.google.com/s2/favicons?domain=unitech-groupe.com&sz=128',
    site_web: 'https://www.unitech-groupe.com/',
  },

  {
    id: 21,
    nom: 'VINCI Energies Bénin',
    logo: 'https://www.google.com/s2/favicons?domain=vinci-energies.com&sz=128',
    site_web: 'https://www.vinci-energies.com/',
  },
];

const getFallbackLogo = (nom) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    nom
  )}&background=1b4d3e&color=ffffff&size=256&bold=true`;
};

export default function Partenaires() {
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const pauseRef = useRef(false);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const vitesse = 2.85;

    const animate = () => {
      if (!pauseRef.current) {
        slider.scrollLeft += vitesse;

        const limite = slider.scrollWidth / 2;

        if (slider.scrollLeft >= limite) {
          slider.scrollLeft = 0;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <Section fond="clair">
      <TitreSection
        titre="Nos partenaires"
        chapo="Nous collaborons avec des partenaires qui nous accompagnent dans la réalisation de solutions adaptées aux besoins de nos clients."
      />

      <div
        ref={sliderRef}
        className="mt-10 w-full overflow-hidden select-none"
        onMouseEnter={() => {
          pauseRef.current = true;
        }}
        onMouseLeave={() => {
          pauseRef.current = false;
        }}
        onTouchStart={() => {
          pauseRef.current = true;
        }}
        onTouchEnd={() => {
          pauseRef.current = false;
        }}
      >
        <div className="flex w-max items-stretch gap-5">
          {[...PARTENAIRES, ...PARTENAIRES].map(
            (partenaire, index) => (
              <div
                key={`${partenaire.id}-${index}`}
                className="
                  group
                  flex
                  h-[190px]
                  w-[220px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-4
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <a
                  href={
                    partenaire.site_web !== '#'
                      ? partenaire.site_web
                      : undefined
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    h-full
                    w-full
                    flex-col
                    items-center
                    justify-center
                  "
                >
                  {/* LOGO */}
                  <div
                    className="
                      flex
                      h-[105px]
                      w-full
                      items-center
                      justify-center
                      rounded-xl
                      bg-gray-50
                      p-4
                      transition
                      duration-300
                      group-hover:bg-emerald-50
                    "
                  >
                    <img
                      src={partenaire.logo}
                      alt={`Logo ${partenaire.nom}`}
                      className="
                        h-20
                        w-20
                        object-contain
                        transition
                        duration-300
                        group-hover:scale-110
                      "
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.src =
                          getFallbackLogo(partenaire.nom);

                        e.currentTarget.onerror = null;
                      }}
                    />
                  </div>

                  {/* NOM DU PARTENAIRE */}
                  <div
                    className="
                      mt-4
                      flex
                      min-h-[44px]
                      w-full
                      items-center
                      justify-center
                    "
                  >
                    <span
                      className="
                        text-center
                        text-base
                        font-bold
                        leading-5
                        text-gray-800
                        transition
                        duration-300
                        group-hover:text-emerald-700
                      "
                    >
                      {partenaire.nom}
                    </span>
                  </div>
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </Section>
  );
}