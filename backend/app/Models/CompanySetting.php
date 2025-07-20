<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanySetting extends Model
{
    protected $fillable = [
        'company_name',
        'address',
        'city',
        'postal_code',
        'country',
        'phone',
        'email',
        'website',
        'tax_number',
        'logo_path',
        'default_tax_rate',
        'payment_terms',
        'quote_validity_days',
        'invoice_due_days',
    ];

    protected function casts(): array
    {
        return [
            'default_tax_rate' => 'decimal:2',
            'quote_validity_days' => 'integer',
            'invoice_due_days' => 'integer',
        ];
    }

    // Singleton pattern - only one company settings record
    public static function current()
    {
        return self::first() ?: self::create([
            'company_name' => 'TL GLOBAL',
            'address' => 'Salé, Maroc',
            'city' => 'Salé',
            'postal_code' => '11000',
            'country' => 'Maroc',
            'phone' => '+212 6 17 86 90 01',
            'email' => 'contact@tlglobal.ma',
            'default_tax_rate' => 20.00,
            'quote_validity_days' => 30,
            'invoice_due_days' => 30,
        ]);
    }
}