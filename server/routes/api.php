<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentController;

Route::get('/health', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'EduNexus API is working',
    ]);
});

Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/students', [StudentController::class, 'store']);

    Route::get('/students', [StudentController::class, 'index']);
});
