import { useState } from 'react';
import { Plus, Trash2, Building2, ExternalLink } from 'lucide-react';
import Carte from '@/admin/ui/Carte';
import Alerte from '@/admin/ui/Alerte';
import Chargement from '@/admin/ui/Chargement';
import EtatVide from '@/admin/ui/EtatVide';
import BoutonAdmin from '@/admin/ui/BoutonAdmin';
import ChampImage from '@/admin/ui/ChampImage';
import ConfirmationSuppression from '@/admin/ui/ConfirmationSuppression';
import { ChampAdmin, SaisieAdmin } from '@/admin/ui/ChampAdmin';
import { useRessource } from '@/admin/hooks/useRessource';
import { partenairesService } from '@/admin/services/adminServices';

const FORMULAIRE_VIDE = { nom: '', site: '', logo: null };

export default function PartenairesManager() {
  const {
    elements: partenaires, chargement, erreur, erreursChamps, enregistrement,
    setErreur, creer, supprimer,
  } = useRessource(partenairesService);

  const [formulaire, setFormulaire] = useState(FORMULAIRE_VIDE);
  const [aSupprimer, setASupprimer] = useState(null);
  const [confirmation, setConfirmation] = useState('');

  const champ = (nom, valeur) => setFormulaire((f) => ({ ...f, [nom]: valeur }));

  const soumettre = async (e) => {
    e.preventDefault();
    setConfirmation('');

    const ok = await creer({
      ...formulaire,
      logo: formulaire.logo ? URL.createObjectURL(formulaire.logo) : null,
    });

    if (ok) {
      setConfirmation('Partenaire ajouté.');
      setFormulaire(FORMULAIRE_VIDE);
    }
  };

  return (
    <div className="space-y-5">
      <Alerte message={erreur} onFermer={() => setErreur('')} />
      <Alerte type="succes" message={confirmation} onFermer={() => setConfirmation('')} />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Carte titre="Ajouter un partenaire" description="Le logo s'affiche dans le bandeau partenaires.">
          <form onSubmit={soumettre} className="space-y-4" noValidate>
            <ChampAdmin id="nom-partenaire" label="Nom" obligatoire erreur={erreursChamps.nom}>
              <SaisieAdmin
                id="nom-partenaire"
                value={formulaire.nom}
                onChange={(e) => champ('nom', e.target.value)}
                placeholder="Ex. Fournisseur réseau"
                required
                erreur={erreursChamps.nom}
              />
            </ChampAdmin>

            <ChampAdmin
              id="site-partenaire"
              label="Site web"
              indication="Optionnel. Le logo devient cliquable."
              erreur={erreursChamps.site}
            >
              <SaisieAdmin
                id="site-partenaire"
                type="url"
                value={formulaire.site}
                onChange={(e) => champ('site', e.target.value)}
                placeholder="https://exemple.bj"
                erreur={erreursChamps.site}
              />
            </ChampAdmin>

            <ChampImage
              id="logo-partenaire"
              label="Logo"
              valeur={formulaire.logo}
              onChange={(fichier) => champ('logo', fichier)}
              erreur={erreursChamps.logo}
            />

            <BoutonAdmin type="submit" icone={Plus} disabled={enregistrement} className="w-full">
              {enregistrement ? 'Enregistrement…' : 'Ajouter le partenaire'}
            </BoutonAdmin>
          </form>
        </Carte>

        <Carte titre={`Partenaires (${partenaires.length})`}>
          {chargement ? (
            <Chargement lignes={2} />
          ) : partenaires.length === 0 ? (
            <EtatVide
              icone={Building2}
              titre="Aucun partenaire"
              message="Ajoutez les marques et opérateurs avec lesquels vous travaillez."
            />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {partenaires.map((partenaire) => (
                <li
                  key={partenaire.id}
                  className="flex items-center gap-4 rounded-xl border border-forest-100 p-4"
                >
                  <div className="grid h-14 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-forest-50">
                    {partenaire.logo ? (
                      <img src={partenaire.logo} alt="" className="max-h-10 w-auto" />
                    ) : (
                      <Building2 size={18} className="text-forest-300" aria-hidden="true" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{partenaire.nom}</p>
                    {partenaire.site && (
                      <a
                        href={partenaire.site}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-muted hover:text-signal"
                      >
                        Voir le site <ExternalLink size={12} aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setASupprimer(partenaire)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-muted hover:bg-red-50 hover:text-red-600"
                  >
                    <span className="sr-only">Retirer {partenaire.nom}</span>
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Carte>
      </div>

      <ConfirmationSuppression
        element={aSupprimer}
        libelle={aSupprimer ? aSupprimer.nom : ''}
        onAnnuler={() => setASupprimer(null)}
        onConfirmer={async () => {
          await supprimer(aSupprimer.id);
          setASupprimer(null);
        }}
      />
    </div>
  );
}
