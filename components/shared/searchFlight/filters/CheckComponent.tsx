"use client";

import React, { useState } from "react";
import Image from "next/image";

const CheckComponent = ({ type, data }: { type: string; data: string[] }) => {
  const [isToggled, setIsToggled] = useState(true);

  return (
    <div>
      <div className="mt-6 w-full border-b-[1px]">
        <div className="flex flex-between justify-center items-center mb-6">
          <h6 className="paragraph-semibold ">{type}</h6>
          <button
            onClick={() => {
              if (isToggled === true) {
                setIsToggled(false);
              } else {
                setIsToggled(true);
              }
            }}
          >
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
            {data.map((item, index) => (
              <div
                className="mb-2 flex-col justify-center items-center"
                key={index}
              >
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 cursor-pointer focus:outline-none checked:accent-primary-100"
                  id={`check_${index}`}
                />
                <label htmlFor={`check_${index}`} className="paragraph-regular">
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

export default CheckComponent;
