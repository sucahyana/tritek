<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InventoryReport;

class InventoryReportController extends Controller
{
	public function index()
	{
		$inventoryReports = InventoryReport::all();
		return response()->json($inventoryReports);
	}

	public function show($id)
	{
		$inventoryReport = InventoryReport::findOrFail($id);
		return response()->json($inventoryReport);
	}

	public function store(Request $request)
	{
		$inventoryReport = InventoryReport::create($request->all());
		return response()->json($inventoryReport, 201);
	}

	public function update(Request $request, $id)
	{
		$inventoryReport = InventoryReport::findOrFail($id);
		$inventoryReport->update($request->all());
		return response()->json($inventoryReport, 200);
	}

	public function destroy($id)
	{
		InventoryReport::findOrFail($id)->delete();
		return response()->json(null, 204);
	}
}
