import Section from '@/components/ui/Section';
import TitreSection from '@/components/ui/TitreSection';

import btpImage from '@/assets/domaines/btp.jpg';
import informatiqueImage from '@/assets/domaines/informatique.jpg';
import electriciteImage from '@/assets/domaines/electricite.jpg';
import telecomReseauImage from '@/assets/domaines/telecom-reseau.jpg';
import fibreFtthImage from '@/assets/domaines/fibre-ftth.jpg';

const EXPERTISES = [
  {
    id: 1,
    titre: 'BTP',
    description:
      "PLANETECH SARL intervient dans les travaux de BTP ainsi que dans la conception, les études et la réalisation d'ouvrages d'art. Nos équipes mettent leur savoir-faire technique au service de projets adaptés aux exigences de chaque chantier.",
    visuel: btpImage,
  },

  {
    id: 2,
    titre: 'Informatique',
    description:
      "PLANETECH assure la fourniture, l'installation et la maintenance des équipements informatiques. Nous intervenons notamment sur les serveurs CISCO, HP, DELL et autres marques, ainsi que sur les ordinateurs, switchs, routeurs et différentes infrastructures réseau.",
    visuel: informatiqueImage,
  },

  {
    id: 3,
    titre: 'Électricité Général',
    description:
      "PLANETECH SARL accompagne ses clients dans leurs travaux d'électricité générale, notamment la fourniture, l'installation et l'entretien des lignes BT et HT, des transformateurs BT et HT ainsi que des groupes électrogènes.",
    visuel: electriciteImage,
  },

  {
    id: 4,
    titre: 'Télécom et Réseau',
    description:
      "Notre expertise couvre l'installation de pylônes, le déploiement des réseaux BLR et VSAT ainsi que la mise en place de réseaux informatiques. PLANETECH intervient également dans le déploiement et la maintenance des infrastructures de télécommunication.",
    visuel: telecomReseauImage,
  },

  {
    id: 5,
    titre: 'Branchement FTTH / FTTX',
    description:
      "PLANETECH intervient dans le déploiement des réseaux optiques et le raccordement des abonnés aux technologies FTTH, FTTB et FTTX. Nos équipes assurent également la maintenance des réseaux optiques afin de garantir la continuité et la qualité des installations.",
    visuel: fibreFtthImage,
  },
];

export default function Expertises() {
  return (
    <Section fond="clair">

      <TitreSection
        titre="Nos expertises"
        chapo="Des compétences techniques et des solutions adaptées aux besoins des entreprises, administrations et organisations."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {EXPERTISES.map((expertise) => (
          <article
            key={expertise.id}
            className="
              overflow-hidden
              rounded-2xl
              border
              border-border
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            {/* Image */}
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img
                src={expertise.visuel}
                alt={`PLANETECH SARL - ${expertise.titre}`}
                loading="lazy"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  hover:scale-105
                "
              />
            </div>

            {/* Contenu */}
            <div className="p-7">

              <span
                className="
                  inline-flex
                  rounded-full
                  bg-forest-50
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-forest-700
                "
              >
                Expertise
              </span>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {expertise.titre}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-muted">
                {expertise.description}
              </p>

            </div>

          </article>
        ))}

        {/* Dernière carte */}
        <article
          className="
            rounded-2xl
            bg-forest-50
            p-7
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-md
          "
        >
          <span
            className="
              inline-flex
              rounded-full
              bg-white
              px-3
              py-1
              text-xs
              font-medium
              text-forest-700
            "
          >
            Votre projet
          </span>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Un besoin spécifique ?
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-muted">
            Vous avez un projet en BTP, télécommunication, électricité,
            informatique ou réseau ? Décrivez-nous votre besoin et notre
            équipe vous accompagnera avec une solution adaptée à votre
            projet.
          </p>
        </article>

      </div>

    </Section>
  );
}