<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return redirect()->route('product.list');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('/data')->group(function () {
    Route::prefix('/product')->controller(ProductController::class)->group(function () {
        Route::get('/list', 'listProduct')->name('product.list');
        Route::get('/form/{id}', 'formProduct')->name('product.form');
        // Route::get('/{id}', 'getByProductId');
        Route::post('/store/{id}', 'storeProduct')->name('product.store');
        // Route::put('/update/{id}', 'updateProduct');
        Route::delete('/delete/{id}', 'deleteProduct')->name('product.delete');
    });
});

require __DIR__.'/auth.php';
