"use client";
import { Slider, SliderSingleProps } from "antd";
import Image from "next/image";
import { useState } from "react";

const DepartureTimeComponent = () => {
  const [isToggled, setIsToggled] = useState(true);

  //! SLIDER

  const marks: SliderSingleProps["marks"] = {
    0: "00:00",
    100: "23:59",
  };

  const [rangeValue, setRangeValue] = useState<number[]>([0, 100]);

  const handleChange = (value: number[]) => {
    setRangeValue(value);
  };

  const getRealTimes = () => {
    const totalMinutes = 24 * 60 - 1; // Tổng số phút trong ngày: 1439 phút (23:59)
    return rangeValue.map((v) => {
      const minutes = (totalMinutes * v) / 100; // Chuyển đổi từ giá trị slider (0-100) sang phút
      const hours = Math.floor(minutes / 60); // Tính giờ
      const mins = Math.round(minutes % 60); // Tính phút còn lại
      return `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}`; // Format thành hh:mm
    });
  };

  const [startTime, endTime] = getRealTimes();

  // startTime
  // endTime

  return (
    <div>
      <div className="mt-6 w-full border-b-[1px]">
        <div className="flex flex-between justify-center items-center mb-6">
          <h6 className="paragraph-semibold ">Departure Time</h6>
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
                  const totalMinutes = 24 * 60 - 1;
                  const minutes = (totalMinutes * value) / 100;
                  const hours = Math.floor(minutes / 60);
                  const mins = Math.round(minutes % 60);
                  return `${hours.toString().padStart(2, "0")}:${mins
                    .toString()
                    .padStart(2, "0")}`;
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

export default DepartureTimeComponent;
