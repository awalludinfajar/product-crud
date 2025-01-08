<?php

namespace App\Services;

use App\Models\ProductModel;

class ProductService 
{
    public function list(): ?array {
        $data = ProductModel::with("dataCategory")->get();
        return $data ? $data->toArray() : null;
    }

    public function getById($id): ?array {
        $data = ProductModel::with("dataCategory")->find($id);
        return $data ? $data->toArray() : null;
    }

    public function create(array $data): ProductModel {
        return ProductModel::create($data);
    }

    public function update(array $data, int $id): ?ProductModel {
        $product = ProductModel::find($id);

        if (!$product) {
            return null;
        }

        $product->update($data);
        return $product;
    }

    public function delete($id) : bool {
        $product = ProductModel::find($id);

        if (!$product) {
            return false;
        }
        return $product->delete();
    }
}
