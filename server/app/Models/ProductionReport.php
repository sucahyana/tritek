<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ProductionReport
 * 
 * @property string $id
 * @property string $product_id
 * @property Carbon $report_date
 * @property float $total_produced
 * @property float $total_used
 * @property string $status
 * @property string|null $notes
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Product $product
 *
 * @package App\Models
 */
class ProductionReport extends Model
{
	use HasUuids;
	protected $table = 'production_reports';
	public $incrementing = false;

	protected $casts = [
		'report_date' => 'datetime',
		'total_produced' => 'float',
		'total_used' => 'float'
	];

	protected $fillable = [
		'product_id',
		'report_date',
		'total_produced',
		'total_used',
		'status',
		'notes'
	];

	public function product()
	{
		return $this->belongsTo(Product::class);
	}
}
