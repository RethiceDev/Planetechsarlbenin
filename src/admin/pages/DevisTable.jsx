import { Fragment, useMemo, useState } from 'react';
import { Search, ChevronDown, Mail, Phone, Trash2 } from 'lucide-react';
import Carte from '@/admin/ui/Carte';
import Alerte from '@/admin/ui/Alerte';
import Chargement from '@/admin/ui/Chargement';
import EtatVide from '@/admin/ui/EtatVide';
import BoutonAdmin from '@/admin/ui/BoutonAdmin';
import ConfirmationSuppression from '@/admin/ui/ConfirmationSuppression';
import { useRessource } from '@/admin/hooks/useRessource';
import { devisService, changerStatutDevis } from '@/admin/services/adminServices';
import {
  STATUTS_DEVIS, statutDevis, libelleDomaine, formaterDateHeure,
} from '@/admin/data/referentiels';
import { cn } from '@/utils/cn';


/** Le select met à jour le statut via le hook (API + état local unifiés). */
  


/** Onglets de filtrage : « tous » + un onglet par statut. */
const FILTRES = [{ valeur: 'tous', libelle: 'Toutes' }, ...STATUTS_DEVIS];

export default function DevisTable() {
  const { elements: devis, chargement, erreur, setErreur, supprimer, modifier } =
    useRessource(devisService);

  const [filtre, setFiltre] = useState('tous');
  const [recherche, setRecherche] = useState('');
  const [ligneOuverte, setLigneOuverte] = useState(null);
  const [aSupprimer, setASupprimer] = useState(null);

  // Filtrage combiné statut + recherche plein texte
  const devisFiltres = useMemo(() => {
    const terme = recherche.trim().toLowerCase();
    return (devis || []).filter((d) => {
      const okStatut = filtre === 'tous' || d.statut === filtre;
      const okRecherche =
        !terme ||
        [d.nom, d.email, d.raison_sociale, d.telephone, d.reference]
          .filter(Boolean)
          .some((champ) => champ.toLowerCase().includes(terme));
      return okStatut && okRecherche;
    });
  }, [devis, filtre, recherche]);

  const compter = (valeur) =>
    valeur === 'tous' ? (devis || []).length : (devis || []).filter((d) => d.statut === valeur).length;

  /** Le select met à jour le statut côté API puis dans la liste locale. */
 /** Le select met à jour le statut via le hook (API + état local unifiés). */

  const surChangementStatut = async (id, statut) => {
    const succes = await modifier(id, { statut });
    if (!succes) {
      // L'erreur est déjà gérée et affichée par le hook, 
      // mais vous pouvez personnaliser si besoin
    }
  };

  return (
    <div className="space-y-5">
      <Alerte message={erreur} onFermer={() => setErreur('')} />

      {/* Barre de filtres */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par statut">
          {FILTRES.map((f) => (
            <button
              key={f.valeur}
              type="button"
              onClick={() => setFiltre(f.valeur)}
              aria-pressed={filtre === f.valeur}
              className={cn(
                'rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors',
                filtre === f.valeur
                  ? 'border-signal bg-signal text-white'
                  : 'border-forest-100 bg-white text-slate-muted hover:border-forest-200 hover:text-forest-700'
              )}
            >
              {f.libelle}
              <span className={cn('ml-2 text-xs', filtre === f.valeur ? 'text-white/80' : 'text-slate-muted')}>
                {compter(f.valeur)}
              </span>
            </button>
          ))}
        </div>

        <div className="relative lg:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-muted" aria-hidden="true" />
          <label htmlFor="recherche-devis" className="sr-only">Rechercher une demande</label>
          <input
            id="recherche-devis"
            type="search"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Nom, société, email, référence"
            className="w-full rounded-lg border border-forest-100 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-slate-muted/60 focus:border-signal"
          />
        </div>
      </div>

      <Carte sansPadding>
        {chargement ? (
          <div className="p-6"><Chargement lignes={4} /></div>
        ) : devisFiltres.length === 0 ? (
          <div className="p-6">
            <EtatVide
              titre="Aucune demande ne correspond"
              message="Changez de filtre ou effacez la recherche pour revoir toutes les demandes."
            />
          </div>
        ) : (
          <>
            {/* Tableau : à partir de lg */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-forest-50 bg-forest-50/50 text-xs font-semibold text-forest-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">Demandeur</th>
                    <th scope="col" className="px-6 py-3">Coordonnées</th>
                    <th scope="col" className="px-6 py-3">Domaine</th>
                    <th scope="col" className="px-6 py-3">Reçue le</th>
                    <th scope="col" className="px-6 py-3">Statut</th>
                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest-50">
                  {devisFiltres.map((d) => (
                    <Fragment key={d.id}>
                      <tr className="align-top hover:bg-forest-50/40">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-ink">{d.nom}</p>
                          <p className="mt-0.5 text-xs text-slate-muted">
                            {d.type_client === 'societe' ? d.raison_sociale : 'Personne physique'}
                          </p>
                          <p className="mt-1 text-xs text-slate-muted">{d.reference}</p>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`mailto:${d.email}`} className="block text-forest-700 hover:text-signal">
                            {d.email}
                          </a>
                          <a
                            href={`tel:${(d.indicatif + d.telephone).replace(/\s/g, '')}`}
                            className="mt-0.5 block text-xs text-slate-muted hover:text-signal"
                          >
                            {d.indicatif} {d.telephone}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-slate-muted">{libelleDomaine(d.domaine)}</td>
                        <td className="px-6 py-4 text-slate-muted">{formaterDateHeure(d.created_at)}</td>
                        <td className="px-6 py-4">
                          <label htmlFor={`statut-${d.id}`} className="sr-only">Statut de la demande</label>
                          <select
                            id={`statut-${d.id}`}
                            value={d.statut || 'en_attente'}
                            onChange={(e) => surChangementStatut(d.id, e.target.value)}
                            className={cn(
                              'rounded-full border px-3 py-1.5 text-xs font-medium focus:border-signal',
                              statutDevis(d.statut)?.classes
                            )}
                          >
                            {STATUTS_DEVIS.map((s) => (
                              <option key={s.valeur} value={s.valeur}>{s.libelle}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setLigneOuverte(ligneOuverte === d.id ? null : d.id)}
                              aria-expanded={ligneOuverte === d.id}
                              className="grid h-8 w-8 place-items-center rounded-lg text-slate-muted hover:bg-forest-50 hover:text-forest-700"
                            >
                              <span className="sr-only">Voir le détail du besoin</span>
                              <ChevronDown
                                size={16}
                                className={cn('transition-transform', ligneOuverte === d.id && 'rotate-180')}
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => setASupprimer(d)}
                              className="grid h-8 w-8 place-items-center rounded-lg text-slate-muted hover:bg-red-50 hover:text-red-600"
                            >
                              <span className="sr-only">Supprimer la demande</span>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {ligneOuverte === d.id && (
                        <tr className="bg-forest-50/60">
                          <td colSpan={6} className="px-6 py-5">
                            <p className="text-xs font-semibold text-forest-700">Besoins exprimés</p>
                            <p className="mt-2 max-w-3xl whitespace-pre-line leading-relaxed text-slate-muted">
                              {d.besoins}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              <BoutonAdmin
                                variante="contour"
                                taille="sm"
                                icone={Mail}
                                onClick={() => { window.location.href = `mailto:${d.email}?subject=Votre demande ${d.reference}`; }}
                              >
                                Répondre par email
                              </BoutonAdmin>
                              <BoutonAdmin
                                variante="contour"
                                taille="sm"
                                icone={Phone}
                                onClick={() => { window.location.href = `tel:${(d.indicatif + d.telephone).replace(/\s/g, '')}`; }}
                              >
                                Appeler
                              </BoutonAdmin>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cartes : mobile et tablette */}
            <ul className="divide-y divide-forest-50 lg:hidden">
              {devisFiltres.map((d) => (
                <li key={d.id} className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">{d.nom}</p>
                      <p className="text-xs text-slate-muted">
                        {d.type_client === 'societe' ? d.raison_sociale : 'Personne physique'} · {d.reference}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${statutDevis(d.statut)?.classes}`}>
                      {statutDevis(d.statut)?.libelle}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <a href={`mailto:${d.email}`} className="block break-all text-forest-700">{d.email}</a>
                    <a href={`tel:${(d.indicatif + d.telephone).replace(/\s/g, '')}`} className="block text-slate-muted">
                      {d.indicatif} {d.telephone}
                    </a>
                    <p className="text-xs text-slate-muted">
                      {libelleDomaine(d.domaine)} · {formaterDateHeure(d.created_at)}
                    </p>
                  </div>

                  <p className="whitespace-pre-line rounded-lg bg-forest-50 p-3 text-sm leading-relaxed text-slate-muted">
                    {d.besoins}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <label htmlFor={`statut-mobile-${d.id}`} className="sr-only">Statut</label>
                    <select
                      id={`statut-mobile-${d.id}`}
                      value={d.statut || 'en_attente'}
                      onChange={(e) => surChangementStatut(d.id, e.target.value)}
                      className="rounded-lg border border-forest-100 px-3 py-2 text-xs font-medium focus:border-signal"
                    >
                      {STATUTS_DEVIS.map((s) => (
                        <option key={s.valeur} value={s.valeur}>{s.libelle}</option>
                      ))}
                    </select>
                    <BoutonAdmin variante="danger" taille="sm" icone={Trash2} onClick={() => setASupprimer(d)}>
                      Erreur / Supprimer
                    </BoutonAdmin>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </Carte>

      <ConfirmationSuppression
        element={aSupprimer}
        libelle={aSupprimer ? `la demande ${aSupprimer.reference}` : ''}
        onAnnuler={() => setASupprimer(null)}
        onConfirmer={async () => {
          await supprimer(aSupprimer.id);
          setASupprimer(null);
        }}
      />
    </div>
  );
}