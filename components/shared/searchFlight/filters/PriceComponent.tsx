"use client";
import Image from "next/image";
import { useState } from "react";

import { Slider, SliderSingleProps } from "antd";

const PriceComponent = () => {
  const [isToggled, setIsToggled] = useState(true);

  //! SLIDER

  const marks: SliderSingleProps["marks"] = {
    0: "$50",
    100: "$1200",
  };

  const [rangeValue, setRangeValue] = useState<number[]>([0, 100]);

  const handleChange = (value: number[]) => {
    setRangeValue(value);
  };

  const getRealValues = () => {
    const min = 50;
    const max = 1200;
    return rangeValue.map((v) => min + ((max - min) * v) / 100);
  };

  const [realMin, realMax] = getRealValues();

  // realMin.toFixed(0)
  // realMax.toFixed(0)

  return (
    <div>
      <div className="mt-6 w-full border-b-[1px]">
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
          <div className="mt-10 pb-6">
            <Slider
              range
              marks={marks}
              defaultValue={[20, 50]}
              onChange={handleChange}
              tooltip={{
                formatter: (value) => {
                  if (value === undefined) {
                    return "";
                  }
                  const min = 50;
                  const max = 1200;
                  const price = min + ((max - min) * value) / 100;
                  return `$${price.toFixed(0)}`;
                },
              }}
              styles={{
                track: {
                  background: "transparent",
                },
                tracks: {
                  background: "#8dd3bb",
                },
                rail: {
                  background: "#e5e7eb",
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceComponent;
