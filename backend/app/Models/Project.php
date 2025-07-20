<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    protected $fillable = [
        'client_id',
        'name',
        'category',
        'year',
        'location',
        'description',
        'featured_image',
        'gallery',
        'services',
        'surface',
        'duration',
        'budget_range',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'gallery' => 'array',
            'services' => 'array',
        ];
    }

    // Relationships
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    // Scope for portfolio projects
    public function scopePortfolio($query)
    {
        return $query->where('status', 'portfolio');
    }

    // Scope for completed projects
    public function scopeCompleted($query)
    {
        return $query->whereIn('status', ['termine', 'portfolio']);
    }
}