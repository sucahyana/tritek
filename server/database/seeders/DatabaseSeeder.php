<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 100; $i++) {
            DB::table('materials')->insert([
                'id' => $i,
                'name' => 'Material ' . $i,
                'model' => 'MTL' . $i,
                'unit' => 'kg',
                'description' => 'Description of Material ' . $i,
                'information' => 'informasi ada disini' . $i,
                'total_quantity' => rand(50, 200),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        for ($i = 1; $i <= 100; $i++) {
            DB::table('products')->insert([
                'id' => $i,
                'name' => 'Product ' . $i,
                'description' => 'Description of Product ' . $i,
                'net_weight' => rand(5, 20) + 0.5,
                'total_quantity' => rand(500, 2000),
                'unit' => 'piece',
                'status' => 'Active',
                'update_date' => now(),
                'created_at' => now(),
                'updated_at' => now(),
                'model' => 'KLKK' . $i,
                'material_id' => $i,
                'material_used' => rand(1 , 5),
            ]);
        }


        $processCounter = 1;
        for ($productId = 1; $productId <= 100; $productId++) {
            for ($j = 1; $j <= 5; $j++) {
                DB::table('processes')->insert([
                    'id' => $processCounter,
                    'name' => 'Process ' . $processCounter,
                    'description' => 'Description of Process ' . $processCounter,
                    'created_at' => now(),
                    'updated_at' => now(),
                    'product_id' => $productId,
                ]);
                $processCounter++;
            }


            DB::table('processes')->insert([
                'id' => $processCounter,
                'name' => 'Packaging',
                'description' => 'Packaging process for Product ' . $productId,
                'created_at' => now(),
                'updated_at' => now(),
                'product_id' => $productId,
            ]);
            $processCounter++;

            DB::table('processes')->insert([
                'id' => $processCounter,
                'name' => 'Pengurangan',
                'description' => 'Pengurangan process for Product ' . $productId,
                'created_at' => now(),
                'updated_at' => now(),
                'product_id' => $productId,
            ]);
            $processCounter++;
        }

        for ($processId = 1; $processId <= $processCounter - 1; $processId++) {
            for ($k = 1; $k <= 100; $k++) {
                DB::table('product_process')->insert([
                    'id' => (string)Str::uuid(),
                    'product_id' => rand(1, 100),
                    'process_id' => rand(1, $processCounter - 1),
                    'date' => now(),
                    'author' => 'Author ' . $k,
                    'unit' => 'kg',
                    'material_id' => rand(1, 100),
                    'process_send_total' => rand(10, 50),
                    'process_receive_total' => rand(5, 45),
                    'total_goods' => rand(5, 40),
                    'total_not_goods' => rand(1, 10),
                    'total_quantity' => rand(10, 50),
                    'status' => 'Active',
                    'notes' => 'Notes for process ' . $processId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
        
        for ($i = 1; $i <= 100; $i++) {
            DB::table('production_reports')->insert([
                'id' => $i,
                'product_id' => $i, // Ensure product_id exists
                'report_date' => now(),
                'total_produced' => rand(500, 2000),
                'total_used' => rand(100, 1000),
                'status' => 'Completed',
                'notes' => 'Initial production report for Product ' . $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }


        for ($i = 1; $i <= 100; $i++) {
            DB::table('users')->insert([
                'name' => 'User ' . $i,
                'email' => 'user' . $i . '@example.com',
                'password' => bcrypt('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }


        for ($i = 1; $i <= 100; $i++) {
            DB::table('inventory_reports')->insert([
                'id' => $i,
                'material_id' => $i,
                'report_date' => now(),
                'quantity' => rand(20, 100),
                'notes' => 'Initial inventory report for Material ' . $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }


        for ($materialId = 1; $materialId <= 100; $materialId++) {
            for ($i = 1; $i <= 100; $i++) {
                DB::table('material_histories')->insert([
                    'id' => ($materialId - 1) * 100 + $i,
                    'material_id' => $materialId,
                    'date' => now(),
                    'unit' => 'kg',
                    'quantity' => rand(10, 50),
                    'status' => 'In',
                    'notes' => 'Material ' . $materialId . ' received for Process ' . rand(1, 500),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
