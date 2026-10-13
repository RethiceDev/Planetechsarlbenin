import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/utils/cn';

/** Message d'erreur ou de confirmation, refermable. */
export default function Alerte({ type = 'erreur', message, onFermer }) {
  if (!message) return null;

  const styles =
    type === 'succes'
      ? 'border-forest-200 bg-forest-50 text-forest-700'
      : 'border-red-200 bg-red-50 text-red-700';
  const Icone = type === 'succes' ? CheckCircle2 : AlertCircle;

  return (
    <div role="alert" className={cn('flex items-start gap-3 rounded-lg border px-4 py-3 text-sm', styles)}>
      <Icone size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
      <p className="flex-1">{message}</p>
      {onFermer && (
        <button type="button" onClick={onFermer} className="shrink-0 opacity-70 hover:opacity-100">
          <span className="sr-only">Fermer</span>
          <X size={15} />
        </button>
      )}
    </div>
  );
}
