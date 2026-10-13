import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

export default function FiltresBoutique({
  categories = [],
  categorie = 'toutes',
  onCategorie,
  sousCategorie = 'toutes',
  onSousCategorie,
  recherche = '',
  onRecherche,
  className,
}) {
  const scrollRef = useRef(null);

  /*
   * Défilement automatique de la barre des catégories.
   */
  useEffect(() => {
    const container = scrollRef.current;

    if (!container || categories.length <= 1) {
      return;
    }

    let animationFrame;
    let paused = false;

    const scroll = () => {
      if (!paused) {
        container.scrollLeft += 0.5;

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 2
        ) {
          container.scrollLeft = 0;
        }
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    const pause = () => {
      paused = true;
    };

    const resume = () => {
      paused = false;
    };

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);
    container.addEventListener('touchstart', pause, { passive: true });
    container.addEventListener('touchend', resume);

    animationFrame = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrame);

      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
      container.removeEventListener('touchstart', pause);
      container.removeEventListener('touchend', resume);
    };
  }, [categories]);

  /*
   * Sélectionner une catégorie et réinitialiser
   * la sous-catégorie sélectionnée.
   */
  const choisirCategorie = (id) => {
    onCategorie?.(String(id));
    onSousCategorie?.('toutes');
  };

  return (
    <div className={cn('space-y-5', className)}>
      {/* BARRE HORIZONTALE DES CATÉGORIES */}
      <div
        ref={scrollRef}
        role="group"
        aria-label="Filtrer par catégorie"
        className="flex gap-3 overflow-x-auto scroll-smooth pb-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
       >
        <button
          type="button"
          onClick={() => choisirCategorie('toutes')}
          aria-pressed={categorie === 'toutes'}
          className={cn(
            'shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300',
            categorie === 'toutes'
              ? 'border-signal bg-signal text-white shadow-md'
              : 'border-forest-100 bg-white text-forest-700 hover:border-signal hover:text-signal'
          )}
        >
          Tous
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => choisirCategorie(cat.id)}
            aria-pressed={categorie === String(cat.id)}
            className={cn(
              'shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300',
              categorie === String(cat.id)
                ? 'border-signal bg-signal text-white shadow-md'
                : 'border-forest-100 bg-white text-forest-700 hover:border-signal hover:text-signal'
            )}
          >
            {cat.nom}
          </button>
        ))}
      </div>

      {/* RECHERCHE */}
      <div className="flex justify-end">
        <div className="w-full lg:w-80">
          <input
            type="search"
            value={recherche}
            onChange={(e) => onRecherche?.(e.target.value)}
            placeholder="Rechercher un article..."
            aria-label="Rechercher un article"
            className="w-full rounded-full border border-forest-100 bg-white px-5 py-3 text-sm outline-none transition-all focus:border-signal focus:ring-2 focus:ring-signal/20"
          />
        </div>
      </div>
    </div>
  );
}
