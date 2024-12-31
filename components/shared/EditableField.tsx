import { useState, useEffect } from "react";
import InputComponent from "./InputComponent";

interface EditableFieldProps {
  label: string;
  value: string | number | undefined;
  onSave: (newValue: string) => void;
}

const EditableField = ({ label, value, onSave }: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState<string | number | undefined>(
    value
  );

  // Cập nhật tempValue khi value thay đổi
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = () => {
    setIsEditing(false);
    onSave(tempValue ? tempValue.toString() : ""); // Chuyển đổi thành chuỗi khi lưu
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <p className="title-medium text-[#112211]">{label}</p>
        {isEditing ? (
          <InputComponent
            value={tempValue || ""}
            placeholder="Enter value"
            onChange={(newValue) => setTempValue(newValue)}
          />
        ) : (
          <p className="paragraph-semibold">{tempValue || "No value"}</p>
        )}
      </div>
      <button
        className="px-4 py-2 text-white bg-[#8dd3bb] rounded-md"
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
      >
        {isEditing ? "Save" : "Change"}
      </button>
    </div>
  );
};

export default EditableField;
