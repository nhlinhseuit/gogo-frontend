"use client";

import FavouriteFlight from "@/types/FavouriteFlight";
import { formatCurrency, getReviewComment } from "@/utils/util";
import Image from "next/image";
import FavoriteCheckFlight from "../../searchFlight/flightComponent/FavoriteCheckFlight";
import { useEffect, useState } from "react";
import {
  deleteFavouriteAFlight,
  favouriteAFlight,
  fetchFavouriteFlights,
} from "@/lib/actions/FavouriteFlightsActions";
import FavouriteFlights from "@/types/FavouriteFlights";
import { useRouter } from "next/navigation";

const FavouriteFlightComp = ({ item }: { item: FavouriteFlight }) => {
  const [favFlights, setFavFlights] = useState<FavouriteFlights>();
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleClickFlightItem = () => {
    router.push(`/find-flights/${item.outbound_flight.id}`);
  };

  useEffect(() => {
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

  const handleFavAFlight = () => {
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
                (item) => item.outbound_flight.id !== item.outbound_flight.id
              ),
            };
          });
        })
        .catch((error) => {
          setError(error.message);
          // setIsLoading(false);
        });
    } else {
      favouriteAFlight(item.outbound_flight.id, null)
        .then((data: any) => {
          // setIsLoading(false);
          setFavFlights((prev) => {
            if (!prev)
              return {
                user: data.data.user,
                flight_favorites: [
                  {
                    id: data.data.id, // ID mới của flight favorite
                    user: data.data.user,
                    outbound_flight: data.data.outbound_flight,
                    return_flight: data.data.return_flight,
                    round_trip: data.data.round_trip,
                  },
                ],
              };

            return {
              ...prev,
              flight_favorites: [
                ...prev.flight_favorites,
                {
                  id: data.data.id, // ID mới của flight favorite
                  user: data.data.user,
                  outbound_flight: data.data.outbound_flight,
                  return_flight: data.data.return_flight,
                  round_trip: data.data.round_trip,
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

  return (
    <div className="flex p-4 w-[100%] rounded-lg shadow-full shadow-primary-400">
      <div className="w-[30%] p-3">
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
                    {item?.outbound_flight.airline.review_count}
                  </span>
                  reviews
                </p>
              </div>
            </div>

            <div className="w-full mb-4">
              <FavoriteCheckFlight item={item} />
            </div>
          </div>
          <div className="pt-1 pr-2">
            <div className="text-left body-regular">
              <p>starting from</p>
            </div>
            <div className="flex justify-end text-[#FF8682] text-right">
              <h1 className="h2-bold">
                ${formatCurrency({ price: item?.outbound_flight.minBaseFare })}
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
            onClick={handleClickFlightItem}
            className="w-[90%] py-3 rounded-md bg-primary-100 font-semibold"
          >
            View Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavouriteFlightComp;
