import { api, USE_MOCK_API } from '@/services/api';

/**
 * Fabrique un service CRUD complet pour une ressource de l'administration.
 *
 * En mode mock, les données vivent dans un tableau en mémoire : le dashboard
 * est entièrement utilisable sans backend (utile pour la recette).
 * En mode réel, les appels partent vers l'API Laravel :
 *
 *   GET    /api/admin/{endpoint}
 *   POST   /api/admin/{endpoint}
 *   PUT    /api/admin/{endpoint}/{id}
 *   DELETE /api/admin/{endpoint}/{id}
 *
 * @param {string} endpoint  segment d'URL, ex. 'produits'
 * @param {Array}  donneesInitiales  jeu de démo utilisé en mode mock
 */
export function creerRessourceService(endpoint, donneesInitiales = []) {
  // Copie locale : on ne modifie jamais le tableau importé
  let memoire = donneesInitiales.map((item) => ({ ...item }));
  let prochainId = Math.max(0, ...memoire.map((i) => i.id ?? 0)) + 1;

  const attendre = (ms = 250) => new Promise((r) => setTimeout(r, ms));

  return {
    async lister(params = {}) {
      if (USE_MOCK_API) {
        await attendre();
        return memoire.map((item) => ({ ...item }));
      }
      const { data } = await api.get(`/admin/${endpoint}`, { params });
      return data?.data ?? data;
    },

    async creer(payload) {
      if (USE_MOCK_API) {
        await attendre();
        const cree = { ...payload, id: prochainId++ };
        memoire = [cree, ...memoire];
        return { ...cree };
      }
      const { data } = await api.post(`/admin/${endpoint}`, payload);
      return data?.data ?? data;
    },

    async modifier(id, payload) {
      if (USE_MOCK_API) {
        await attendre();
        memoire = memoire.map((item) => (item.id === id ? { ...item, ...payload } : item));
        return memoire.find((item) => item.id === id);
      }
      const { data } = await api.put(`/admin/${endpoint}/${id}`, payload);
      return data?.data ?? data;
    },

    async supprimer(id) {
      if (USE_MOCK_API) {
        await attendre();
        memoire = memoire.filter((item) => item.id !== id);
        return true;
      }
      await api.delete(`/admin/${endpoint}/${id}`);
      return true;
    },
  };
}

/**
 * Variante multipart, pour les ressources qui acceptent un fichier image.
 * Laravel lit un PUT multipart via le champ _method=PUT.
 */
export function versFormData(payload, { methode } = {}) {
  const form = new FormData();
  Object.entries(payload).forEach(([cle, valeur]) => {
    if (valeur === null || valeur === undefined) return;
    form.append(cle, valeur instanceof File ? valeur : String(valeur));
  });
  if (methode) form.append('_method', methode);
  return form;
}
