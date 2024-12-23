"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { convertDataNavigate } from "@/utils/util";

const SriLanka = ({ type }: { type: string }) => {
  const router = useRouter();

  const handleNavigateFlight = (params: Record<string, any>) => {
    const formattedParams: Record<string, string> = convertDataNavigate(params);

    const queryString = new URLSearchParams(formattedParams).toString();
    router.push(`/find-flights/flights-search?${queryString}`);
  };

  const validateAndNavigateWithParamsFlight = () => {
    const params = {
      // page: 0,
      roundTrip: false,
      departure_location_id: "2",
      arrival_location_id: "3",
      departure_time_from: "2024-12-25",
      departure_time_to: "2024-12-25",
      return_time_from: "",
      return_time_to: "",
      seat_classes: ["FIRST_CLASS"],
      // min_price: 0,
      // max_price: 0,
      // order_by: "CHEAPEST",
      passenger_count: 1,
      // page_size: 10,
    };

    handleNavigateFlight(params);
  };

  const handleNavigateHotel = (params: Record<string, any>) => {
    const formattedParams: Record<string, string> = convertDataNavigate(params);

    const queryString = new URLSearchParams(formattedParams).toString();
    router.push(`/find-stays/stays-search?${queryString}`);
  };

  const validateAndNavigateWithParamsHotel = () => {
    const params = {
      // page: 0,
      location_id: "3",
      checkin_date: "2024-12-25",
      checkout_date: "2024-12-25",
      rooms: 1,
      guests: 1,

      // min_price
      // max_price
      // rating
      // type
      // page_size
    };

    handleNavigateHotel(params);
  };

  const handleBook = () => {
    if (type === "Hotel") {
      validateAndNavigateWithParamsFlight();
    } else {
      validateAndNavigateWithParamsHotel();
    }
  };
  return (
    <div className="mt-4 w-full flex justify-between">
      <div className="relative w-[44%] h-424 bg-primary-100 p-6 rounded-2xl">
        <div className="w-full mb-6">
          <h1 className="w-[50%] title-bold line-clamp-2">
            Backpacking Sri Lanka
          </h1>
        </div>

        <div className="absolute bg-white top-0 right-0 m-6 px-3 py-1 rounded-md text-center">
          <p className="h3-regular">From</p>
          <p className="h3-semibold">$700</p>
        </div>

        <p className="paragraph-regular mb-16 line-clamp-5">
          Traveling is a unique experience as it's the best way to unplug from
          the pushes and pulls of daily life. It helps us to forget about our
          problems, frustrations, and fears at home. During our journey, we
          experience life in different ways. We explore new places, cultures,
          cuisines, traditions, and ways of living.
        </p>

        <button onClick={handleBook} className="w-full bg-white py-3 rounded-lg">
          <p className="paragraph-regular">Book Flight</p>
        </button>
      </div>

      <div className="w-[54%] flex gap-x-4">
        <div className="space-y-5">
          <Image
            src="/assets/images/Lanka-1.svg"
            alt="Lanka-1"
            width={318}
            height={200}
          />
          <Image
            src="/assets/images/Lanka-2.svg"
            alt="Lanka-2"
            width={318}
            height={200}
          />
        </div>
        <div className="space-y-5">
          <Image
            src="/assets/images/Lanka-3.svg"
            alt="Lanka-3"
            width={318}
            height={200}
          />
          <Image
            src="/assets/images/Lanka-4.svg"
            alt="Lanka-4"
            width={318}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default SriLanka;
