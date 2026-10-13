# Intégration du dashboard dans le projet Vite existant

## 1. Copier les fichiers

Copiez le dossier `src/admin/` à la racine de votre `src/`. L'alias `@` est déjà configuré
dans `vite.config.js` du projet PLANETECH.

## 2. Installer Lucide React

```bash
npm install lucide-react
```

## 3. Brancher les routes

Dans `src/App.jsx` :

```jsx
import { adminRoutes } from '@/admin/AdminRoutes';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Tableau de bord — son propre gabarit, sans l'en-tête public */}
        {adminRoutes}
      </Routes>
    </>
  );
}
```

Le dashboard est alors accessible sur `/admin`.

## 4. Couleurs

Le module réutilise les couleurs déjà déclarées dans `tailwind.config.js` (`forest`, `signal`,
`ink`, `slate.muted`). Aucune modification de configuration n'est nécessaire.

Si vous partez d'un projet neuf, ajoutez au moins :

```js
colors: {
  forest: { 50:'#EEF6F1',100:'#D6E9DE',200:'#A9D2BC',300:'#6FB392',400:'#3C8F6B',
            500:'#1F7350',600:'#125C3E',700:'#0B4A32',800:'#073626',900:'#04251A' },
  signal: '#22B573',
  ink: '#0F1A16',
  slate: { muted: '#5B6B63' },
}
```

## 5. Mode démonstration

Tant que `VITE_USE_MOCK_API=true` dans `.env`, toutes les opérations (ajout, modification,
suppression, changement de statut) fonctionnent en mémoire sur des données d'exemple.
Rechargez la page pour revenir au jeu initial.

Passez à `false` quand l'API Laravel est prête : aucun composant n'a besoin d'être modifié.

## 6. Protéger l'accès

Le dashboard n'est pas protégé dans cette livraison. Quand l'authentification Laravel Sanctum
sera en place, entourez `adminRoutes` d'une route gardienne :

```jsx
<Route element={<RouteProtegee />}>
  {adminRoutes}
</Route>
```

où `RouteProtegee` vérifie la session et redirige vers `/connexion` si besoin.

## 7. Envoi des images

En mode mock, les images sélectionnées sont affichées via `URL.createObjectURL`.
Avec Laravel, remplacez le payload par un `FormData` — l'aide est déjà écrite :

```js
import { versFormData } from '@/admin/services/ressourceService';

await api.post('/admin/produits', versFormData(payload), {
  headers: { 'Content-Type': 'multipart/form-data' },
});
// Pour une mise à jour : versFormData(payload, { methode: 'PUT' })
```
