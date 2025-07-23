<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Quote;
use App\Models\Invoice;
use App\Models\ContactRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $currentYear = Carbon::now()->year;
        $currentMonth = Carbon::now()->month;

        // Statistics
        $stats = [
            'total_clients' => Client::count(),
            'total_quotes' => Quote::count(),
            'total_invoices' => Invoice::count(),
            'pending_quotes' => Quote::where('status', 'envoye')->count(),
            'overdue_invoices' => Invoice::where('status', '!=', 'payee')
                ->where('due_date', '<', Carbon::now())
                ->count(),
            'monthly_revenue' => Invoice::where('status', 'payee')
                ->whereYear('created_at', $currentYear)
                ->whereMonth('created_at', $currentMonth)
                ->sum('total'),
            'yearly_revenue' => Invoice::where('status', 'payee')
                ->whereYear('created_at', $currentYear)
                ->sum('total'),
            'new_contact_requests' => ContactRequest::where('status', 'nouveau')->count(),
        ];

        // Recent data
        $recent_quotes = Quote::with('client')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $recent_invoices = Invoice::with('client')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $recent_contacts = ContactRequest::orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // Monthly revenue chart data
        $monthly_revenue = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $revenue = Invoice::where('status', 'payee')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->sum('total');
            
            $monthly_revenue[] = [
                'month' => $date->format('M Y'),
                'revenue' => floatval($revenue)
            ];
        }

        return response()->json([
            'stats' => $stats,
            'recent_quotes' => $recent_quotes,
            'recent_invoices' => $recent_invoices,
            'recent_contacts' => $recent_contacts,
            'monthly_revenue' => $monthly_revenue,
        ]);
    }
}