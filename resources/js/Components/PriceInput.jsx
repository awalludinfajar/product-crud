import React from "react";

const PriceInput = ({ id, value = '', onChange = () => {}, className, ...props }) => {
    // Format the value as a price
    const formatPrice = (num) => {
        if (!num) return '';
        const parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
        return parts.join('.');
    };

    // Strip formatting to get a raw number
    const parsePrice = (formattedValue) => {
        return formattedValue.replace(/,/g, ''); // Remove commas
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const rawValue = parsePrice(inputValue);

        // Allow only valid numeric input
        if (/^\d*\.?\d*$/.test(rawValue)) {
            onChange(rawValue); // Pass raw value to parent
        }
    };

    return (
        <input
            id={id}
            type="text"
            value={formatPrice(value)}
            onChange={handleInputChange}
            className={`rounded-md border-1 py-1.5 pl-2 pr-20 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className || ''}`}
            {...props}
        />
    );
};

export default PriceInput;
