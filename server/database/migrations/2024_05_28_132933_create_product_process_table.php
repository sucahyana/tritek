<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductProcessTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('product_process', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->uuid('product_id');
			$table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
			$table->uuid('process_id');
			$table->foreign('process_id')->references('id')->on('processes')->onDelete('cascade');
			$table->timestamp('date');
			$table->string('author');
			$table->string('unit');
			$table->uuid('material_id');
			$table->foreign('material_id')->references('id')->on('materials')->onDelete('cascade');
			$table->float('process_send_total');
			$table->float('process_receive_total');
			$table->float('total_goods');
			$table->float('total_not_goods');
			$table->float('total_quantity');
			$table->string('status');
			$table->text('notes')->nullable();
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
		Schema::dropIfExists('product_process');
	}
}
