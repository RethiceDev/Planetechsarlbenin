import { cn } from '@/utils/cn';

const base =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-muted/60 transition-colors focus:border-signal';

export function ChampAdmin({ id, label, erreur, indication, obligatoire, className, children }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-forest-700">
        {label}
        {obligatoire && <span className="ml-1 text-signal" aria-hidden="true">*</span>}
      </label>
      {children}
      {indication && !erreur && <p className="text-xs text-slate-muted">{indication}</p>}
      {erreur && (
        <p id={`${id}-erreur`} role="alert" className="text-xs font-medium text-red-600">{erreur}</p>
      )}
    </div>
  );
}

export function SaisieAdmin({ erreur, className, ...props }) {
  return (
    <input
      {...props}
      aria-invalid={Boolean(erreur)}
      aria-describedby={erreur ? `${props.id}-erreur` : undefined}
      className={cn(base, erreur ? 'border-red-300' : 'border-forest-100', className)}
    />
  );
}

export function ZoneTexteAdmin({ erreur, className, ...props }) {
  return (
    <textarea
      {...props}
      aria-invalid={Boolean(erreur)}
      className={cn(base, 'min-h-[110px] resize-y leading-relaxed', erreur ? 'border-red-300' : 'border-forest-100', className)}
    />
  );
}

export function SelectionAdmin({ erreur, className, children, ...props }) {
  return (
    <select
      {...props}
      aria-invalid={Boolean(erreur)}
      className={cn(base, erreur ? 'border-red-300' : 'border-forest-100', className)}
    >
      {children}
    </select>
  );
}
