import Image from "next/image";
import React, { use, useState } from "react";
import CustomButton from "./CustomButton";

const SearchTab = () => {
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

      {/* INPUT */}
      <div className="flex flex-row gap-2 mt-6 mb-4 ">
        <div className="relative  w-[28.57%] font-normal">
          <div className="bg-white absolute mb-1 translate-y-[-50%] ml-2 px-2">
            <label className="small-medium">From - To</label>
          </div>

          <input
            id="input-field"
            type="text"
            placeholder="Lahore - Karachi"
            className="border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-full"
          />

          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Image
              className="cursor-pointer"
              src="/assets/icons/swap.svg"
              width={20}
              height={20}
              alt="Icon"
            />
          </span>
        </div>

        <div className="relative  w-[14.28%]  font-normal">
          <div className="bg-white absolute mb-1 translate-y-[-50%] ml-2 px-2">
            <label className="small-medium">Trip</label>
          </div>

          <input
            id="input-field"
            type="text"
            placeholder="Return"
            className="border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-full"
          />

          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Image
              className="cursor-pointer"
              src="/assets/icons/toggle.svg"
              width={20}
              height={20}
              alt="Icon"
            />
          </span>
        </div>

        <div className="relative  w-[28.57%] font-normal">
          <div className="bg-white absolute mb-1 translate-y-[-50%] ml-2 px-2">
            <label className="small-medium">Depart - Return</label>
          </div>

          <input
            id="input-field"
            type="text"
            placeholder="07 Nov 22 - 13 Nov 22"
            className="border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-full"
          />
        </div>

        <div className="relative  w-[28.57%] font-normal">
          <div className="bg-white absolute mb-1 translate-y-[-50%] ml-2 px-2">
            <label className="small-medium">Passenger</label>
          </div>

          <input
            id="input-field"
            type="text"
            placeholder="1 Passenger, Economy"
            className="border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-full"
          />
        </div>
      </div>

      {/* ACTION */}
      <div className="flex flex-row justify-end mt-4 mb-2">
        <div className="flex flex-row justify-center items-center mr-4 cursor-pointer">
          <Image
            src="/assets/icons/add.svg"
            width={20}
            height={20}
            alt="add-code"
          />

          <p
            className={`
                 ml-1 
                font-inter 
                body-medium
                text-dark-100
                dark:text-light-900 
                max-sm:hidden`}
          >
            Add Promo Code
          </p>
        </div>

        <CustomButton />
      </div>
    </div>
  );
};

export default SearchTab;
