import React, { useState, useEffect } from "react";

const SelectOption = ({ modelValue, url, data = [], onModelValueChange, className, ...prop }) => {
  const [options, setOptions] = useState([]);
  const [selectedId, setSelectedId] = useState(modelValue);
  
  const fetchOptions = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to get Category');
      }
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching options: ", error);
    }
  };

  useEffect(() => {
    setSelectedId(modelValue);
  }, [modelValue]);

  useEffect(() => {
    if (data) {
		if (data.length > 0) {
		  setOptions(data);
		  return;
		}
	} 

    if (url) {
      fetchOptions();
	  return;
    }
  }, [data, url]);

  const handleChange = (event) => {
    const value = event.target.value;
    if (selectedId !== value) {      
      setSelectedId(value);
      onModelValueChange(value);
    }
  };

  return (
    <select
      value={selectedId}
      onChange={handleChange}
      className={`rounded-md border-1 py-1.5 pl-2 pr-20 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className || ''}`}
      {...prop}
    >
      <option value="">
        -- Silahkan Pilih --
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
