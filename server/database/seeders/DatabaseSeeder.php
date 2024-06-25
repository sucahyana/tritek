<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Seed data for materials table
        DB::table('materials')->insert([
            'id' => '1',
            'name' => 'Material 1',
            'model' => 'MTL1',
            'unit' => 'kg',
            'description' => 'Description of Material 1',
            'total_quantity' => 100,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('materials')->insert([
            'id' => '2',
            'name' => 'Material 2',
            'model' => 'MTL2',
            'unit' => 'pcs',
            'description' => 'Description of Material 2',
            'total_quantity' => 150,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Seed data for products table
        DB::table('products')->insert([
            'id' => '1',
            'name' => 'Product 1',
            'description' => 'Description of Product 1',
            'net_weight' => 10.5,
            'total_quantity' => 1000,
            'unit' => 'pcs',
            'status' => 'Active',
            'update_date' => now(),
            'created_at' => now(),
            'updated_at' => now(),
            'model' => 'KLKK1',
            'material_id' => '1',
            'material_used' => 20,
        ]);

        DB::table('products')->insert([
            'id' => '2',
            'name' => 'Product 2',
            'description' => 'Description of Product 2',
            'net_weight' => 8.75,
            'total_quantity' => 800,
            'unit' => 'pcs',
            'status' => 'Active',
            'update_date' => now(),
            'created_at' => now(),
            'updated_at' => now(),
            'model' => 'KLKK2',
            'material_id' => '1',
            'material_used' => 20,
        ]);

        // Seed data for processes table
        DB::table('processes')->insert([
            'id' => '1',
            'name' => 'Process 1',
            'description' => 'Description of Process 1',
            'created_at' => now(),
            'updated_at' => now(),
            'product_id' => '1'
        ]);

        DB::table('processes')->insert([
            'id' => '2',
            'name' => 'Process 2',
            'description' => 'Description of Process 2',
            'created_at' => now(),
            'updated_at' => now(),
            'product_id' => '1'
        ]);

        // Seed data for production_reports table
        DB::table('production_reports')->insert([
            'id' => '1',
            'product_id' => '1', // Ensure this matches with an existing product ID
            'report_date' => now(),
            'total_produced' => 1000,
            'total_used' => 500,
            'status' => 'Completed',
            'notes' => 'Initial production report for Product 1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('production_reports')->insert([
            'id' => '2',
            'product_id' => '2', // Ensure this matches with an existing product ID
            'report_date' => now(),
            'total_produced' => 800,
            'total_used' => 400,
            'status' => 'Completed',
            'notes' => 'Initial production report for Product 2',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Seed data for users table
        DB::table('users')->insert([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Seed data for inventory_reports table
        DB::table('inventory_reports')->insert([
            'id' => '1',
            'material_id' => '1',
            'report_date' => now(),
            'quantity' => 50,
            'notes' => 'Initial inventory report for Material 1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('inventory_reports')->insert([
            'id' => '2',
            'material_id' => '2',
            'report_date' => now(),
            'quantity' => 75,
            'notes' => 'Initial inventory report for Material 2',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Seed data for material_histories table
        DB::table('material_histories')->insert([
            'id' => '1',
            'material_id' => '1',
            'process_id' => '1',
            'unit' => 'kg',
            'quantity' => 25,
            'status' => 'In',
            'notes' => 'Material 1 received for Process 1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('material_histories')->insert([
            'id' => '2',
            'material_id' => '2',
            'process_id' => '2',
            'unit' => 'kg',
            'quantity' => 30,
            'status' => 'In',
            'notes' => 'Material 2 received for Process 2',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
