/** Libellés partagés par plusieurs écrans du dashboard. */

export const STATUTS_DEVIS = [
  { valeur: 'nouveau', libelle: 'Nouveau', classes: 'bg-amber-50 text-amber-700 border-amber-200' },
  { valeur: 'en_cours', libelle: 'En cours', classes: 'bg-sky-50 text-sky-700 border-sky-200' },
  { valeur: 'traite', libelle: 'Traité', classes: 'bg-forest-50 text-forest-700 border-forest-200' },
];

export const statutDevis = (valeur) =>
  STATUTS_DEVIS.find((s) => s.valeur === valeur) ?? STATUTS_DEVIS[0];

export const DOMAINES = [
  { valeur: 'btp', libelle: 'BTP' },
  { valeur: 'informatique', libelle: 'Informatique' },
  { valeur: 'electricite', libelle: 'Électricité' },
  { valeur: 'telecom-reseau', libelle: 'Télécom et réseau' },
  { valeur: 'ftth', libelle: 'FTTH / FTTLA' },
  { valeur: 'autre', libelle: 'Autre besoin' },
];

export const libelleDomaine = (valeur) =>
  DOMAINES.find((d) => d.valeur === valeur)?.libelle ?? valeur;

export const CATEGORIES_PRODUIT = [
  { valeur: 'informatique', libelle: 'Matériel informatique' },
  { valeur: 'reseau', libelle: 'Solutions réseau' },
  { valeur: 'electrique', libelle: 'Matériel électrique' },
  { valeur: 'outillage', libelle: 'Outillage' },
];

export const libelleCategorie = (valeur) =>
  CATEGORIES_PRODUIT.find((c) => c.valeur === valeur)?.libelle ?? valeur;

/** Formatage FCFA, sans décimales. */
export const formaterPrix = (montant) =>
  montant == null ? 'Sur devis' : `${Number(montant).toLocaleString('fr-FR')} FCFA`;

/** Date lisible : 18 sept. 2026 */
export const formaterDate = (iso) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

export const formaterDateHeure = (iso) =>
  new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
