<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class MaterialHistory
 * 
 * @property string $id
 * @property string $material_id
 * @property string $process_id
 * @property float $quantity
 * @property string $unit
 * @property string $status
 * @property string|null $notes
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Material $material
 * @property Process $process
 *
 * @package App\Models
 */
class MaterialHistory extends Model
{
	use HasUuids;
	protected $table = 'material_histories';
	public $incrementing = false;

	protected $casts = [
		'quantity' => 'float'
	];

	protected $fillable = [
		'material_id',
		'process_id',
		'quantity',
		'unit',
		'status',
		'notes'
	];

	public function material()
	{
		return $this->belongsTo(Material::class);
	}

	public function process()
	{
		return $this->belongsTo(Process::class);
	}
}
