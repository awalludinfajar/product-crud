import React from "react";

const NumberInput = ({ id, value = '', onChange = () => {}, className, ...props }) => {
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d*\.?\d*$/.test(inputValue)) {
            onChange(inputValue);
        }
    };

    return (
        <input
            id={id}
            type="text"
            value={value}
            onChange={handleInputChange}
            className={`rounded-md border-1 py-1.5 pl-2 pr-20 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className || ''}`}
            {...props}
        />
    );
};

export default NumberInput;
