<?php

use App\Http\Controllers\MaterialHistoryController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ProductProcessController;
use App\Http\Controllers\ProductionReportController;
use App\Http\Controllers\InventoryReportController;

Route::prefix('v1')->group(function () {
// Materials
	Route::get('/materials', [MaterialController::class, 'index']);
	Route::get('/materials/info', [MaterialController::class, 'getMaterialInfo']);
	Route::get('/materials/full', [MaterialController::class, 'full']);
	Route::post('/materials', [MaterialController::class, 'store']);
	Route::get('/materials/{id}', [MaterialController::class, 'show']);
	Route::put('/materials/{id}', [MaterialController::class, 'update']);
	Route::delete('/materials/{id}', [MaterialController::class, 'destroy']);
// Material Reports
	Route::post('/material/history', [MaterialHistoryController::class, 'store']);
	Route::get('/material/export/{id}', [MaterialHistoryController::class, 'export']);
	Route::get('/material/history/{id}', [MaterialHistoryController::class, 'index']);
	Route::put('/material/history/{id}', [MaterialHistoryController::class, 'update']);
	Route::delete('/material/history/{id}', [MaterialHistoryController::class, 'destroy']);
    Route::get('/material/export/{id}', [MaterialController::class, 'export']);
// Products
	Route::get('/products', [ProductController::class, 'index']);
	Route::post('/products', [ProductController::class, 'store']);
	Route::get('/product/{id}', [ProductController::class, 'show']);
	Route::put('/product/{id}', [ProductController::class, 'update']);
	Route::delete('/product/{id}', [ProductController::class, 'destroy']);
    Route::get('/product/export/{id}', [ProductController::class, 'export']);
// Processes
	Route::put('/processes/{id}', [ProcessController::class, 'update']);
	Route::delete('/processes/{id}', [ProcessController::class, 'destroy']);
	Route::post('/processes', [ProcessController::class, 'add']);
// Product Processes
	Route::get('/product-processes', [ProductProcessController::class, 'index']);
	Route::post('/product-processes', [ProductProcessController::class, 'store']);
	Route::get('/product-processes/{id}', [ProductProcessController::class, 'show']);
	Route::put('/product-processes/{id}', [ProductProcessController::class, 'update']);
	Route::delete('/product-processes/{id}', [ProductProcessController::class, 'destroy']);
});
