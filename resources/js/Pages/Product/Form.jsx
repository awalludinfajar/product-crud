import BackButton from "@/Components/BackButton";
import InputError from "@/Components/InputError";
import InputImage from "@/Components/InputImage";
import InputLabel from "@/Components/InputLabel";
import NumberInput from "@/Components/NumberInput";
import PriceInput from "@/Components/PriceInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectOption from "@/Components/SelectOption";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const form = ({result, category }) => {
    const res = result || {};
    
    const [formData, setFormData] = useState({
        name: res.name || "",
        brand: res.brand || "",
        category_model_id: res.category_model_id || "",
        price: res.price || "",
        stock: res.stock || 0,
        weight: res.weight || 0,
        warrantyInformation: res.warrantyInformation || "",
        dimension: res.dimension || JSON.stringify({}),
        images: res.images || null, // replace(/\\/g, '')
        description: res.description || ""
    });

    const [errors, setErrors] = useState({});

    const setData = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const dimensionSplit = (dimension, type) => {
        try {
            const parsed = dimension ? JSON.parse(dimension) : {};
            if (parsed[type] == undefined) {
                const parsed2 = parsed ? JSON.parse(parsed) : {};
                return parsed2[type] || "";
            } else {
                return parsed[type] || "";
            }
        } catch {
            return "";
        }
    };

    const handleInputChange = (type, value) => {
        try {
            const currentDimensions = JSON.parse(formData.dimension || "{}");
            const updatedDimensions = { ...currentDimensions, [type]: value };
            setData("dimension", JSON.stringify(updatedDimensions));
        } catch (error) {
            console.error("Error dimensions:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        Swal.fire({
            title: "Simpan data?",
            text: "Pastikan data yang di masukan telah benar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Simpan!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(
                        route("product.store", res.id || 0), 
                        formData, {
                            headers: {
                                "X-Requested-With": "XMLHttpRequest",
                                "Content-Type": "multipart/form-data",
                            },
                        });
                    Swal.fire({
                        title: "Saved!",
                        text: response.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        window.location.href = route("product.list");
                    });
                } catch (error) {
                    if (error.response && error.response.data.errors) {
                        setErrors(error.response.data.errors);
                        Swal.fire({
                            title: "Error",
                            text: "There was an error saving the form. Please check the errors.",
                            icon: "error",
                        });
                    }
                }
            }
        });
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Form Product
                </h2>
            }
        >
            <Head title="Form Product"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <BackButton />
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Input Product
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Stored data Product
                                </p>
                            </header>
                            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        value={formData.name || ""}
                                        onChange={(value) => setData("name", value)}
                                        className="mt-1 block w-full"
                                        placeholder="Your product name..."
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="brand" value="Brand" />
                                    <TextInput
                                        id="brand"
                                        value={formData.brand || ""}
                                        onChange={(value) => setData("brand", value)}
                                        className="mt-1 block w-full"
                                        placeholder="Product brand..."
                                    />
                                    <InputError className="mt-2" message={errors.brand} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="category_model_id" value="Category Product" />
                                    <SelectOption
                                        id="category_model_id"
                                        className="mt-1 block w-full h-10"
                                        modelValue={formData.category_model_id}
                                        data={category}
                                        onModelValueChange={(value) =>
                                            setData("category_model_id", value)
                                        }
                                    />
                                    <InputError className="mt-2" message={errors.category_model_id} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="price" value="Price of product" />
                                    <PriceInput
                                        id="price"
                                        value={formData.price}
                                        onChange={(value) => setData("price", value)}
                                        className="mt-1 block w-full"
                                        placeholder="Price your product..."
                                    />
                                    <InputError className="mt-2" message={errors.price} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="stock" value="Stock" />
                                    <NumberInput
                                        id="stock"
                                        value={formData.stock}
                                        onChange={(min) => setData("stock", min)}
                                        placeholder="Stock of product..."
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.stock} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="weight" value="Weight" />
                                    <NumberInput
                                        id="weight"
                                        value={formData.weight}
                                        onChange={(min) => setData("weight", min)}
                                        placeholder="Weight product... (gram)"
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.weight} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="warrantyInformation" value="Warranty Information" />
                                    <TextAreaInput
                                        id="warrantyInformation"
                                        value={formData.warrantyInformation || ""}
                                        onChange={(value) => setData("warrantyInformation", value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.warrantyInformation} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="images" value="Image product" />
                                    <InputImage 
                                        id="images"
                                        value={formData.images || ""}
                                        onChange={(file) => setData("images" ,file)}
                                    />
                                    <InputError className="mt-2" message={errors.images} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="dimensions" value="Dimensions" />
                                    <div className="flex item-center space-x-2">
                                        <div className="flex flex-col">
                                            <InputLabel htmlFor="width" value="Width (cm)" />
                                            <TextInput id="width"
                                                value={dimensionSplit(formData.dimension, 'width')}
                                                onChange={(value) => handleInputChange("width", value)}
                                                className="mt-1 block w-full"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <InputLabel htmlFor="height" value="Height (cm)" />
                                            <TextInput id="height"
                                                value={dimensionSplit(formData.dimension, 'height')}
                                                onChange={(value) => handleInputChange("height", value)}
                                                className="mt-1 block w-full"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <InputLabel htmlFor="depth" value="Depth (cm)" />
                                            <TextInput id="depth"
                                                value={dimensionSplit(formData.dimension, 'depth')}
                                                onChange={(value) => handleInputChange("depth", value)}
                                                className="mt-1 block w-full"
                                            />
                                        </div>
                                    </div>
                                    <InputError className="mt-2" message={errors.dimension} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <TextAreaInput
                                        id="description"
                                        value={formData.description || ""}
                                        onChange={(value) => setData("description", value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.description} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={false}>Save</PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
};

export default form;