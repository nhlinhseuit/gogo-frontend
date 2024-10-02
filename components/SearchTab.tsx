import Image from "next/image";
import React, { use, useState } from "react";

const SearchTab = () => {
  const [searchFilter, setSearchFilter] = useState("flights");

  const indicatorClass = "!border-primary-100";
  return (
    <div
      className="
              bg-white
              h-1/2 absolute 
              rounded-[18px]
              shadow-md
              bottom-0 translate-y-[60%]
              left-0 right-0 mx-24
              flex-col justify-start items-start p-5"
    >
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

      <div className="flex flex-row mt-4 mb-4">
        <div className="relative">
          <input
            id="input-field"
            type="text"
            placeholder="Lahore - Karachi"
            className="border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-full"
          />

          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <img
              src="/assets/icons/swap.svg"
              alt="Icon"
              className="w-5 h-5 text-gray-500"
            />
          </span>
        </div>

        <div className="relative">
          <input
            id="input-field"
            type="text"
            placeholder="Return"
            className="border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-full"
          />

          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <img
              src="/assets/icons/toggle.svg"
              alt="Icon"
              className="w-5 h-5 text-gray-500"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchTab;
