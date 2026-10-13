import { useRef, useState } from 'react';

import { useDevisForm } from '@/hooks/useDevisForm';
import { Champ, Saisie, ZoneTexte, Selection } from '@/components/ui/Champ';
import Bouton from '@/components/ui/Bouton';
import { EXPERTISES } from '@/data/expertises';
import { cn } from '@/utils/cn';
import { Mic, MicOff, Volume2 } from 'lucide-react'; // Import des icônes

const TYPES_CLIENT = [
  {
    valeur: 'societe',
    libelle: 'Société',
    detail: 'Entreprise, ONG, administration',
  },
  {
    valeur: 'particulier',
    libelle: 'Personne physique',
    detail: 'Particulier, artisan',
  },
];

export default function FormulaireDevis() {
  const {
    valeurs,
    erreurs,
    envoiEnCours,
    succes,
    erreurGlobale,
    modifier,
    soumettre,
    reinitialiser,
  } = useDevisForm();

  // État pour la gestion de l'enregistrement vocal
  const [estEnregistrement, setEstEnregistrement] = useState(false);
  const recognitionRef = useRef(null);

  // Verrou immédiat contre les soumissions répétées.
  const soumissionVerrouillee = useRef(false);

  // Fonction pour démarrer/arrêter la dictée vocale
  const basculerEnregistrementVocal = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("La reconnaissance vocale n'est pas supportée par votre navigateur. Essayez avec Google Chrome ou Microsoft Edge.");
      return;
    }

    if (estEnregistrement) {
      // Arrêter l'enregistrement
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setEstEnregistrement(false);
      return;
    }

    // Démarrer l'enregistrement
    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'fr-FR'; // Langue française
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setEstEnregistrement(true);
      };

      recognition.onresult = (event) => {
        let texteTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          texteTranscript += event.results[i][0].transcript;
        }

        // Concaténer le texte vocal avec ce qui était déjà écrit (ou remplacer)
        const texteActuel = valeurs.besoins ? valeurs.besoins + ' ' : '';
        modifier('besoins', texteActuel + texteTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Erreur de reconnaissance vocale :", event.error);
        setEstEnregistrement(false);
      };

      recognition.onend = () => {
        setEstEnregistrement(false);
      };

      recognition.start();
    } catch (error) {
      console.error("Impossible de lancer la reconnaissance vocale", error);
      setEstEnregistrement(false);
    }
  };

  const gererSoumission = async (event) => {
    if (soumissionVerrouillee.current || envoiEnCours) {
      event.preventDefault();
      return;
    }

    soumissionVerrouillee.current = true;

    try {
      await soumettre(event);
    } finally {
      soumissionVerrouillee.current = false;
    }
  };

  if (succes) {
    return (
      <div className="rounded-2xl border border-forest-100 bg-forest-50 p-8">
        <h3 className="text-xl font-semibold">Demande envoyée</h3>

        <p className="mt-3 max-w-prose text-slate-muted">
          Nous avons bien reçu votre demande et revenons vers vous sous
          48 heures ouvrées.
          {succes.reference && (
            <>
              {' '}Conservez la référence{' '}
              <strong className="text-forest-700">
                {succes.reference}
              </strong>{' '}
              pour tout échange.
            </>
          )}
        </p>

        <Bouton
          onClick={reinitialiser}
          variante="contour"
          className="mt-6"
        >
          Envoyer une autre demande
        </Bouton>
      </div>
    );
  }

  return (
    <form
      onSubmit={gererSoumission}
      noValidate
      className="space-y-7"
    >
      {erreurGlobale && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {erreurGlobale}
        </p>
      )}

      <fieldset>
        <legend className="text-sm font-semibold text-forest-700">
          Vous êtes
        </legend>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {TYPES_CLIENT.map((type) => (
            <label
              key={type.valeur}
              className={cn(
                'cursor-pointer rounded-xl border p-4 transition-colors',
                valeurs.type_client === type.valeur
                  ? 'border-signal bg-forest-50'
                  : 'border-forest-100 hover:border-forest-200'
              )}
            >
              <input
                type="radio"
                name="type_client"
                value={type.valeur}
                checked={valeurs.type_client === type.valeur}
                onChange={(e) =>
                  modifier('type_client', e.target.value)
                }
                className="sr-only"
              />

              <span className="block font-semibold text-ink">
                {type.libelle}
              </span>

              <span className="mt-1 block text-xs text-slate-muted">
                {type.detail}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {valeurs.type_client === 'societe' && (
        <Champ
          id="raison_sociale"
          label="Nom de la société"
          erreur={erreurs.raison_sociale}
        >
          <Saisie
            id="raison_sociale"
            name="raison_sociale"
            value={valeurs.raison_sociale}
            onChange={(e) =>
              modifier('raison_sociale', e.target.value)
            }
            placeholder="Ex. PLANETECH SARL"
            erreur={erreurs.raison_sociale}
          />
        </Champ>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Champ
          id="nom"
          label={
            valeurs.type_client === 'societe'
              ? 'Nom du contact'
              : 'Nom et prénom'
          }
          erreur={erreurs.nom}
        >
          <Saisie
            id="nom"
            name="nom"
            value={valeurs.nom}
            onChange={(e) => modifier('nom', e.target.value)}
            placeholder="Ex. Armelle Assogba"
            erreur={erreurs.nom}
          />
        </Champ>

        <Champ
          id="email"
          label="Adresse email"
          erreur={erreurs.email}
        >
          <Saisie
            id="email"
            name="email"
            type="email"
            inputMode="email"
            value={valeurs.email}
            onChange={(e) => modifier('email', e.target.value)}
            placeholder="vous@exemple.com"
            erreur={erreurs.email}
          />
        </Champ>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Champ
          id="telephone"
          label="Téléphone"
          erreur={erreurs.telephone}
          indication="Indicatif Bénin par défaut, modifiable."
        >
          <div className="flex gap-2">
            <select
              aria-label="Indicatif pays"
              value={valeurs.indicatif}
              onChange={(e) =>
                modifier('indicatif', e.target.value)
              }
              className="w-28 rounded-xl border border-forest-100 bg-white px-3 py-3 text-ink focus:border-signal"
            >
              <option value="+229">+229</option>
              <option value="+228">+228</option>
              <option value="+234">+234</option>
              <option value="+233">+233</option>
              <option value="+33">+33</option>
            </select>

            <Saisie
              id="telephone"
              name="telephone"
              type="tel"
              inputMode="tel"
              value={valeurs.telephone}
              onChange={(e) =>
                modifier('telephone', e.target.value)
              }
              placeholder="64 54 99 59"
              erreur={erreurs.telephone}
            />
          </div>
        </Champ>

        <Champ id="domaine" label="Domaine concerné">
          <Selection
            id="domaine"
            name="domaine"
            value={valeurs.domaine}
            onChange={(e) =>
              modifier('domaine', e.target.value)
            }
          >
            {EXPERTISES.map((expertise) => (
              <option
                key={expertise.slug}
                value={expertise.slug}
              >
                {expertise.titre}
              </option>
            ))}

            <option value="autre">Autre besoin</option>
          </Selection>
        </Champ>
      </div>

      <Champ
        id="besoins"
        label="Décrivez vos besoins"
        erreur={erreurs.besoins}
        indication="Matériel souhaité, quantités, lieu du chantier, délai attendu."
      >
        <div className="space-y-3">
          
          {/* Bloc d'enregistrement vocal ultra-visible et interactif */}
          <div className={cn(
            "flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl border transition-all shadow-sm",
            estEnregistrement 
              ? "bg-red-50 border-red-300 ring-2 ring-red-400/20" 
              : "bg-forest-50/70 border-forest-100 hover:border-forest-200"
          )}>
            <div className="flex items-center gap-3 text-left w-full sm:w-auto">
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                estEnregistrement ? "bg-red-600 text-white animate-bounce" : "bg-forest-700 text-white"
              )}>
                {estEnregistrement ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-xs font-bold text-ink">
                  {estEnregistrement ? "Écoute en cours... Parlez clairement" : "Préférer la dictée vocale ?"}
                </p>
                <p className="text-[11px] text-slate-muted">
                  {estEnregistrement ? "Vos mots s'écrivent automatiquement ci-dessous." : "Cliquez pour dicter vos besoins à l'oral."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={basculerEnregistrementVocal}
              className={cn(
                'w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-sm',
                estEnregistrement
                  ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse'
                  : 'bg-forest-700 text-white hover:bg-forest-900'
              )}
            >
              <span className={cn('h-2.5 w-2.5 rounded-full', estEnregistrement ? 'bg-white' : 'bg-emerald-400 animate-ping')}></span>
              {estEnregistrement ? "Arrêter l’enregistrement" : "Démarrer le vocal"}
            </button>
          </div>

          <ZoneTexte
            id="besoins"
            name="besoins"
            value={valeurs.besoins}
            onChange={(e) =>
              modifier('besoins', e.target.value)
            }
            placeholder="Ex. :\nCâblage réseau de 12 postes à Houéyiho\nFourniture d’un switch 24 ports\nIntervention souhaitée avant fin du mois"
            erreur={erreurs.besoins}
          />
        </div>
      </Champ>

      <div className="flex flex-wrap items-center gap-4">
        <Bouton
          type="submit"
          disabled={envoiEnCours}
        >
          {envoiEnCours
            ? 'Envoi en cours…'
            : 'Envoyer ma demande'}
        </Bouton>

        <p className="text-xs text-slate-muted">
          Vos informations servent uniquement à établir votre devis.
        </p>
      </div>
    </form>
  );
}