<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class TelescopeMonitoring
 * 
 * @property string $tag
 *
 * @package App\Models
 */
class TelescopeMonitoring extends Model
{
	protected $table = 'telescope_monitoring';
	protected $primaryKey = 'tag';
	public $incrementing = false;
	public $timestamps = false;
}
