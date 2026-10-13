import { useCallback, useEffect, useState } from 'react';
import { parseApiError } from '@/services/api';

/**
 * Hook générique de gestion d'une ressource administrée.
 * Centralise chargement, création, modification, suppression et erreurs,
 * pour que les pages ne contiennent que de l'affichage.
 *
 * @param {object} service  créé par creerRessourceService()
 */
export function useRessource(service) {
  const [elements, setElements] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [erreursChamps, setErreursChamps] = useState({});
  const [enregistrement, setEnregistrement] = useState(false);

  const charger = useCallback(async () => {
    setChargement(true);
    setErreur('');
    try {
      setElements(await service.lister());
    } catch (e) {
      setErreur(parseApiError(e).message);
    } finally {
      setChargement(false);
    }
  }, [service]);

  useEffect(() => {
    charger();
  }, [charger]);

  /** Renvoie true si l'opération a réussi, pour que la page puisse vider son formulaire. */
  const creer = async (payload) => {
    setEnregistrement(true);
    setErreursChamps({});
    try {
      const cree = await service.creer(payload);
      setElements((liste) => [cree, ...liste]);
      return true;
    } catch (e) {
      const { message, champs } = parseApiError(e);
      setErreursChamps(champs);
      setErreur(message);
      return false;
    } finally {
      setEnregistrement(false);
    }
  };

  const modifier = async (id, payload) => {
    setEnregistrement(true);
    setErreursChamps({});
    try {
      const maj = await service.modifier(id, payload);
      setElements((liste) => liste.map((item) => (item.id === id ? { ...item, ...maj } : item)));
      return true;
    } catch (e) {
      const { message, champs } = parseApiError(e);
      setErreursChamps(champs);
      setErreur(message);
      return false;
    } finally {
      setEnregistrement(false);
    }
  };

  const supprimer = async (id) => {
    // Suppression optimiste : on retire tout de suite, on restaure si l'API refuse
    const sauvegarde = elements;
    setElements((liste) => liste.filter((item) => item.id !== id));
    try {
      await service.supprimer(id);
      return true;
    } catch (e) {
      setElements(sauvegarde);
      setErreur(parseApiError(e).message);
      return false;
    }
  };

  return {
    elements,
    chargement,
    erreur,
    erreursChamps,
    enregistrement,
    setErreur,
    charger,
    creer,
    modifier,
    supprimer,
  };
}
