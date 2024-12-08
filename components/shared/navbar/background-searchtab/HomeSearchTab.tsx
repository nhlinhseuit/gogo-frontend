import Image from "next/image";
import React, { use, useState } from "react";
import CustomButton from "../../../CustomButton";
import StaysInput from "../input-searchtab/StaysInput";
import FlightsInput from "../input-searchtab/FlightsInput";

const HomeSearchTab = () => {
  const [searchFilter, setSearchFilter] = useState("flights");

  const indicatorClass = "!border-primary-100";
  return (
    <div
      className="
              bg-white
               absolute 
              rounded-[18px]
              shadow-md
              shadow-primary-500
              shadow-(primary-100)
              bottom-0 translate-y-[60%]
              left-0 right-0 mx-24
              flex-col justify-start items-start p-5"
    >
      {/* SEARCH TAB */}
      <div className="flex flex-row items-center">
        {/* Flights */}
        <div
          className={`flex flex-row items-center h-full border-b-4 border-transparent p-2 cursor-pointer ${
            searchFilter === "flights" && indicatorClass
          }`}
          onClick={() => setSearchFilter("flights")}
        >
          <Image
            src="/assets/icons/plane.svg"
            width={20}
            height={20}
            alt="flights"
          />
          <p
            className={`
                 ml-2 
                font-inter 
                body-semibold 
                text-dark-100
                dark:text-light-900 
                max-sm:hidden`}
          >
            Flights
          </p>
        </div>

        {/* Vertical Separator */}
        <div className="border-l-2 border-gray-300 h-6 mx-4"></div>

        {/* Stays */}
        <div
          className={`flex flex-row items-center h-full border-b-4 border-transparent p-2 cursor-pointer ${
            searchFilter === "stays" && indicatorClass
          }`}
          onClick={() => setSearchFilter("stays")}
        >
          <Image
            src="/assets/icons/hotel.svg"
            width={20}
            height={20}
            alt="stays"
          />
          <p
            className={`
                 ml-2 
                font-inter 
                body-semibold 
                text-dark-100
                dark:text-light-900 
                max-sm:hidden`}
          >
            Stays
          </p>
        </div>
      </div>

      {/* INPUT & ACTION */}
      {searchFilter === "flights" ? (
        <FlightsInput
          otherClass="bg-white mt-8 px-4 py-6 rounded-lg shadow-md shadow-primary-400"
        />
      ) : (
        <StaysInput
          otherClass="bg-white mt-8 px-4 py-6 rounded-lg shadow-md shadow-primary-400"
        />
      )}
    </div>
  );
};

export default HomeSearchTab;
