/**
 * Domaines d'expertise affichés sur la page d'accueil.
 * `slug` sert d'ancre et de filtre côté boutique.
 */
export const EXPERTISES = [
  {
    slug: 'btp',
    titre: 'BTP',
    resume: "Travaux de construction, réhabilitation et aménagement de bâtiments professionnels.",
    prestations: ['Gros œuvre et second œuvre', 'Réhabilitation de locaux', 'Aménagement de bureaux'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiMpoyZ27jLT_6ZPpO4GGsi4UuSQ7Inasjh6rDZFoNXw&s=10',
  },
  {
    slug: 'informatique',
    titre: 'Informatique',
    resume: "Équipement, maintenance et sécurisation du parc informatique de votre organisation.",
    prestations: ['Vente et installation de matériel', 'Maintenance préventive', 'Sauvegarde et sécurité'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'electricite',
    titre: 'Électricité',
    resume: "Installations électriques basse tension, mise aux normes et dépannage.",
    prestations: ['Installation et rénovation', 'Tableaux et protections', 'Groupes et onduleurs'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'telecom-reseau',
    titre: 'Télécom et réseau',
    resume: "Câblage structuré, réseaux locaux et liaisons opérateurs pour vos sites.",
    prestations: ['Câblage cuivre et fibre', 'Réseaux LAN / Wi-Fi', 'Téléphonie sur IP'],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'ftth',
    titre: 'Branchement FTTH / FTTLA',
    resume: "Raccordement fibre optique jusqu'à l'abonné, du point de branchement à la prise.",
    prestations: ['Tirage et soudure fibre', 'Pose de PTO', 'Mesures et recette'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
];