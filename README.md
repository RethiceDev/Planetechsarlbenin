# PLANETECH SARL — site corporate (React + Tailwind CSS)

Front-end du site de **PLANETECH SARL**, entreprise de technologies, télécommunications et
services basée à Cotonou (Bénin). L'architecture est prête à être branchée sur une API Laravel.

## Démarrage

```bash
npm install
cp .env.example .env
npm run dev          # http://localhost:5173
npm run build        # génère dist/
```

En mode `VITE_USE_MOCK_API=true` (valeur par défaut), le site fonctionne **sans backend** :
le catalogue est servi depuis `src/data/produits.js` et le formulaire de devis simule un envoi.

## Arborescence

```
src/
├── components/
│   ├── layout/     EnTete, PiedDePage, Layout, ScrollToTop
│   ├── ui/         Bouton, Section, TitreSection, Champ, Logo
│   ├── home/       Hero, Expertises, Equipe, Partenaires, AppelDevis
│   ├── boutique/   CarteProduit, FiltresBoutique
│   └── contact/    FormulaireDevis, Coordonnees
├── pages/          Accueil, APropos, Boutique, Contact, NotFound
├── services/       api.js (Axios), devisService.js, produitService.js
├── hooks/          useDevisForm.js
├── data/           entreprise, expertises, equipe, produits, partenaires
└── utils/          validation.js, cn.js
```

Le contenu éditorial (coordonnées, expertises, équipe, catalogue de démo) est centralisé dans
`src/data/` : modifiez ces fichiers plutôt que les composants.

## Pages

| Route | Contenu |
|---|---|
| `/` | Bannière « Ne perdez pas de temps. Nous avons la solution ! », expertises, équipe, partenaires |
| `/a-propos` | Présentation, vision, mission, engagements |
| `/boutique` | Catalogue filtrable (informatique, réseau, électrique, outillage) |
| `/contact` | Formulaire de devis société / personne physique + coordonnées |

## Design

- Vert profond `forest-700 #0B4A32` pour les fonds et les titres, vert signal `#22B573` pour les
  actions, blanc pour le reste.
- Typographies : **Sora** (titres) et **Plus Jakarta Sans** (texte), chargées depuis Google Fonts.
- Responsive du mobile au grand écran, focus clavier visible, `prefers-reduced-motion` respecté.

## Connexion à Laravel

Voir `docs-laravel/` : routes, `FormRequest`, contrôleur, migration de la table `devis`, et notes
CORS / Sanctum / déploiement.

Endpoints attendus :

- `POST /api/devis` — demande de devis
- `POST /api/contact` — message simple
- `GET /api/produits?categorie=&recherche=` — catalogue
- `GET /api/produits/{id}` — détail

## Contact

04 BP 0625 Cotonou, Houéyiho · +229 64 54 99 59 / +229 97 89 29 82 / +229 68 68 18 85 ·
planetechsarlbenin@gmail.com
