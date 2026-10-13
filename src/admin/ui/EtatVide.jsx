import { Inbox } from 'lucide-react';

/** Écran affiché quand une liste est vide : dit quoi faire, sans faux message d'erreur. */
export default function EtatVide({ titre, message, action, icone: Icone = Inbox }) {
  return (
    <div className="rounded-xl border border-dashed border-forest-200 px-6 py-12 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-forest-50 text-forest-700">
        <Icone size={20} aria-hidden="true" />
      </span>
      <p className="mt-4 font-semibold text-forest-700">{titre}</p>
      {message && <p className="mx-auto mt-2 max-w-sm text-sm text-slate-muted">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
