<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [App\Http\Controllers\api\userController::class, 'register']);
Route::post('/login', [App\Http\Controllers\api\userController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [App\Http\Controllers\api\userController::class, 'logout']);

Route::get('/getToDo', [App\Http\Controllers\api\toDoList::class, 'getToDo']);
Route::post('/addTache', [App\Http\Controllers\api\toDoList::class, 'addTache']);
Route::post('/editTache/{id}', [App\Http\Controllers\api\toDoList::class, 'editTache']);
Route::delete('/deleteTache/{id}', [App\Http\Controllers\api\toDoList::class, 'deleteTache']);
