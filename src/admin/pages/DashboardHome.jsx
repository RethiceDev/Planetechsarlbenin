import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShoppingBag, Wrench, Users, ArrowUpRight } from 'lucide-react';
import CarteStat from '@/admin/ui/CarteStat';
import Carte from '@/admin/ui/Carte';
import Alerte from '@/admin/ui/Alerte';
import Chargement from '@/admin/ui/Chargement';
import EtatVide from '@/admin/ui/EtatVide';
import { chargerStatistiques } from '@/admin/services/adminServices';
import { parseApiError } from '@/services/api';
import { formaterDate, libelleDomaine, statutDevis } from '@/admin/data/referentiels';

/** Raccourcis vers les sections les plus utilisées. */
const RACCOURCIS = [
  { to: '/admin/devis', libelle: 'Traiter les devis', detail: 'Qualifier les demandes reçues' },
  { to: '/admin/produits', libelle: 'Ajouter un produit', detail: 'Enrichir le catalogue de la boutique' },
  { to: '/admin/expertises', libelle: 'Mettre à jour les expertises', detail: 'Métiers affichés sur l’accueil' },
];

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    let annule = false;

    chargerStatistiques()
      .then((data) => { if (!annule) setStats(data); })
      .catch((e) => { if (!annule) setErreur(parseApiError(e).message); })
      .finally(() => { if (!annule) setChargement(false); });

    return () => { annule = true; };
  }, []);

  if (chargement) return <Chargement lignes={5} />;

  if (erreur) return <Alerte message={erreur} onFermer={() => setErreur('')} />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <CarteStat
          libelle="Demandes de devis"
          valeur={stats.devis_total}
          detail={`${stats.devis_nouveaux} en attente de traitement`}
          icone={FileText}
          accent
        />
        <CarteStat
          libelle="Produits en boutique"
          valeur={stats.produits_total}
          detail={`${stats.produits_indisponibles} sur commande`}
          icone={ShoppingBag}
        />
        <CarteStat
          libelle="Domaines de compétence"
          valeur={stats.expertises_total}
          detail="Affichés sur la page d'accueil"
          icone={Wrench}
        />
        <CarteStat
          libelle="Membres de l'équipe"
          valeur={stats.equipe_total}
          detail="Direction, administration, technique"
          icone={Users}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Carte
          titre="Dernières demandes"
          description="Les quatre demandes les plus récentes"
          sansPadding
          action={
            <Link
              to="/admin/devis"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal hover:text-forest-600"
            >
              Tout voir <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          }
        >
          {stats.derniers_devis?.length ? (
            <ul className="divide-y divide-forest-50">
              {stats.derniers_devis.map((devis) => {
                const statut = statutDevis(devis.statut);
                return (
                  <li key={devis.id} className="flex flex-wrap items-center gap-3 px-6 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">
                        {devis.raison_sociale || devis.nom}
                      </p>
                      <p className="truncate text-xs text-slate-muted">
                        {libelleDomaine(devis.domaine)} · {formaterDate(devis.created_at)}
                      </p>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statut.classes}`}>
                      {statut.libelle}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-6">
              <EtatVide titre="Aucune demande pour l'instant" message="Les demandes envoyées depuis le site s'afficheront ici." />
            </div>
          )}
        </Carte>

        <Carte titre="Raccourcis">
          <ul className="space-y-2">
            {RACCOURCIS.map((raccourci) => (
              <li key={raccourci.to}>
                <Link
                  to={raccourci.to}
                  className="flex items-start justify-between gap-3 rounded-lg border border-forest-100 px-4 py-3 transition-colors hover:border-signal"
                >
                  <span>
                    <span className="block text-sm font-semibold text-forest-700">{raccourci.libelle}</span>
                    <span className="mt-0.5 block text-xs text-slate-muted">{raccourci.detail}</span>
                  </span>
                  <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-slate-muted" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Carte>
      </div>
    </div>
  );
}
