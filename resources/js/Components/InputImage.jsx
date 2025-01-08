import React, { useState, useRef, useEffect } from "react";

const InputImage = ({ value = null, onChange, ...prop }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const fileInputRef = useRef(null);

    const previewImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image file.");
                clearInput();
                return;
            }
            clearInput();
            onChange?.(file);

            const newImageUrl = URL.createObjectURL(file);
            setImageUrl(newImageUrl);

            // Cleanup URL after file changes
            return () => URL.revokeObjectURL(newImageUrl);
        }
    };

    const clearInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    useEffect(() => {
        if (value) {
            if (typeof value === "string") {
                setImageUrl(value);
            } else if (typeof value === "string" && value.startsWith("http")) {
                setImageUrl(value);
            } else if (value instanceof File) {
                const newImageUrl = URL.createObjectURL(value);
                setImageUrl(newImageUrl);
                return () => URL.revokeObjectURL(newImageUrl);
            }
        } else {
            setImageUrl(null);
        }
    }, [value]);

    return (
        <div>
            {imageUrl && (
                <div className="mt-4 mb-4">
                    <img
                        src={imageUrl}
                        alt="Image Preview"
                        width="200"
                        className="rounded shadow-md"
                    />
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={previewImage}
                className="border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                ref={fileInputRef}
                {...prop}
            />
        </div>
    );
};

export default InputImage;
