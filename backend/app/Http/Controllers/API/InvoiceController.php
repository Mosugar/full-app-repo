<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Quote;
use App\Models\CompanySetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Invoice::with(['client', 'items', 'quote']);
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by client
        if ($request->has('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        // Filter overdue
        if ($request->has('overdue') && $request->overdue) {
            $query->where('status', '!=', 'payee')
                  ->where('due_date', '<', Carbon::now());
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('client', function($q) use ($search) {
                $q->where('company_name', 'like', "%{$search}%")
                  ->orWhere('contact_name', 'like', "%{$search}%");
            })->orWhere('invoice_number', 'like', "%{$search}%");
        }

        $invoices = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($invoices);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'quote_id' => 'nullable|exists:quotes,id',
            'due_date' => 'required|date|after:today',
            'payment_terms' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.service_name' => 'required|string|max:255',
            'items.*.description' => 'nullable|string',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            // Get company settings
            $settings = CompanySetting::current();
            
            // Calculate totals
            $subtotal = 0;
            foreach ($validated['items'] as $item) {
                $subtotal += $item['quantity'] * $item['unit_price'];
            }
            
            $tax_rate = $settings->default_tax_rate;
            $tax_amount = ($subtotal * $tax_rate) / 100;
            $total = $subtotal + $tax_amount;

            // Create invoice
            $invoice = Invoice::create([
                'invoice_number' => Invoice::generateInvoiceNumber(),
                'client_id' => $validated['client_id'],
                'quote_id' => $validated['quote_id'] ?? null,
                'status' => 'brouillon',
                'due_date' => $validated['due_date'],
                'subtotal' => $subtotal,
                'tax_rate' => $tax_rate,
                'tax_amount' => $tax_amount,
                'total' => $total,
                'payment_terms' => $validated['payment_terms'] ?? $settings->payment_terms,
            ]);

            // Create invoice items
            foreach ($validated['items'] as $index => $item) {
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
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
                'message' => 'Invoice created successfully',
                'invoice' => $invoice->load(['client', 'items', 'quote'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error creating invoice',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Invoice $invoice)
    {
        return response()->json($invoice->load(['client', 'items', 'quote']));
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'quote_id' => 'nullable|exists:quotes,id',
            'status' => 'required|in:brouillon,envoyee,payee,en_retard',
            'due_date' => 'required|date',
            'paid_date' => 'nullable|date',
            'payment_terms' => 'nullable|string',
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

            // Update invoice
            $invoice->update([
                'client_id' => $validated['client_id'],
                'quote_id' => $validated['quote_id'] ?? null,
                'status' => $validated['status'],
                'due_date' => $validated['due_date'],
                'paid_date' => $validated['paid_date'] ?? null,
                'subtotal' => $subtotal,
                'tax_rate' => $tax_rate,
                'tax_amount' => $tax_amount,
                'total' => $total,
                'payment_terms' => $validated['payment_terms'] ?? null,
            ]);

            // Delete existing items and create new ones
            $invoice->items()->delete();
            
            foreach ($validated['items'] as $index => $item) {
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
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
                'message' => 'Invoice updated successfully',
                'invoice' => $invoice->load(['client', 'items', 'quote'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error updating invoice',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return response()->json([
            'message' => 'Invoice deleted successfully'
        ]);
    }

    public function createFromQuote(Request $request, Quote $quote)
    {
        $validated = $request->validate([
            'due_date' => 'required|date|after:today',
            'payment_terms' => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            $settings = CompanySetting::current();

            // Create invoice from quote
            $invoice = Invoice::create([
                'invoice_number' => Invoice::generateInvoiceNumber(),
                'client_id' => $quote->client_id,
                'quote_id' => $quote->id,
                'status' => 'brouillon',
                'due_date' => $validated['due_date'],
                'subtotal' => $quote->subtotal,
                'tax_rate' => $quote->tax_rate,
                'tax_amount' => $quote->tax_amount,
                'total' => $quote->total,
                'payment_terms' => $validated['payment_terms'] ?? $settings->payment_terms,
            ]);

            // Copy quote items to invoice items
            foreach ($quote->items as $quoteItem) {
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'service_name' => $quoteItem->service_name,
                    'description' => $quoteItem->description,
                    'quantity' => $quoteItem->quantity,
                    'unit_price' => $quoteItem->unit_price,
                    'total_price' => $quoteItem->total_price,
                    'order' => $quoteItem->order,
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Invoice created from quote successfully',
                'invoice' => $invoice->load(['client', 'items', 'quote'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error creating invoice from quote',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function markAsPaid(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'paid_date' => 'required|date'
        ]);

        $invoice->update([
            'status' => 'payee',
            'paid_date' => $validated['paid_date']
        ]);

        return response()->json([
            'message' => 'Invoice marked as paid successfully',
            'invoice' => $invoice->load(['client', 'items', 'quote'])
        ]);
    }
}