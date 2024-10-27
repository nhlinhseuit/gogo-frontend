import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/utils/util";

const Tab = ({
  type,
  title,
  countPlace,
  price,
  duration,
  onClick,
  isSelected,
  isSearchStay,
}: {
  type: string;
  title: string;
  countPlace?: number;
  price?: number;
  duration?: string;
  onClick: () => void;
  isSelected: string;
  isSearchStay?: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={`${
        isSearchStay
          ? "py-4 pl-4 mx-4 pr-36 cursor-pointer"
          : "py-4 pl-4 pr-12 mx-4 cursor-pointer"
      } ${isSelected === title ? "border-b-4 border-primary-100" : ""}`}
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
            {isSearchStay ? (
              <>
                <h6 className="font-semibold">{title}</h6>
                <p className="text-gray-400 font-thin">{countPlace} places</p>
              </>
            ) : (
              <>
                <h6 className="font-semibold">{title}</h6>
                <p className="text-gray-400 font-thin">
                  ${price} . {duration}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tab;
