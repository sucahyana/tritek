<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ProductProcess
 *
 * @property string $id
 * @property string $product_id
 * @property string $process_id
 * @property Carbon $date
 * @property string $author
 * @property string $unit
 * @property string $material_id
 * @property float $process_send_total
 * @property float $process_receive_total
 * @property float $total_goods
 * @property float $total_not_goods
 * @property string $status
 * @property string|null $notes
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Material $material
 * @property Process $process
 * @property Product $product
 *
 * @package App\Models
 */
class ProductProcess extends Model
{
    use HasUuids;

    public $incrementing = false;
    protected $table = 'product_process';
    protected $casts = [
        'date' => 'datetime',
        'process_send_total' => 'float',
        'process_receive_total' => 'float',
        'total_goods' => 'float',
        'total_not_goods' => 'float',
        'total_quantity' => 'float'
    ];

    protected $fillable = [
        'product_id',
        'process_id',
        'date',
        'author',
        'unit',
        'material_id',
        'process_send_total',
        'process_receive_total',
        'total_goods',
        'total_not_goods',
        'total_quantity',
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

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
