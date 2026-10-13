import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, FileText, ShoppingBag, Wrench, Users, X, LogOut, Globe,
} from 'lucide-react';
import { cn } from '@/utils/cn';

/** Sections du dashboard. `fin` évite que l'accueil reste actif sur les sous-routes. */
const LIENS = [
  { to: '/admin', libelle: "Vue d'ensemble", icone: LayoutDashboard, fin: true },
  { to: '/admin/devis', libelle: 'Devis', icone: FileText },
  { to: '/admin/produits', libelle: 'Boutique', icone: ShoppingBag },
  { to: '/admin/expertises', libelle: 'Expertises', icone: Wrench },
  { to: '/admin/equipe', libelle: 'Équipe et partenaires', icone: Users },
];

/**
 * Menu latéral.
 * - À partir de lg : colonne fixe toujours visible.
 * - En dessous : panneau coulissant contrôlé par `ouvert`.
 */
export default function SidebarAdmin({ ouvert, onFermer, nombreNouveauxDevis = 0 }) {
  const contenu = (
    <div className="flex h-full flex-col bg-forest-800 text-forest-100">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-signal font-display text-base font-bold text-white">
            P
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold text-white">PLANETECH</span>
            <span className="block text-[0.68rem] text-forest-200">Administration</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onFermer}
          className="grid h-9 w-9 place-items-center rounded-lg text-forest-100 hover:bg-white/10 lg:hidden"
        >
          <span className="sr-only">Fermer le menu</span>
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Sections du tableau de bord">
        {LIENS.map(({ to, libelle, icone: Icone, fin }) => (
          <NavLink
            key={to}
            to={to}
            end={fin}
            onClick={onFermer}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-signal text-white' : 'text-forest-100 hover:bg-white/10 hover:text-white'
              )
            }
          >
            <Icone size={18} aria-hidden="true" />
            <span className="flex-1">{libelle}</span>
            {to === '/admin/devis' && nombreNouveauxDevis > 0 && (
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold text-white">
                {nombreNouveauxDevis}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/10 p-3">
        <a
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-forest-100 hover:bg-white/10 hover:text-white"
        >
          <Globe size={18} aria-hidden="true" />
          Voir le site public
        </a>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-forest-100 hover:bg-white/10 hover:text-white"
        >
          <LogOut size={18} aria-hidden="true" />
          Se déconnecter
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Colonne fixe (grand écran) */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="fixed inset-y-0 left-0 w-64">{contenu}</div>
      </aside>

      {/* Panneau coulissant (mobile et tablette) */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          ouvert ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!ouvert}
      >
        <div
          onClick={onFermer}
          className={cn(
            'absolute inset-0 bg-ink/50 transition-opacity duration-200',
            ouvert ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div
          className={cn(
            'absolute inset-y-0 left-0 w-72 shadow-xl transition-transform duration-200',
            ouvert ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {contenu}
        </div>
      </div>
    </>
  );
}
