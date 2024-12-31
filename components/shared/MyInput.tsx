import React, { useState } from "react";
import { text } from "stream/consumers";

interface MyInputProps {
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: string) => string | null; // Hàm kiểm tra, trả về lỗi nếu không hợp lệ
  isNameEmpty?: boolean; // Hàm kiểm tra, trả về lỗi nếu không hợp lệ
}

const MyInput: React.FC<MyInputProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  validate,
  isNameEmpty,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleBlur = () => {
    if (validate) {
      const validationError = validate(value); // Gọi hàm validate
      setError(validationError);
    }
  };

  return (
    <div className="relative w-full">
      {/* Label */}
      <div className="bg-white absolute mb-1 translate-y-[-50%] ml-2 px-2">
        <label className={`small-medium ${isNameEmpty ? "text-red-500" : ""}`}>
          {label}
        </label>
      </div>

      {/* Input */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e);
          if (error) setError(null); // Xóa lỗi khi người dùng nhập lại
        }}
        onBlur={handleBlur} // Kiểm tra lỗi khi input mất focus
        className={`
          base-regular
          border
          rounded-md
          py-3
          px-4
          pr-10
          focus:outline-none
          focus:ring-1
          focus:ring-primary-500
          focus:border-primary-500
          w-full
          ${
            error || isNameEmpty
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }
        `}
      />

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default MyInput;
