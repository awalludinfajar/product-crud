import EditButton from "@/Components/EditButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import RemoveButton from "@/Components/RemoveButton";
import ViewButton from "@/Components/ViewButton";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import OpenModal from "./OpenModal";

const TableProduct = ({ initialData }) => {
    const [data, setData] = useState(initialData);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const setIdr = (crcy) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(crcy);
    };

    const handleUpdate = (val) => {
        window.location.href = route('product.form', val);
    }

    const handleDelete = (val) => {
        console.log(val);
        Swal.fire({
            title: "Apakah Anda Yakin?",
            text: "Data akan di hapus dari database",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                axios.delete(route('product.delete', val))
                .then(response => {
                    Swal.fire({
                        title: "Deleted!",
                        text: response.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        setData((prevData) => prevData.filter((item) => item.id !== val));
                    });
                }).catch(error => {
                    console.log(error);
                });
            }
        });
    }

    const handleDetail = (dataDetail) => {
        setModalData(dataDetail);
        setIsModalOpen(true);
    }

    const tHead = [
        "No.",
        "Name",
        "Brand",
        "Category",
        "Price",
        "Stock",
        "Weight",
        "Action"
    ];

    return (
        <>
            <div className="overflow-x-auto">
                <table id="product-table" className="min-w-full table-auto border-collapse border border-gray-300" >
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            {tHead.map((fill, index) => (
                                <th 
                                    key={index}
                                    className={`border border-gray-300 ${fill === "No." || fill === "Action" ? 'px-2 py-1' : 'px-4 py-2'}`}
                                >
                                    {fill}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((inv, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-2 py-1">{index + 1}.</td>
                                <td className="border border-gray-300 px-4 py-2">{inv.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{inv.brand}</td>
                                <td className="border border-gray-300 px-4 py-2">{inv.data_category.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{setIdr(inv.price)}</td>
                                <td className="border border-gray-300 px-4 py-2">{inv.stock}</td>
                                <td className="border border-gray-300 px-4 py-2">{inv.weight} Gram</td>
                                <td className="border border-gray-300 px-4 py-1">
                                    <EditButton onClick={() => handleUpdate(inv.id)} />
                                    <RemoveButton onClick={() => handleDelete(inv.id)} />
                                    <ViewButton onClick={() => handleDetail(inv)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidthClass="2xl">
                <div className="p-4">
                    <h2 className="text-lg font-bold">Detail Product</h2>
                    <OpenModal data={modalData} />
                    <div className="flex justify-end mt-6">
                        <PrimaryButton onClick={() => setIsModalOpen(false)} className="mt-4 px-4 py-2 ml-4">
                            Close
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default TableProduct;