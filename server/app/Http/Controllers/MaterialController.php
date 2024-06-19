<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;
use App\Traits\ResponseTrait;
use App\Constants\UnitOptions;
use Illuminate\Validation\Rule;

class MaterialController extends Controller
{
	use ResponseTrait;

	public function store(Request $request)
	{
		try {
			$validated = $request->validate([
				'name' => 'required|string|max:255',
				'model'=> 'required|string|max:255|unique:materials',
				'description' => 'required|string|max:255',
				'total_quantity' => 'required|numeric',
				'unit'  => [
					'required',
					'string',
					Rule::in(array_merge(UnitOptions::$massUnits, UnitOptions::$lengthUnits, UnitOptions::$otherUnits))
				],
			]);

			$validated['total_quantity'] = UnitOptions::convertToKilograms($validated['total_quantity'], $validated['unit']);
			$validated['unit'] = 'kg';

			$material = Material::create($validated);

			return $this->createdResponse('Material berhasil dibuat', $material);

		} catch (\Illuminate\Validation\ValidationException $e) {
			return $this->badRequestResponse('Validasi Gagal', $e->errors());
		} catch (\Exception $e) {
			return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
		}
	}

	public function index()
	{
		try {
			$materials = Material::all();
			return $this->successResponse('Daftar material berhasil diambil', $materials);
		} catch (\Exception $e) {
			return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
		}
	}

	public function show($id)
	{
		try {
			$material = Material::findOrFail($id);
			return $this->successResponse('Material berhasil diambil', $material);
		} catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
			return $this->notFoundResponse('Material tidak ditemukan');
		} catch (\Exception $e) {
			return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
		}
	}
}
