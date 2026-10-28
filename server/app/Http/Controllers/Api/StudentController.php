<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{

    public function index()
    {
        $students = Student::latest()->get();

        return response()->json([
            'students' => $students,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'phone' => 'nullable|string|max:20',
            'department' => 'required|string',
            'gender' => 'required|in:Male,Female',
            'status' => 'required|in:Active,Inactive',
        ]);

        $student = Student::create($validatedData);

        return response()->json([
            'message' => 'Student created successfully.',
            'student' => $student,
        ], 201);
    }

    public function show(Student $student)
    {
        return response()->json([
            'student' => $student,
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $student->id,
            'phone' => 'nullable|string|max:20',
            'department' => 'required|string',
            'gender' => 'required|string',
            'status' => 'required|string',
        ]);

        $student->update($validated);

        return response()->json([
            'message' => 'Student updated successfully.',
            'student' => $student,
        ]);
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return response()->json([
            'message' => 'Student deleted successfully.',
        ]);
    }

    public function statistics()
    {
        return response()->json([
            'total_students' => Student::count(),
            'active_students' => Student::where('status', 'Active')->count(),
            'inactive_students' => Student::where('status', 'Inactive')->count(),
        ]);
    }
}
