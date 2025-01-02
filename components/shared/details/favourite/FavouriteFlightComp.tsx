"use client";

import FavouriteFlights from "@/types/FavouriteFlights";
import { formatCurrency, getReviewComment } from "@/utils/util";
import Image from "next/image";
import FavoriteCheckFlight from "../../searchFlight/flightComponent/FavoriteCheckFlight";
import FavouriteFlight from "@/types/FavouriteFlight";

const FavouriteFlightComp = ({ item }: { item: FavouriteFlight }) => {
  console.log("Flight Item", item);
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
                    {/* {item?.outbound_flight.airline.reviews[0].rating} */}
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
            onClick={() => {
              // handleClick(item.id);
            }}
            className="flex px-3 mr-4 border border-primary-100 rounded-md justify-center items-center cursor-pointer"
          >
            <Image
              src="/assets/icons/Heart.svg"
              alt="Anh heart"
              width={20}
              height={20}
            />
          </div>
          <button className="w-[90%] py-3 rounded-md bg-primary-100 font-semibold">
            View Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavouriteFlightComp;
