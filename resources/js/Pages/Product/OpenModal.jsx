import React from "react";

const OpenModal = ({ data }) => {
    const setIdr = (crcy) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(crcy);
    };

    const dimensionSplit = (dimension) => {
        const parsed = dimension ? JSON.parse(dimension) : {};
        return Object.entries(parsed).map(([key, value]) => `${key} = ${value}cm`).join(' || ');
    };

    return (
        <div className="w-full overflow-x-auto mx-auto">
            <div className="grid grid-cols-2 gap-8 max-md:px-2 ">
                <div className="img img-box flex justify-center">
                    <img src={data.images} className="max-lg:mx-auto h-96 object-cover sm:rounded-lg"/>
                </div>
                <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                    <div className="data w-full max-w-xl">
                        <h6 className="font-manrope font-bold leading-10 text-gray-900 mb-2 capitalize">Product</h6>
                        <table className="min-w-full">
                            <tbody>
                                <tr>
                                    <td className="px-4">Nama Product</td><td>:</td>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Brand</td><td>:</td>
                                    <td>{data.brand}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Category Product</td><td>:</td>
                                    <td>{data.data_category.name}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Price</td><td>:</td>
                                    <td>{setIdr(data.price)}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Stock</td><td>:</td>
                                    <td>{data.stock}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Weight</td><td>:</td>
                                    <td>{data.weight} gram</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Dimension</td><td>:</td>
                                    <td>{dimensionSplit(data.dimension)}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="py-6"></td>
                                </tr>
                                <tr>
                                    <td className="px-4">Description</td><td>:</td>
                                    <td>{data.description}</td>
                                </tr>
                                <tr>
                                    <td className="px-4">Warranty Information</td><td>:</td>
                                    <td>{data.warrantyInformation}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OpenModal;