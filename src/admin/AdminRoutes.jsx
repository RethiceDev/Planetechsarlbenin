import { Route } from 'react-router-dom';
import LayoutAdmin from './layout/LayoutAdmin';
import DashboardHome from './pages/DashboardHome';
import DevisTable from './pages/DevisTable';
import ProduitsManager from './pages/ProduitsManager';
import ExpertisesManager from './pages/ExpertisesManager';
import EquipeEtPartenaires from './pages/EquipeEtPartenaires';

/**
 * Routes du tableau de bord, à insérer dans le <Routes> de App.jsx :
 *
 *   import { adminRoutes } from '@/admin/AdminRoutes';
 *   ...
 *   <Routes>
 *     ... vos routes publiques ...
 *     {adminRoutes}
 *   </Routes>
 *
 * Une fois l'authentification en place, enveloppez ce bloc dans une route protégée.
 */
export const adminRoutes = (
  <Route path="/admin" element={<LayoutAdmin />}>
    <Route index element={<DashboardHome />} />
    <Route path="devis" element={<DevisTable />} />
    <Route path="produits" element={<ProduitsManager />} />
    <Route path="expertises" element={<ExpertisesManager />} />
    <Route path="equipe" element={<EquipeEtPartenaires />} />
  </Route>
);

export default adminRoutes;
