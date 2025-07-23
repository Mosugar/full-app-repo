<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use App\Models\QuoteItem;
use App\Models\CompanySetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class QuoteController extends Controller
{
    public function index(Request $request)
    {
        $query = Quote::with(['client', 'items']);
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by client
        if ($request->has('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('client', function($q) use ($search) {
                $q->where('company_name', 'like', "%{$search}%")
                  ->orWhere('contact_name', 'like', "%{$search}%");
            })->orWhere('quote_number', 'like', "%{$search}%");
        }

        $quotes = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($quotes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'valid_until' => 'required|date|after:today',
            'notes' => 'nullable|string',
            'terms_conditions' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.service_name' => 'required|string|max:255',
            'items.*.description' => 'nullable|string',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            // Get company settings for tax rate
            $settings = CompanySetting::current();
            
            // Calculate totals
            $subtotal = 0;
            foreach ($validated['items'] as $item) {
                $subtotal += $item['quantity'] * $item['unit_price'];
            }
            
            $tax_rate = $settings->default_tax_rate;
            $tax_amount = ($subtotal * $tax_rate) / 100;
            $total = $subtotal + $tax_amount;

            // Create quote
            $quote = Quote::create([
                'quote_number' => Quote::generateQuoteNumber(),
                'client_id' => $validated['client_id'],
                'status' => 'brouillon',
                'valid_until' => $validated['valid_until'],
                'subtotal' => $subtotal,
                'tax_rate' => $tax_rate,
                'tax_amount' => $tax_amount,
                'total' => $total,
                'notes' => $validated['notes'] ?? null,
                'terms_conditions' => $validated['terms_conditions'] ?? null,
            ]);

            // Create quote items
            foreach ($validated['items'] as $index => $item) {
                QuoteItem::create([
                    'quote_id' => $quote->id,
                    'service_name' => $item['service_name'],
                    'description' => $item['description'] ?? null,
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['quantity'] * $item['unit_price'],
                    'order' => $index + 1,
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Quote created successfully',
                'quote' => $quote->load(['client', 'items'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error creating quote',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Quote $quote)
    {
        return response()->json($quote->load(['client', 'items', 'invoice']));
    }

    public function update(Request $request, Quote $quote)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'status' => 'required|in:brouillon,envoye,accepte,refuse',
            'valid_until' => 'required|date',
            'notes' => 'nullable|string',
            'terms_conditions' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.service_name' => 'required|string|max:255',
            'items.*.description' => 'nullable|string',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            // Calculate totals
            $subtotal = 0;
            foreach ($validated['items'] as $item) {
                $subtotal += $item['quantity'] * $item['unit_price'];
            }
            
            $settings = CompanySetting::current();
            $tax_rate = $settings->default_tax_rate;
            $tax_amount = ($subtotal * $tax_rate) / 100;
            $total = $subtotal + $tax_amount;

            // Update quote
            $quote->update([
                'client_id' => $validated['client_id'],
                'status' => $validated['status'],
                'valid_until' => $validated['valid_until'],
                'subtotal' => $subtotal,
                'tax_rate' => $tax_rate,
                'tax_amount' => $tax_amount,
                'total' => $total,
                'notes' => $validated['notes'] ?? null,
                'terms_conditions' => $validated['terms_conditions'] ?? null,
            ]);

            // Delete existing items and create new ones
            $quote->items()->delete();
            
            foreach ($validated['items'] as $index => $item) {
                QuoteItem::create([
                    'quote_id' => $quote->id,
                    'service_name' => $item['service_name'],
                    'description' => $item['description'] ?? null,
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['quantity'] * $item['unit_price'],
                    'order' => $index + 1,
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Quote updated successfully',
                'quote' => $quote->load(['client', 'items'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error updating quote',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Quote $quote)
    {
        $quote->delete();

        return response()->json([
            'message' => 'Quote deleted successfully'
        ]);
    }

    public function updateStatus(Request $request, Quote $quote)
    {
        $validated = $request->validate([
            'status' => 'required|in:brouillon,envoye,accepte,refuse'
        ]);

        $quote->update(['status' => $validated['status']]);

        return response()->json([
            'message' => 'Quote status updated successfully',
            'quote' => $quote->load(['client', 'items'])
        ]);
    }
}