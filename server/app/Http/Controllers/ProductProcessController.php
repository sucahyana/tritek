<?php

namespace App\Http\Controllers;

use App\Constants\UnitOptions;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Models\ProductProcess;
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
				'date' => 'required|date',
				'process_send_total' => 'required|numeric',
				'process_receive_total' => 'required|numeric',
				'total_goods' => 'required|numeric',
				'total_not_goods' => 'required|numeric',
				'total_quantity' => 'required|numeric',
				'unit' => [
					'required',
					'string',
					Rule::in(array_merge(UnitOptions::$massUnits, UnitOptions::$lengthUnits, UnitOptions::$otherUnits))
				],
				'status' => [
					'required',
					'string',
					Rule::in(['plus', 'minus']),
				],
				'notes' => 'required|string',
			]);

			$productProcess = ProductProcess::create([
				'product_id' => $validated['product_id'],
				'process_id' => $validated['process_id'],
				'date' => $validated['date'],
				'process_send_total' => $validated['process_send_total'],
				'process_receive_total' => $validated['process_receive_total'],
				'total_goods' => $validated['total_goods'],
				'total_not_goods' => $validated['total_not_goods'],
				'total_quantity' => $validated['total_quantity'],
				'unit' => $validated['unit'],
				'status' => $validated['status'],
				'notes' => $validated['notes'],
			]);

			// Tambahkan logika untuk mengupdate data produk di sini

			return $this->createdResponse('Riwayat proses produk berhasil ditambahkan', $productProcess);
		} catch (\Illuminate\Validation\ValidationException $e) {
			return $this->badRequestResponse('Validasi Gagal', $e->errors());
		} catch (\Exception $e) {
			return $this->serverErrorResponse('Kesalahan Server', $e->getMessage());
		}
	}

}
