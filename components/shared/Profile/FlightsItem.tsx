"use client";

import Image from "next/image";
import MyIcon from "./MyIcon";

const FlightsItem = ({ item }: { item: FlightItemProfile }) => {
  return (
    <div className="flex p-4 mt-4 w-[100%] rounded-lg shadow-full shadow-primary-400">
      <div className="w-[10%] my-4 p-2 flex mr-1 px-3 border border-primary-100 rounded-md justify-center items-center">
        <Image
          src={item.img}
          alt="places"
          width={0}
          height={0}
          className="w-full"
        />
      </div>

      {/* <div className="w-[80%] mx-4 my-2"> */}
      <div className="ml-4 w-[90%] flex justify-between items-center">
        <div className="flex items-center">
          <>
            <div>
              <p className="text-[13px] font-medium leading-[18.2px] text-[#112211]">
                Newark (EWR)
              </p>
              <p className="paragraph-semibold">12:00 pm</p>
            </div>

            <div className="mx-4">---</div>

            <div>
              <p className="text-[13px] font-medium leading-[18.2px] text-[#112211]">
                Newark (EWR)
              </p>
              <p className="paragraph-semibold">6:00 pm</p>
            </div>
          </>

          <div className="mx-6 w-[1.5px] bg-gray-300 h-[50px]"></div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              <MyIcon
                icon="/assets/icons/calendar_profile.svg"
                title="Date"
                desc="12-11-2024"
              />
              <MyIcon
                icon="/assets/icons/time_profile.svg"
                title="Flight time"
                desc="Newark(EWR)"
              />
            </div>
            <div className="flex flex-col gap-4">
              <MyIcon
                icon="/assets/icons/door_profile.svg"
                title="Gate"
                desc="A12"
              />
              <MyIcon
                icon="/assets/icons/seat_profile.svg"
                title="Seat no."
                desc="128"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="h-[50px] px-4 py-3 rounded-md bg-primary-100 font-medium">
            Download Ticket
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default FlightsItem;
