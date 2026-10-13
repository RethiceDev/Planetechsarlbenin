import { useEffect, useState } from 'react';

/**
 * Crée une URL d'aperçu pour un fichier image sélectionné,
 * et la libère proprement quand le fichier change ou que le composant est démonté.
 */
export function useApercuImage(fichier) {
  const [apercu, setApercu] = useState(null);

  useEffect(() => {
    if (!fichier) {
      setApercu(null);
      return undefined;
    }
    const url = URL.createObjectURL(fichier);
    setApercu(url);
    return () => URL.revokeObjectURL(url);
  }, [fichier]);

  return apercu;
}
