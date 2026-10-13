import { cn } from '@/utils/cn';

const VARIANTES = {
  primaire: 'bg-signal text-white hover:bg-forest-500',
  sombre: 'bg-forest-700 text-white hover:bg-forest-600',
  contour: 'border border-forest-100 bg-white text-forest-700 hover:border-signal',
  discret: 'text-slate-muted hover:bg-forest-50 hover:text-forest-700',
  danger: 'border border-red-200 bg-white text-red-600 hover:bg-red-50',
};

const TAILLES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
};

/** Bouton du back-office, avec icône Lucide optionnelle. */
export default function BoutonAdmin({
  variante = 'primaire',
  taille = 'md',
  icone: Icone,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTES[variante],
        TAILLES[taille],
        className
      )}
      {...props}
    >
      {Icone && <Icone size={taille === 'sm' ? 14 : 16} aria-hidden="true" />}
      {children}
    </button>
  );
}
