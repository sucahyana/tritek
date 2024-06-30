<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Process;
use App\Traits\ResponseTrait;

class ProcessController extends Controller
{
    use ResponseTrait;

    public function update(Request $request, $id)
    {
        try {

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string|max:255',
            ]);

            // Find the process by ID
            $process = Process::find($id);
            if (!$process) {
                return $this->notFoundResponse('Process not found');
            }


            $process->name = $validated['name'];
            $process->description = $validated['description'];
            $process->save();


            return $this->successResponse('Process updated successfully', $process);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->badRequestResponse('Validation failed', $e->errors());
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Server error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {

            $process = Process::find($id);
            if (!$process) {
                return $this->notFoundResponse('Process not found');
            }


            $process->delete();

            return $this->successResponse('Process deleted successfully');
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Server error', $e->getMessage());
        }
    }

    public function add(Request $request)
    {
        try {

            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'name' => 'required|string|max:255',
                'description' => 'required|string|max:255',
            ]);


            $process = new Process();
            $process->product_id = $validated['product_id'];
            $process->name = $validated['name'];
            $process->description = $validated['description'];
            $process->save();


            return $this->createdResponse('Process added successfully', $process);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->badRequestResponse('Validation failed', $e->errors());
        } catch (\Exception $e) {
            return $this->serverErrorResponse('Server error', $e->getMessage());
        }
    }
}
