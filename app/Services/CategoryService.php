<?php

namespace App\Services;

use App\Models\CategoryModel;

class CategoryService
{
    public function list(): ?array {
        $data = CategoryModel::All();
        return $data ? $data->toArray() : null;
    }    
}
