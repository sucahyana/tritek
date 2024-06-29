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
                'model' => 'required|string|max:255|unique:materials',
                'description' => 'required|string|max:255',
                'total_quantity' => 'required|numeric',
                'unit' => [
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
    public function full()
    {
        try {
            $materials = Material::all();
            return $this->successResponse('Daftar material berhasil diambil', $materials);
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }
    public function index(Request $request)
    {
        try {
            $perPage = $request->get('per_page', 10);
            $materials = Material::orderBy('created_at', 'desc')->paginate($perPage);

            $paginationData = [
                'current_page' => $materials->currentPage(),
                'last_page' => $materials->lastPage(),
                'per_page' => $materials->perPage(),
                'total' => $materials->total(),
                'next_page_url' => $materials->nextPageUrl(),
                'prev_page_url' => $materials->previousPageUrl(),
            ];

            $response = [
                'materials' => $materials->items(),
                'pagination' => $paginationData
            ];

            return $this->successResponse('Daftar Material berhasil diambil', $response);
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }


    public function show(Request $request, $id)
    {
        try {
            $material = Material::findOrFail($id);

            $perPage = $request->get('per_page', 10);
            $subMaterials = $material->subMaterials()->paginate($perPage);

            $paginationData = [
                'current_page' => $subMaterials->currentPage(),
                'last_page' => $subMaterials->lastPage(),
                'per_page' => $subMaterials->perPage(),
                'total' => $subMaterials->total(),
                'next_page_url' => $subMaterials->nextPageUrl(),
                'prev_page_url' => $subMaterials->previousPageUrl(),
            ];

            return $this->successResponse('Material berhasil diambil', [
                'material' => $material,
                'sub_materials' => [
                    'data' => $subMaterials->items(),
                    'pagination' => $paginationData
                ]
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->notFoundResponse('Material tidak ditemukan');
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $material = Material::where('model', $id)->first();
            if (!$material) {
                return $this->notFoundResponse('Material tidak ditemukan');
            }

            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'model' => [
                    'sometimes',
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('materials')->ignore($material->id),
                ],
                'description' => 'sometimes|required|string|max:255',
                'total_quantity' => 'sometimes|required|numeric',
                'unit' => [
                    'sometimes',
                    'required',
                    'string',
                    Rule::in(array_merge(UnitOptions::$massUnits, UnitOptions::$lengthUnits, UnitOptions::$otherUnits))
                ],
            ]);

            if (isset($validated['total_quantity']) && isset($validated['unit'])) {
                $validated['total_quantity'] = UnitOptions::convertToKilograms($validated['total_quantity'], $validated['unit']);
                $validated['unit'] = 'kg';
            }

            $material->update($validated);

            return $this->successResponse('Material berhasil diperbarui', $material);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->badRequestResponse('Validasi Gagal', $e->errors());
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->notFoundResponse('Material tidak ditemukan');
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $material = Material::findOrFail($id);
            $material->delete();

            return $this->successResponse('Material berhasil dihapus');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->notFoundResponse('Material tidak ditemukan');
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }
    public function getMaterialInfo($id)
    {
        try {
            $material = Material::findOrFail($id);

            $response = [
                'name' => $material->name,
                'total_quantity' => $material->total_quantity,
                'unit' => $material->unit,
            ];

            return $this->successResponse('Informasi material berhasil diambil', $response);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->notFoundResponse('Material tidak ditemukan');
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }

}
