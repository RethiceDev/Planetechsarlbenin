<?php
/** app/Http/Controllers/Api/DevisController.php */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DevisRequest;
use App\Mail\NouvelleDemandeDevis;
use App\Models\Devis;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class DevisController extends Controller
{
    public function store(DevisRequest $request): JsonResponse
    {
        $devis = Devis::create($request->validated() + [
            'reference' => 'DEV-' . now()->format('ymd') . '-' . random_int(100, 999),
        ]);

        // Notification à l'équipe PLANETECH
        Mail::to(config('mail.contact_address'))->send(new NouvelleDemandeDevis($devis));

        return response()->json([
            'message'   => 'Demande enregistrée.',
            'reference' => $devis->reference,
        ], 201);
    }

    public function contact(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nom'     => ['required', 'string', 'max:150'],
            'email'   => ['required', 'email'],
            'message' => ['required', 'string', 'min:10', 'max:3000'],
        ]);

        Mail::raw($data['message'], fn ($m) => $m
            ->to(config('mail.contact_address'))
            ->subject('Message du site — ' . $data['nom'])
            ->replyTo($data['email']));

        return response()->json(['message' => 'Message envoyé.']);
    }
}
