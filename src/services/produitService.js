import { api, USE_MOCK_API } from './api';
import { PRODUITS } from '@/data/produits';

export const PRODUITS_PAR_PAGE = 24;

/**
 * Normalise une réponse paginée Laravel en un objet simple :
 * {
 *   produits, page, derniere, total, parPage, liens
 * }
 */
function normaliserPagination(payload, pageDemandee, parPageDemande) {
  // Cas où l'API renverrait un simple tableau (sans pagination)
  if (Array.isArray(payload)) {
    return {
      produits: payload,
      page: 1,
      derniere: 1,
      total: payload.length,
      parPage: payload.length,
      liens: [],
    };
  }

  return {
    produits: payload?.data ?? [],
    page: payload?.current_page ?? pageDemandee,
    derniere: payload?.last_page ?? 1,
    total: payload?.total ?? (payload?.data?.length ?? 0),
    parPage: payload?.per_page ?? parPageDemande,
    liens: payload?.links ?? [],
  };
}

/**
 * Liste paginée et filtrée des produits.
 *
 * GET /api/produits?category_id=X&sous_categorie_id=Y&search=...&page=N
 *
 * @param {Object}  options
 * @param {number}  [options.page=1]
 * @param {number}  [options.parPage=24]
 * @param {string|number|null} [options.categorieId]
 * @param {string|number|null} [options.sousCategorieId]
 * @param {string}  [options.recherche]
 * @param {AbortSignal} [options.signal]
 */
export async function listerProduits({
  page = 1,
  parPage = PRODUITS_PAR_PAGE,
  categorieId = null,
  sousCategorieId = null,
  recherche = '',
  signal,
} = {}) {
  // ---------------- MODE MOCK ----------------
  if (USE_MOCK_API) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const terme = recherche.trim().toLowerCase();

    const filtres = PRODUITS.filter((produit) => {
      const sousCat = produit.sous_categorie;
      const cat = sousCat?.category;

      if (categorieId && String(cat?.id) !== String(categorieId)) {
        return false;
      }

      if (
        sousCategorieId &&
        String(sousCat?.id ?? produit.sous_categorie_id) !==
          String(sousCategorieId)
      ) {
        return false;
      }

      if (!terme) {
        return true;
      }

      return [produit.name, produit.description, sousCat?.nom, cat?.nom]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(terme);
    });

    const derniere = Math.max(1, Math.ceil(filtres.length / parPage));
    const pageCourante = Math.min(Math.max(1, page), derniere);
    const debut = (pageCourante - 1) * parPage;

    return {
      produits: filtres.slice(debut, debut + parPage),
      page: pageCourante,
      derniere,
      total: filtres.length,
      parPage,
      liens: [],
    };
  }

  // ---------------- MODE API ----------------
  const params = { page, per_page: parPage };

  if (categorieId) params.category_id = categorieId;
  if (sousCategorieId) params.sous_categorie_id = sousCategorieId;
  if (recherche && recherche.trim()) params.search = recherche.trim();

  const { data } = await api.get('/produits', { params, signal });

  return normaliserPagination(data, page, parPage);
}

/**
 * Toutes les catégories avec leurs sous-catégories (un seul appel).
 *
 * GET /api/categories
 *
 * Retour : [{ id, nom, sous_categories: [{ id, nom, category_id }] }]
 */
export async function listerCategories({ signal } = {}) {
  if (USE_MOCK_API) {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const map = new Map();

    PRODUITS.forEach((produit) => {
      const sousCat = produit.sous_categorie;
      const cat = sousCat?.category;

      if (!cat?.id) return;

      if (!map.has(cat.id)) {
        map.set(cat.id, { id: cat.id, nom: cat.nom, sous_categories: [] });
      }

      const courante = map.get(cat.id);

      if (
        sousCat?.id &&
        !courante.sous_categories.some((s) => s.id === sousCat.id)
      ) {
        courante.sous_categories.push({
          id: sousCat.id,
          nom: sousCat.nom,
          category_id: cat.id,
        });
      }
    });

    return Array.from(map.values());
  }

  const { data } = await api.get('/categories', { signal });

  const liste = Array.isArray(data) ? data : data?.data ?? [];

  return liste.map((cat) => ({
    ...cat,
    sous_categories: cat.sous_categories ?? [],
  }));
}

/**
 * Détail d'un produit.
 *
 * GET /api/produits/{id}
 */
export async function obtenirProduit(id) {
  if (USE_MOCK_API) {
    return (
      PRODUITS.find((produit) => produit.id === Number(id)) || null
    );
  }

  const { data } = await api.get(`/produits/${id}`);

  return data?.data ?? data;
}
