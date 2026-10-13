<?php
/** database/migrations/xxxx_create_devis_table.php */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('devis', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->enum('type_client', ['societe', 'particulier']);
            $table->string('raison_sociale')->nullable();
            $table->string('nom');
            $table->string('email');
            $table->string('indicatif', 5)->default('+229');
            $table->string('telephone', 20);
            $table->string('domaine', 60);
            $table->text('besoins');
            $table->enum('statut', ['nouveau', 'en_cours', 'traite'])->default('nouveau');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('devis');
    }
};
