"use client";

import { useState } from "react";
import Image from "next/image";

const ratingComponent = () => {
  const [isSelected, setIsSelected] = useState(-1);
  const [isToggled, setIsToggled] = useState(true);

  return (
    <div>
      <div className="mt-6 w-full pb-6 border-b-[1px]">
        <div className="flex flex-between justify-center items-center mb-4">
          <h6 className="paragraph-semibold ">Rating</h6>
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
          <div className="flex gap-3">
            {Array.from({ length: 5 }, (_, index) => (
              <button
                onClick={() => {
                  setIsSelected(index);
                }}
                className={`px-3 py-2 border-[1px] border-primary-100 rounded-md ${
                  index === isSelected ? "bg-primary-100 text-white" : ""
                } `}
              >
                <p className="body-regular">{index}+</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ratingComponent;
