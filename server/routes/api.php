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
	Route::post('/materials', [MaterialController::class, 'store']);
	Route::get('/materials/{id}', [MaterialController::class, 'show']);
	Route::put('/materials/{id}', [MaterialController::class, 'update']);
	Route::delete('/materials/{id}', [MaterialController::class, 'destroy']);
// Material Reports
	Route::post('/material/history', [MaterialHistoryController::class, 'store']);
	Route::get('/material/history/{id}', [MaterialHistoryController::class, 'index']);
	Route::put('/material/history/{id}', [MaterialHistoryController::class, 'update']);
	Route::delete('/material/history/{id}', [MaterialHistoryController::class, 'destroy']);

// Products
	Route::get('/products', [ProductController::class, 'index']);
	Route::post('/products', [ProductController::class, 'store']);
	Route::get('/product/{id}', [ProductController::class, 'show']);
	Route::put('/product/{id}', [ProductController::class, 'update']);
	Route::delete('/product/{id}', [ProductController::class, 'destroy']);

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

// Production Reports
	Route::get('/production-reports', [ProductionReportController::class, 'index']);
	Route::post('/production-reports', [ProductionReportController::class, 'store']);
	Route::get('/production-reports/{id}', [ProductionReportController::class, 'show']);
	Route::put('/production-reports/{id}', [ProductionReportController::class, 'update']);
	Route::delete('/production-reports/{id}', [ProductionReportController::class, 'destroy']);

// Inventory Reports
	Route::get('/inventory-reports', [InventoryReportController::class, 'index']);
	Route::post('/inventory-reports', [InventoryReportController::class, 'store']);
	Route::get('/inventory-reports/{id}', [InventoryReportController::class, 'show']);
	Route::put('/inventory-reports/{id}', [InventoryReportController::class, 'update']);
	Route::delete('/inventory-reports/{id}', [InventoryReportController::class, 'destroy']);
});
