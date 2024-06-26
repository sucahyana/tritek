<?php

namespace App\Http\Controllers;

use App\Constants\UnitOptions;
use App\Models\Material;
use App\Models\Process;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    use ResponseTrait;

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'model' => 'required|string|max:255|unique:products',
                'description' => 'required|string|max:255',
                'total_quantity' => 'required|numeric',
                'unit' => [
                    'required',
                    'string',
                    Rule::in(array_merge(UnitOptions::$massUnits, UnitOptions::$lengthUnits, UnitOptions::$otherUnits))
                ],
                'status' => 'nullable|string|max:255',
                'net_weight' => 'required|numeric',
                'external_process' => 'required|boolean',
                'processes' => 'required|array|min:1',
                'processes.*.name' => 'required|string|max:255',
                'processes.*.description' => 'required|string|max:255',
                'material_used' => 'required|numeric',
                'material_id' => 'sometimes|exists:materials,id',
            ]);

            $product = new Product();
            $product->name = $validated['name'];
            $product->model = $validated['model'];
            $product->description = $validated['description'];
            $product->net_weight = $validated['net_weight'];
            $product->total_quantity = $validated['total_quantity'];
            $product->unit = strtolower($validated['unit']);
            $product->status = $validated['status'];
            $product->material_id = $validated['material_id'];
            $product->material_used = $validated['material_used'];
            $product->save();

            $createdProcesses = [];

            // Create processes based on request
            foreach ($validated['processes'] as $processData) {
                $process = new Process();
                $process->product_id = $product->id;
                $process->name = $processData['name'];
                $process->description = $processData['description'];
                $process->save();
                $createdProcesses[] = $process;
            }

            // Create packaging process
            $this->createProcess($product->id, 'Packaging', 'Packaging');
            $createdProcesses[] = ['name' => 'Packaging', 'description' => 'Packaging'];

            // Create external_process if needed
            if ($validated['external_process']) {
                $this->createProcess($product->id, 'External Process', 'External Process');
                $createdProcesses[] = ['name' => 'External Process', 'description' => 'External Process'];
            }

            return $this->createdResponse('Product dan prosesnya berhasil disimpan', [
                'product' => $product,
                'processes' => $createdProcesses,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->badRequestResponse('Validasi Gagal', $e->errors());
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }

    private function createProcess($productId, $name, $description)
    {
        $process = new Process();
        $process->product_id = $productId;
        $process->name = $name;
        $process->description = $description;
        $process->save();
    }

    public function index()
    {
        try {
            $products = Product::all();
            return $this->successResponse('Daftar Product berhasil diambil', $products);
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }

    public function show(Request $request, $id)
    {
        try {
            $product = Product::where('model', $id)->first();
            if (!$product) {
                return $this->notFoundResponse('Product tidak ditemukan');
            }

            // Memuat proses terkait dengan product dan laporan produksi untuk setiap proses
            $processes = Process::with('productProcesses')->where('product_id', $product->id)->get();

            $response = [
                'product' => $product,
                'processes' => $processes
            ];
            return $this->successResponse('Data berhasil diambil', $response);
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }

    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'model' => [
                    'sometimes',
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('products')->ignore($id),
                ],
                'description' => 'sometimes|required|string|max:255',
                'total_quantity' => 'sometimes|required|numeric',
                'unit' => [
                    'sometimes',
                    'required',
                    'string',
                    Rule::in(array_merge(UnitOptions::$massUnits, UnitOptions::$lengthUnits, UnitOptions::$otherUnits)),
                ],
                'status' => 'nullable|string|max:255',
                'net_weight' => 'sometimes|required|numeric',
                'external_process' => 'sometimes|required|boolean',
                'material_used' => 'sometimes|required|numeric',
                'material_id' => 'sometimes|exists:materials,id',
            ]);

            $product = Product::where('model', $id)->first();
            if (!$product) {
                return $this->notFoundResponse('Product tidak ditemukan');
            }

            if (isset($validated['name'])) $product->name = $validated['name'];
            if (isset($validated['model'])) $product->model = $validated['model'];
            if (isset($validated['description'])) $product->description = $validated['description'];
            if (isset($validated['net_weight'])) $product->net_weight = $validated['net_weight'];
            if (isset($validated['total_quantity'])) $product->total_quantity = $validated['total_quantity'];
            if (isset($validated['unit'])) $product->unit = strtolower($validated['unit']);
            if (isset($validated['status'])) $product->status = $validated['status'];
            if (isset($validated['material_id'])) $product->material_id = $validated['material_id'];
            if (isset($validated['material_used'])) $product->material_used = $validated['material_used'];
            $product->save();

            return $this->successResponse('Product berhasil diperbarui', [
                'product' => $product,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->badRequestResponse('Validasi Gagal', $e->errors());
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }



}
