<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class InventoryReport
 * 
 * @property string $id
 * @property string $material_id
 * @property Carbon $report_date
 * @property float $quantity
 * @property string|null $notes
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Material $material
 *
 * @package App\Models
 */
class InventoryReport extends Model
{
	use HasUuids;
	protected $table = 'inventory_reports';
	public $incrementing = false;

	protected $casts = [
		'report_date' => 'datetime',
		'quantity' => 'float'
	];

	protected $fillable = [
		'material_id',
		'report_date',
		'quantity',
		'notes'
	];

	public function material()
	{
		return $this->belongsTo(Material::class);
	}
}
