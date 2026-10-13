<?php
/** app/Http/Requests/DevisRequest.php — règles alignées sur src/utils/validation.js */

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DevisRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type_client'    => ['required', Rule::in(['societe', 'particulier'])],
            'raison_sociale' => ['nullable', 'required_if:type_client,societe', 'string', 'max:150'],
            'nom'            => ['required', 'string', 'max:150'],
            'email'          => ['required', 'email', 'max:180'],
            'indicatif'      => ['required', 'string', 'max:5'],
            'telephone'      => ['required', 'regex:/^[0-9\s]{8,14}$/'],
            'domaine'        => ['required', 'string', 'max:60'],
            'besoins'        => ['required', 'string', 'min:20', 'max:5000'],
        ];
    }

    public function messages(): array
    {
        return [
            'raison_sociale.required_if' => 'Indiquez le nom de la société.',
            'besoins.min'                => 'Décrivez vos besoins en 20 caractères au minimum.',
        ];
    }
}
