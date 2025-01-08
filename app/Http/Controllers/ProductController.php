<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\ProductModel;
use App\Services\CategoryService;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    protected ProductService $productService;
    protected CategoryService $categoryService;

    public function __construct(ProductService $productService, CategoryService $categoryService)
    {
        $this->productService = $productService;
        $this->categoryService = $categoryService;
    }

    public function listProduct() : Response {
        $data = $this->productService->list();
        return Inertia::render('Product/List', [
            'data' => $data
        ]);
    }

    public function formProduct($id) : Response {
        $data = $id == 0 ? null : ProductModel::find($id);
        return Inertia::render('Product/Form', [
            'result' => $data,
            'category' => $this->categoryService->list()
        ]);
    }

    public function getByProductId($id) : JsonResponse {
        $data = $this->productService->getById($id);

        if (!$data) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Product retrieved successfully',
            'data' => $data,
        ]);
    }

    public function storeProduct(ProductRequest $request, $id) : JsonResponse {
        $data = $request->all();

        $dataProduct = $this->productService->getById($id);
        if ($request->hasFile("images")) {
            $request->validate([
                'images' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            ]);

            if ($id != 0 && $dataProduct['images'] != null) {
                $sUrl = explode('/', $dataProduct['images']);
                $oldUrl = $sUrl[count($sUrl)-2].'/'.$sUrl[count($sUrl)-1];
    
                if (Storage::disk('public')->exists($oldUrl)) {
                    Storage::disk('public')->delete($oldUrl);
                }
            }

            $pathImage = $data['images']->store('images', 'public');
            $imageUrl = Storage::url($pathImage);
            $data['images'] = $imageUrl;
        } else {
            $data['images'] = $dataProduct['images'];
        }

        if ($id == 0) {
            $this->productService->create($data);
            return response()->json(['message' => "Product has been saved successfully"]);
        } else {
            $this->productService->update($data, $id);
            return response()->json(['message' => "Product has been updated successfully"]);
        }
    }

    public function deleteProduct($id) : JsonResponse {
        $data = $this->productService->delete($id);

        if (!$data) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found or could not be deleted',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully',
        ]);
    }
}
