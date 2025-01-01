"use client";

import { Slider, SliderSingleProps } from "antd";
import Image from "next/image";
import { useRef } from "react";

const DepartureTimeComponent = ({
  onTimeRangeChange,
}: {
  onTimeRangeChange: (timeRange: [string, string]) => void;
}) => {
  const rangeValueRef = useRef<[number, number]>([0, 100]); // Lưu giá trị slider bằng ref
  const isToggledRef = useRef(true); // Quản lý trạng thái mở/đóng slider bằng ref

  const marks: SliderSingleProps["marks"] = {
    0: "00:00",
    100: "23:59",
  };

  const handleChange = (value: number[]) => {
    rangeValueRef.current = value as [number, number]; // Ép kiểu thành tuple
    const realTimes = getRealTimes(value as [number, number]); // Tính toán thời gian thực
    onTimeRangeChange(realTimes); // Gửi giá trị lên parent component
  };

  const getRealTimes = (values: [number, number]): [string, string] => {
    const totalMinutes = 24 * 60 - 1; // Tổng số phút trong ngày: 1439 phút (23:59)
    return values.map((v) => {
      const minutes = (totalMinutes * v) / 100; // Chuyển đổi từ slider (0-100) sang phút
      const hours = Math.floor(minutes / 60); // Tính giờ
      const mins = Math.round(minutes % 60); // Tính phút còn lại
      return `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}`; // Format thành hh:mm
    }) as [string, string];
  };

  return (
    <div>
      <div className="mt-6 w-full border-b-[1px]">
        <div className="flex flex-between justify-center items-center mb-6">
          <h6 className="paragraph-semibold ">Departure Time</h6>
          <button
            onClick={() => {
              isToggledRef.current = !isToggledRef.current; // Thay đổi trạng thái toggle
              console.log("Toggled:", isToggledRef.current);
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

        {isToggledRef.current && (
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
