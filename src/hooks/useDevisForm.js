import { useState } from 'react';
import { envoyerDemandeDevis } from '@/services/devisService';
import { parseApiError } from '@/services/api';
import { validerDevis } from '@/utils/validation';

const VALEURS_INITIALES = {
  type_client: 'societe',
  raison_sociale: '',
  nom: '',
  email: '',
  indicatif: '+229',
  telephone: '',
  domaine: 'informatique',
  besoins: '',
};

/**
 * Gère l'état, la validation et l'envoi du formulaire de devis.
 * Le composant d'affichage reste ainsi simple et testable.
 */
export function useDevisForm() {
  const [valeurs, setValeurs] = useState(VALEURS_INITIALES);
  const [erreurs, setErreurs] = useState({});
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [succes, setSucces] = useState(null); // { reference }
  const [erreurGlobale, setErreurGlobale] = useState('');

  const modifier = (champ, valeur) => {
    setValeurs((v) => ({ ...v, [champ]: valeur }));
    // On efface l'erreur du champ dès que l'utilisateur le corrige
    setErreurs((e) => (e[champ] ? { ...e, [champ]: undefined } : e));
  };

  const reinitialiser = () => {
    setValeurs(VALEURS_INITIALES);
    setErreurs({});
    setSucces(null);
    setErreurGlobale('');
  };

  const soumettre = async (event) => {
    event.preventDefault();
    setErreurGlobale('');

    const erreursLocales = validerDevis(valeurs);
    if (Object.keys(erreursLocales).length > 0) {
      setErreurs(erreursLocales);
      return;
    }

    setEnvoiEnCours(true);
    try { 
      const reponse = await envoyerDemandeDevis({
        ...valeurs,
        raison_sociale: valeurs.type_client === 'societe' ? valeurs.raison_sociale : null,
      });
      setSucces({ reference: reponse?.reference ?? null });
      setValeurs(VALEURS_INITIALES);
    } catch (error) {
      const { message, champs } = parseApiError(error);
      setErreurs(champs);
      setErreurGlobale(message);
    } finally {
      setEnvoiEnCours(false);
    }
  };

  return { valeurs, erreurs, envoiEnCours, succes, erreurGlobale, modifier, soumettre, reinitialiser };
}
