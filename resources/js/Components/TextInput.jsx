import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';

const TextInput = forwardRef(({ value, onChange, autoFocus, placeholder, className, ...prop }, ref) => {
  const [inputValue, setInputValue] = useState(value || '');
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <input
      className={`rounded-md border-1 py-1.5 pl-2 pr-20 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className || ''}`}
      value={inputValue}
      onChange={handleInputChange}
      ref={inputRef}
      placeholder={placeholder}
      {...prop}
    />
  );
});

export default TextInput;
