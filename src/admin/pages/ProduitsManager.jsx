import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';
import Carte from '@/admin/ui/Carte';
import Alerte from '@/admin/ui/Alerte';
import Chargement from '@/admin/ui/Chargement';
import EtatVide from '@/admin/ui/EtatVide';
import BoutonAdmin from '@/admin/ui/BoutonAdmin';
import ChampImage from '@/admin/ui/ChampImage';
import ConfirmationSuppression from '@/admin/ui/ConfirmationSuppression';
import { ChampAdmin, SaisieAdmin, ZoneTexteAdmin, SelectionAdmin } from '@/admin/ui/ChampAdmin';
import { useRessource } from '@/admin/hooks/useRessource';
import { produitsService } from '@/admin/services/adminServices';
import { CATEGORIES_PRODUIT, libelleCategorie, formaterPrix } from '@/admin/data/referentiels';

const FORMULAIRE_VIDE = {
  nom: '',
  categorie: 'informatique',
  prix: '',
  description: '',
  disponible: true,
  image: null,
};

export default function ProduitsManager() {
  const {
    elements: produits, chargement, erreur, erreursChamps, enregistrement,
    setErreur, creer, modifier, supprimer,
  } = useRessource(produitsService);

  const [formulaire, setFormulaire] = useState(FORMULAIRE_VIDE);
  const [enEdition, setEnEdition] = useState(null); // id du produit modifié
  const [aSupprimer, setASupprimer] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const champ = (nom, valeur) => setFormulaire((f) => ({ ...f, [nom]: valeur }));

  const reinitialiser = () => {
    setFormulaire(FORMULAIRE_VIDE);
    setEnEdition(null);
  };

  /** Pré-remplit le formulaire avec un produit existant. */
  const editer = (produit) => {
    setEnEdition(produit.id);
    setFormulaire({
      nom: produit.nom,
      categorie: produit.categorie,
      prix: produit.prix ?? '',
      description: produit.description,
      disponible: produit.disponible,
      image: null, // une nouvelle image remplace l'ancienne seulement si elle est choisie
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const soumettre = async (e) => {
    e.preventDefault();
    setConfirmation('');

    const payload = {
      ...formulaire,
      prix: formulaire.prix === '' ? null : Number(formulaire.prix),
      // En mock on garde l'aperçu local ; avec Laravel, envoyez un FormData (voir versFormData)
      image: formulaire.image ? URL.createObjectURL(formulaire.image) : null,
    };

    const ok = enEdition ? await modifier(enEdition, payload) : await creer(payload);
    if (ok) {
      setConfirmation(enEdition ? 'Produit mis à jour.' : 'Produit ajouté au catalogue.');
      reinitialiser();
    }
  };

  const produitsFiltres = produits.filter((p) => {
    const terme = recherche.trim().toLowerCase();
    return !terme || `${p.nom} ${p.description}`.toLowerCase().includes(terme);
  });

  return (
    <div className="space-y-5">
      <Alerte message={erreur} onFermer={() => setErreur('')} />
      <Alerte type="succes" message={confirmation} onFermer={() => setConfirmation('')} />

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
        {/* Formulaire d'ajout / modification */}
        <Carte
          titre={enEdition ? 'Modifier le produit' : 'Ajouter un produit'}
          description={enEdition ? 'Les changements sont visibles immédiatement sur la boutique.' : 'Le produit apparaît aussitôt dans le catalogue public.'}
          action={
            enEdition && (
              <BoutonAdmin variante="discret" taille="sm" icone={X} onClick={reinitialiser}>
                Annuler
              </BoutonAdmin>
            )
          }
        >
          <form onSubmit={soumettre} className="space-y-4" noValidate>
            <ChampAdmin id="nom" label="Nom du produit" obligatoire erreur={erreursChamps.nom}>
              <SaisieAdmin
                id="nom"
                value={formulaire.nom}
                onChange={(e) => champ('nom', e.target.value)}
                placeholder="Ex. Switch 24 ports Gigabit"
                required
                erreur={erreursChamps.nom}
              />
            </ChampAdmin>

            <div className="grid gap-4 sm:grid-cols-2">
              <ChampAdmin id="categorie" label="Catégorie" erreur={erreursChamps.categorie}>
                <SelectionAdmin
                  id="categorie"
                  value={formulaire.categorie}
                  onChange={(e) => champ('categorie', e.target.value)}
                >
                  {CATEGORIES_PRODUIT.map((c) => (
                    <option key={c.valeur} value={c.valeur}>{c.libelle}</option>
                  ))}
                </SelectionAdmin>
              </ChampAdmin>

              <ChampAdmin
                id="prix"
                label="Prix (FCFA)"
                indication="Laissez vide pour afficher « Sur devis »."
                erreur={erreursChamps.prix}
              >
                <SaisieAdmin
                  id="prix"
                  type="number"
                  min="0"
                  step="500"
                  value={formulaire.prix}
                  onChange={(e) => champ('prix', e.target.value)}
                  placeholder="185000"
                  erreur={erreursChamps.prix}
                />
              </ChampAdmin>
            </div>

            <ChampAdmin id="description" label="Description" obligatoire erreur={erreursChamps.description}>
              <ZoneTexteAdmin
                id="description"
                value={formulaire.description}
                onChange={(e) => champ('description', e.target.value)}
                placeholder="Caractéristiques principales, usage recommandé, garantie."
                required
                erreur={erreursChamps.description}
              />
            </ChampAdmin>

            <ChampImage
              id="image"
              label="Photo du produit"
              valeur={formulaire.image}
              onChange={(fichier) => champ('image', fichier)}
              erreur={erreursChamps.image}
            />

            <label className="flex items-center gap-3 rounded-lg border border-forest-100 px-3.5 py-3">
              <input
                type="checkbox"
                checked={formulaire.disponible}
                onChange={(e) => champ('disponible', e.target.checked)}
                className="h-4 w-4 rounded border-forest-200 text-signal focus:ring-signal"
              />
              <span className="text-sm text-ink">
                Disponible en stock
                <span className="mt-0.5 block text-xs text-slate-muted">
                  Décoché, le produit s'affiche en « Sur commande ».
                </span>
              </span>
            </label>

            <BoutonAdmin type="submit" icone={Plus} disabled={enregistrement} className="w-full">
              {enregistrement
                ? 'Enregistrement…'
                : enEdition ? 'Enregistrer les modifications' : 'Ajouter au catalogue'}
            </BoutonAdmin>
          </form>
        </Carte>

        {/* Liste des produits existants */}
        <Carte
          titre={`Catalogue (${produits.length})`}
          sansPadding
          action={
            <div className="relative w-full sm:w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" aria-hidden="true" />
              <label htmlFor="recherche-produit" className="sr-only">Rechercher un produit</label>
              <input
                id="recherche-produit"
                type="search"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                placeholder="Rechercher"
                className="w-full rounded-lg border border-forest-100 py-2 pl-9 pr-3 text-sm focus:border-signal"
              />
            </div>
          }
        >
          {chargement ? (
            <div className="p-6"><Chargement lignes={4} /></div>
          ) : produitsFiltres.length === 0 ? (
            <div className="p-6">
              <EtatVide
                titre="Aucun produit"
                message="Ajoutez votre premier article avec le formulaire à gauche."
              />
            </div>
          ) : (
            <ul className="divide-y divide-forest-50">
              {produitsFiltres.map((produit) => (
                <li key={produit.id} className="flex flex-wrap items-start gap-4 p-5">
                  <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg bg-forest-50">
                    {produit.image ? (
                      <img src={produit.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-[0.6rem] text-slate-muted">Sans photo</span>
                    )}
                  </div>

                  <div className="min-w-[12rem] flex-1">
                    <p className="font-semibold text-ink">{produit.nom}</p>
                    <p className="mt-0.5 text-xs text-slate-muted">{libelleCategorie(produit.categorie)}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-muted">{produit.description}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-forest-700">{formaterPrix(produit.prix)}</p>
                    <p className={produit.disponible ? 'mt-0.5 text-xs text-signal' : 'mt-0.5 text-xs text-slate-muted'}>
                      {produit.disponible ? 'En stock' : 'Sur commande'}
                    </p>
                    <div className="mt-3 flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => editer(produit)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-slate-muted hover:bg-forest-50 hover:text-forest-700"
                      >
                        <span className="sr-only">Modifier {produit.nom}</span>
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setASupprimer(produit)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-slate-muted hover:bg-red-50 hover:text-red-600"
                      >
                        <span className="sr-only">Supprimer {produit.nom}</span>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Carte>
      </div>

      <ConfirmationSuppression
        element={aSupprimer}
        libelle={aSupprimer ? `« ${aSupprimer.nom} »` : ''}
        onAnnuler={() => setASupprimer(null)}
        onConfirmer={async () => {
          await supprimer(aSupprimer.id);
          setASupprimer(null);
        }}
      />
    </div>
  );
}
