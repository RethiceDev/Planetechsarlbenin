import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

/**
 * Logo typographique : le sigle est posé sur un carré vert,
 * le nom reste lisible en petite taille sur mobile.
 */
export default function Logo({ sombre = false, className }) {
  return (
    <Link to="/" className={cn('group flex items-center gap-3', className)} aria-label="PLANETECH SARL, retour à l'accueil">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-signal font-display text-lg font-bold text-white">
        P
      </span>
      <span className="leading-tight">
        <span className={cn('block font-display text-[1.05rem] font-bold tracking-tight', sombre ? 'text-white' : 'text-forest-700')}>
          PLANETECH
        </span>
        <span className={cn('block text-[0.7rem]', sombre ? 'text-forest-100' : 'text-slate-muted')}>
          SARL · Cotonou
        </span>
      </span>
    </Link>
  );
}
