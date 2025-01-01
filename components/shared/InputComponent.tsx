import React, { useState } from "react";

interface InputParams {
  placeholder: string | number;
  value: string | number;
  onChange: (newValue: string | number) => void;
  otherClassess?: string;
  isDescription?: boolean;
  isInTable?: boolean;
}

const InputComponent = (params: InputParams) => {
  const [inputValue, setInputValue] = useState(params.value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    params.onChange(e.target.value);
  };

  return (
    <div className="relative w-full">
      <span
        className="absolute invisible whitespace-pre"
        style={{
          fontSize: "1rem",
          fontFamily: "inherit",
        }}
      >
        {params.value || params.placeholder}
      </span>
      <input
        type="text"
        placeholder={params.placeholder.toString() || "Trống"}
        value={inputValue}
        onChange={handleInputChange}
        className={`
          p-2 rounded-md
          shadow-sm outline-none border 
          border-gray-300 focus:border-[#8dd3bb] focus:ring-[#8dd3bb]
          placeholder-gray-500 text-gray-800
          bg-white
          transition duration-150 ease-in-out
          w-[200px]
          ${params.otherClassess || ""}
        `}
      />
    </div>
  );
};

export default InputComponent;
