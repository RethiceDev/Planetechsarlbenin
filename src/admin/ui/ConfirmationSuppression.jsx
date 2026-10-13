import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import BoutonAdmin from './BoutonAdmin';

/**
 * Boîte de dialogue de confirmation.
 * S'affiche uniquement quand `element` est non nul.
 */
export default function ConfirmationSuppression({ element, libelle, onConfirmer, onAnnuler }) {
  // Échap ferme la boîte
  useEffect(() => {
    if (!element) return undefined;
    const surTouche = (e) => e.key === 'Escape' && onAnnuler();
    window.addEventListener('keydown', surTouche);
    return () => window.removeEventListener('keydown', surTouche);
  }, [element, onAnnuler]);

  if (!element) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-5" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink/50" onClick={onAnnuler} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle size={20} aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-display text-lg font-semibold text-forest-700">
          Supprimer {libelle}&nbsp;?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-muted">
          L'élément disparaîtra du site public immédiatement. Cette action est définitive.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <BoutonAdmin variante="contour" onClick={onAnnuler}>Annuler</BoutonAdmin>
          <BoutonAdmin variante="danger" onClick={onConfirmer}>Supprimer</BoutonAdmin>
        </div>
      </div>
    </div>
  );
}
