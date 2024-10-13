"use client";
import React, { useState } from "react";
import Image from "next/image";

const PriceComponent = () => {
  const [isToggled, setIsToggled] = useState(true);
  return (
    <div>
      <div className="mt-6 w-full pb-6 border-b-[1px]">
        <div className="flex flex-between justify-center items-center mb-6">
          <h6 className="paragraph-semibold ">Price</h6>
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
          <div>
            <div className="relative h-1 bg-gray-300 rounded-3xl">
              <div className="absolute h-1 rounded-md bg-black right-0 left-0"></div>
            </div>
            <div className="relative">
              <input
                type="range"
                className="range-min right-1 appearance-none"
                min="50"
                max="1200"
                value="50"
              />
              <input
                type="range"
                className="range-max left-1 appearance-none"
                min="50"
                max="1200"
                value="1200"
              />
            </div>

            <div className="flex flex-between mt-1">
              <div className="flex">
                <p>$50</p>
              </div>
              <div className="flex">
                <p>$1200</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceComponent;
