import { api, USE_MOCK_API } from './api';
import { PRODUITS } from '@/data/produits';

/**
 * Envoi d'une demande de devis.
 * Endpoint Laravel attendu : POST /api/devis
 *
 * Charge utile :
 * {
 *   type_client: 'societe' | 'particulier',
 *   raison_sociale?: string,   // requis si type_client = societe
 *   nom: string,
 *   email: string,
 *   indicatif: string,         // '+229'
 *   telephone: string,
 *   domaine: string,           // slug d'expertise
 *   besoins: string,
 * }
 */
export async function envoyerDemandeDevis(payload) {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 700));
    return { reference: `DEV-${Date.now().toString().slice(-6)}` };
  }

  const { data } = await api.post('/devis', payload);
  return data;
}

/** Contact simple (hors devis) : POST /api/contact */
export async function envoyerMessageContact(payload) {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 500));
    return { ok: true };
  }
  const { data } = await api.post('/contact', payload);
  return data;
}

/** Réexport utile pour les tests manuels du catalogue. */
export const CATALOGUE_DEMO = PRODUITS;
