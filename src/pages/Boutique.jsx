import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
} from 'lucide-react';

import Section from '@/components/ui/Section';
import CarteProduit from '@/components/boutique/CarteProduit';
import FiltresBoutique from '@/components/boutique/FiltresBoutique';
import FormulaireCommande from '@/components/boutique/FormulaireCommande';
import Pagination from '@/components/boutique/Pagination';
import AppelDevis from '@/components/home/AppelDevis';

import {
  listerProduits,
  listerCategories,
  PRODUITS_PAR_PAGE,
} from '@/services/produitService';

/**
 * Marques affichées sous le catalogue.
 */
const MARQUES = [
  { nom: 'Schneider Electric', slug: 'schneiderelectric', fallback: 'SE' },
  { nom: 'Socomec', slug: 'socomec', fallback: 'SC' },
  { nom: 'Legrand', slug: 'legrand', fallback: 'LG' },
  { nom: 'HP', slug: 'hp', fallback: 'HP' },
  { nom: 'Dell', slug: 'dell', fallback: 'DELL' },
  { nom: 'ASUS', slug: 'asus', fallback: 'ASUS' },
  { nom: 'Canon', slug: 'canon', fallback: 'CANON' },
  { nom: 'Lenovo', slug: 'lenovo', fallback: 'LENOVO' },
  { nom: 'LG', slug: 'lg', fallback: 'LG' },
  { nom: 'ROCH', slug: null, fallback: 'ROCH' },
  { nom: 'Hisense', slug: 'hisense', fallback: 'HISENSE' },
  { nom: 'Midea', slug: 'midea', fallback: 'MIDEA' },
  { nom: 'TCL', slug: 'tcl', fallback: 'TCL' },
  { nom: 'AXIS', slug: 'axiscommunications', fallback: 'AXIS' },
  { nom: 'Siemens', slug: 'siemens', fallback: 'SIEMENS' },
  { nom: 'ZETA', slug: null, fallback: 'ZETA' },
];

/**
 * Une requête annulée (changement de filtre rapide) n'est pas une erreur.
 */
function estAnnulation(error) {
  return (
    error?.code === 'ERR_CANCELED' ||
    error?.name === 'CanceledError' ||
    error?.name === 'AbortError'
  );
}

export default function Boutique() {
  // =========================================================
  // DONNÉES
  // =========================================================

  // Produits de la page courante uniquement
  const [produits, setProduits] = useState([]);

  // Les 7 catégories + sous-catégories (chargées une seule fois)
  const [categories, setCategories] = useState([]);

  // Infos de pagination renvoyées par Laravel
  const [pagination, setPagination] = useState({
    derniere: 1,
    total: 0,
    parPage: PRODUITS_PAR_PAGE,
  });

  // =========================================================
  // FILTRES + PAGE COURANTE
  // =========================================================

  const [categorie, setCategorie] = useState('toutes');
  const [sousCategorie, setSousCategorie] = useState('toutes');
  const [recherche, setRecherche] = useState('');
  const [rechercheDebounce, setRechercheDebounce] = useState('');
  const [page, setPage] = useState(1);

  // Changer de catégorie réinitialise la sous-catégorie ET la page.
  const selectionnerCategorie = (id) => {
    setCategorie(String(id));
    setSousCategorie('toutes');
    setPage(1);
  };

  // Changer de sous-catégorie réinitialise la page.
  const selectionnerSousCategorie = (id) => {
    setSousCategorie(String(id));
    setPage(1);
  };

  // Changer la recherche réinitialise la page.
  const changerRecherche = (valeur) => {
    setRecherche(valeur);
    setPage(1);
  };

  // Changer de page + remonter en haut du catalogue.
  const changerPage = (nouvellePage) => {
    setPage(nouvellePage);

    catalogueRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const catalogueRef = useRef(null);

  // =========================================================
  // ÉTATS DE CHARGEMENT
  // =========================================================

  const [chargementCategories, setChargementCategories] = useState(true);
  const [chargementProduits, setChargementProduits] = useState(true);
  const [erreur, setErreur] = useState('');

  // =========================================================
  // PANIER
  // =========================================================

  const [panier, setPanier] = useState([]);
  const [panierOuvert, setPanierOuvert] = useState(false);

  // =========================================================
  // FORMULAIRE DE COMMANDE
  // =========================================================

  const [formulaireCommandeOuvert, setFormulaireCommandeOuvert] =
    useState(false);

  // =========================================================
  // CHARGEMENT GLOBAL DES CATÉGORIES (une seule fois)
  // =========================================================

  useEffect(() => {
    const controller = new AbortController();
    let annule = false;

    const chargerCategories = async () => {
      setChargementCategories(true);

      try {
        const liste = await listerCategories({ signal: controller.signal });

        if (annule) {
          return;
        }

        setCategories(
          [...liste]
            .map((cat) => ({
              ...cat,
              sous_categories: [...(cat.sous_categories ?? [])].sort((a, b) =>
                (a.nom || '').localeCompare(b.nom || '', 'fr')
              ),
            }))
            .sort((a, b) => (a.nom || '').localeCompare(b.nom || '', 'fr'))
        );
      } catch (error) {
        if (annule || estAnnulation(error)) {
          return;
        }

        console.error('Erreur chargement catégories :', error);
        setErreur(
          "Les catégories n'ont pas pu être chargées. Réessayez dans un instant."
        );
      } finally {
        if (!annule) {
          setChargementCategories(false);
        }
      }
    };

    chargerCategories();

    return () => {
      annule = true;
      controller.abort();
    };
  }, []);

  // =========================================================
  // DEBOUNCE DE LA RECHERCHE (évite un appel API par frappe)
  // =========================================================

  useEffect(() => {
    const minuteur = setTimeout(() => {
      setRechercheDebounce(recherche.trim());
    }, 400);

    return () => clearTimeout(minuteur);
  }, [recherche]);

  // =========================================================
  // CHARGEMENT DES PRODUITS (filtrés + paginés par Laravel)
  // Se relance à chaque changement de filtre ou de page.
  // =========================================================

  useEffect(() => {
    const controller = new AbortController();
    let annule = false;

    const chargerProduits = async () => {
      setChargementProduits(true);
      setErreur('');

      try {
        const resultat = await listerProduits({
          page,
          parPage: PRODUITS_PAR_PAGE,
          categorieId: categorie === 'toutes' ? null : categorie,
          sousCategorieId: sousCategorie === 'toutes' ? null : sousCategorie,
          recherche: rechercheDebounce,
          signal: controller.signal,
        });

        if (annule) {
          return;
        }

        setProduits(resultat.produits);
        setPagination({
          derniere: resultat.derniere,
          total: resultat.total,
          parPage: resultat.parPage,
        });
      } catch (error) {
        if (annule || estAnnulation(error)) {
          return;
        }

        console.error('Erreur chargement produits :', error);
        setErreur(
          "Le catalogue n'a pas pu être chargé. Réessayez dans un instant."
        );
      } finally {
        if (!annule) {
          setChargementProduits(false);
        }
      }
    };

    chargerProduits();

    return () => {
      annule = true;
      controller.abort();
    };
  }, [page, categorie, sousCategorie, rechercheDebounce]);

  // =========================================================
  // SOUS-CATÉGORIES DE LA CATÉGORIE SÉLECTIONNÉE
  // =========================================================

  const categorieActive = useMemo(
    () =>
      categories.find((cat) => String(cat.id) === String(categorie)) ?? null,
    [categories, categorie]
  );

  const sousCategoriesActives = useMemo(
    () => categorieActive?.sous_categories ?? [],
    [categorieActive]
  );

  // =========================================================
  // ORGANISATION DE LA PAGE COURANTE
  //
  // DOMAINE → SOUS-CATÉGORIE → PRODUITS
  //
  // Le filtrage est fait par Laravel : on ne fait ici que
  // regrouper les produits reçus pour l'affichage.
  // =========================================================

  const catalogueOrganise = useMemo(() => {
    const groupes = new Map();

    produits.forEach((produit) => {
      const cat = produit.sous_categorie?.category;
      const sousCat = produit.sous_categorie;

      if (!cat?.id) {
        return;
      }

      const categorieId = String(cat.id);

      if (!groupes.has(categorieId)) {
        groupes.set(categorieId, {
          id: cat.id,
          nom: cat.nom,
          sousCategories: new Map(),
        });
      }

      const groupeCategorie = groupes.get(categorieId);

      if (sousCat?.id) {
        const sousCategorieId = String(sousCat.id);

        if (!groupeCategorie.sousCategories.has(sousCategorieId)) {
          groupeCategorie.sousCategories.set(sousCategorieId, {
            id: sousCat.id,
            nom: sousCat.nom,
            produits: [],
          });
        }

        groupeCategorie.sousCategories
          .get(sousCategorieId)
          .produits.push(produit);
      }
    });

    return Array.from(groupes.values()).map((groupe) => ({
      ...groupe,
      sousCategories: Array.from(groupe.sousCategories.values()),
    }));
  }, [produits]);

  // =========================================================
  // PANIER : AJOUTER
  // =========================================================

  const ajouterAuPanier = (produit) => {
    setPanier((panierActuel) => {
      const produitExiste = panierActuel.find((item) => item.id === produit.id);

      if (produitExiste) {
        return panierActuel.map((item) =>
          item.id === produit.id
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      }

      return [...panierActuel, { ...produit, quantite: 1 }];
    });

    setPanierOuvert(true);
  };

  // =========================================================
  // PANIER : AUGMENTER
  // =========================================================

  const augmenterQuantite = (id) => {
    setPanier((panierActuel) =>
      panierActuel.map((item) =>
        item.id === id ? { ...item, quantite: item.quantite + 1 } : item
      )
    );
  };

  // =========================================================
  // PANIER : DIMINUER
  // =========================================================

  const diminuerQuantite = (id) => {
    setPanier((panierActuel) =>
      panierActuel
        .map((item) =>
          item.id === id ? { ...item, quantite: item.quantite - 1 } : item
        )
        .filter((item) => item.quantite > 0)
    );
  };

  // =========================================================
  // PANIER : SUPPRIMER
  // =========================================================

  const supprimerDuPanier = (id) => {
    setPanier((panierActuel) => panierActuel.filter((item) => item.id !== id));
  };

  // =========================================================
  // PANIER : VIDER
  // =========================================================

  const viderPanier = () => {
    setPanier([]);
  };

  // =========================================================
  // NOMBRE D'ARTICLES
  // =========================================================

  const nombreArticlesPanier = useMemo(() => {
    return panier.reduce((total, item) => total + item.quantite, 0);
  }, [panier]);

  // =========================================================
  // AFFICHAGE
  // =========================================================

  return (
    <>
      {/* =====================================================
          BOUTON PANIER FLOTTANT
      ====================================================== */}

      <button
        type="button"
        onClick={() => setPanierOuvert(true)}
        className="fixed bottom-6 right-24 z-40 flex items-center gap-3 rounded-full bg-forest-700 px-5 py-3.5 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:bg-signal hover:shadow-2xl"
        aria-label="Ouvrir le panier"
      >
        <div className="relative">
          <ShoppingCart size={21} />

          {nombreArticlesPanier > 0 && (
            <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-signal px-1 text-[10px] font-bold text-white">
              {nombreArticlesPanier}
            </span>
          )}
        </div>

        <span className="hidden sm:inline">Panier</span>
      </button>

      {/* =====================================================
          FOND PANIER
      ====================================================== */}

      {panierOuvert && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setPanierOuvert(false)}
        />
      )}

      {/* =====================================================
          PANIER
      ====================================================== */}

      <aside
        className={`fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          panierOuvert ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* EN-TÊTE */}

        <div className="flex items-center justify-between border-b border-forest-100 px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-forest-800">Mon panier</h2>

            <p className="mt-1 text-sm text-slate-muted">
              {nombreArticlesPanier === 0
                ? 'Votre panier est vide'
                : `${nombreArticlesPanier} article${
                    nombreArticlesPanier > 1 ? 's' : ''
                  }`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPanierOuvert(false)}
            className="rounded-full p-2 text-slate-muted transition hover:bg-forest-50 hover:text-forest-700"
            aria-label="Fermer le panier"
          >
            <X size={22} />
          </button>
        </div>

        {/* CONTENU */}

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {panier.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-forest-50">
                <ShoppingCart size={35} className="text-forest-400" />
              </div>

              <h3 className="mt-5 font-bold text-forest-800">
                Votre panier est vide
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-muted">
                Ajoutez des produits depuis la boutique pour commencer votre
                commande.
              </p>

              <button
                type="button"
                onClick={() => setPanierOuvert(false)}
                className="mt-6 rounded-full bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-signal"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {panier.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-forest-100 bg-white p-4"
                >
                  <div className="flex gap-3">
                    {/* IMAGE */}

                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-forest-50">
                      {item.photo ? (
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/storage/${item.photo}`}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-slate-muted">
                          Pas d'image
                        </div>
                      )}
                    </div>

                    {/* INFORMATIONS */}

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-bold text-forest-800">
                        {item.name}
                      </h3>

                      {/* QUANTITÉ */}

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-forest-100">
                          <button
                            type="button"
                            onClick={() => diminuerQuantite(item.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-l-full text-forest-700 transition hover:bg-forest-50"
                            aria-label={`Diminuer la quantité de ${item.name}`}
                          >
                            <Minus size={14} />
                          </button>

                          <span className="flex h-8 min-w-8 items-center justify-center border-x border-forest-100 px-2 text-sm font-bold text-forest-800">
                            {item.quantite}
                          </span>

                          <button
                            type="button"
                            onClick={() => augmenterQuantite(item.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-r-full text-forest-700 transition hover:bg-forest-50"
                            aria-label={`Augmenter la quantité de ${item.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => supprimerDuPanier(item.id)}
                          className="rounded-full p-2 text-red-500 transition hover:bg-red-50"
                          aria-label={`Supprimer ${item.name} du panier`}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PIED DU PANIER */}

        {panier.length > 0 && (
          <div className="border-t border-forest-100 bg-white px-5 py-5">
            <p className="mb-3 text-center text-xs leading-relaxed text-slate-muted">
              Les prix vous seront communiqués par notre équipe après
              vérification de la disponibilité.
            </p>

            <button
              type="button"
              onClick={() => {
                setPanierOuvert(false);
                setFormulaireCommandeOuvert(true);
              }}
              className="w-full rounded-full bg-forest-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-signal"
            >
              Envoyer ma commande
            </button>

            <button
              type="button"
              onClick={viderPanier}
              className="mt-3 w-full rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
            >
              Vider le panier
            </button>
          </div>
        )}
      </aside>

      {/* =====================================================
          FORMULAIRE COMMANDE
      ====================================================== */}

      <FormulaireCommande
        ouvert={formulaireCommandeOuvert}
        panier={panier}
        onFermer={() => setFormulaireCommandeOuvert(false)}
        onSucces={() => {
          setPanier([]);
        }}
      />

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <Section fond="clair" className="py-12 md:py-16">
        <p className="text-sm text-slate-muted">Boutique</p>

        <h1 className="mt-3 max-w-prose font-display text-3xl font-bold leading-tight md:text-[2.6rem]">
          Matériels électriques, informatiques, outillage et solutions réseau
        </h1>

        <p className="mt-4 max-w-prose leading-relaxed text-slate-muted">
          Les articles sont disponibles à la vente seule ou avec installation
          par nos équipes. Sélectionnez vos articles et envoyez votre commande :
          nous vous communiquons la disponibilité et les prix par email.
        </p>
      </Section>

      {/* =====================================================
          BOUTIQUE
      ====================================================== */}

      <Section>
        {/* MENU HORIZONTAL (les 7 catégories, toujours complètes) */}

        <div className="mb-8">
          <FiltresBoutique
            categories={categories}
            categorie={categorie}
            onCategorie={selectionnerCategorie}
            sousCategorie={sousCategorie}
            onSousCategorie={selectionnerSousCategorie}
            recherche={recherche}
            onRecherche={changerRecherche}
          />
        </div>

        {/* COLONNES */}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* MENU DES SOUS-CATÉGORIES DE LA CATÉGORIE CHOISIE */}

          <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-64">
            <div className="overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm">
              <div className="border-b border-forest-100 bg-forest-50 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-signal">
                  Boutique
                </p>

                <h2 className="mt-1 text-lg font-bold text-forest-800">
                  Sous-catégories
                </h2>

                <p className="mt-1 truncate text-xs text-slate-muted">
                  {categorieActive?.nom ?? 'Choisissez une catégorie en haut'}
                </p>
              </div>

              <div
                className="flex max-h-[calc(100vh-180px)] flex-col gap-2 overflow-y-auto p-3"
                style={{ scrollbarWidth: 'thin' }}
              >
                {categorie === 'toutes' ? (
                  <div className="rounded-xl bg-forest-50 px-4 py-4 text-xs leading-relaxed text-slate-muted">
                    Sélectionnez une catégorie dans la barre horizontale pour
                    afficher ses sous-catégories ici.
                  </div>
                ) : chargementCategories ? (
                  <div className="rounded-xl bg-gray-50 px-4 py-4 text-xs text-slate-muted">
                    Chargement des sous-catégories…
                  </div>
                ) : sousCategoriesActives.length > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => selectionnerSousCategorie('toutes')}
                      aria-pressed={sousCategorie === 'toutes'}
                      className={`group flex shrink-0 items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                        sousCategorie === 'toutes'
                          ? 'bg-signal text-white shadow-md'
                          : 'text-forest-700 hover:bg-forest-50 hover:text-signal'
                      }`}
                    >
                      <span>Toutes les sous-catégories</span>

                      <ChevronRight
                        size={17}
                        className={`transition-transform ${
                          sousCategorie === 'toutes'
                            ? 'translate-x-1'
                            : 'opacity-0 group-hover:translate-x-1 group-hover:opacity-100'
                        }`}
                      />
                    </button>

                    {sousCategoriesActives.map((sousCat) => (
                      <button
                        key={sousCat.id}
                        type="button"
                        onClick={() => selectionnerSousCategorie(sousCat.id)}
                        aria-pressed={sousCategorie === String(sousCat.id)}
                        className={`group flex shrink-0 items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                          sousCategorie === String(sousCat.id)
                            ? 'bg-signal text-white shadow-md'
                            : 'text-forest-700 hover:bg-forest-50 hover:text-signal'
                        }`}
                      >
                        <span className="min-w-0 truncate">{sousCat.nom}</span>

                        <ChevronRight
                          size={17}
                          className={`shrink-0 transition-transform ${
                            sousCategorie === String(sousCat.id)
                              ? 'translate-x-1'
                              : 'opacity-0 group-hover:translate-x-1 group-hover:opacity-100'
                          }`}
                        />
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="rounded-xl bg-gray-50 px-4 py-4 text-xs leading-relaxed text-slate-muted">
                    Aucune sous-catégorie n'est disponible pour cette
                    catégorie.
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* CONTENU PRODUITS */}

          <main ref={catalogueRef} className="min-w-0 flex-1 scroll-mt-24">
            {/* CHARGEMENT */}

            {chargementProduits && (
              <div className="rounded-2xl border border-forest-100 bg-white py-16 text-center">
                <p className="text-sm text-slate-muted">
                  Chargement du catalogue…
                </p>
              </div>
            )}

            {/* ERREUR */}

            {erreur && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {erreur}
              </p>
            )}

            {/* AUCUN PRODUIT */}

            {!chargementProduits && !erreur && produits.length === 0 && (
              <div className="rounded-2xl border border-dashed border-forest-200 p-10 text-center">
                <p className="font-semibold text-forest-700">
                  Aucun article ne correspond à cette recherche
                </p>

                <p className="mt-2 text-sm text-slate-muted">
                  Essayez un autre mot-clé, ou demandez-nous directement le
                  matériel recherché.
                </p>
              </div>
            )}

            {/* CATALOGUE (page courante) */}

            {!chargementProduits && !erreur && catalogueOrganise.length > 0 && (
              <>
                <div className="space-y-14">
                  {catalogueOrganise.map((groupeCategorie) => (
                    <section
                      key={groupeCategorie.id}
                      className="scroll-mt-24"
                    >
                      {/* TITRE DOMAINE */}

                      <div className="mb-8">
                        <div className="flex items-center gap-4">
                          <h2 className="font-display text-2xl font-bold text-forest-800 md:text-3xl">
                            {groupeCategorie.nom}
                          </h2>

                          <div className="h-px flex-1 bg-forest-100" />
                        </div>
                      </div>

                      {/* SOUS-CATÉGORIES */}

                      <div className="space-y-10">
                        {groupeCategorie.sousCategories.map((sousCat) => (
                          <div key={sousCat.id}>
                            {/* TITRE SOUS-CATÉGORIE */}

                            <div className="mb-5">
                              <h3 className="text-lg font-bold text-forest-700 md:text-xl">
                                {sousCat.nom}
                              </h3>

                              <div className="mt-2 h-0.5 w-16 rounded-full bg-signal" />
                            </div>

                            {/* PRODUITS */}

                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                              {sousCat.produits.map((produit) => (
                                <CarteProduit
                                  key={produit.id}
                                  produit={produit}
                                  onAjouterPanier={ajouterAuPanier}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                {/* PAGINATION */}

                <Pagination
                  page={page}
                  derniere={pagination.derniere}
                  total={pagination.total}
                  onChange={changerPage}
                  disabled={chargementProduits}
                />
              </>
            )}
          </main>
        </div>

        {/* =====================================================
            MARQUES
        ====================================================== */}

        {!chargementProduits && !erreur && (
          <div className="mt-16 overflow-hidden border-t border-forest-100 pt-10">
            <div className="mb-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal">
                Nos partenaires technologiques
              </p>

              <h2 className="mt-2 font-display text-2xl font-bold text-forest-800 md:text-3xl">
                Des marques reconnues
              </h2>

              <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-muted">
                Nous travaillons avec des marques reconnues dans les domaines
                électrique, informatique, audiovisuel et réseau.
              </p>
            </div>

            {/* SLIDER AUTOMATIQUE DES MARQUES */}

            <div
              className="relative w-full overflow-hidden"
              role="region"
              aria-label="Marques partenaires"
            >
              <div className="flex w-max gap-4 animate-marques">
                {[...MARQUES, ...MARQUES].map((marque, index) => (
                  <div
                    key={`${marque.nom}-${index}`}
                    className="flex h-28 w-32 shrink-0 flex-col items-center justify-center rounded-2xl border border-forest-100 bg-white px-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex h-14 w-full items-center justify-center">
                      {marque.slug ? (
                        <img
                          src={`https://cdn.simpleicons.org/${marque.slug}`}
                          alt={marque.nom}
                          className="max-h-10 w-auto max-w-[90px] object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';

                            const fallback =
                              e.currentTarget.parentElement?.querySelector(
                                '[data-marque-fallback]'
                              );

                            fallback?.classList.remove('hidden');
                          }}
                        />
                      ) : null}

                      <span
                        data-marque-fallback
                        className={`font-bold tracking-tight text-forest-700 ${
                          marque.slug ? 'hidden' : ''
                        }`}
                      >
                        {marque.fallback}
                      </span>
                    </div>

                    <span className="mt-2 max-w-full truncate text-center text-[11px] font-semibold text-slate-muted">
                      {marque.nom}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ANIMATION CSS */}

            <style>{`
              @keyframes defilementMarques {
                from {
                  transform: translateX(0);
                }

                to {
                  transform: translateX(-50%);
                }
              }

              .animate-marques {
                animation: defilementMarques 30s linear infinite;
                will-change: transform;
              }
            `}</style>
          </div>
        )}
      </Section>

      {/* =====================================================
          APPEL DEVIS
      ===================================================== */}

      <AppelDevis />
    </>
  );
}