import { Menu, Bell } from 'lucide-react';

/** Barre supérieure : bouton menu (mobile), titre de page et identité connectée. */
export default function TopbarAdmin({ titre, sousTitre, onOuvrirMenu, alertes = 0 }) {
  return (
    <header className="sticky top-0 z-30 border-b border-forest-100 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-5 lg:px-8">
        <button
          type="button"
          onClick={onOuvrirMenu}
          className="grid h-10 w-10 place-items-center rounded-lg border border-forest-100 text-forest-700 lg:hidden"
        >
          <span className="sr-only">Ouvrir le menu</span>
          <Menu size={18} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-lg font-semibold text-forest-700">{titre}</h1>
          {sousTitre && <p className="truncate text-xs text-slate-muted">{sousTitre}</p>}
        </div>

        <button
          type="button"
          className="relative grid h-10 w-10 place-items-center rounded-lg border border-forest-100 text-forest-700"
        >
          <span className="sr-only">Notifications</span>
          <Bell size={18} />
          {alertes > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-signal px-1 text-[0.65rem] font-bold text-white">
              {alertes}
            </span>
          )}
        </button>

        <div className="hidden items-center gap-3 border-l border-forest-100 pl-4 sm:flex">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-forest-700 text-sm font-semibold text-white">
            AA
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-ink">Armelle Assogba</span>
            <span className="block text-xs text-slate-muted">Administrateur</span>
          </span>
        </div>
      </div>
    </header>
  );
}
