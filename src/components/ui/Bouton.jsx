import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

const VARIANTES = {
  primaire: 'bg-signal text-white hover:bg-forest-500 shadow-soft',
  sombre: 'bg-forest-700 text-white hover:bg-forest-600',
  contour: 'border border-forest-200 text-forest-700 hover:border-signal hover:text-forest-600 bg-white',
  clair: 'bg-white/10 text-white border border-white/30 hover:bg-white/20',
};

const TAILLES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[0.95rem]',
};

/**
 * Bouton unique du site : rendu en <Link>, <a> ou <button> selon les props.
 * - to    -> navigation interne (React Router)
 * - href  -> lien externe (tel:, mailto:, http)
 */
export default function Bouton({
  variante = 'primaire',
  taille = 'md',
  to,
  href,
  className,
  children,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60',
    VARIANTES[variante],
    TAILLES[taille],
    className
  );

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  if (href) return <a href={href} className={classes} {...props}>{children}</a>;
  return <button className={classes} {...props}>{children}</button>;
}
