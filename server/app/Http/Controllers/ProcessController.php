<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Http\Request;
use App\Models\Process;

class ProcessController extends Controller
{

	public function index()
	{
		$processes = Process::all();
		return response()->json($processes);
	}

	public function show($id)
	{
		$process = Process::findOrFail($id);
		return response()->json($process);
	}

	public function store(Request $request)
	{
		$process = Process::create($request->all());
		return response()->json($process, 201);
	}

	public function update(Request $request, $id)
	{
		$process = Process::findOrFail($id);
		$process->update($request->all());
		return response()->json($process, 200);
	}

	public function destroy($id)
	{
		Process::findOrFail($id)->delete();
		return response()->json(null, 204);
	}
}
