<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function store(Request $request)
    {
        return response()->json([
            'message' => 'Student API is working.',
            'data' => $request->all(),
        ]);
    }
}
