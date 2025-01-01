"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CheckFlight from "./CheckFlight";
import { formatCurrency, getReviewComment } from "@/utils/util";
import Flight from "@/types/Flight";
import FavouriteFlights from "@/types/FavouriteFlight";
import { fetchFavouriteFlights } from "@/lib/actions/FavouriteFlightsActions";
import { useRouter } from "next/navigation";

const FlightsComp = ({ item,departure_time_from, departure_time_to }: { item: Flight, departure_time_from: string;
  departure_time_to: string }) => {
  const [favFlights, setFavFlights] = useState<FavouriteFlights>();
  const [error, setError] = useState<string | null>(null);
  const userId = "3";

  const router = useRouter();

  useEffect(() => {
    fetchFavouriteFlights(userId)
      .then((data: any) => {
        setFavFlights(data.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const getIsFavoriteItem = () => {
    console.log("item.outbound_flight.id", item.outbound_flight.id);

    const result = favFlights?.flight_favorites.find(
      (flight) => flight.outbound_flight.id === item.outbound_flight.id
    );
    if (result != undefined) return true;
    return false;
  };

  console.log("favFlights", favFlights);

  const handleClickFlightItem = (
    flightId: string,
    departure_time_from: string,
    departure_time_to: string
  ) => {
    router.push(
      `/find-flights/${flightId}?departure_time_from=${departure_time_from}&departure_time_to=${departure_time_to}`
    );
  };

  return (
    <div className="flex p-4 w-[100%] rounded-lg shadow-full shadow-primary-400">
      <div className="w-[40%] p-3">
        <Image
          src={item?.outbound_flight.airline.image ?? ""}
          alt="places"
          width={200}
          height={200}
          className="w-full"
        />
      </div>

      <div className="w-[60%] mx-4 my-2">
        <div className="flex justify-between">
          <div className="w-[80%]">
            <div className="flex mt-2">
              <div className="flex mr-1 px-3 border border-primary-100 rounded-md justify-center items-center">
                {item?.outbound_flight.airline.rating}
              </div>

              <div className="py-2 flex gap-2">
                <p className="font-bold">
                  {getReviewComment(item?.outbound_flight.airline.rating)}
                </p>
                <p>
                  <span className="paragraph-regular mr-1">
                    {/* {item?.outbound_flight.airline.reviews[0].rating} */}
                  </span>
                  reviews
                </p>
              </div>
            </div>

            <div className="w-full mb-4">
              <CheckFlight item={item} />
            </div>
          </div>
          <div className="pt-1 pr-2">
            <div className="text-left body-regular">
              <p>starting from</p>
            </div>
            <div className="flex justify-end text-[#FF8682] text-right">
              <h1 className="h2-bold">
                $
                {formatCurrency({ price: item?.outbound_flight.min_base_fare })}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex w-full pt-5 border-t-[1px]">
          <div
            onClick={() => {
              // handleClick(item.id);
            }}
            className="flex px-3 mr-4 border border-primary-100 rounded-md justify-center items-center cursor-pointer"
          >
            {getIsFavoriteItem() ? (
              <Image
                src="/assets/icons/Heart.svg"
                alt="Anh heart"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/assets/icons/flightHeart.svg"
                alt="Anh heart"
                width={20}
                height={20}
              />
            )}
          </div>
          <button 
           onClick={() => {
            handleClickFlightItem(item.outbound_flight.id, departure_time_from, departure_time_to);
          }}
          className="w-[90%] py-3 rounded-md bg-primary-100 font-semibold">
            View Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightsComp;
