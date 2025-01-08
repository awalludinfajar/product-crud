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
        Schema::create('product_models', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("brand");
            $table->foreignId("category_model_id")->constrained()->onDelete("cascade")->onUpdate("cascade");
            $table->decimal("price", 10, 2);
            $table->unsignedInteger("stock");
            $table->decimal("weight", 8, 2);
            $table->text("warrantyInformation");
            $table->json("dimension");
            $table->string("images");
            $table->text("description");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_models');
    }
};
