<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with('client');
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Filter by client
        if ($request->has('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
            });
        }

        $projects = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 10),
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'featured_image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'services' => 'nullable|array',
            'surface' => 'nullable|string|max:50',
            'duration' => 'nullable|string|max:50',
            'budget_range' => 'nullable|string|max:100',
            'status' => 'required|in:en_cours,termine,portfolio',
        ]);

        $project = Project::create($validated);

        return response()->json([
            'message' => 'Project created successfully',
            'project' => $project->load('client')
        ], 201);
    }

    public function show(Project $project)
    {
        return response()->json($project->load('client'));
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 10),
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'featured_image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'services' => 'nullable|array',
            'surface' => 'nullable|string|max:50',
            'duration' => 'nullable|string|max:50',
            'budget_range' => 'nullable|string|max:100',
            'status' => 'required|in:en_cours,termine,portfolio',
        ]);

        $project->update($validated);

        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project->load('client')
        ]);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully'
        ]);
    }

    public function portfolio()
    {
        $projects = Project::portfolio()
            ->with('client')
            ->orderBy('year', 'desc')
            ->get();

        return response()->json($projects);
    }
}