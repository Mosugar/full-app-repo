<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\ClientController;
use App\Http\Controllers\API\ContactRequestController;
use App\Http\Controllers\API\QuoteController;
use App\Http\Controllers\API\InvoiceController;
use App\Http\Controllers\API\ProjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/contact', [ContactRequestController::class, 'store']);

// Admin Authentication routes
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminController::class, 'login']);
    
    // Protected admin routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AdminController::class, 'logout']);
        Route::get('/me', [AdminController::class, 'me']);
        
        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index']);
        
        // Clients
        Route::apiResource('/clients', ClientController::class);
        
        // Contact Requests
        Route::get('/contacts', [ContactRequestController::class, 'index']);
        Route::get('/contacts/{contactRequest}', [ContactRequestController::class, 'show']);
        Route::patch('/contacts/{contactRequest}', [ContactRequestController::class, 'update']);
        Route::delete('/contacts/{contactRequest}', [ContactRequestController::class, 'destroy']);
        Route::post('/contacts/{contactRequest}/convert', [ContactRequestController::class, 'convertToClient']);
        
        // Quotes
        Route::apiResource('/quotes', QuoteController::class);
        Route::patch('/quotes/{quote}/status', [QuoteController::class, 'updateStatus']);
        
        // Invoices
        Route::apiResource('/invoices', InvoiceController::class);
        Route::post('/quotes/{quote}/invoice', [InvoiceController::class, 'createFromQuote']);
        Route::patch('/invoices/{invoice}/paid', [InvoiceController::class, 'markAsPaid']);
        
        // Projects
        Route::apiResource('/projects', ProjectController::class);
        Route::get('/portfolio', [ProjectController::class, 'portfolio']);
    });
});