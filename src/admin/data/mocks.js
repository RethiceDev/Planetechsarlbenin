/**
 * Jeux de données de démonstration.
 * Utilisés tant que VITE_USE_MOCK_API=true : le dashboard est pleinement
 * utilisable (création, modification, suppression) sans backend Laravel.
 */

export const DEVIS_MOCK = [
  {
    id: 1,
    reference: 'DEV-260918-114',
    type_client: 'societe',
    raison_sociale: 'Clinique Les Palmiers',
    nom: 'Rachelle Dossou',
    email: 'contact@lespalmiers.bj',
    indicatif: '+229',
    telephone: '97 45 12 08',
    domaine: 'telecom-reseau',
    besoins: "Câblage réseau de 18 postes sur deux étages, armoire de brassage et Wi-Fi couvrant la salle d'attente.",
    statut: 'nouveau',
    created_at: '2026-09-18T09:14:00',
  },
  {
    id: 2,
    reference: 'DEV-260917-903',
    type_client: 'particulier',
    raison_sociale: null,
    nom: 'Serge Ahouandjinou',
    email: 's.ahouandjinou@gmail.com',
    indicatif: '+229',
    telephone: '64 22 87 31',
    domaine: 'ftth',
    besoins: 'Raccordement fibre depuis le poteau jusqu’au salon, maison à Fidjrossè.',
    statut: 'en_cours',
    created_at: '2026-09-17T15:40:00',
  },
  {
    id: 3,
    reference: 'DEV-260915-227',
    type_client: 'societe',
    raison_sociale: 'Cabinet Zinsou & Associés',
    nom: 'Marlène Zinsou',
    email: 'm.zinsou@cabinet-zinsou.bj',
    indicatif: '+229',
    telephone: '95 03 77 46',
    domaine: 'informatique',
    besoins: 'Fourniture de 6 postes de travail, imprimante réseau et sauvegarde automatique.',
    statut: 'traite',
    created_at: '2026-09-15T11:02:00',
  },
  {
    id: 4,
    reference: 'DEV-260914-058',
    type_client: 'societe',
    raison_sociale: 'Résidence Houéyiho',
    nom: 'Pascal Agbodjan',
    email: 'gestion@residence-houeyiho.bj',
    indicatif: '+229',
    telephone: '68 91 40 12',
    domaine: 'electricite',
    besoins: 'Mise aux normes du tableau électrique et installation de 3 onduleurs.',
    statut: 'nouveau',
    created_at: '2026-09-14T08:25:00',
  },
  {
    id: 5,
    reference: 'DEV-260911-440',
    type_client: 'particulier',
    raison_sociale: null,
    nom: 'Aline Koudjo',
    email: 'aline.koudjo@yahoo.fr',
    indicatif: '+229',
    telephone: '61 18 55 09',
    domaine: 'btp',
    besoins: 'Réhabilitation de deux bureaux : cloisons, peinture et reprise des prises.',
    statut: 'traite',
    created_at: '2026-09-11T16:48:00',
  },
];

export const PRODUITS_MOCK = [
  {
    id: 1,
    nom: 'Switch 24 ports Gigabit',
    categorie: 'reseau',
    prix: 185000,
    description: 'Commutateur administrable pour armoire de brassage, 24 ports RJ45.',
    image: null,
    disponible: true,
  },
  {
    id: 2,
    nom: 'Ordinateur portable professionnel',
    categorie: 'informatique',
    prix: 420000,
    description: "Core i5, 8 Go de RAM, SSD 256 Go, configuré et livré prêt à l'emploi.",
    image: null,
    disponible: true,
  },
  {
    id: 3,
    nom: 'Onduleur 1000 VA',
    categorie: 'electrique',
    prix: 95000,
    description: 'Protection des postes de travail contre les coupures et les surtensions.',
    image: null,
    disponible: true,
  },
  {
    id: 4,
    nom: 'Mallette outillage électricien',
    categorie: 'outillage',
    prix: 68000,
    description: 'Pinces isolées, tournevis testeur, coupe-câble et multimètre.',
    image: null,
    disponible: false,
  },
];

export const EXPERTISES_MOCK = [
  { id: 1, titre: 'BTP', description: 'Travaux de construction, réhabilitation et aménagement de bâtiments professionnels.', icone: 'HardHat', image: null, ordre: 1 },
  { id: 2, titre: 'Informatique', description: 'Équipement, maintenance et sécurisation du parc informatique.', icone: 'Laptop', image: null, ordre: 2 },
  { id: 3, titre: 'Électricité', description: 'Installations basse tension, mise aux normes et dépannage.', icone: 'Zap', image: null, ordre: 3 },
  { id: 4, titre: 'Télécom et réseau', description: 'Câblage structuré, réseaux locaux et liaisons opérateurs.', icone: 'Network', image: null, ordre: 4 },
  { id: 5, titre: 'Branchement FTTH / FTTLA', description: "Raccordement fibre optique jusqu'à l'abonné.", icone: 'Cable', image: null, ordre: 5 },
];

export const EQUIPE_MOCK = [
  { id: 1, nom: 'Armelle Assogba', role: 'Président-Directeur Général', pole: 'Direction', photo: null },
  { id: 2, nom: 'Équipe comptable', role: 'Gestion et facturation', pole: 'Administration', photo: null },
  { id: 3, nom: 'Équipe informatique', role: 'Techniciens réseau et systèmes', pole: 'Technique', photo: null },
];

export const PARTENAIRES_MOCK = [
  { id: 1, nom: 'Opérateurs télécom', site: 'https://exemple.bj', logo: null },
  { id: 2, nom: 'Fournisseurs réseau', site: '', logo: null },
  { id: 3, nom: 'Matériel électrique', site: '', logo: null },
];
