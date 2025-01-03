"use client";

import BookingStay from "@/types/BookingStay";
import { formatDateInWords, formatDateToYYYYMMDD } from "@/utils/util";
import Image from "next/image";
import { usePDF } from "react-to-pdf";
import MyIcon from "./MyIcon";

import { toast } from "@/hooks/use-toast";
import { fetchStayBooking } from "@/lib/actions/BookingActions";
import StayBooking from "@/types/StayBooking";
import { useEffect, useState } from "react";
import StayTicket from "../details/stays/StayTicket";

const StaysItem = ({ item }: { item: BookingStay }) => {
  const { toPDF, targetRef } = usePDF({ filename: "stay-ticket.pdf" });

  const [stayBookingData, setStayBookingData] = useState<StayBooking | null>(
    null
  );

  useEffect(() => {
    fetchStayBooking(item.id)
      .then((data) => {
        setStayBookingData(data);
        console.log(stayBookingData);
      })
      .catch((error) => {
        console.error("Error fetching flight booking:", error);
        toast({
          title: `Error fetching Booking: ${error}`,
          variant: "error",
          duration: 3000,
        });
      });
  }, []);

  return (
    <>
      <div className="relative w-full">
        {/* Ticket content for PDF */}
        <div
          ref={targetRef}
          className="flex p-4 mt-4 w-[100%] rounded-lg shadow-full shadow-primary-400"
        >
          <div className="w-[10%] my-4 p-2 flex mr-1 px-3 border border-primary-100 rounded-md justify-center items-center">
            <Image
              src={item.room?.image_url ?? "/assets/images/stay.svg"}
              alt="places"
              width={200}
              height={200}
              className="w-full"
            />
          </div>

          <div className="ml-4 w-[90%] flex justify-between items-center">
            <div className="flex items-center">
              <div>
                <p className="title-medium text-[#112211]">Check-In</p>
                <p className="paragraph-semibold">
                  {formatDateInWords(item.checkinDate ?? "")}
                </p>
              </div>

              <div className="mx-4">---</div>

              <div>
                <p className="title-medium text-[#112211]">Check-Out</p>
                <p className="paragraph-semibold">
                  {formatDateInWords(item.checkoutDate ?? "")}
                </p>
              </div>

              <div className="mx-6 w-[1.5px] bg-gray-300 h-[50px]"></div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-4">
                  <MyIcon
                    icon="/assets/icons/time_profile.svg"
                    title="Checkin"
                    desc={[formatDateToYYYYMMDD(item.checkinDate ?? "")]}
                  />
                  <MyIcon
                    icon="/assets/icons/time_profile.svg"
                    title="Checkout"
                    desc={[formatDateToYYYYMMDD(item.checkoutDate ?? "")]}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <MyIcon
                    icon="/assets/icons/door_profile.svg"
                    title="Gate"
                    desc={["On arrival"]}
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

      <div ref={targetRef} className="block">
        {stayBookingData && <StayTicket booking={stayBookingData} />}
      </div>
    </>
  );
};

export default StaysItem;
