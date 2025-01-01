import "@/app/globals.css";
import React from "react";

interface CheckboxProps {
  label: string;
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <label className={`inline-flex items-center ${props.className}`}>
      <input type="checkbox"
             className="w-4 h-4 cursor-pointer focus:outline-none checked:accent-primary-100"
             checked={props.checked}
              onChange={(e) => props.onChange?.(e.target.checked)}
      />
      <span className="ml-2 text-sm">{props.label}</span>
    </label>
  );
};

export default Checkbox;
