<?php

namespace App\Http\Controllers;

use App\Constants\UnitOptions;
use App\Exports\ProductExport;
use App\Models\Material;
use App\Models\Process;
use App\Models\ProductProcess;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Facades\Excel;

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
                'material_id' => 'required|exists:materials,id',
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

            foreach ($validated['processes'] as $processData) {
                $process = new Process();
                $process->product_id = $product->id;
                $process->name = $processData['name'];
                $process->description = $processData['description'];
                $process->save();
                $createdProcesses[] = $process;
            }

            $this->createProcess($product->id, 'Packaging', 'Packaging');
            $createdProcesses[] = ['name' => 'Packaging', 'description' => 'Packaging'];

            $this->createProcess($product->id, 'Pengurangan Produk', 'Pengurangan Produk');
            $createdProcesses[] = ['name' => 'Pengurangan', 'description' => 'Pengurangan'];

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

    public function index(Request $request)
    {
        try {
            $perPage = $request->get('per_page', 10);
            $products = Product::orderBy('created_at', 'desc')->paginate($perPage);

            $paginationData = [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'next_page_url' => $products->nextPageUrl(),
                'prev_page_url' => $products->previousPageUrl(),
            ];

            $response = [
                'products' => $products->items(),
                'pagination' => $paginationData
            ];

            return $this->successResponse('Daftar Product berhasil diambil', $response);
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
            $perPage = $request->get('per_page', 10);
            $page = $request->get('page', 1);
            $processes = Process::where('product_id', $product->id)->get();

            $processesWithPaginatedProductProcesses = [];

            foreach ($processes as $process) {
                $paginatedProductProcesses = ProductProcess::where('process_id', $process->id)
                    ->orderBy('date', 'desc')
                    ->paginate($perPage, ['*'], 'page', $page);

                $processData = [
                    'process' => $process,
                    'product_processes' => $paginatedProductProcesses->items(),
                    'pagination' => [
                        'current_page' => $paginatedProductProcesses->currentPage(),
                        'last_page' => $paginatedProductProcesses->lastPage(),
                        'per_page' => $paginatedProductProcesses->perPage(),
                        'total' => $paginatedProductProcesses->total(),
                        'next_page_url' => $paginatedProductProcesses->nextPageUrl(),
                        'prev_page_url' => $paginatedProductProcesses->previousPageUrl(),
                    ]
                ];

                $processesWithPaginatedProductProcesses[] = $processData;
            }

            $response = [
                'product' => $product,
                'processes' => $processesWithPaginatedProductProcesses
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
    public function export(Request $request, $id)
    {
        try {
            $product = Product::where('model', $id)->first();
            if (!$product) {
                return $this->notFoundResponse('Product tidak ditemukan');
            }
            $material = Material::find($product['material_id']);
            if (!$material) {
                throw new \Exception('Material tidak ditemukan');
            }

            $processes = Process::where('product_id', $product->id)->get();
            $processesWithProductProcesses = [];

            foreach ($processes as $process) {
                $productProcesses = ProductProcess::where('process_id', $process->id)
                    ->orderBy('date', 'desc')
                    ->get();

                $processData = [
                    'process' => $process,
                    'product_processes' => $productProcesses
                ];

                $processesWithProductProcesses[] = $processData;
            }

            return Excel::download(new ProductExport($product, $processesWithProductProcesses , $material), $product->name.'.xlsx');
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
        }
    }



}
