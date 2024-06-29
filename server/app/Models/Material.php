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
 * Class Material
 *
 * @property string $id
 * @property string $name
 * @property string $unit
 * @property string|null $model
 * @property string|null $description
 * @property float|null $total_quantity
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Collection|InventoryReport[] $inventory_reports
 * @property Collection|MaterialHistory[] $material_histories
 * @property Collection|ProductProcess[] $product_processes
 *
 * @package App\Models
 */
class Material extends Model
{
	use HasUuids;
	protected $table = 'materials';
	public $incrementing = false;

	protected $casts = [
		'total_quantity' => 'float'
	];

	protected $fillable = [
		'name',
		'unit',
		'model',
		'description',
		'total_quantity'
	];

	public function inventory_reports()
	{
		return $this->hasMany(InventoryReport::class);
	}

	public function material_histories()
	{
		return $this->hasMany(MaterialHistory::class);
	}

	public function product_processes()
	{
		return $this->hasMany(ProductProcess::class);
	}


}
