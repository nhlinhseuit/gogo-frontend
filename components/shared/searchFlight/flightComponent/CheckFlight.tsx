import React from "react";

const CheckFlight = ({
    startTime,
    endTime,
    duration,
    airline,
    flightPath,
}:{
    startTime: string,
    endTime: string,
    duration: string,
    airline: string,
    flightPath: string,
}) => {
  return (
    <div className="mt-6 flex">
      <div className="flex mr-8">
        <div className="mb-2 flex-col justify-center items-center">
          <input
            type="checkbox"
            className="mr-2 w-5 h-5 focus:outline-none checked:accent-primary-100 cursor-pointer"
          />
        </div>
        <div>
          <p className="paragraph-semibold"> {startTime}  - {endTime} </p>
          <p className="text-gray-400 regular">{airline}</p>
        </div>
      </div>
      <div className="paragraph-semibold text-gray-700 mr-8">
        <p>non stop</p>
      </div>
      <div>
        <h6 className="paragraph-semobold text-gray-700">{duration}</h6>
        <p className="text-gray-400 body-regular">{flightPath}</p>
      </div>
    </div>
  );
};

export default CheckFlight;
