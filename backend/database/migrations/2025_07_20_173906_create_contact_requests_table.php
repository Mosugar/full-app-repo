<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('contact_requests', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('email');
            $table->string('phone', 20);
            $table->string('project_type', 100);
            $table->string('budget', 50)->nullable();
            $table->text('message');
            $table->enum('status', ['nouveau', 'lu', 'converti'])->default('nouveau');
            $table->foreignId('converted_client_id')->nullable()->constrained('clients')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contact_requests');
    }
};