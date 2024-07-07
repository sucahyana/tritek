<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaterialsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('materials', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->string('name');
			$table->string('unit');
			$table->string('model')->nullable();
			$table->string('description')->nullable();
            $table->string('information')->nullable();;
			$table->float('total_quantity')->nullable();
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
		Schema::dropIfExists('materials');
	}
}
