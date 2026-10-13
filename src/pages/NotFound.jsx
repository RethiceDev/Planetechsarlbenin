import Section from '@/components/ui/Section';
import Bouton from '@/components/ui/Bouton';

export default function NotFound() {
  return (
    <Section className="py-24">
      <p className="text-sm text-slate-muted">Erreur 404</p>
      <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">Cette page n'existe pas</h1>
      <p className="mt-4 max-w-prose text-slate-muted">
        Le lien est peut-être obsolète. Revenez à l'accueil ou consultez le catalogue.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Bouton to="/">Retour à l'accueil</Bouton>
        <Bouton to="/boutique" variante="contour">Voir la boutique</Bouton>
      </div>
    </Section>
  );
}
