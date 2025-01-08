<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryModel extends Model
{
    use HasFactory;

    protected $fillable = [
        "nama",
        "description"
    ];

    public function dataMobil() {
        return $this->hasMany(ProductModel::class, "id");
    }
}
