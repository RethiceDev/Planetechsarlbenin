import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Bouton from '@/components/ui/Bouton';
import { ENTREPRISE, telHref } from '@/data/entreprise';
import { cn } from '@/utils/cn';

const LIENS = [
  { to: '/', libelle: 'Accueil', end: true },
  { to: '/a-propos', libelle: 'À propos' },
  { to: '/boutique', libelle: 'Boutique' },
  { to: '/realisations', libelle: 'Nos Realisations' },
  { to: '/contact', libelle: 'Contact' },
];

export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  const { pathname } = useLocation();

  const fermer = () => setOuvert(false);

  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 bg-white/95 backdrop-blur">

      {/* =====================================================
          BANDEAU DE CONTACT
      ====================================================== */}
     

      {/* =====================================================
          NAVIGATION PRINCIPALE
      ====================================================== */}
      <div
        className="
          container
          flex
          min-h-[88px]
          items-center
          gap-4
          py-2
          lg:min-h-[96px]
        "
        >

        {/* ===================================================
            LOGO
        ==================================================== */}
       <div className="shrink-0">
            <NavLink
              to="/"
              onClick={fermer}
              aria-label="Accueil PLANETECH SARL"
              className="flex items-center gap-3 group"
              >
              {/* Logo */}
              <img
                src="logo.png"
                alt="Logo PLANETECH SARL"
                className="
                  h-14
                  w-auto
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:scale-105
                  sm:h-16
                  lg:h-[68px]
                "
              />

              {/* Nom de l'entreprise */}
              <div className="flex items-baseline whitespace-nowrap">
      <span
        className="
          text-xl
          sm:text-2xl
          lg:text-[25px]
          font-extrabold
          tracking-tight
          text-[#1b4d3e]
          transition-colors
          duration-300
          group-hover:text-[#0f2c23]
        "
      >
        PLANETECH
      </span>

      <span
        className="
          ml-1.5
          text-sm
          sm:text-base
          lg:text-[15px]
          font-light
          tracking-[0.08em]
          text-[#1b4d3e]
          transition-colors
          duration-300
          group-hover:text-[#0f2c23]
        "
      >
        SARL
      </span>
      </div>
            </NavLink>
          </div>


        {/* ===================================================
            MENU DESKTOP
        ==================================================== */}
        <nav
          className="
            hidden
            flex-1
            items-center
            justify-center
            gap-8
            lg:flex
          "
          aria-label="Navigation principale"
        >
          {LIENS.map((lien) => (
            <NavLink
              key={lien.to}
              to={lien.to}
              end={lien.end}
              className={({ isActive }) =>
                cn(
                  'relative py-2 text-[0.95rem] font-medium transition-colors',
                  isActive
                    ? 'text-forest-700'
                    : 'text-slate-muted hover:text-forest-600'
                )
              }
            >
              {lien.libelle}

              {pathname === lien.to && (
                <span
                  className="
                    absolute
                    inset-x-0
                    -bottom-[1px]
                    h-[3px]
                    rounded-full
                    bg-signal
                  "
                />
              )}
            </NavLink>
          ))}
        </nav>

        {/* ===================================================
            ACTIONS DESKTOP
        ==================================================== */}
        <div
          className="
            hidden
            shrink-0
            items-center
            gap-3
            lg:flex
          "
        >
          <Bouton
            to="/contact"
            taille="sm"
          >
            Demander un devis
          </Bouton>
        </div>

        {/* ===================================================
            BOUTON MENU MOBILE
        ==================================================== */}
        <button
          type="button"
          onClick={() => setOuvert((o) => !o)}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          className="
            ml-auto
            grid
            h-11
            w-11
            place-items-center
            rounded-lg
            border
            border-forest-100
            text-forest-700
            lg:hidden
          "
        >
          <span className="sr-only">
            {ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
          </span>

          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            {ouvert ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h14M3 10h14M3 14h14"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* =====================================================
          MENU MOBILE
      ====================================================== */}
      {ouvert && (
        <div
          id="menu-mobile"
          className="
            border-t
            border-forest-100
            bg-white
            lg:hidden
          "
        >
          <nav
            className="
              container
              flex
              flex-col
              py-3
            "
            aria-label="Navigation mobile"
          >
            {LIENS.map((lien) => (
              <NavLink
                key={lien.to}
                to={lien.to}
                end={lien.end}
                onClick={fermer}
                className={({ isActive }) =>
                  cn(
                    'border-b border-forest-50 py-3 font-medium',
                    isActive
                      ? 'text-forest-700'
                      : 'text-slate-muted'
                  )
                }
              >
                {lien.libelle}
              </NavLink>
            ))}

            {/* DEMANDER UN DEVIS */}
            <Bouton
              to="/contact"
              onClick={fermer}
              className="mt-4 w-full"
            >
              Demander un devis
            </Bouton>

            {/* TELEPHONE */}
            <a
              href={telHref(ENTREPRISE.telephones[0])}
              className="
                py-4
                text-center
                text-sm
                text-slate-muted
              "
            >
              {ENTREPRISE.telephones[0]}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
