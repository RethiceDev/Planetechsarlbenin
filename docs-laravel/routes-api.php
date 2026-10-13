<?php
/**
 * À coller dans routes/api.php de votre projet Laravel.
 * Le front appelle ces endpoints via src/services/*.js.
 */

use App\Http\Controllers\Api\DevisController;
use App\Http\Controllers\Api\ProduitController;
use Illuminate\Support\Facades\Route;

Route::post('/devis', [DevisController::class, 'store'])->middleware('throttle:10,1');
Route::post('/contact', [DevisController::class, 'contact'])->middleware('throttle:10,1');

Route::get('/produits', [ProduitController::class, 'index']);
Route::get('/produits/{produit}', [ProduitController::class, 'show']);
