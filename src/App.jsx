import { Routes, Route } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/layout/ScrollToTop';

import WhatsAppFlottant from '@/components/ui/WhatsAppFlottant';

import Accueil from '@/pages/Accueil';
import APropos from '@/pages/APropos';
import Boutique from '@/pages/Boutique';
import Contact from '@/pages/Contact';
import Realisations from '@/pages/Realisations';
import NotFound from '@/pages/NotFound';

import { adminRoutes } from '@/admin/AdminRoutes';
import useTracker from '@/hooks/useTracker';

function Tracker() {
  useTracker();
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Tracker />

      {/* Bouton WhatsApp flottant global */}
      <WhatsAppFlottant />

      <Routes>
        {/* ================================
            PAGES PUBLIQUES
        ================================= */}
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil />} />

          <Route path="/a-propos" element={<APropos />} />

          <Route path="/boutique" element={<Boutique />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/realisations" element={<Realisations />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ================================
            ADMINISTRATION
        ================================= */}
        {adminRoutes}
      </Routes>
    </>
  );
}