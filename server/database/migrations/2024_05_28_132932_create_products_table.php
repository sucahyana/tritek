<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('products', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->string('name');
			$table->string('model');
			$table->string('description');
			$table->decimal('net_weight', 10, 2);
			$table->decimal('material_used', 10, 2);
			$table->float('total_quantity');
			$table->string('unit');
			$table->string('status')->nullable();
			$table->timestamp('update_date')->useCurrent();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('products');
	}
}
