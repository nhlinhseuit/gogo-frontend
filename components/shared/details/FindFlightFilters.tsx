import Image from "next/image";
import React from "react";

const FindFlightFilters = () => {
  return (
    <div className="mx-2">
      <h3 className="h3-semibold">Filters</h3>
      <div className="mt-6 w-full pb-6 border-b-[1px]">
        <div className="flex flex-between justify-center items-center mb-6">
          <div>
            <h6 className="paragraph-semibold ">Price</h6>
          </div>
          <div className="border-0">
            <Image
              src="/assets/icons/chevron_down.svg"
              alt="down"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div>
          <div className="relative h-1 bg-gray-300 rounded-3xl">
            <div className="absolute h-1 rounded-md bg-black right-0 left-0"></div>
          </div>
          <div className="relative">
            <input
              type="range"
              className="range-min right-1 appearance-none"
              min="50"
              max="1200"
              value="50"
            />
            <input
              type="range"
              className="range-max left-1 appearance-none"
              min="50"
              max="1200"
              value="1200"
            />
          </div>

          <div className="flex flex-between mt-1">
            <div className="flex">
              <p>$50</p>
            </div>
            <div className="flex">
              <p>$1200</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full pb-6 border-b-[1px]">
        <div className="flex flex-between justify-center items-center mb-6">
          <div>
            <h6 className="paragraph-semibold ">Departure Time</h6>
          </div>
          <div className="border-0">
            <Image
              src="/assets/icons/chevron_down.svg"
              alt="down"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div>
          <div className="relative h-1 bg-gray-300 rounded-3xl">
            <div className="absolute h-1 rounded-md bg-black right-0 left-0"></div>
          </div>
          <div className="relative">
            <input
              type="range"
              className="range-min right-1 appearance-none"
              min="50"
              max="1200"
              value="50"
            />
            <input
              type="range"
              className="range-max left-1 appearance-none"
              min="50"
              max="1200"
              value="1200"
            />
          </div>

          <div className="flex flex-between mt-1">
            <div className="flex">
              <p>12:01Am</p>
            </div>
            <div className="flex">
              <p>11:56Pm</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-6 w-full pb-6 border-b-[1px]">
          <div className="flex flex-between justify-center items-center mb-6">
            <div>
              <h6 className="paragraph-semibold ">Rating</h6>
            </div>
            <div className="border-0">
              <Image
                src="/assets/icons/chevron_down.svg"
                alt="down"
                width={24}
                height={24}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="px-2 py-1 border-[1px] border-primary-100 rounded-md">
              <p>0+</p>
            </div>
            <div className="px-2 py-1 border-[1px] border-primary-100 rounded-md">
              <p>1+</p>
            </div>
            <div className="px-2 py-1 border-[1px] border-primary-100 rounded-md">
              <p>2+</p>
            </div>
            <div className="px-2 py-1 border-[1px] border-primary-100 rounded-md">
              <p>3+</p>
            </div>
            <div className="px-2 py-1 border-[1px] border-primary-100 rounded-md">
              <p>4+</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full pb-6 border-b-[1px]">
        <div className="flex flex-between justify-center items-center mb-6">
          <div>
            <h6 className="paragraph-semibold ">Airlines</h6>
          </div>
          <div className="border-0">
            <Image
              src="/assets/icons/chevron_down.svg"
              alt="down"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className="space-y-2">
            <div className="flex space-x-3">
                <div className="w-0 h-0 p-2 border-black border-2 rounded-sm">
                </div>
                <p>Emirated</p>
            </div>
            <div className="flex space-x-3">
                <div className="w-0 h-0 p-2 border-black border-2 rounded-sm">
                </div>
                <p>Fly Dubai</p>
            </div>
            <div className="flex space-x-3">
                <div className="w-0 h-0 p-2 border-black border-2 rounded-sm">
                </div>
                <p>Qatar</p>
            </div>
            <div className="flex space-x-3">
                <div className="w-0 h-0 p-2 border-black border-2 rounded-sm">
                </div>
                <p>Etihad</p>
            </div>
        </div>
      </div>

      <div className="mt-6 w-full pb-6 border-b-[1px]">
        <div className="flex flex-between justify-center items-center mb-6">
          <div>
            <h6 className="paragraph-semibold ">Trips</h6>
          </div>
          <div className="border-0">
            <Image
              src="/assets/icons/chevron_down.svg"
              alt="down"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className="space-y-2">
            <div className="flex space-x-3">
                <div className="w-0 h-0 p-2 border-black border-2 rounded-sm">
                </div>
                <p>Round Trip</p>
            </div>
            <div className="flex space-x-3">
                <div className="w-0 h-0 p-2 border-black border-2 rounded-sm">
                </div>
                <p>On Way</p>
            </div>
            <div className="flex space-x-3">
                <div className="w-0 h-0 p-2 border-black border-2 rounded-sm">
                </div>
                <p>Multi-City</p>
            </div>
        </div>
      </div>

    </div>
  );
};

export default FindFlightFilters;
