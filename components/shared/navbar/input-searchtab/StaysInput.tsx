import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import React from "react";

const StaysInput = () => {
  return (
    <>
      {/* INPUT */}
      <div className="flex flex-row gap-2 mt-6 mb-4 ">
        <div className="relative  w-1/3 font-normal">
          <div className="bg-white absolute mb-1 translate-y-[-50%] ml-2 px-2">
            <label className="small-medium">Enter Destination</label>
          </div>

          <input
            id="input-field"
            type="text"
            placeholder="Istanbul, Turkey"
            className="border border-gray-300 rounded-md py-3  px-4 pr-10 pl-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-full"
          />

          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image
              src="/assets/icons/hotel.svg"
              width={20}
              height={20}
              alt="Icon"
            />
          </span>
        </div>

        <div className="relative  w-1/6  font-normal">
          <div className="bg-white absolute mb-1 translate-y-[-50%] ml-2 px-2">
            <label className="small-medium">Check In</label>
          </div>

          <input
            id="input-field"
            type="text"
            placeholder="Fri 12/2"
            className="border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-full"
          />

          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Image
              className="cursor-pointer"
              src="/assets/icons/calendar.svg"
              width={20}
              height={20}
              alt="Icon"
            />
          </span>
        </div>
        <div className="relative  w-1/6  font-normal">
          <div className="bg-white absolute mb-1 translate-y-[-50%] ml-2 px-2">
            <label className="small-medium">Check Out</label>
          </div>

          <input
            id="input-field"
            type="text"
            placeholder="Sun 12/4"
            className="border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-full"
          />

          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Image
              className="cursor-pointer"
              src="/assets/icons/calendar.svg"
              width={20}
              height={20}
              alt="Icon"
            />
          </span>
        </div>

        <div className="relative  w-1/3 font-normal">
          <div className="bg-white absolute mb-1 translate-y-[-50%] ml-2 px-2">
            <label className="small-medium">Rooms - Guests</label>
          </div>

          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image
              src="/assets/icons/user.svg"
              width={20}
              height={20}
              alt="Icon"
            />
          </span>

          <input
            id="input-field"
            type="text"
            placeholder="1 Room, 2 guests"
            className="border border-gray-300 rounded-md py-3 px-4 pr-10 pl-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-full"
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

        <CustomButton srcUrl="/assets/icons/building.svg" text="Show Places" />
      </div>
    </>
  );
};

export default StaysInput;
