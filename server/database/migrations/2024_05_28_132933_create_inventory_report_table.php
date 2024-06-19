<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoryReportTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('inventory_reports', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->uuid('material_id');
			$table->foreign('material_id')->references('id')->on('materials')->onDelete('cascade');
			$table->timestamp('report_date');
			$table->float('quantity');
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
		Schema::dropIfExists('inventory_report');
	}
}
