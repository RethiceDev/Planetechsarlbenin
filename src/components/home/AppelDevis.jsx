import Bouton from '@/components/ui/Bouton';
import { ENTREPRISE, telHref } from '@/data/entreprise';

/** Rappel d'appel à l'action, réutilisable en bas des pages. */
export default function AppelDevis() {
  return (
    <section className="bg-forest-700 py-14 text-white">
      <div className="container flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white">
            Un projet à chiffrer&nbsp;? Recevez votre devis sous 48&nbsp;h.
          </h2>
          <p className="mt-2 text-forest-100">
            Écrivez-nous à {ENTREPRISE.email} ou appelez directement l'équipe.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Bouton to="/contact">Remplir le formulaire</Bouton>
          <Bouton href={telHref(ENTREPRISE.telephones[1])} variante="clair">
            {ENTREPRISE.telephones[1]}
          </Bouton>
        </div>
      </div>
    </section>
  );
}
