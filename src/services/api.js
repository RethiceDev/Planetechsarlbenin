import axios from 'axios';

/**
 * Instance Axios unique pour tout le site.
 *
 * .env :
 * VITE_API_URL=http://127.0.0.1:8000/api
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },

  // À laisser à false tant que tu n'utilises pas Laravel Sanctum
  // en authentification SPA par cookie.
  withCredentials: false,

  timeout: 15000,
});

/**
 * Mode démo :
 * true  = données simulées
 * false = vraie API Laravel
 */
export const USE_MOCK_API =
  import.meta.env.VITE_USE_MOCK_API === 'true';

/**
 * Transforme une erreur Axios en objet exploitable
 * par l'interface.
 */
export function parseApiError(error) {
  const status = error?.response?.status;
  const data = error?.response?.data;

  if (status === 422 && data?.errors) {
    const champs = {};

    Object.entries(data.errors).forEach(([champ, messages]) => {
      champs[champ] = Array.isArray(messages)
        ? messages[0]
        : String(messages);
    });

    return {
      message:
        data.message ||
        'Certains champs sont à corriger.',
      champs,
    };
  }

  if (status === 429) {
    return {
      message:
        'Trop de tentatives. Réessayez dans quelques minutes.',
      champs: {},
    };
  }

  if (!error?.response) {
    return {
      message:
        'OPPS ! votre connexion est instable. ' +
        'Le traitement prend plus de temps que prévu. ' +
        'Votre demande peut avoir été enregistrée. ' +
        'Veuillez vérifier votre e-mail ou actualisé la page avant de réessayer.',
      champs: {},
    };
  }

  return {
    message:
      data?.message ||
      "L'envoi a échoué. Réessayez.",
    champs: {},
  };
}
