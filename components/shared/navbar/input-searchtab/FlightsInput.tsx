import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import React from "react";

const FlightsInput = ({isSearchFlight, otherClass} : {isSearchFlight:boolean, otherClass: string}) => {
  return (
    <>
      {/* INPUT */}
      <div className={`flex flex-row gap-2 mt-6 mb-4 ${otherClass}`} >
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

        {isSearchFlight ? (
          <div className="ml-3 flex px-4 bg-primary-100 rounded-md justify-center items-center text-black body.semibold">
            <Image 
              src='/assets/icons/searchFlight.svg'
              alt="Search"
              width={20}
              height={20}
            />
          </div>
        ):(
          <>
          </>
        )}
      </div>
      { isSearchFlight ? (
        <>
        </>
        ): (
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

        <CustomButton
          srcUrl="/assets/icons/show_flights.svg"
          text="Show Flights"
        />
      </div>
      )}
    </>
  );
};

export default FlightsInput;
