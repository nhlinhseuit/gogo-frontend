import React from "react";
import Image from "next/image";

const Tab = ({
  type,
  title,
  price,
  duration,
  onClick,
  isSelected,
}: {
  type: string;
  title: string;
  price?: number;
  duration?: string;
  onClick: () => void;
  isSelected: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={`py-4 pl-4 pr-12 mx-4 cursor-pointer ${
        isSelected === title ? "border-b-4 border-primary-100" : ""
      }`}
    >
      {type === "Other" ? (
        <div className="flex py-4 justify-center items-center">
          <Image
            src="/assets/icons/other.svg"
            alt="Other"
            width={24}
            height={24}
          />
          <h6 className="ml-2 font-semibold">{title}</h6>
        </div>
      ) : (
        <div className="flex">
          <div>
            <h6 className="font-semibold">{title}</h6>
            <p className="text-gray-400 font-thin">
              ${price} . {duration}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tab;
