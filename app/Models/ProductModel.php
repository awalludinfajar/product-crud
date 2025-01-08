<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "brand",
        "category_model_id",
        "price",
        "stock",
        "weight",
        "warrantyInformation",
        "dimension",
        "images",
        "description"
    ];

    public function dataCategory() {
        return $this->belongsTo(CategoryModel::class, 'category_model_id');
    }
}
