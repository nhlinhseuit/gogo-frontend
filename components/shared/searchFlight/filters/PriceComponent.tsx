import { useState } from "react";
import { Slider, SliderSingleProps } from "antd";
import Image from "next/image";

const PriceComponent = ({
  minBaseFare,
  maxBaseFare,
  onPriceChange, // Nhận thêm prop onPriceChange
}: {
  minBaseFare: number;
  maxBaseFare: number;
  onPriceChange: (priceRange: [number, number]) => void; // Xác định kiểu của hàm callback
}) => {
  const [isToggled, setIsToggled] = useState(true);

  //! SLIDER

  const marks: SliderSingleProps["marks"] = {
    0: `$${minBaseFare}`,
    100: `$${maxBaseFare}`,
  };

  const [rangeValue, setRangeValue] = useState<number[]>([0, 100]);

  const handleChange = (value: number[]) => {
    setRangeValue(value);

    // Ensure that the range has exactly two values
    const realValues = getRealValues(value);

    // Ensure it's a tuple with two values and pass to the callback
    if (realValues.length === 2) {
      onPriceChange(realValues as [number, number]); // Typecast to a tuple [number, number]
    }
  };

  const getRealValues = (value: number[]) => {
    const min = minBaseFare;
    const max = maxBaseFare;
    return value.map((v) => min + ((max - min) * v) / 100);
  };

  return (
    <div>
      <div className="mt-6 w-full border-b-[1px]">
        <div className="flex flex-between justify-center items-center mb-6">
          <h6 className="paragraph-semibold ">Price</h6>
          <button
            onClick={() => {
              setIsToggled((prev) => !prev);
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
              defaultValue={[20, 70]}
              onChange={handleChange}
              tooltip={{
                formatter: (value) => {
                  if (value === undefined) {
                    return "";
                  }
                  const min = minBaseFare;
                  const max = maxBaseFare;
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
