import { useState } from 'react';
import { X, ShoppingCart, CheckCircle2 } from 'lucide-react';

import { envoyerCommande } from '@/services/commandeService';

export default function FormulaireCommande({
  ouvert,
  panier,
  onFermer,
  onSucces,
}) {
  const [typeClient, setTypeClient] = useState('particulier');

  const [formulaire, setFormulaire] = useState({
    nom: '',
    raison_sociale: '',
    email: '',
    telephone: '',
  });

  const [erreur, setErreur] = useState('');
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  if (!ouvert) {
    return null;
  }

  // =========================================================
  // MODIFICATION DES CHAMPS
  // =========================================================

  const modifier = (champ, valeur) => {
    setFormulaire((ancien) => ({
      ...ancien,
      [champ]: valeur,
    }));

    setErreur('');
  };

  // =========================================================
  // CHANGEMENT DE TYPE CLIENT
  // =========================================================

  const changerTypeClient = (type) => {
    setTypeClient(type);
    setErreur('');

    if (type === 'particulier') {
      setFormulaire((ancien) => ({
        ...ancien,
        raison_sociale: '',
      }));
    }
  };

  // =========================================================
  // VALIDATION + ENVOI
  // =========================================================

  const soumettre = async (event) => {
    event.preventDefault();

    setErreur('');
    setConfirmation(null);

    if (panier.length === 0) {
      setErreur('Votre panier est vide.');
      return;
    }

    if (!formulaire.nom.trim()) {
      setErreur(
        typeClient === 'entreprise'
          ? 'Veuillez renseigner le nom du responsable ou du contact.'
          : 'Veuillez renseigner votre nom et prénom.'
      );
      return;
    }

    if (typeClient === 'entreprise' && !formulaire.raison_sociale.trim()) {
      setErreur(
        'Veuillez renseigner le nom commercial ou la raison sociale de votre entreprise.'
      );
      return;
    }

    if (!formulaire.email.trim()) {
      setErreur('Veuillez renseigner votre adresse email.');
      return;
    }

    if (!formulaire.telephone.trim()) {
      setErreur('Veuillez renseigner votre numéro de téléphone.');
      return;
    }

    setEnvoiEnCours(true);

    try {
      const reponse = await envoyerCommande({
        type_client: typeClient,
        nom: formulaire.nom.trim(),
        raison_sociale:
          typeClient === 'entreprise' ? formulaire.raison_sociale.trim() : null,
        email: formulaire.email.trim(),
        telephone: formulaire.telephone.trim(),
        items: panier.map((item) => ({
          product_id: item.id,
          quantite: item.quantite,
        })),
      });

      setConfirmation({
        reference: reponse?.reference ?? null,
        message: reponse?.message || 'Votre demande a bien été enregistrée.',
      });

      if (onSucces) {
        onSucces(reponse);
      }
    } catch (error) {
      console.error('Erreur commande :', error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Impossible d’envoyer votre demande. Veuillez réessayer.';

      setErreur(message);
    } finally {
      setEnvoiEnCours(false);
    }
  };

  const classeInput =
    'w-full rounded-xl border border-forest-100 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate-muted/70 focus:border-signal focus:ring-2 focus:ring-signal/10';

  const classeLabel = 'mb-2 block text-sm font-semibold text-forest-800';

  const classeTypeClient = (actif) =>
    `rounded-xl border px-4 py-3 text-sm font-semibold transition ${
      actif
        ? 'border-signal bg-forest-50 text-forest-800'
        : 'border-forest-100 text-slate-muted hover:border-forest-200'
    }`;

  // =========================================================
  // AFFICHAGE
  // =========================================================

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* EN-TÊTE */}

        <div className="flex items-start justify-between border-b border-forest-100 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-50">
              <ShoppingCart size={21} className="text-forest-700" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-forest-800">
                Finaliser ma commande
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-slate-muted">
                Renseignez vos coordonnées. Nous vous communiquerons la
                disponibilité et les prix par email.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFermer}
            disabled={envoiEnCours}
            className="rounded-full p-2 text-slate-muted transition hover:bg-forest-50 hover:text-forest-700 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Fermer"
          >
            <X size={21} />
          </button>
        </div>

        {/* CONFIRMATION */}

        {confirmation ? (
          <div className="px-6 py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 size={34} className="text-green-600" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-forest-800">
              Commande envoyée
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-muted">
              {confirmation.message}
            </p>

            {confirmation.reference && (
              <div className="mt-4 rounded-xl bg-forest-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-muted">
                  Référence
                </p>

                <p className="mt-1 text-lg font-bold text-forest-700">
                  {confirmation.reference}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={onFermer}
              className="mt-6 w-full rounded-full bg-forest-700 px-5 py-3 font-semibold text-white transition hover:bg-signal"
            >
              Fermer
            </button>
          </div>
        ) : (
          /* FORMULAIRE */

          <form onSubmit={soumettre} className="space-y-5 px-6 py-6">
            {erreur && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {erreur}
              </div>
            )}

            {/* TYPE CLIENT */}

            <div>
              <label className={classeLabel}>Vous êtes</label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => changerTypeClient('particulier')}
                  className={classeTypeClient(typeClient === 'particulier')}
                >
                  Particulier
                </button>

                <button
                  type="button"
                  onClick={() => changerTypeClient('entreprise')}
                  className={classeTypeClient(typeClient === 'entreprise')}
                >
                  Entreprise
                </button>
              </div>
            </div>

            {/* RAISON SOCIALE */}

            {typeClient === 'entreprise' && (
              <div>
                <label htmlFor="commande-raison-sociale" className={classeLabel}>
                  Nom commercial / raison sociale
                </label>

                <input
                  id="commande-raison-sociale"
                  type="text"
                  value={formulaire.raison_sociale}
                  onChange={(event) =>
                    modifier('raison_sociale', event.target.value)
                  }
                  placeholder="Ex. PLANETECH SARL"
                  className={classeInput}
                />
              </div>
            )}

            {/* NOM */}

            <div>
              <label htmlFor="commande-nom" className={classeLabel}>
                {typeClient === 'entreprise'
                  ? 'Nom du responsable / contact'
                  : 'Nom et prénom'}
              </label>

              <input
                id="commande-nom"
                type="text"
                value={formulaire.nom}
                onChange={(event) => modifier('nom', event.target.value)}
                placeholder={
                  typeClient === 'entreprise'
                    ? 'Ex. Jean Dupont'
                    : 'Ex. Armelle Assogba'
                }
                className={classeInput}
              />
            </div>

            {/* EMAIL */}

            <div>
              <label htmlFor="commande-email" className={classeLabel}>
                Adresse email
              </label>

              <input
                id="commande-email"
                type="email"
                inputMode="email"
                value={formulaire.email}
                onChange={(event) => modifier('email', event.target.value)}
                placeholder="vous@exemple.com"
                className={classeInput}
              />
            </div>

            {/* TÉLÉPHONE */}

            <div>
              <label htmlFor="commande-telephone" className={classeLabel}>
                Numéro de téléphone
              </label>

              <input
                id="commande-telephone"
                type="tel"
                inputMode="tel"
                value={formulaire.telephone}
                onChange={(event) => modifier('telephone', event.target.value)}
                placeholder="+229 64 54 99 59"
                className={classeInput}
              />
            </div>

            {/* NOTE */}

            <p className="text-xs leading-relaxed text-slate-muted">
              Après validation, votre commande sera enregistrée et vous
              recevrez un email de confirmation. Notre équipe vérifiera ensuite
              la disponibilité des articles et vous communiquera les prix.
            </p>

            {/* BOUTONS */}

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onFermer}
                disabled={envoiEnCours}
                className="flex-1 rounded-full border border-forest-100 px-4 py-3 text-sm font-semibold text-forest-700 transition hover:bg-forest-50 disabled:opacity-50"
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={envoiEnCours}
                className="flex-1 rounded-full bg-forest-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-signal disabled:cursor-not-allowed disabled:opacity-50"
              >
                {envoiEnCours ? 'Envoi en cours…' : 'Valider la commande'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}