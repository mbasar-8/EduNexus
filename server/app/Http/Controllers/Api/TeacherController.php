<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{

    public function index()
    {
        $teachers = Teacher::latest()->get();

        return response()->json([
            'teachers' => $teachers,
        ]);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:teachers,email',
            'phone' => 'nullable|string|max:20',
            'department' => 'required|string',
            'gender' => 'required|in:Male,Female',
            'status' => 'required|in:Active,Inactive',
        ]);

        $teacher = Teacher::create($validatedData);

        return response()->json([
            'message' => 'Teacher created successfully.',
            'teacher' => $teacher,
        ], 201);
    }


    public function show(Teacher $teacher)
    {
        return response()->json([
            'teacher' => $teacher,
        ]);
    }


    public function update(Request $request, Teacher $teacher)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:teachers,email,' . $teacher->id,
            'phone' => 'nullable|string|max:20',
            'department' => 'required|string',
            'gender' => 'required|in:Male,Female',
            'status' => 'required|in:Active,Inactive',
        ]);

        $teacher->update($validated);

        return response()->json([
            'message' => 'Teacher updated successfully.',
            'teacher' => $teacher,
        ]);
    }


    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return response()->json([
            'message' => 'Teacher deleted successfully.',
        ]);
    }
}
