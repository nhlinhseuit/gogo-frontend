"use client";

import React, { useState } from "react";
import Image from "next/image";
import Airline from "@/types/Airline";

const FlightCheckComponent = ({
  type,
  data,
  onSelectionChange,
}: {
  type: string;
  data: string[] | Airline[] | undefined;
  onSelectionChange: (selected: string[]) => void;
}) => {
  const [isToggled, setIsToggled] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (item: string, isChecked: boolean) => {
    const updatedItems = isChecked
      ? [...selectedItems, item]
      : selectedItems.filter((i) => i !== item);
    setSelectedItems(updatedItems);
    onSelectionChange(updatedItems); // Gửi dữ liệu đã chọn lên cha
  };

  return (
    <div>
      <div className="mt-6 w-full border-b-[1px]">
        <div className="flex flex-between justify-center items-center mb-6">
          <h6 className="paragraph-semibold ">{type}</h6>
          <button onClick={() => setIsToggled(!isToggled)}>
            <Image
              src="/assets/icons/chevron_down.svg"
              alt="down"
              width={24}
              height={24}
            />
          </button>
        </div>

        {isToggled && (
          <div className="pb-6">
            {type === "Airlines"
              ? data &&
                (data as Airline[]).map((item, index) => (
                  <div
                    className="mb-2 flex-col justify-center items-center"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4 cursor-pointer focus:outline-none checked:accent-primary-100"
                      id={`check_${type}_${index}`}
                      onChange={(e) =>
                        handleCheckboxChange(item.name, e.target.checked)
                      }
                    />
                    <label
                      htmlFor={`check_${type}_${index}`}
                      className="paragraph-regular"
                    >
                      {item.name}
                    </label>
                  </div>
                ))
              : data &&
                (data as string[]).map((item, index) => (
                  <div
                    className="mb-2 flex-col justify-center items-center"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4 cursor-pointer focus:outline-none checked:accent-primary-100"
                      id={`check_${type}_${index}`}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                    />
                    <label
                      htmlFor={`check_${type}_${index}`}
                      className="paragraph-regular"
                    >
                      {item}
                    </label>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightCheckComponent;
