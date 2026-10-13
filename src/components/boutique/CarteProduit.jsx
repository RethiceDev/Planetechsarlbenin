import { useEffect, useState } from 'react';
import {
  ShoppingCart,
  Info,
  X,
  PackageCheck,
  Tag,
  Layers3,
} from 'lucide-react';

export default function CarteProduit({ produit, onAjouterPanier }) {
  const [detailsOuverts, setDetailsOuverts] = useState(false);

  const imageUrl = produit.photo
    ? `${import.meta.env.VITE_BACKEND_URL}/storage/${produit.photo}`
    : null;

  const sousCategorie = produit.sous_categorie;
  const categorie = sousCategorie?.category;

  const descriptionComplete = String(produit.description ?? '').trim();
  const descriptionAffichee =
    descriptionComplete || 'Aucune description disponible pour ce produit.';

  // Remplacement du prix par "Sur devis"
  const prix = 'Sur devis';

  // Fermer la fiche avec Échap et bloquer le défilement derrière la fenêtre.
  useEffect(() => {
    if (!detailsOuverts) return undefined;

    const ancienOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const fermerAvecEchap = (event) => {
      if (event.key === 'Escape') setDetailsOuverts(false);
    };

    document.addEventListener('keydown', fermerAvecEchap);

    return () => {
      document.body.style.overflow = ancienOverflow;
      document.removeEventListener('keydown', fermerAvecEchap);
    };
  }, [detailsOuverts]);

  const ajouterDepuisModal = () => {
    onAjouterPanier?.(produit);
    setDetailsOuverts(false);
  };

  // Logo PLANETECH affiché sur les images du catalogue et de la fiche.
  const LogoPlanetech = ({ className = '' }) => (
    <div
      className={`absolute left-3 top-3 z-10 flex items-center justify-center ${className}`}
    >
      <img
        src="/logo.png"
        alt="Logo PLANETECH SARL"
        className="h-9 w-auto max-w-[100px] object-contain"
        onError={(event) => {
          event.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );

  return (
    <>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Visuel du produit */}
        <div className="relative h-52 w-full overflow-hidden bg-emerald-50">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={produit.name || 'Produit PLANETECH'}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                const fallback =
                  event.currentTarget.parentElement?.querySelector(
                    '[data-photo-fallback]'
                  );
                fallback?.classList.remove('hidden');
              }}
            />
          ) : null}

          <div
            data-photo-fallback
            className={`${
              imageUrl ? 'hidden' : 'flex'
            } absolute inset-0 items-center justify-center text-sm text-slate-500`}
          >
            Photo non disponible
          </div>

          {/* Logo PLANETECH dans le coin supérieur gauche */}
          <LogoPlanetech />

          {/* Catégorie placée en bas à gauche pour ne pas masquer le logo */}
          {categorie?.nom && (
            <span className="absolute bottom-3 left-3 z-10 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur">
              {categorie.nom}
            </span>
          )}

          {/* Bouton de fiche technique : mobile toujours visible, ordinateur au survol */}
          <button
            type="button"
            onClick={() => setDetailsOuverts(true)}
            aria-label={`Voir la fiche technique de ${produit.name}`}
            title="Voir la fiche technique"
            className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-800 shadow-lg transition-all duration-300 hover:bg-emerald-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700 md:h-auto md:w-auto md:gap-2 md:px-4 md:py-2.5 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            <Info size={19} />
            <span className="hidden text-sm font-semibold md:inline">
              Voir la fiche technique
            </span>
          </button>

          {/* Aperçu au survol sur ordinateur */}
          <div className="pointer-events-none absolute inset-0 z-[5] hidden flex-col justify-end bg-gradient-to-t from-emerald-950/95 via-emerald-950/65 to-transparent p-5 text-white opacity-0 transition-opacity duration-300 md:flex md:group-hover:opacity-100">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-100">
              Fiche technique
            </p>
            <h3 className="line-clamp-2 text-lg font-bold">
              {produit.name}
            </h3>
            <span className="mt-3 text-xs font-semibold text-white">
              Ouvrez la fiche pour consulter les détails complets
            </span>
          </div>
        </div>

        {/* Informations principales */}
        <div className="flex flex-1 flex-col p-5">
          {sousCategorie?.nom && (
            <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {sousCategorie.nom}
            </span>
          )}

          <h3 className="text-lg font-bold leading-snug text-emerald-950">
            {produit.name}
          </h3>

          <div className="mt-5 flex items-center justify-between gap-1 border-t border-emerald-100 pt-4">
            <div>
              <span className="text-base font-bold text-emerald-800">
                {prix}
              </span>
            </div>

            <span
              className={
                produit.stock
                  ? 'rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700'
                  : 'rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600'
              }
            >
              {produit.stock ? 'En stock' : 'Sur commande'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onAjouterPanier?.(produit)}
            disabled={!produit.stock}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <ShoppingCart size={18} strokeWidth={2} />
            {produit.stock ? 'Ajouter au panier' : 'Indisponible'}
          </button>
        </div>
      </article>

      {/* Fiche technique */}
      {detailsOuverts && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setDetailsOuverts(false)}
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`produit-titre-${produit.id ?? 'fiche'}`}
            className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* En-tête */}
            <header className="relative flex shrink-0 items-center justify-between gap-4 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-700 px-5 py-4 text-white sm:px-7 sm:py-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                  <PackageCheck size={22} />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200">
                    Catalogue PLANETECH · Fiche produit
                  </p>
                  <h2
                    id={`produit-titre-${produit.id ?? 'fiche'}`}
                    className="mt-1 truncate text-lg font-bold sm:text-xl"
                  >
                    {produit.name}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDetailsOuverts(false)}
                aria-label="Fermer la fiche technique"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <X size={20} />
              </button>
            </header>

            {/* Corps : produit à gauche, détails à droite */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Colonne gauche : visuel et identité du produit */}
                <div className="border-b border-emerald-100 bg-gradient-to-b from-emerald-50 to-white p-5 sm:p-7 lg:border-b-0 lg:border-r">
                  <div className="relative flex min-h-[230px] items-center justify-center overflow-hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:min-h-[320px]">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={produit.name || 'Photo du produit'}
                        className="max-h-[360px] w-full object-contain"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                          const fallback =
                            event.currentTarget.parentElement?.querySelector(
                              '[data-modal-photo-fallback]'
                            );
                          fallback?.classList.remove('hidden');
                        }}
                      />
                    ) : null}

                    <div
                      data-modal-photo-fallback
                      className={`${
                        imageUrl ? 'hidden' : 'flex'
                      } absolute inset-0 items-center justify-center text-sm text-slate-500`}
                    >
                      Photo non disponible
                    </div>

                    {/* Logo PLANETECH sur l'image de la fiche technique */}
                    <LogoPlanetech />
                  </div>

                  <div className="mt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                      Produit sélectionné
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold leading-tight text-emerald-950 sm:text-2xl">
                      {produit.name}
                    </h3>
                  </div>

                  {/* Prix et disponibilité */}
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Prix indicatif
                      </p>
                      <p className="mt-1 text-xl font-extrabold text-emerald-800">
                        {prix}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Disponibilité
                      </p>
                      <span
                        className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                          produit.stock
                            ? 'bg-green-50 text-green-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            produit.stock ? 'bg-green-500' : 'bg-slate-400'
                          }`}
                        />
                        {produit.stock ? 'En stock' : 'Sur commande'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Colonne droite : fiche technique */}
                <div className="p-5 sm:p-7">
                  <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                      <Info size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                        Informations détaillées
                      </p>
                      <h3 className="mt-1 text-lg font-extrabold text-slate-900 sm:text-xl">
                        Description technique
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        Retrouvez ci-dessous la description complète du produit.
                      </p>
                    </div>
                  </div>

                  {/* Catégorie et sous-catégorie */}
                  <div className="mb-5 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      Catégorisation du produit
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {categorie?.nom ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-800 px-3 py-2 text-xs font-semibold text-white">
                          <Layers3 size={14} />
                          {categorie.nom}
                        </span>
                      ) : null}

                      {sousCategorie?.nom ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                          <Tag size={14} />
                          {sousCategorie.nom}
                        </span>
                      ) : null}

                      {!categorie?.nom && !sousCategorie?.nom ? (
                        <span className="text-xs text-slate-500">
                          Catégorie non renseignée
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Description complète */}
                  <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-5 shadow-sm sm:p-6">
                    <div
                      className="absolute bottom-0 left-0 top-0 w-1 bg-emerald-600"
                      aria-hidden="true"
                    />

                    <div className="flex items-start gap-3 pl-2">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                        <Info size={18} />
                      </div>

                      <p className="min-w-0 whitespace-pre-line break-words text-sm leading-7 text-slate-700">
                        {descriptionAffichee}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold text-slate-800">
                      Besoin d’informations complémentaires ?
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      Notre équipe peut vous accompagner pour confirmer les
                      informations, la disponibilité et le prix du matériel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pied du modal */}
            <footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-emerald-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-4">
              <button
                type="button"
                onClick={() => setDetailsOuverts(false)}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Fermer la fiche
              </button>

              <button
                type="button"
                onClick={ajouterDepuisModal}
                disabled={!produit.stock}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <ShoppingCart size={18} />
                {produit.stock ? 'Ajouter au panier' : 'Indisponible'}
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}