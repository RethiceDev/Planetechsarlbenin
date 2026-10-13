import Section from '@/components/ui/Section';
import FormulaireDevis from '@/components/contact/FormulaireDevis';
import Coordonnees from '@/components/contact/Coordonnees';

export default function Contact() {
  return (
    <>
      <Section fond="clair" className="py-12 md:py-16">
        <p className="text-sm text-slate-muted">Contact et devis</p>
        <h1 className="mt-3 max-w-prose font-display text-3xl font-bold leading-tight md:text-[2.6rem]">
          Décrivez votre besoin, nous chiffrons
        </h1>
        <p className="mt-4 max-w-prose leading-relaxed text-slate-muted">
          Plus votre description est précise (matériel, quantités, lieu, délai), plus le devis
          sera rapide et fidèle à votre projet.
        </p>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <FormulaireDevis />
          <Coordonnees />
        </div>
      </Section>
    </>
  );
}
