<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('category_models')->insert([
            [
                'name' => 'Electronics',
                'description' => 'Devices and gadgets for everyday use.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Books',
                'description' => 'Fiction, non-fiction, and educational books.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Clothing',
                'description' => 'Apparel for men, women, and children.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
