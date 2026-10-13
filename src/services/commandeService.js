import { api } from './api';

/**
 * Envoie une commande au backend Laravel.
 */
export async function envoyerCommande(payload) {
  const { data } = await api.post('/commandes', payload);

  return data;
}
