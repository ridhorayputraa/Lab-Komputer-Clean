<?php

// use App\Http\Controllers\API\ApiController;
use App\Http\Controllers\API\CompanyDataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/company', [CompanyDataController::class, 'index']);
Route::post('/company', [CompanyDataController::class, 'store']);
Route::get('/company/{id}', [CompanyDataController::class, 'show']);
Route::put('/company/{id}', [CompanyDataController::class, 'update']);
Route::delete('/company/delete/{id}', [CompanyDataController::class, 'destroy']);


