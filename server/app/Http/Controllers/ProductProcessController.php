<?php

namespace App\Http\Controllers;

use App\Constants\UnitOptions;
use App\Models\Material;
use App\Models\MaterialHistory;
use App\Models\Process;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Models\ProductProcess;
use App\Models\Product;
use Illuminate\Validation\Rule;

class ProductProcessController extends Controller
{
    use ResponseTrait;

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'process_id' => 'required|exists:processes,id',
                'material_id' => 'sometimes|exists:materials,id',
                'date' => 'sometimes|date',
                'author' => 'sometimes|string',
                'process_send_total' => 'sometimes|numeric',
                'process_receive_total' => 'sometimes|numeric',
                'total_goods' => 'sometimes|numeric',
                'total_not_goods' => 'sometimes|numeric',
                'total_quantity' => 'sometimes|numeric',
                'unit' => [
                    'sometimes',
                    'string',
                    Rule::in(array_merge(UnitOptions::$massUnits, UnitOptions::$lengthUnits, UnitOptions::$otherUnits))
                ],
                'status' => [
                    'sometimes',
                    'string',
                    Rule::in(['plus', 'minus', 'delivery', 'return']),
                ],
                'notes' => 'sometimes|string',
            ]);

            $process = Process::find($validated['process_id']);
            if (!$process) {
                return $this->notFoundResponse('Process tidak ditemukan');
            }

            $product = Product::find($validated['product_id']);
            if (!$product) {
                return $this->notFoundResponse('Product tidak ditemukan');
            }

            $productProcess = ProductProcess::create([
                'product_id' => $validated['product_id'],
                'process_id' => $validated['process_id'],
                'material_id' => $validated['material_id'],
                'date' => $validated['date'] ?? now(),
                'author' => $validated['author'] ?? 'Unknown',
                'process_send_total' => $validated['process_send_total'] ?? 0,
                'process_receive_total' => $validated['process_receive_total'] ?? 0,
                'total_goods' => $validated['total_goods'] ?? 0,
                'total_not_goods' => $validated['total_not_goods'] ?? 0,
                'total_quantity' => $validated['total_quantity'] ?? 0,
                'unit' => $validated['unit'] ?? 'unit',
                'status' => $validated['status'] ?? 'plus',
                'notes' => $validated['notes'] ?? '',
            ]);

            if (strtolower($process->name) === 'packaging') {
                $material = Material::find($validated['material_id']);
                if (!$material) {
                    return $this->notFoundResponse('Material tidak ditemukan');
                }

                $materialUsed = $product->material_used;
                $productUnit = $product->unit;
                $materialUnit = $material->unit;

                $convertedQuantity = $materialUsed * $validated['total_quantity'];

                $material->total_quantity -= $convertedQuantity;
                $material->save();

                MaterialHistory::create([
                    'material_id' => $validated['material_id'],
                    'quantity' => -$convertedQuantity,
                    'unit' => $materialUnit,
                    'type' => 'usage',
                    'status' => 'minus',
                    'description' => "Material digunakan untuk {$product->name}",
                    'date' => $validated['date'] ?? now(),
                    'author' => $validated['author'] ?? 'Unknown',
                ]);
            }

            if (strtolower($process->name) === 'packaging') {
                $product->total_quantity -= $validated['total_quantity'];
                $product->save();
            }

            return $this->createdResponse('Riwayat proses produk berhasil ditambahkan', $productProcess);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->badRequestResponse('Validasi Gagal', $e->errors());
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }







    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'product_id' => 'sometimes|exists:products,id',
                'process_id' => 'sometimes|exists:processes,id',
                'material_id' => 'sometimes|exists:materials,id',
                'date' => 'sometimes|date',
                'author' => 'sometimes|string',
                'process_send_total' => 'sometimes|numeric',
                'process_receive_total' => 'sometimes|numeric',
                'total_goods' => 'sometimes|numeric',
                'total_not_goods' => 'sometimes|numeric',
                'total_quantity' => 'sometimes|numeric',
                'unit' => [
                    'sometimes',
                    'string',
                    Rule::in(array_merge(UnitOptions::$massUnits, UnitOptions::$lengthUnits, UnitOptions::$otherUnits))
                ],
                'status' => [
                    'sometimes',
                    'string',
                    Rule::in(['plus', 'minus']),
                ],
                'notes' => 'sometimes|string',
            ]);

            $productProcess = ProductProcess::findOrFail($id);
            $productProcess->update($validated);

            return $this->successResponse('Riwayat proses produk berhasil diperbarui', $productProcess);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->badRequestResponse('Validasi Gagal', $e->errors());
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $productProcess = ProductProcess::findOrFail($id);
            $productProcess->delete();

            return $this->successResponse('Riwayat proses produk berhasil dihapus');
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }
}
