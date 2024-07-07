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

            $material = Material::findOrFail($validated['material_id']);


            if ($material->unit !== $validated['unit'] && in_array($material->unit, UnitOptions::$massUnits)) {
                $convertedQuantity = UnitOptions::convertToUnit(
                    $validated['quantity'],
                    $validated['unit'],
                    $material->unit
                );


                if ($convertedQuantity === null) {
                    return $this->badRequestResponse('Unit tidak kompatibel antara material dan permintaan');
                }

                $validated['quantity'] = $convertedQuantity;
                $validated['unit'] = $material->unit;
            }

            $materialHistory = MaterialHistory::create([
                'material_id' => $validated['material_id'],
                'date' => $validated['date'],
                'quantity' => $validated['quantity'],
                'status' => $validated['status'],
                'notes' => $validated['notes'],
                'unit' => $validated['unit']
            ]);


            if ($validated['status'] === 'plus') {
                $material->total_quantity += $validated['quantity'];
            } elseif ($validated['status'] === 'minus') {
                $material->total_quantity -= $validated['quantity'];
            }

            $material->save();

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

            $perPage = $request->get('per_page', 10);
            $search = $request->get('search');

            $materialHistoryQuery = MaterialHistory::where('material_id', $material->id);

            // Menambahkan kondisi pencarian jika ada
            if (!empty($search)) {
                $materialHistoryQuery->where(function ($query) use ($search) {
                    $query->where('date', 'like', '%' . $search . '%')
                        ->orWhere('quantity', 'like', '%' . $search . '%')
                        ->orWhere('status', 'like', '%' . $search . '%')
                        ->orWhere('notes', 'like', '%' . $search . '%')
                        ->orWhere('unit', 'like', '%' . $search . '%');
                });
            }

            $materialHistory = $materialHistoryQuery->orderBy('date', 'desc')->paginate($perPage);

            $paginationData = [
                'current_page' => $materialHistory->currentPage(),
                'last_page' => $materialHistory->lastPage(),
                'per_page' => $materialHistory->perPage(),
                'total' => $materialHistory->total(),
                'next_page_url' => $materialHistory->nextPageUrl(),
                'prev_page_url' => $materialHistory->previousPageUrl(),
            ];

            $response = [
                'material' => $material,
                'history' => $materialHistory->items(),
                'pagination' => $paginationData
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
            $originalUnit = $materialHistory->unit;

            $materialHistory->update($validated);

            if (isset($validated['quantity']) && isset($validated['unit']) && in_array($originalUnit, UnitOptions::$massUnits)) {
                $newQuantity = $validated['quantity'];
                $newUnit = $validated['unit'];

                if ($originalUnit !== $newUnit) {
                    $convertedQuantity = UnitOptions::convertToUnit($newQuantity, $newUnit, $originalUnit);

                    if ($convertedQuantity === null) {
                        return $this->badRequestResponse('Unit tidak kompatibel antara material dan permintaan');
                    }
                    $materialHistory->quantity = $convertedQuantity;
                    $materialHistory->unit = $originalUnit;
                    $materialHistory->save();
                }
            }

            return $this->successResponse('Riwayat material berhasil diperbarui', $materialHistory);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->badRequestResponse('Validasi Gagal', $e->errors());
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->notFoundResponse('Material yang dimaksud tidak ditemukan');
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }


    public function destroy($id)
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

    public function export(Request $request, $id)
    {
        try {
            $material = Material::where('model', $id)->first();
            if (!$material) {
                return $this->notFoundResponse('Material tidak ditemukan');
            }


            $materialHistory = MaterialHistory::where('material_id', $material->id)
                ->orderBy('created_at', 'desc')
                ->get();

            $headers = array(
                "Content-type"        => "text/csv",
                "Content-Disposition" => "attachment; filename=material_history.csv",
                "Pragma"              => "no-cache",
                "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
                "Expires"             => "0"
            );

            $columns = ['ID', 'Material ID', 'Date', 'Quantity', 'Status', 'Notes', 'Unit', 'Created At', 'Updated At'];

            $callback = function() use ($materialHistory, $columns) {
                $file = fopen('php://output', 'w');
                fputcsv($file, $columns);

                foreach ($materialHistory as $history) {
                    fputcsv($file, [
                        $history->id,
                        $history->material_id,
                        $history->date,
                        $history->quantity,
                        $history->status,
                        $history->notes,
                        $history->unit,
                        $history->created_at,
                        $history->updated_at,
                    ]);
                }

                fclose($file);
            };

            return response()->stream($callback, 200, $headers);

        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }


}
