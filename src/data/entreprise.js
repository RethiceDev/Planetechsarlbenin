/**
 * Source unique des informations de l'entreprise.
 * Modifiez ce fichier plutôt que de réécrire les coordonnées dans les composants.
 */
export const ENTREPRISE = {
  nom: 'PLANETECH SARL',
  baseline: 'Technologies, télécommunications et services',
  ville: 'Cotonou, Bénin',
  adresse: '04 BP 0625 Cotonou, Houéyiho',
  telephones: ['+229 01 64 54 99 59', '+229 01 97 89 29 82', '+229 01 64 54 99 59'],
  email: 'planetechsarlbenin@gmail.com',
  horaires: 'Lundi – Samedi · 8h00 – 18h00',
};

/** Numéros nettoyés pour les liens tel: */
export const telHref = (numero) => `tel:${numero.replace(/\s/g, '')}`;
