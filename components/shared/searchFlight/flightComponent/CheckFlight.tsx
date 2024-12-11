import React from "react";

const CheckFlight = ({
  startTime,
  endTime,
  duration,
  airline,
  flightPath,
}: {
  startTime: string;
  endTime: string;
  duration: string;
  airline: string;
  flightPath: string;
}) => {
  return (
    <div className="w-full pr-4 mt-6 gap-x-6 flex justify-between">
      <div className="flex w-[50%]">
        <div className="mb-2 flex-col justify-center items-center">
          <input
            type="checkbox"
            className="mr-2 w-5 h-5 focus:outline-none checked:accent-primary-100 cursor-pointer"
          />
        </div>
        <div>
          <p className="paragraph-semibold">
            {" "}
            {startTime} - {endTime}{" "}
          </p>
          <p className="text-gray-400 regular">{airline}</p>
        </div>
      </div>
      <div className="paragraph-semibold text-gray-700 w-[20%]">
        <p>non stop</p>
      </div>
      <div className="w-[30%]">
        <h6 className="paragraph-semobold text-gray-700">{duration}</h6>
        <p className="text-gray-400 body-regular">{flightPath}</p>
      </div>
    </div>
  );
};

export default CheckFlight;
