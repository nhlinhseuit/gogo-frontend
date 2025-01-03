import React from "react";

const Tab = ({
  type,
  title,
  countFlights,
  countPlaces,
  isSelected,
  onClick,
}: {
  type: string;
  title: string;
  countFlights: number;
  countPlaces: number;
  isSelected: string;
  onClick: () => void;
}) => {
  return (
    <>
      {type === "Places" ? (
        <div className="my-4 w-[1px] bg-gray-400"></div>
      ) : (
        <></>
      )}

      <div
        onClick={onClick}
        className={`flex-1 py-4 mx-4 cursor-pointer ${
          isSelected === title ? "border-b-4 border-primary-100" : ""
        }`}
      >
        <div className="pl-2">
          <h6 className="font-semibold">{title}</h6>

          {title === "Flights" && (
            <p className="text-gray-400 font-thin">{countFlights} marked</p>
          )}
          {title === "Places" && (
            <p className="text-gray-400 font-thin">{countPlaces} marked</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Tab;
