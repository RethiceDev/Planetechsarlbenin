import { cn } from '@/utils/cn';

/** Bloc blanc standard du dashboard : en-tête optionnel + contenu. */
export default function Carte({ titre, description, action, className, children, sansPadding = false }) {
  return (
    <section className={cn('rounded-2xl border border-forest-100 bg-white', className)}>
      {(titre || action) && (
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-forest-50 px-6 py-5">
          <div>
            {titre && <h2 className="font-display text-base font-semibold text-forest-700">{titre}</h2>}
            {description && <p className="mt-1 text-sm text-slate-muted">{description}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={sansPadding ? '' : 'p-6'}>{children}</div>
    </section>
  );
}
