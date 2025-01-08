import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const TextAreaInput = forwardRef(({ value, onChange, autoFocus, className, ...props }, ref) => {
    const [content, setContent] = useState(value || '');
    const textAreaRef = useRef();

    // Forward the focus method
    useImperativeHandle(ref, () => ({
        focus: () => textAreaRef.current.focus(),
    }));

    // Handle autoFocus
    useEffect(() => {
        if (autoFocus && textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, [autoFocus]);

    // Sync with external value changes
    useEffect(() => {
        setContent(value || '');
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setContent(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <textarea
            ref={textAreaRef}
            className={`rounded-md border-1 py-1.5 pl-2 pr-20 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
            value={content}
            onChange={handleChange}
            {...props}
        />
    );
});

export default TextAreaInput;
