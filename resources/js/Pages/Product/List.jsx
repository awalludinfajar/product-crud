import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import TableProduct from "./Table";

const ListProduct = ({ data }) => {
    const [search, setSearch] = useState('');

    const filterData = data.filter((item) => 
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const goToForm = route('product.form', {id : 0});
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Product
                </h2>
            }
        >
            <Head title="Data Product"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <section>
                            <div className="flex items-center mb-4 justify-between">
                                <TextInput
                                    value=""
                                    onChange={(newValue) => setSearch(newValue)}
                                    placeholder="Search by Name..."
                                />
                                <Link href={goToForm}>
                                    <PrimaryButton>Create new</PrimaryButton>
                                </Link>
                            </div>
                            <TableProduct initialData={filterData} />
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
};

export default ListProduct;