import Section from '@/components/ui/Section';
import TitreSection from '@/components/ui/TitreSection';
import AppelDevis from '@/components/home/AppelDevis';
import { ENTREPRISE } from '@/data/entreprise';

const VALEURS = [
  [
    'Expertise',
    "Une équipe de techniciens et d'ingénieurs qualifiés, expérimentés dans les domaines des technologies, des télécommunications, de l'électricité et de l'informatique.",
  ],
  [
    'Qualité de service',
    "Une attention particulière portée à la qualité des installations, à la disponibilité des équipes et au service après-vente.",
  ],
  [
    'Accompagnement',
    "Un partenaire technique qui accompagne les entreprises et organisations dans leurs projets, de la fourniture des équipements à leur installation et leur maintenance.",
  ],
];

const DOMAINES = [
  {
    numero: '01',
    titre: 'Électricité générale',
    texte:
      'Fourniture, installation et entretien des lignes et équipements électriques, des transformateurs et des groupes électrogènes.',
  },
  {
    numero: '02',
    titre: 'Télécommunication',
    texte:
      'Déploiement de réseaux BLR, VSAT et optiques, raccordements FTTH, FTTB et FTTX, installation de pylônes et maintenance des réseaux.',
  },
  {
    numero: '03',
    titre: 'Sécurité du bâtiment',
    texte:
      "Installation et maintenance des systèmes d'alarme incendie et intrusion, vidéosurveillance, contrôle d'accès et équipements de sécurité.",
  },
  {
    numero: '04',
    titre: 'Informatique',
    texte:
      "Fourniture, installation et maintenance de serveurs, switchs, routeurs, ordinateurs et équipements informatiques de différentes marques.",
  },
  {
    numero: '05',
    titre: 'BTP',
    texte:
      "Conception, études et réalisation d’ouvrages de bâtiment et de travaux publics, avec une expertise en construction, réhabilitation, aménagement et suivi des travaux.",
  },
];

export default function APropos() {
  return (
    <>
      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <Section fond="clair" className="py-14 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">

          {/* TEXTE */}
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">
              À propos de PLANETECH
            </p>

            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
              {ENTREPRISE.nom}, votre partenaire technique au Bénin, Togo et
              Côte d'Ivoire
            </h1>

            <div className="mt-6 h-1 w-20 rounded-full bg-forest-700" />

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-muted md:text-lg">
              Depuis sa création, PLANETECH SARL accompagne les entreprises,
              administrations et organisations dans la réalisation de leurs
              projets techniques et technologiques.
            </p>

            {/* PETITS INDICATEURS */}
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-forest-100 bg-white p-4 shadow-sm">
                <p className="font-display text-2xl font-bold text-forest-700">
                  2006
                </p>
                <p className="mt-1 text-xs text-slate-muted">
                  Année de création
                </p>
              </div>

              <div className="rounded-2xl border border-forest-100 bg-white p-4 shadow-sm">
                <p className="font-display text-2xl font-bold text-forest-700">
                  2013
                </p>
                <p className="mt-1 text-xs text-slate-muted">
                  PLANETECH SARL
                </p>
              </div>

              <div className="col-span-2 rounded-2xl border border-forest-100 bg-white p-4 shadow-sm sm:col-span-1">
                <p className="font-display text-2xl font-bold text-forest-700">
                  4+
                </p>
                <p className="mt-1 text-xs text-slate-muted">
                  Domaines d'expertise
                </p>
              </div>
            </div>
          </div>

          {/* LOGO */}
          <div className="relative flex min-h-[300px] items-center justify-center lg:min-h-[380px]">

            {/* Cercle décoratif derrière le logo */}
            <div className="absolute h-64 w-64 rounded-full bg-forest-100/70 blur-2xl md:h-80 md:w-80" />

            {/* Cercle principal */}
            <div className="absolute h-56 w-56 rounded-full border border-forest-100 bg-white/60 md:h-72 md:w-72" />

            {/* Logo */}
            <div className="relative z-10 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Logo PLANETECH SARL"
                className="
                  h-auto
                  max-h-56
                  w-auto
                  max-w-[280px]
                  object-contain
                  drop-shadow-[0_18px_30px_rgba(15,44,35,0.16)]
                  md:max-h-64
                  md:max-w-[330px]
                "
                loading="eager"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* =========================================================
          HISTOIRE + PRÉSENTATION
      ========================================================= */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">

          {/* HISTOIRE */}
          <div className="max-w-prose space-y-5 leading-relaxed text-slate-muted">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-forest-700">
                Notre histoire
              </p>

              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Une entreprise construite sur l'expérience
              </h2>
            </div>

            <p>
              Créée en{' '}
              <strong className="text-slate-900">2006</strong> sous
              l'enseigne SEVA LUMIÈRE, l'entreprise est devenue{' '}
              <strong className="text-slate-900">PLANETECH SARL</strong> en
              février 2013.
            </p>

            <p>
              Basée à{' '}
              <strong className="text-slate-900">
                Houéyiho à Cotonou
              </strong>
              , PLANETECH SARL intervient dans plusieurs domaines
              complémentaires : télécommunication, électricité générale,
              sécurité du bâtiment et informatique.
            </p>

            <p>
              Au fil des années, l'entreprise a développé son savoir-faire à
              travers différents projets au Bénin et dans la sous-région, en
              s'appuyant sur une équipe composée de techniciens et d'ingénieurs
              qualifiés, dynamiques et motivés.
            </p>

            <p>
              PLANETECH accorde également une importance particulière au{' '}
              <strong className="text-slate-900">
                service après-vente
              </strong>
              , avec des équipes dédiées à la maintenance des matériels
              commercialisés et des installations réalisées.
            </p>
          </div>

          {/* BLOCS À DROITE */}
          <div className="space-y-5">

            <article className="rounded-3xl border border-forest-100 bg-white p-7 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-wider text-slate-muted">
                Notre parcours
              </p>

              <div className="mt-6 flex items-end gap-4">
                <span className="font-display text-5xl font-bold text-forest-700">
                  2006
                </span>

                <span className="pb-1 text-sm text-slate-muted">
                  année de création
                </span>
              </div>

              <div className="my-6 h-px bg-forest-100" />

              <div className="flex items-end gap-4">
                <span className="font-display text-5xl font-bold text-forest-700">
                  2013
                </span>

                <span className="pb-1 text-sm text-slate-muted">
                  création de PLANETECH SARL
                </span>
              </div>
            </article>

            <article className="rounded-3xl bg-forest-700 p-7 text-white shadow-lg">
              <p className="text-sm font-medium uppercase tracking-wider text-forest-100">
                Notre engagement
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Une expertise au service de vos projets
              </h2>

              <p className="mt-4 leading-relaxed text-forest-100">
                PLANETECH met son expérience, ses compétences techniques et
                ses moyens matériels au service de la réussite des projets de
                ses clients.
              </p>
            </article>
          </div>
        </div>
      </Section>

      {/* =========================================================
          NOTRE VISION ET NOTRE DÉVELOPPEMENT
      ========================================================= */}
      <Section fond="clair">
        <TitreSection
          titre="Notre vision et notre développement"
          sousTitre="Une politique de développement fondée sur l'humain, la compétence et l'innovation."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          {/* PREMIÈRE PARTIE */}
          <div className="space-y-6">

            <article className="rounded-3xl border border-forest-100 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 font-display font-bold text-forest-700">
                  01
                </span>

                <h3 className="font-display text-xl font-bold text-slate-900">
                  L'Homme au cœur de notre développement
                </h3>
              </div>

              <p className="leading-8 text-slate-muted">
                Pour sa politique de développement,{' '}
                <strong className="text-slate-900">
                  PLANETECH Sarl
                </strong>{' '}
                a choisi de promouvoir l'Homme, car les hommes sont à la base
                de la réussite de l'entreprise et constituent son véritable
                potentiel de croissance.
              </p>
            </article>

            <article className="rounded-3xl border border-forest-100 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 font-display font-bold text-forest-700">
                  02
                </span>

                <h3 className="font-display text-xl font-bold text-slate-900">
                  Compétence et innovation
                </h3>
              </div>

              <p className="leading-8 text-slate-muted">
                Dans un marché qui ne laisse pas de place au risque d'erreur,{' '}
                <strong className="text-slate-900">
                  PLANETECH Sarl
                </strong>{' '}
                a toujours su, en s'appuyant sur sa compétence dans le domaine
                des technologies nouvelles, électriques et électroniques au
                BENIN, mettre en évidence son savoir-faire et sa capacité
                d'innovation.
              </p>
            </article>
          </div>

          {/* DEUXIÈME PARTIE */}
          <div className="space-y-6">

            <article className="rounded-3xl border border-forest-100 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 font-display font-bold text-forest-700">
                  03
                </span>

                <h3 className="font-display text-xl font-bold text-slate-900">
                  Une gamme complète de services
                </h3>
              </div>

              <p className="leading-8 text-slate-muted">
                Poursuivant son évolution,{' '}
                <strong className="text-slate-900">
                  PLANETECH Sarl
                </strong>{' '}
                vous propose une gamme complète de produits, de services et de
                services après-vente pour votre société.
              </p>
            </article>

            <article className="rounded-3xl border border-forest-100 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 font-display font-bold text-forest-700">
                  04
                </span>

                <h3 className="font-display text-xl font-bold text-slate-900">
                  Un partenaire privilégié
                </h3>
              </div>

              <p className="leading-8 text-slate-muted">
                Au-delà de la fourniture de produits et de services,{' '}
                <strong className="text-slate-900">
                  PLANETECH Sarl
                </strong>{' '}
                veut être, pour ses clients, un partenaire privilégié qui les
                soutient et les assiste tout au long de la croissance de leur
                entreprise.
              </p>
            </article>
          </div>
        </div>
      </Section>

      {/* =========================================================
          ÉQUIPE + SERVICE APRÈS-VENTE
      ========================================================= */}
      <Section>
        <TitreSection
          titre="Une équipe au service de nos clients"
          sousTitre="Des collaborateurs qualifiés, disponibles et engagés dans la réussite des projets."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-3">

          {/* ÉQUIPE */}
          <article className="rounded-3xl border border-forest-100 bg-white p-7 shadow-sm lg:col-span-2">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-forest-700">
                Nos collaborateurs
              </p>

              <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">
                Une équipe commerciale et technique expérimentée
              </h3>
            </div>

            <p className="leading-8 text-slate-muted">
              <strong className="text-slate-900">
                PLANETECH Sarl
              </strong>{' '}
              a su s'entourer d'une équipe commerciale, d'ingénieurs
              qualifiés, dynamique et motivée qui ont fait leur preuve au bénin
              et dans la sous-région sur plusieurs projets dont les clients
              apprécient la disponibilité et les compétences ;
            </p>
          </article>

          {/* EXPANSION */}
          <article className="rounded-3xl bg-forest-700 p-7 text-white shadow-lg">
            <p className="text-sm font-medium uppercase tracking-wider text-forest-100">
              Notre développement
            </p>

            <h3 className="mt-3 font-display text-2xl font-bold">
              Une adaptation permanente
            </h3>

            <p className="mt-4 leading-8 text-forest-100">
              L'expansion de{' '}
              <strong className="text-white">
                PLANETECH Sarl
              </strong>{' '}
              nécessite une adaptation constante et une qualification
              permanente de son personnel.
            </p>
          </article>
        </div>

        {/* SERVICE APRÈS-VENTE */}
        <div className="mt-8 rounded-3xl border border-forest-100 bg-forest-50 p-7 md:p-9">
          <div className="grid items-start gap-6 md:grid-cols-[auto_1fr]">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-forest-700 text-lg font-bold text-white">
              SAV
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-forest-700">
                Service après-vente
              </p>

              <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">
                Une attention particulière portée à la maintenance
              </h3>

              <p className="mt-4 max-w-4xl leading-8 text-slate-muted">
                <strong className="text-slate-900">
                  PLANETECH Sarl
                </strong>{' '}
                apporte toute son attention au service après-vente qui assure
                la maintenance des matériels commercialisés et des
                installations. Elle dispose pour ce faire, des techniciens et
                ingénieurs spécialement formés en usine.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* =========================================================
          NOS DOMAINES
      ========================================================= */}
      <Section fond="clair">
        <TitreSection
          titre="Nos domaines d'expertise"
          sousTitre="Des compétences complémentaires pour répondre aux besoins techniques de nos clients."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {DOMAINES.map((domaine) => (
            <article
              key={domaine.numero}
              className="
                group rounded-2xl border border-forest-100
                bg-white p-7 transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
              "
            >
              <div className="flex items-start gap-5">
                <span className="font-display text-2xl font-bold text-forest-200 transition-colors group-hover:text-forest-700">
                  {domaine.numero}
                </span>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {domaine.titre}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-muted">
                    {domaine.texte}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* =========================================================
          VALEURS
      ========================================================= */}
      <Section>
        <TitreSection
          titre="Nos engagements"
          sousTitre="Une approche fondée sur l'expertise, la qualité et l'accompagnement."
        />

        <dl className="mt-10 grid gap-6 md:grid-cols-3">
          {VALEURS.map(([titre, texte]) => (
            <div
              key={titre}
              className="
                rounded-2xl border border-forest-100
                bg-white p-7 transition-shadow
                hover:shadow-md
              "
            >
              <dt className="text-base font-semibold text-forest-700">
                {titre}
              </dt>

              <dd className="mt-3 text-sm leading-relaxed text-slate-muted">
                {texte}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* =========================================================
          APPEL DEVIS
      ========================================================= */}
      <AppelDevis />
    </>
  );
}