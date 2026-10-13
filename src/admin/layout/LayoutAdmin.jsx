import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin';
import TopbarAdmin from './TopbarAdmin';
import { devisService } from '@/admin/services/adminServices';

/** Titre affiché dans la barre supérieure selon la route active. */
const TITRES = {
  '/admin': ["Vue d'ensemble", "L'activité du site en un coup d'œil"],
  '/admin/devis': ['Demandes de devis', 'Suivez et qualifiez les demandes reçues'],
  '/admin/produits': ['Boutique', 'Ajoutez et mettez à jour le catalogue'],
  '/admin/expertises': ['Domaines de compétence', 'Gérez les métiers affichés sur le site'],
  '/admin/equipe': ['Équipe et partenaires', 'Membres de l’équipe et logos partenaires'],
};

export default function LayoutAdmin() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [nouveauxDevis, setNouveauxDevis] = useState(0);
  const { pathname } = useLocation();

  const [titre, sousTitre] = TITRES[pathname] ?? ['Administration', ''];

  // Compteur affiché dans le menu et la cloche
  useEffect(() => {
    devisService
      .lister()
      .then((devis) => setNouveauxDevis(devis.filter((d) => d.statut === 'nouveau').length))
      .catch(() => setNouveauxDevis(0));
  }, [pathname]);

  // Verrouille le défilement du fond quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOuvert ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOuvert]);

  return (
    <div className="flex min-h-screen bg-forest-50/60">
      <SidebarAdmin
        ouvert={menuOuvert}
        onFermer={() => setMenuOuvert(false)}
        nombreNouveauxDevis={nouveauxDevis}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopbarAdmin
          titre={titre}
          sousTitre={sousTitre}
          alertes={nouveauxDevis}
          onOuvrirMenu={() => setMenuOuvert(true)}
        />
        <main className="flex-1 p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
