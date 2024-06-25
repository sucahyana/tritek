<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Product
 *
 * @property string $id
 * @property string $name
 * @property string $description
 * @property float $net_weight
 * @property float $total_quantity
 * @property string $unit
 * @property string|null $status
 * @property Carbon $update_date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Collection|Process[] $processes
 * @property Collection|ProductionReport[] $production_reports
 *
 * @package App\Models
 */
class Product extends Model
{
	use HasUuids;
	protected $table = 'products';
	public $incrementing = false;

	protected $casts = [
		'net_weight' => 'float',
		'total_quantity' => 'float',
		'update_date' => 'datetime'
	];

	protected $fillable = [
		'name',
		'description',
		'net_weight',
		'model',
        'material_id',
		'material_used',
		'total_quantity',
		'unit',
		'status',
		'update_date'
	];

	public function processes()
	{
		return $this->belongsToMany(Process::class, 'product_process')
					->withPivot('id', 'date', 'author', 'unit', 'material_id', 'quantity_used', 'process_send_total', 'process_receive_total', 'total_goods', 'total_not_goods', 'status', 'notes')
					->withTimestamps();
	}

	public function production_reports()
	{
		return $this->hasMany(ProductionReport::class);
	}
}
