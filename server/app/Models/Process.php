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
 * Class Process
 * 
 * @property string $id
 * @property string $product_id
 * @property string $name
 * @property string|null $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Product $product
 * @property Collection|MaterialHistory[] $material_histories
 * @property Collection|Product[] $products
 *
 * @package App\Models
 */
class Process extends Model
{
	use HasUuids;
	protected $table = 'processes';
	public $incrementing = false;

	protected $fillable = [
		'product_id',
		'name',
		'description'
	];

	public function product()
	{
		return $this->belongsTo(Product::class);
	}

	public function material_histories()
	{
		return $this->hasMany(MaterialHistory::class);
	}

	public function products()
	{
		return $this->belongsToMany(Product::class, 'product_process')
					->withPivot('id', 'date', 'author', 'unit', 'material_id', 'quantity_used', 'process_send_total', 'process_receive_total', 'total_goods', 'total_not_goods', 'status', 'notes')
					->withTimestamps();
	}
	public function productProcesses()
    {
        return $this->hasMany(ProductProcess::class);
    }
}
