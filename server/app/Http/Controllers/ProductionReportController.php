<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductionReport;

class ProductionReportController extends Controller
{
	public function index()
	{
		$productionReports = ProductionReport::all();
		return response()->json(['data' => $productionReports]);
	}

	public function store(Request $request)
	{
		$productionReport = ProductionReport::create($request->all());
		return response()->json(['data' => $productionReport], 201);
	}

	public function show($id)
	{
		$productionReport = ProductionReport::findOrFail($id);
		return response()->json(['data' => $productionReport]);
	}

	public function update(Request $request, $id)
	{
		$productionReport = ProductionReport::findOrFail($id);
		$productionReport->update($request->all());
		return response()->json(['data' => $productionReport]);
	}

	public function destroy($id)
	{
		$productionReport = ProductionReport::findOrFail($id);
		$productionReport->delete();
		return response()->json(['message' => 'Production report deleted successfully']);
	}
}
