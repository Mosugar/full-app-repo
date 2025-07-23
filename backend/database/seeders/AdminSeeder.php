<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::create([
            'name' => 'TL Global Admin',
            'email' => 'admin@tlglobal.ma',
            'password' => Hash::make('password123'), // Change this password!
        ]);
    }
}