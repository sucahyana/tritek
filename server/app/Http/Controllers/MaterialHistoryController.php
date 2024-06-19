<?php

namespace App\Http\Controllers;

use App\Constants\UnitOptions;
use App\Models\Material;
use App\Models\MaterialHistory;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MaterialHistoryController extends Controller
{
	use ResponseTrait;

	public function store(Request $request)
	{
		try {
			$validated = $request->validate([
				'material_id' => 'required|exists:materials,id',
				'date' => 'required|date',
				'quantity' => 'required|numeric',
				'process_id' => 'required',
				'status' => [
					'required',
					'string',
					Rule::in(['plus', 'minus']),
				],
				'notes' => 'required|string',
				'unit' => [
					'required',
					'string',
					Rule::in(array_merge(UnitOptions::$massUnits, UnitOptions::$lengthUnits, UnitOptions::$otherUnits))
				],
			]);

			$materialHistory = MaterialHistory::create([
				'material_id' => $validated['material_id'],
				'date' => $validated['date'],
				'quantity' => $validated['quantity'],
				'status' => $validated['status'],
				'process_id' => $validated['process_id'],
				'notes' => $validated['notes'],
				'unit' => $validated['unit']
			]);

			if ($validated['status'] === 'plus') {
				$material = Material::findOrFail($validated['material_id']);
				$material->total_quantity += $validated['quantity'];
				$material->save();
			}

			return $this->createdResponse('Riwayat material berhasil ditambahkan', $materialHistory);
		} catch (\Illuminate\Validation\ValidationException $e) {
			return $this->badRequestResponse('Validasi Gagal', $e->errors());
		} catch (\Exception $e) {
			return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
		}
	}

	public function index(Request $request, $id)
	{
		try {
			$material = Material::where('model', $id)->first();
			if (!$material) {
				return $this->notFoundResponse('Material tidak ditemukan');
			}

			$materialHistory = MaterialHistory::where('material_id', $material->id)->get();
			$response = [
				'material' => $material,
				'history' => $materialHistory
			];
			return $this->successResponse('Riwayat material berhasil diambil', $response);
		} catch (\Exception $e) {
			return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
		}
	}

	public function update(Request $request, $id)
	{
		try {
			$validated = $request->validate([
				'date' => 'sometimes|date',
				'quantity' => 'sometimes|numeric',
				'process_id' => 'sometimes',
				'status' => [
					'sometimes',
					'string',
					Rule::in(['plus', 'minus']),
				],
				'notes' => 'sometimes|string',
				'unit' => [
					'sometimes',
					'string',
					Rule::in(array_merge(UnitOptions::$massUnits, UnitOptions::$lengthUnits, UnitOptions::$otherUnits))
				],
			]);

			$materialHistory = MaterialHistory::findOrFail($id);

			$originalQuantity = $materialHistory->quantity;
			$originalStatus = $materialHistory->status;

			// Update fields only if they are present in the request
			$materialHistory->update($validated);

			$material = Material::findOrFail($materialHistory->material_id);

			// Adjust total quantity if status or quantity changes
			if (isset($validated['quantity']) || isset($validated['status'])) {
				$newQuantity = $validated['quantity'] ?? $originalQuantity;
				$newStatus = $validated['status'] ?? $originalStatus;

				if ($originalStatus === 'plus' && $newStatus === 'minus') {
					$material->total_quantity -= $originalQuantity + $newQuantity;
				} elseif ($originalStatus === 'minus' && $newStatus === 'plus') {
					$material->total_quantity += $originalQuantity + $newQuantity;
				} elseif ($originalStatus === $newStatus) {
					if ($newStatus === 'plus') {
						$material->total_quantity += $newQuantity - $originalQuantity;
					} elseif ($newStatus === 'minus') {
						$material->total_quantity -= $newQuantity - $originalQuantity;
					}
				}
			}

			$material->save();

			return $this->successResponse('Riwayat material berhasil diperbarui', $materialHistory);
		} catch (\Illuminate\Validation\ValidationException $e) {
			return $this->badRequestResponse('Validasi Gagal', $e->errors());
		} catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
			return $this->notFoundResponse('Material yang dimaksud tidak ditemukan');
		} catch
		(\Exception $e) {
			return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
		}
	}

	public
	function destroy($id)
	{
		try {
			$materialHistory = MaterialHistory::findOrFail($id);
			$materialId = $materialHistory->material_id;

			if ($materialHistory->status === 'plus' || $materialHistory->status === 'minus') {
				$material = Material::findOrFail($materialId);
				$material->total_quantity -= $materialHistory->quantity;
				$material->save();
			}

			$materialHistory->delete();

			return $this->successResponse('Riwayat material berhasil dihapus', $materialHistory);
		} catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
			return $this->notFoundResponse('Riwayat material tidak ditemukan');
		} catch (\Exception $e) {
			return $this->serverErrorResponse('Gagal menghapus riwayat material', $e->getMessage());
		}
	}


}
