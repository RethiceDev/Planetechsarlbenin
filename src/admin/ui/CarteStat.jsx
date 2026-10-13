import { cn } from '@/utils/cn';

/**
 * Carte de statistique de la vue d'ensemble.
 * `detail` sert à qualifier le chiffre (ex. « 2 en attente »), pas à décorer.
 */
export default function CarteStat({ libelle, valeur, detail, icone: Icone, accent = false }) {
  return (
    <article
      className={cn(
        'rounded-2xl border p-5',
        accent ? 'border-transparent bg-forest-700 text-white' : 'border-forest-100 bg-white'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className={cn('text-sm', accent ? 'text-forest-100' : 'text-slate-muted')}>{libelle}</p>
        {Icone && (
          <span
            className={cn(
              'grid h-9 w-9 shrink-0 place-items-center rounded-lg',
              accent ? 'bg-white/15 text-white' : 'bg-forest-50 text-forest-700'
            )}
          >
            <Icone size={18} aria-hidden="true" />
          </span>
        )}
      </div>
      <p className={cn('mt-4 font-display text-3xl font-bold', accent ? 'text-white' : 'text-forest-700')}>
        {valeur}
      </p>
      {detail && (
        <p className={cn('mt-1 text-xs', accent ? 'text-forest-100' : 'text-slate-muted')}>{detail}</p>
      )}
    </article>
  );
}
