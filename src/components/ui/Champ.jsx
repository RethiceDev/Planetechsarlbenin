import { cn } from '@/utils/cn';

const baseChamp =
  'w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-slate-muted/60 transition-colors focus:border-signal';

/** Libellé + contrôle + message d'erreur, avec liaison aria correcte. */
export function Champ({ id, label, erreur, indication, children, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-forest-700">
        {label}
      </label>
      {children}
      {indication && !erreur && <p className="text-xs text-slate-muted">{indication}</p>}
      {erreur && (
        <p id={`${id}-erreur`} role="alert" className="text-xs font-medium text-red-600">
          {erreur}
        </p>
      )}
    </div>
  );
}

export function Saisie({ erreur, className, ...props }) {
  return (
    <input
      {...props}
      aria-invalid={Boolean(erreur)}
      aria-describedby={erreur ? `${props.id}-erreur` : undefined}
      className={cn(baseChamp, erreur ? 'border-red-400' : 'border-forest-100', className)}
    />
  );
}

export function ZoneTexte({ erreur, className, ...props }) {
  return (
    <textarea
      {...props}
      aria-invalid={Boolean(erreur)}
      aria-describedby={erreur ? `${props.id}-erreur` : undefined}
      className={cn(baseChamp, 'min-h-[150px] resize-y leading-relaxed', erreur ? 'border-red-400' : 'border-forest-100', className)}
    />
  );
}

export function Selection({ erreur, className, children, ...props }) {
  return (
    <select
      {...props}
      aria-invalid={Boolean(erreur)}
      className={cn(baseChamp, 'appearance-none', erreur ? 'border-red-400' : 'border-forest-100', className)}
    >
      {children}
    </select>
  );
}
