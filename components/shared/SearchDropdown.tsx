import { Calendar } from "@/components/ui/calendar";
import { enUS } from "date-fns/locale";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CustomNumberInput from "./CustomNumberInput";

interface SearchDropdownProps {
  label: string;
  placeholder: string;
  data: any[];
  value: string;
  onChange: (value: string) => void;

  isChooseDate?: boolean;
  isRoundTrip?: boolean;
  dateDepart?: Date;
  dateReturn?: Date;
  onDateDepartChange?: (date: Date) => void;
  onDateReturnChange?: (date: Date) => void;

  isSelectTrip?: boolean;

  isSelectPasseger?: boolean;
  passegers?: number;
  onValueIncrement?: () => void;
  onValueDecrement?: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  label,
  placeholder,
  data,
  value,
  onChange,

  isChooseDate,
  isRoundTrip,
  dateDepart,
  dateReturn,
  onDateDepartChange,
  onDateReturnChange,

  isSelectTrip,

  isSelectPasseger,
  passegers,
  onValueIncrement,
  onValueDecrement,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    if (isFocused) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocused]);

  const getRenderData = () => {
    return isSelectPasseger || isSelectTrip || isChooseDate
      ? data
      : data.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Label */}
      <div className="bg-white absolute mb-1 translate-y-[-50%] ml-2 px-2">
        <label className="small-medium">{label}</label>
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={
          isSelectPasseger || isSelectTrip || isChooseDate
            ? () => {}
            : (e) => onChange(e.target.value)
        }
        onFocus={() => setIsFocused(true)}
        className={`
            base-regular border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-full
            ${
              isSelectPasseger || isSelectTrip || isChooseDate
                ? "caret-transparent cursor-pointer"
                : ""
            }`}
      />

      {/* Dropdown */}
      {isChooseDate
        ? isFocused && (
            <div className="flex space-x-4 absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-4">
              {/* Calendar for Depart Date */}
              <div>
                <label className="text-center block text-sm font-bold mb-2">
                  Depart date
                </label>
                <Calendar
                  mode="single"
                  selected={dateDepart}
                  onSelect={(date) => {
                    if (onDateDepartChange && date) onDateDepartChange(date);
                  }}
                  initialFocus
                  locale={enUS}
                />
              </div>

              {isRoundTrip ? (
                <>
                  <div className="my-4 w-px bg-gray-300"></div>

                  {/* Calendar for Return Date */}
                  <div>
                    <label className="text-center block text-sm font-bold mb-2">
                      Return date
                    </label>
                    <Calendar
                      mode="single"
                      selected={dateReturn}
                      onSelect={(date) => {
                        if (onDateReturnChange && date)
                          onDateReturnChange(date);
                      }}
                      initialFocus
                      locale={enUS}
                    />
                  </div>
                </>
              ) : null}
            </div>
          )
        : isFocused && (
            <div className="max-h-60 overflow-y-auto absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {isSelectPasseger ? (
                <>
                  <div className="py-2 px-4 flex gap-2 items-center justify-between">
                    <label className="base-regular dark:text-gray-400">
                      Passengers
                    </label>

                    <CustomNumberInput
                      value={passegers ?? 0}
                      onIncrement={onValueIncrement}
                      onDecrement={onValueDecrement}
                    />
                  </div>
                  <div className="my-2 h-px bg-gray-300"></div>
                </>
              ) : null}

              <ul className="base-regular">
                {getRenderData().map((suggestion, index) => (
                  <li
                    key={index}
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onChange(suggestion);
                      setIsFocused(false);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
        <Image
          className="cursor-pointer"
          src="/assets/icons/toggle.svg"
          width={20}
          height={20}
          alt="Icon"
        />
      </span>
    </div>
  );
};

export default SearchDropdown;
