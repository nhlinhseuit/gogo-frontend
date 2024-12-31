"use client";

import Image from "next/image";
import MyIcon from "./MyIcon";
import BookingFlight from "@/types/BookingFlight";

const FlightsItem = ({ item }: { item: BookingFlight }) => {
  return (
    <div className="flex p-4 mt-4 w-[100%] rounded-lg shadow-full shadow-primary-400">
      <div className="w-[10%] my-4 p-2 flex mr-1 px-3 border border-primary-100 rounded-md justify-center items-center">
        <Image
          src={item.seats[0].seat.flight.airline.image}
          alt="places"
          width={200}
          height={200}
          className="w-full"
        />
      </div>

      {/* <div className="w-[80%] mx-4 my-2"> */}
      <div className="ml-4 w-[90%] flex justify-between items-center">
        <div className="flex items-center">
          <>
            <div>
              <p className="title-medium text-[#112211]">
                {item.seats[0].seat.flight.timezone}
              </p>
              <p className="paragraph-semibold">
                {item.seats[0].seat.flight.departureTime}
              </p>
            </div>

            <div className="mx-4">---</div>

            <div>
              <p className="title-medium text-[#112211]">
                {item.seats[0].seat.flight.timezone}
              </p>
              <p className="paragraph-semibold">
                {item.seats[0].seat.flight.arrivalTime}
              </p>
            </div>
          </>

          <div className="mx-6 w-[1.5px] bg-gray-300 h-[50px]"></div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              <MyIcon
                icon="/assets/icons/calendar_profile.svg"
                title="Date"
                desc={["12-11-2024"]}
              />
              <MyIcon
                icon="/assets/icons/time_profile.svg"
                title="Flight time"
                desc={[item.seats[0].seat.flight.timezone]}
              />
            </div>
            <div className="flex flex-col gap-4">
              <MyIcon
                icon="/assets/icons/door_profile.svg"
                title="Gate"
                desc={[item.seats[0].seat.flight.gate]}
              />
              <MyIcon
                icon="/assets/icons/seat_profile.svg"
                title="Seat no."
                desc={item.seats.map((item) => item.seat.number)}
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
