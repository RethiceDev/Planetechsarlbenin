import { Outlet } from 'react-router-dom';
import EnTete from './EnTete';
import PiedDePage from './PiedDePage';

/** Gabarit commun : en-tête collant, contenu de page, pied de page. */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-forest-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>
      <EnTete />
      <main id="contenu" className="flex-1">
        <Outlet />
      </main>
      <PiedDePage />
    </div>
  );
}
