"use client";

import {
  convertDataNavigate,
  formatCurrency
} from "@/utils/util";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BookComponent = ({
  type,
  imgUrl,
  country,
  description,
  price,
}: {
  type: string;
  imgUrl: string;
  country: string;
  description: string;
  price: number;
}) => {
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
    <div>
      <div className="relative">
        <div className="w-[296px] h-[420px] object-cover">
          <Image
            src={imgUrl}
            alt={country}
            width={296}
            height={420}
            className="shadow-lg object-contain"
          />
        </div>

        <div className="absolute w-full bottom-0 flex flex-col justify-center items-center my-6">
          <div className="w-[85%]">
            <div className="flex justify-between items-center text-white mb-3">
              <div className="w-[70%]">
                <h3 className="header-semibold">{country}</h3>
                <p className="body-regular tracking-wider line-clamp-1">
                  {description}
                </p>
              </div>

              <div className="w-[30%] text-end">
                <p className="header-semibold">
                  $ {formatCurrency({ price: price })}
                </p>
              </div>
            </div>

            <button
              onClick={handleBook}
              className="w-full bg-primary-100 py-3 px-12 rounded-md transform transition-transform hover:scale-95 duration-300"
            >
              <p className="base-regular">Book {type}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookComponent;
