import { useEffect, useRef, useState } from 'react';

/**
 * Adresse de l'API Laravel.
 * Mets VITE_API_URL=http://127.0.0.1:8000/api dans ton .env React
 * (ou l'URL de production). Adapte ENDPOINT si ta route est différente.
 */
const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api';
const ENDPOINT = `${API_URL}/commandes`;

let compteur = 0;
const nouvelleLigne = () => ({ id: ++compteur, designation: '', quantite: 1 });

// Style commun des champs, sans largeur ni marge horizontale :
// chaque champ choisit la sienne (sinon w-full écrase w-14 et la quantité devient énorme).
const CHAMP_BASE =
  'rounded-lg border border-forest-100 bg-white py-2.5 text-sm text-slate-800 ' +
  'placeholder:text-slate-400 focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-600/20';

// Champ pleine largeur (coordonnées)
const CHAMP = `w-full px-3 ${CHAMP_BASE}`;

export default function ModalListeLibre({ ouvert, onFermer }) {
  const [typeClient, setTypeClient] = useState('particulier');
  const [nom, setNom] = useState('');
  const [raisonSociale, setRaisonSociale] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [lignes, setLignes] = useState(() => [nouvelleLigne()]);

  const [envoi, setEnvoi] = useState(false);
  const [erreurs, setErreurs] = useState([]);
  const [reference, setReference] = useState(null);

  const premierChamp = useRef(null);

  // Échap pour fermer + blocage du scroll de la page derrière le modal
  useEffect(() => {
    if (!ouvert) return undefined;

    const surTouche = (e) => e.key === 'Escape' && onFermer();
    document.addEventListener('keydown', surTouche);

    const overflowInitial = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    premierChamp.current?.focus();

    return () => {
      document.removeEventListener('keydown', surTouche);
      document.body.style.overflow = overflowInitial;
    };
  }, [ouvert, onFermer]);

  if (!ouvert) return null;

  const majLigne = (id, champ, valeur) =>
    setLignes((ls) => ls.map((l) => (l.id === id ? { ...l, [champ]: valeur } : l)));

  const ajouterLigne = () => setLignes((ls) => [...ls, nouvelleLigne()]);

  const supprimerLigne = (id) =>
    setLignes((ls) => (ls.length > 1 ? ls.filter((l) => l.id !== id) : ls));

  const reinitialiser = () => {
    setTypeClient('particulier');
    setNom('');
    setRaisonSociale('');
    setEmail('');
    setTelephone('');
    setLignes([nouvelleLigne()]);
    setErreurs([]);
    setReference(null);
  };

  const fermer = () => {
    // Après une commande réussie, on repart d'un formulaire vide
    if (reference) reinitialiser();
    onFermer();
  };

  const soumettre = async (e) => {
    e.preventDefault();
    setErreurs([]);

    const items = lignes
      .map((l) => ({
        designation: l.designation.trim(),
        quantite: Number(l.quantite),
      }))
      .filter((l) => l.designation !== '');

    if (items.length === 0) {
      setErreurs(['Ajoute au moins un article avec sa désignation.']);
      return;
    }
    if (items.some((l) => !Number.isInteger(l.quantite) || l.quantite < 1)) {
      setErreurs(['Chaque quantité doit être un nombre entier supérieur ou égal à 1.']);
      return;
    }

    setEnvoi(true);
    try {
      const reponse = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          type_client: typeClient,
          nom: nom.trim(),
          raison_sociale: typeClient === 'entreprise' ? raisonSociale.trim() : null,
          email: email.trim(),
          telephone: telephone.trim(),
          items,
        }),
      });

      const data = await reponse.json().catch(() => ({}));

      if (!reponse.ok) {
        const liste = data.errors
          ? Object.values(data.errors).flat()
          : [data.message ?? "Une erreur est survenue. Réessaie dans un instant."];
        setErreurs(liste);
        return;
      }

      setReference(data.reference);
    } catch {
      setErreurs(["Impossible de joindre le serveur. Vérifie ta connexion et réessaie."]);
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && fermer()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titre-liste-libre"
        className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        {/* EN-TÊTE DU MODAL */}
        <div className="flex items-start justify-between gap-4 border-b border-forest-100 px-5 py-4 sm:px-6">
          <div>
            <h2 id="titre-liste-libre" className="text-lg font-bold text-forest-700">
              Commande rapide
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Pas besoin de parcourir le catalogue : écris les articles et les quantités, nous t'envoyons la proforma.
            </p>
          </div>
          <button
            type="button"
            onClick={fermer}
            aria-label="Fermer"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 hover:bg-forest-50 hover:text-forest-700"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ÉTAT : COMMANDE ENVOYÉE */}
        {reference ? (
          <div className="px-5 py-10 text-center sm:px-6">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest-50 text-forest-700">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Demande envoyée</h3>
            <p className="mt-2 text-sm text-slate-600">
              Référence : <strong className="text-forest-700">{reference}</strong>
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
              Un e-mail de confirmation vient de t'être envoyé. Nous te contactons avec la proforma.
            </p>
            <button
              type="button"
              onClick={fermer}
              className="mt-6 rounded-lg bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-600"
            >
              Fermer
            </button>
          </div>
        ) : (
          /* ÉTAT : FORMULAIRE */
          <form onSubmit={soumettre} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5 sm:px-6">

              {/* ARTICLES */}
              <section aria-labelledby="titre-articles">
                <div className="mb-3 flex items-center justify-between">
                  <h3 id="titre-articles" className="text-sm font-semibold text-slate-900">
                    Articles
                  </h3>
                  <button
                    type="button"
                    onClick={ajouterLigne}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-forest-50 px-3 py-1.5 text-sm font-semibold text-forest-700 hover:bg-forest-100"
                  >
                    <span aria-hidden="true" className="text-base leading-none">+</span>
                    Ajouter une ligne
                  </button>
                </div>

                <ul className="space-y-2">
                  {lignes.map((ligne, i) => (
                    <li key={ligne.id} className="flex items-center gap-1.5 sm:gap-2">
                      <input
                        ref={i === 0 ? premierChamp : null}
                        type="text"
                        value={ligne.designation}
                        onChange={(e) => majLigne(ligne.id, 'designation', e.target.value)}
                        placeholder="Désignation (ex : câble 2,5 mm)"
                        aria-label={`Désignation de l'article ${i + 1}`}
                        maxLength={255}
                        className={`${CHAMP_BASE} min-w-0 flex-1 px-3`}
                      />
                      <input
                        type="number"
                        min="1"
                        step="1"
                        inputMode="numeric"
                        value={ligne.quantite}
                        onChange={(e) => majLigne(ligne.id, 'quantite', e.target.value)}
                        aria-label={`Quantité de l'article ${i + 1}`}
                        className={`${CHAMP_BASE} w-14 shrink-0 px-1 text-center sm:w-24 sm:px-3`}
                      />
                      <button
                        type="button"
                        onClick={() => supprimerLigne(ligne.id)}
                        disabled={lignes.length === 1}
                        aria-label={`Supprimer la ligne ${i + 1}`}
                        className="grid h-10 w-8 shrink-0 place-items-center rounded-lg text-slate-400 sm:w-10 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              {/* COORDONNÉES */}
              <section aria-labelledby="titre-coordonnees" className="space-y-3 border-t border-forest-100 pt-5">
                <h3 id="titre-coordonnees" className="text-sm font-semibold text-slate-900">
                  Tes coordonnées
                </h3>

                <div className="inline-flex rounded-lg border border-forest-100 p-0.5 text-sm" role="group" aria-label="Type de client">
                  {[
                    ['particulier', 'Particulier'],
                    ['entreprise', 'Entreprise'],
                  ].map(([valeur, libelle]) => (
                    <button
                      key={valeur}
                      type="button"
                      onClick={() => setTypeClient(valeur)}
                      aria-pressed={typeClient === valeur}
                      className={
                        'rounded-md px-4 py-1.5 font-medium transition-colors ' +
                        (typeClient === valeur
                          ? 'bg-forest-700 text-white'
                          : 'text-slate-600 hover:text-forest-700')
                      }
                    >
                      {libelle}
                    </button>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder={typeClient === 'entreprise' ? 'Nom du contact' : 'Nom et prénom'}
                    aria-label="Nom"
                    className={CHAMP}
                  />
                  {typeClient === 'entreprise' && (
                    <input
                      type="text"
                      required
                      value={raisonSociale}
                      onChange={(e) => setRaisonSociale(e.target.value)}
                      placeholder="Raison sociale"
                      aria-label="Raison sociale"
                      className={CHAMP}
                    />
                  )}
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresse e-mail"
                    aria-label="Adresse e-mail"
                    className={CHAMP}
                  />
                  <input
                    type="tel"
                    required
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="Téléphone"
                    aria-label="Téléphone"
                    className={CHAMP}
                  />
                </div>
              </section>

              {erreurs.length > 0 && (
                <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  <ul className="list-inside list-disc space-y-0.5">
                    {erreurs.map((msg, i) => (
                      <li key={i}>{msg}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* PIED DU MODAL */}
            <div className="flex items-center justify-end gap-3 border-t border-forest-100 bg-white px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={fermer}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-forest-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={envoi}
                className="rounded-lg bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-600 disabled:cursor-wait disabled:opacity-70"
              >
                {envoi ? 'Envoi en cours…' : 'Envoyer ma demande'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}