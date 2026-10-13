/** Règles de validation côté client, alignées sur celles du FormRequest Laravel. */

export const estEmailValide = (valeur) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeur.trim());

/** Au Bénin : 8 à 10 chiffres après l'indicatif. */
export const estTelephoneValide = (valeur) => /^[0-9]{8,10}$/.test(valeur.replace(/\s/g, ''));

/**
 * Valide le formulaire de devis et renvoie un objet d'erreurs par champ.
 * Un objet vide signifie « formulaire valide ».
 */
export function validerDevis(valeurs) {
  const erreurs = {};

  if (valeurs.type_client === 'societe' && !valeurs.raison_sociale.trim()) {
    erreurs.raison_sociale = 'Indiquez le nom de la société.';
  }
  if (!valeurs.nom.trim()) {
    erreurs.nom = valeurs.type_client === 'societe' ? 'Indiquez le nom du contact.' : 'Indiquez vos nom et prénom.';
  }
  if (!valeurs.email.trim()) {
    erreurs.email = 'Indiquez une adresse email.';
  } else if (!estEmailValide(valeurs.email)) {
    erreurs.email = "Cette adresse email n'est pas valide.";
  }
  if (!valeurs.telephone.trim()) {
    erreurs.telephone = 'Indiquez un numéro de téléphone.';
  } else if (!estTelephoneValide(valeurs.telephone)) {
    erreurs.telephone = 'Le numéro doit contenir 8 à 10 chiffres.';
  }
  if (valeurs.besoins.trim().length < 20) {
    erreurs.besoins = 'Décrivez vos besoins en 20 caractères au minimum.';
  }

  return erreurs;
}
