<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
	    Schema::create('material_histories', function (Blueprint $table) {
		    $table->uuid('id')->primary();
		    $table->foreignUuid('material_id')->constrained('materials')->onDelete('cascade');
		    $table->float('quantity');
		    $table->string('unit');
		    $table->string('status');
		    $table->text('notes')->nullable();
            $table->date('date')->nullable();
		    $table->timestamps();
	    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material_histories');
    }
};
