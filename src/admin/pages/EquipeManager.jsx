import { useState } from 'react';
import { Plus, Trash2, UserRound } from 'lucide-react';
import Carte from '@/admin/ui/Carte';
import Alerte from '@/admin/ui/Alerte';
import Chargement from '@/admin/ui/Chargement';
import EtatVide from '@/admin/ui/EtatVide';
import BoutonAdmin from '@/admin/ui/BoutonAdmin';
import ChampImage from '@/admin/ui/ChampImage';
import ConfirmationSuppression from '@/admin/ui/ConfirmationSuppression';
import { ChampAdmin, SaisieAdmin, SelectionAdmin } from '@/admin/ui/ChampAdmin';
import { useRessource } from '@/admin/hooks/useRessource';
import { equipeService } from '@/admin/services/adminServices';

const POLES = ['Direction', 'Administration', 'Technique', 'Commercial'];
const FORMULAIRE_VIDE = { nom: '', role: '', pole: 'Technique', photo: null };

/** Initiales affichées tant qu'aucune photo n'est fournie. */
const initiales = (nom) =>
  nom.split(' ').filter(Boolean).slice(0, 2).map((m) => m[0]).join('').toUpperCase();

export default function EquipeManager() {
  const {
    elements: membres, chargement, erreur, erreursChamps, enregistrement,
    setErreur, creer, supprimer,
  } = useRessource(equipeService);

  const [formulaire, setFormulaire] = useState(FORMULAIRE_VIDE);
  const [aSupprimer, setASupprimer] = useState(null);
  const [confirmation, setConfirmation] = useState('');

  const champ = (nom, valeur) => setFormulaire((f) => ({ ...f, [nom]: valeur }));

 const soumettre = async (e) => {
    e.preventDefault();
    setConfirmation('');

    const formData = new FormData();
    formData.append('nom', formulaire.nom);
    formData.append('role', formulaire.role);
    formData.append('pole', formulaire.pole);
    
    if (formulaire.photo instanceof File) {
      formData.append('photo', formulaire.photo);
    }

    const ok = await creer(formData);

    if (ok) {
      setConfirmation('Membre ajouté à la page d’accueil.');
      setFormulaire(FORMULAIRE_VIDE);
    }
  };

  return (
    <div className="space-y-5">
      <Alerte message={erreur} onFermer={() => setErreur('')} />
      <Alerte type="succes" message={confirmation} onFermer={() => setConfirmation('')} />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Carte titre="Ajouter un membre" description="Direction, pôle administratif ou technique.">
          <form onSubmit={soumettre} className="space-y-4" noValidate>
            <ChampAdmin id="nom-membre" label="Nom" obligatoire erreur={erreursChamps.nom}>
              <SaisieAdmin
                id="nom-membre"
                value={formulaire.nom}
                onChange={(e) => champ('nom', e.target.value)}
                placeholder="Ex. Armelle Assogba"
                required
                erreur={erreursChamps.nom}
              />
            </ChampAdmin>

            <ChampAdmin id="role-membre" label="Fonction" obligatoire erreur={erreursChamps.role}>
              <SaisieAdmin
                id="role-membre"
                value={formulaire.role}
                onChange={(e) => champ('role', e.target.value)}
                placeholder="Ex. Président-Directeur Général"
                required
                erreur={erreursChamps.role}
              />
            </ChampAdmin>

            <ChampAdmin id="pole-membre" label="Pôle" erreur={erreursChamps.pole}>
              <SelectionAdmin
                id="pole-membre"
                value={formulaire.pole}
                onChange={(e) => champ('pole', e.target.value)}
              >
                {POLES.map((pole) => (
                  <option key={pole} value={pole}>{pole}</option>
                ))}
              </SelectionAdmin>
            </ChampAdmin>

            <ChampImage
                id="photo-membre"
                label="Photo"
                valeur={formulaire.photo}
                onChange={(fichier) => champ('photo', fichier)}
                erreur={erreursChamps.photo}
              />

            <BoutonAdmin type="submit" icone={Plus} disabled={enregistrement} className="w-full">
              {enregistrement ? 'Enregistrement…' : 'Ajouter le membre'}
            </BoutonAdmin>
          </form>
        </Carte>

        <Carte titre={`Équipe (${membres.length})`} sansPadding>
          {chargement ? (
            <div className="p-6"><Chargement lignes={3} /></div>
          ) : membres.length === 0 ? (
            <div className="p-6">
              <EtatVide
                icone={UserRound}
                titre="Aucun membre"
                message="Ajoutez les personnes à présenter sur la page d'accueil."
              />
            </div>
          ) : (
            <ul className="divide-y divide-forest-50">
              {membres.map((membre) => (
                <li key={membre.id} className="flex items-center gap-4 p-5">
                  {membre.photo ? (
                    <img src={membre.photo} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest-700 text-sm font-semibold text-white"
                    >
                      {initiales(membre.nom)}
                    </span>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink">{membre.nom}</p>
                    <p className="text-sm text-slate-muted">{membre.role}</p>
                  </div>

                  <span className="hidden rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700 sm:inline">
                    {membre.pole}
                  </span>

                  <button
                    type="button"
                    onClick={() => setASupprimer(membre)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-muted hover:bg-red-50 hover:text-red-600"
                  >
                    <span className="sr-only">Retirer {membre.nom}</span>
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