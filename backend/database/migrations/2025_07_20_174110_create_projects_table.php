<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->string('name');
            $table->string('category');
            $table->year('year');
            $table->string('location');
            $table->text('description');
            $table->string('featured_image')->nullable();
            $table->json('gallery')->nullable();
            $table->json('services')->nullable();
            $table->string('surface', 50)->nullable();
            $table->string('duration', 50)->nullable();
            $table->string('budget_range', 100)->nullable();
            $table->enum('status', ['en_cours', 'termine', 'portfolio'])->default('en_cours');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('projects');
    }
};