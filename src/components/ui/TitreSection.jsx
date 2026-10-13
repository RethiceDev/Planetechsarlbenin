import { cn } from '@/utils/cn';

/**
 * En-tête de section : titre + chapô optionnel.
 * Le filet vert à gauche relie visuellement toutes les sections entre elles.
 */
export default function TitreSection({ titre, chapo, sombre = false, className }) {
  return (
    <header className={cn('max-w-prose border-l-2 border-signal pl-5', className)}>
      <h2 className={cn('text-2xl font-semibold md:text-[2rem] md:leading-tight', sombre && 'text-white')}>
        {titre}
      </h2>
      {chapo && (
        <p className={cn('mt-3 text-base leading-relaxed', sombre ? 'text-forest-100' : 'text-slate-muted')}>
          {chapo}
        </p>
      )}
    </header>
  );
}
