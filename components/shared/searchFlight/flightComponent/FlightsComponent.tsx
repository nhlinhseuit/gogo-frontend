"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CheckFlight from "./CheckFlight";
import {
  convertDataNavigate,
  formatCurrency,
  getCurrentUser,
  getReviewComment,
} from "@/utils/util";
import Flight from "@/types/Flight";
import FavouriteFlights from "@/types/FavouriteFlights";
import {
  deleteFavouriteAFlight,
  fetchFavouriteFlights,
} from "@/lib/actions/FavouriteFlightsActions";
import { useRouter } from "next/navigation";
import { favouriteAFlight } from "@/lib/actions/FavouriteFlightsActions";

const FlightsComponent = ({
  type,
  item,
  flightId,
  paramsRef,
  isFavorite,
  handleClickFlightItem,
  handleClickReturnFlight,
  handleClickOutboundFlight,
}: {
  type: string;
  item: Flight;
  flightId: string;
  paramsRef: any;
  isFavorite?: boolean;
  handleClickFlightItem?: () => void;
  handleClickReturnFlight?: () => void;
  handleClickOutboundFlight?: () => void;
}) => {
  const [favFlights, setFavFlights] = useState<FavouriteFlights>();
  const [error, setError] = useState<string | null>(null);
  const currentUser = getCurrentUser();

  console.log("item", item);

  //TODO: XÀI TẠM THỜI
  // const userId = "3";

  const router = useRouter();

  useEffect(() => {
    if (isFavorite && !currentUser) return;

    fetchFavouriteFlights()
      .then((data: any) => {
        setFavFlights(data.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const getIsFavoriteItem = () => {
    const result = favFlights?.flight_favorites.find(
      (flight) => flight.outbound_flight.id === item.outbound_flight.id
    );
    if (result != undefined) return true;
    return false;
  };

  const checkIsCurrentUser = () => {
    //? Middleware

    if (!currentUser) {
      const queryString = new URLSearchParams(
        convertDataNavigate(paramsRef)
      ).toString();
      router.push(`/login?${queryString}`);
      return;
    }
  };

  const handleFavAFlight = () => {
    checkIsCurrentUser();

    if (getIsFavoriteItem()) {
      const result = favFlights?.flight_favorites.find(
        (flight) => flight.outbound_flight.id === item.outbound_flight.id
      );

      deleteFavouriteAFlight(result?.id)
        .then((data: any) => {
          // setIsLoading(false);
          setFavFlights((prev) => {
            if (!prev) return undefined;

            return {
              ...prev,
              flight_favorites: prev.flight_favorites.filter(
                (item) => item.outbound_flight.id !== flightId
              ),
            };
          });
        })
        .catch((error) => {
          setError(error.message);
          // setIsLoading(false);
        });
    } else {
      favouriteAFlight(flightId, null)
        .then((data: any) => {
          // setIsLoading(false);
          setFavFlights((prev) => {
            if (!prev) return undefined;

            return {
              ...prev,
              flight_favorites: [
                ...(prev.flight_favorites || []),
                {
                  id: flightId,
                  user: data.user,
                  outbound_flight: data.outbound_flight,
                  return_flight: data.return_flight,
                  round_trip: data.round_trip,
                },
              ],
            };
          });
        })
        .catch((error) => {
          setError(error.message);
          // setIsLoading(false);
        });
    }
  };

  const handleClickItem = () => {
    switch (type) {
      case "oneway":
        handleClickFlightItem && handleClickFlightItem();
        break;
      case "outbound":
        handleClickOutboundFlight && handleClickOutboundFlight();
        break;
      case "return":
        handleClickReturnFlight && handleClickReturnFlight();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex p-4 w-[100%] rounded-lg shadow-full shadow-primary-400">
      <div className="w-[40%] p-3">
        <Image
          src={
            item?.outbound_flight.airline.image ?? "/assets/images/flight.svg"
          }
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
                    {item?.outbound_flight.airline.review_count}
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
                {formatCurrency({
                  price: item?.outbound_flight.min_base_fare,
                })}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex w-full pt-5 border-t-[1px]">
          <div
            onClick={() => handleFavAFlight()}
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
            onClick={handleClickItem}
            className="w-[90%] py-3 rounded-md bg-primary-100 font-semibold"
          >
            View Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightsComponent;

// http://localhost:3000/find-flights/flights-search?roundTrip=false&departure_location=H%C3%A0+N%E1%BB%99i&departure_location_id=1&arrival_location=H%E1%BB%93+Ch%C3%AD+Minh&arrival_location_id=2&departure_time_from=2024-12-25T06:00:00Z&departure_time_to=2025-12-25T10:00:00Z&return_time_from=&return_time_to=&seat_classes=%5B%22ECONOMY%22%5D&passenger_count=1
// http://localhost:3000/find-flights/flights-search?roundTrip=false&departure_location_id=1&arrival_location_id=2&departure_time_from=2024-12-25T06%3A00%3A00Z&departure_time_to=2024-12-25T06%3A00%3A00Z&return_time_from=&return_time_to=&seat_classes=%5B%22ECONOMY%22%5D&passenger_count=1&departure_location=H%C3%A0+N%E1%BB%99i
