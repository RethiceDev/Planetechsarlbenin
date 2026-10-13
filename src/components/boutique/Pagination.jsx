import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Construit la liste des pages à afficher, avec des "…" :
 * ex. [1, '…', 4, 5, 6, '…', 20]
 */
function construirePages(courante, derniere) {
  if (derniere <= 7) {
    return Array.from({ length: derniere }, (_, i) => i + 1);
  }

  const pages = new Set([1, derniere, courante - 1, courante, courante + 1]);

  if (courante <= 3) {
    [2, 3, 4].forEach((p) => pages.add(p));
  }

  if (courante >= derniere - 2) {
    [derniere - 3, derniere - 2, derniere - 1].forEach((p) => pages.add(p));
  }

  const triees = Array.from(pages)
    .filter((p) => p >= 1 && p <= derniere)
    .sort((a, b) => a - b);

  const resultat = [];

  triees.forEach((p, index) => {
    if (index > 0 && p - triees[index - 1] > 1) {
      resultat.push('…');
    }
    resultat.push(p);
  });

  return resultat;
}

/**
 * Pagination basée sur current_page / last_page renvoyés par Laravel.
 */
export default function Pagination({
  page,
  derniere,
  total,
  onChange,
  disabled = false,
}) {
  if (!derniere || derniere <= 1) {
    return null;
  }

  const pages = construirePages(page, derniere);

  const base =
    'flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition';

  return (
    <nav
      className="mt-12 flex flex-col items-center gap-3"
      aria-label="Pagination des produits"
    >
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <button
            type="button"
            disabled={disabled || page <= 1}
            onClick={() => onChange(page - 1)}
            className={`${base} gap-1 border-forest-100 bg-white text-forest-700 hover:bg-forest-50 disabled:cursor-not-allowed disabled:opacity-40`}
            aria-label="Page précédente"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Précédent</span>
          </button>
        </li>

        {pages.map((p, index) =>
          p === '…' ? (
            <li
              key={`ellipse-${index}`}
              className="px-1 text-slate-muted"
              aria-hidden="true"
            >
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(p)}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Page ${p}`}
                className={`${base} ${
                  p === page
                    ? 'border-signal bg-signal text-white shadow-md'
                    : 'border-forest-100 bg-white text-forest-700 hover:bg-forest-50'
                }`}
              >
                {p}
              </button>
            </li>
          )
        )}

        <li>
          <button
            type="button"
            disabled={disabled || page >= derniere}
            onClick={() => onChange(page + 1)}
            className={`${base} gap-1 border-forest-100 bg-white text-forest-700 hover:bg-forest-50 disabled:cursor-not-allowed disabled:opacity-40`}
            aria-label="Page suivante"
          >
            <span className="hidden sm:inline">Suivant</span>
            <ChevronRight size={16} />
          </button>
        </li>
      </ul>

      <p className="text-xs text-slate-muted">
        Page {page} sur {derniere}
        {typeof total === 'number' ? ` · ${total} produit${total > 1 ? 's' : ''}` : ''}
      </p>
    </nav>
  );
}
