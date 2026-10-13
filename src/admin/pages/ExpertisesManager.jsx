import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Wrench } from 'lucide-react';
import axios from 'axios';
import Carte from '@/admin/ui/Carte';
import Alerte from '@/admin/ui/Alerte';
import Chargement from '@/admin/ui/Chargement';
import EtatVide from '@/admin/ui/EtatVide';
import BoutonAdmin from '@/admin/ui/BoutonAdmin';
import ChampImage from '@/admin/ui/ChampImage';
import ConfirmationSuppression from '@/admin/ui/ConfirmationSuppression';
import { ChampAdmin, SaisieAdmin, ZoneTexteAdmin } from '@/admin/ui/ChampAdmin';

const API_URL = `${import.meta.env.VITE_API_URL}/expertises`;

export default function ExpertisesManager() {
  const [expertises, setExpertises] = useState([]);
  const [formulaire, setFormulaire] = useState({ titre: '', description: '', image: null });
  const [enEdition, setEnEdition] = useState(null);
  const [aSupprimer, setASupprimer] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState('');
  const [confirmation, setConfirmation] = useState('');

  // Charger les expertises
  const chargerExpertises = async () => {
    setChargement(true);
    try {
      const res = await axios.get(API_URL);
      setExpertises(res.data);
    } catch (err) {
      console.error(err);
      setErreur("Erreur lors du chargement des expertises.");
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => {
    chargerExpertises();
  }, []);

  const champ = (nom, valeur) => setFormulaire((f) => ({ ...f, [nom]: valeur }));

  const reinitialiser = () => {
    setFormulaire({ titre: '', description: '', image: null });
    setEnEdition(null);
  };

  const editer = (item) => {
    setEnEdition(item.id);
    setFormulaire({
      titre: item.titre,
      description: item.description,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Soumission propre avec uniquement les champs acceptés par le modèle
  const soumettre = async (e) => {
    e.preventDefault();
    setErreur('');
    setConfirmation('');
    setChargement(true);

    try {
      const formData = new FormData();
      formData.append('titre', formulaire.titre);
      formData.append('description', formulaire.description);
      
      if (formulaire.image) {
        formData.append('image', formulaire.image);
      }

      let url = API_URL;
      if (enEdition) {
        formData.append('_method', 'PUT'); // Indispensable pour Laravel avec FormData en mise à jour
        url = `${API_URL}/${enEdition}`;
      }

      await axios.post(url, formData);

      setConfirmation(enEdition ? 'Domaine mis à jour avec succès.' : 'Domaine ajouté avec succès.');
      reinitialiser();
      chargerExpertises();
    } catch (err) {
      console.error("Détails de l'erreur :", err.response?.data);
      setErreur(err.response?.data?.message || "Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setChargement(false);
    }
  };

  const executerSuppression = async () => {
    if (!aSupprimer) return;
    try {
      await axios.delete(`${API_URL}/${aSupprimer.id}`);
      setConfirmation('Domaine supprimé avec succès.');
      setASupprimer(null);
      chargerExpertises();
    } catch (err) {
      console.error(err);
      setErreur("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="space-y-5">
      <Alerte message={erreur} onFermer={() => setErreur('')} />
      <Alerte type="succes" message={confirmation} onFermer={() => setConfirmation('')} />

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
        <Carte
          titre={enEdition ? 'Modifier le domaine' : 'Ajouter un domaine'}
          description="Ces blocs alimentent la section « Nos métiers » de la page d'accueil."
          action={
            enEdition && (
              <BoutonAdmin variante="discret" taille="sm" icone={X} onClick={reinitialiser}>
                Annuler
              </BoutonAdmin>
            )
          }
        >
          <form onSubmit={soumettre} className="space-y-4" noValidate>
            <ChampAdmin id="titre" label="Titre" obligatoire>
              <SaisieAdmin
                id="titre"
                value={formulaire.titre}
                onChange={(e) => champ('titre', e.target.value)}
                placeholder="Ex. Télécom et réseau"
                required
              />
            </ChampAdmin>

            <ChampAdmin id="description" label="Description" obligatoire>
              <ZoneTexteAdmin
                id="description"
                value={formulaire.description}
                onChange={(e) => champ('description', e.target.value)}
                placeholder="Une à deux phrases décrivant les prestations couvertes."
                required
              />
            </ChampAdmin>

            <ChampImage
              id="image-expertise"
              label="Visuel (optionnel)"
              valeur={formulaire.image}
              onChange={(fichier) => champ('image', fichier)}
            />

            <BoutonAdmin type="submit" icone={Plus} disabled={chargement} className="w-full">
              {chargement
                ? 'Enregistrement…'
                : enEdition ? 'Enregistrer les modifications' : 'Ajouter le domaine'}
            </BoutonAdmin>
          </form>
        </Carte>

        <Carte titre={`Domaines publiés (${expertises.length})`} sansPadding>
          {chargement && expertises.length === 0 ? (
            <div className="p-6"><Chargement lignes={4} /></div>
          ) : expertises.length === 0 ? (
            <div className="p-6">
              <EtatVide titre="Aucun domaine" message="Ajoutez les métiers que vous souhaitez mettre en avant." />
            </div>
          ) : (
            <ul className="divide-y divide-forest-50">
              {expertises.map((item) => (
                <li key={item.id} className="flex items-start gap-4 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-forest-50 text-forest-700">
                    {item.image ? (
                      <img src={item.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <Wrench size={18} aria-hidden="true" />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink">{item.titre}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-muted">{item.description}</p>
                  </div>

                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => editer(item)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-muted hover:bg-forest-50 hover:text-forest-700"
                    >
                      <span className="sr-only">Modifier {item.titre}</span>
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setASupprimer(item)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-muted hover:bg-red-50 hover:text-red-600"
                    >
                      <span className="sr-only">Supprimer {item.titre}</span>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Carte>
      </div>

      <ConfirmationSuppression
        element={aSupprimer}
        libelle={aSupprimer ? `« ${aSupprimer.titre} »` : ''}
        onAnnuler={() => setASupprimer(null)}
        onConfirmer={executerSuppression}
      />
    </div>
  );
}