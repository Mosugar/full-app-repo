<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('company_settings', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->text('address');
            $table->string('city');
            $table->string('postal_code', 10);
            $table->string('country')->default('Maroc');
            $table->string('phone', 20);
            $table->string('email');
            $table->string('website')->nullable();
            $table->string('tax_number', 50)->nullable();
            $table->string('logo_path')->nullable();
            $table->decimal('default_tax_rate', 5, 2)->default(20.00);
            $table->text('payment_terms')->nullable();
            $table->integer('quote_validity_days')->default(30);
            $table->integer('invoice_due_days')->default(30);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('company_settings');
    }
};