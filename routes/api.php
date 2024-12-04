<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;





Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [UserController::class, 'profile']);
    Route::put('/profile', [UserController::class, 'update_profile']);
    Route::post('/update-avatar', [UserController::class, 'updateAvatar']);
});
