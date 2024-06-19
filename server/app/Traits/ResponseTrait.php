<?php

namespace App\Traits;

trait ResponseTrait
{
	private function createResponse($status, $success, $message, $data = null, $errors = null)
	{
		return response()->json([
			'status' => $status,
			'success' => $success,
			'message' => $message,
			'data' => $data,
			'errors' => $errors,
		], $status);
	}

	public function successResponse($message, $data = null)
	{
		return $this->createResponse(200, true, $message, $data);
	}

	public function createdResponse($message, $data = null)
	{
		return $this->createResponse(201, true, $message, $data);
	}

	public function noContentResponse($message = 'No content')
	{
		return $this->createResponse(204, true, $message);
	}

	public function badRequestResponse($message, $errors = null, $data = null)
	{
		return $this->createResponse(400, false, $message, $data, $errors);
	}

	public function notFoundResponse($message = 'Not found')
	{
		return $this->createResponse(404, false, $message);
	}

	public function serverErrorResponse($message, $errors = null, $data = null)
	{
		return $this->createResponse(500, false, $message, $errors, $data);
	}
}