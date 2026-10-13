# Brancher le front sur Laravel

## 1. CORS (config/cors.php)

```php
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:5173', 'https://www.planetech.bj'],
'allowed_headers' => ['*'],
'supports_credentials' => false,
```

## 2. Côté React

Dans `.env` :

```
VITE_API_BASE_URL=https://api.planetech.bj/api
VITE_USE_MOCK_API=false
```

Tant que `VITE_USE_MOCK_API=true`, les formulaires et le catalogue fonctionnent sans backend
(réponses simulées) : pratique pour la recette du design.

## 3. Si vous utilisez Sanctum en mode cookie

- Passez `withCredentials: true` dans `src/services/api.js`
- Mettez `supports_credentials => true` dans `config/cors.php`
- Appelez `GET /sanctum/csrf-cookie` avant le premier POST

## 4. Format des erreurs

`src/services/api.js` sait déjà lire la réponse 422 de Laravel
(`{ message, errors: { champ: [messages] } }`) et réaffiche chaque message sous le bon champ
du formulaire.

## 5. Déploiement statique

`npm run build` produit `dist/`. Si vous servez le site depuis Laravel, copiez `dist/` dans
`public/` et ajoutez une route de repli pour laisser React Router gérer les URL :

```php
Route::get('/{any}', fn () => file_get_contents(public_path('index.html')))
    ->where('any', '^(?!api).*$');
```
