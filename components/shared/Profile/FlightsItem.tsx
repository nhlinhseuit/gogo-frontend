"use client";

import FlightBooking from "@/types/FlightBooking";
import { formatDateToYYYYMMDD } from "@/utils/util";
import Image from "next/image";
import { usePDF } from "react-to-pdf";
import MyIcon from "./MyIcon";

const FlightsItem = ({ item }: { item: FlightBooking }) => {
  const { toPDF, targetRef } = usePDF({ filename: "stay-ticket.pdf" });

  return (
      <div className="relative w-full">
        {/* Ticket content for PDF */}
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

          <div className="ml-4 w-[90%] flex justify-between items-center">
            <div className="flex items-center">
              <>
                <div>
                  <p className="title-medium text-[#112211]">
                    {item.seats[0].seat.flight.timezone}
                  </p>
                  <p className="paragraph-semibold">
                    {item.seats[0].seat.flight.departure_time}
                  </p>
                </div>

                <div className="mx-4">---</div>

                <div>
                  <p className="title-medium text-[#112211]">
                    {item.seats[0].seat.flight.timezone}
                  </p>
                  <p className="paragraph-semibold">
                    {item.seats[0].seat.flight.arrival_time}
                  </p>
                </div>
              </>

              <div className="mx-6 w-[1.5px] bg-gray-300 h-[50px]"></div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <MyIcon
                    icon="/assets/icons/calendar_profile.svg"
                    title="Date"
                    desc={[formatDateToYYYYMMDD(item.booking_date)]}
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
                    desc={item.seats.map((seat) => seat.seat.number)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download button positioned absolutely */}
        <button
          onClick={() => toPDF()}
          className="absolute top-4 right-4 h-[50px] px-4 py-3 rounded-md bg-primary-100 font-medium shadow-lg"
        >
          Download Ticket
        </button>
      </div>

      
  );
};

export default FlightsItem;
