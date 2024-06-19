<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductionReportTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('production_reports', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->uuid('product_id');
			$table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
			$table->timestamp('report_date');
			$table->float('total_produced');
			$table->float('total_used');
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
		Schema::dropIfExists('production_report');
	}
}
