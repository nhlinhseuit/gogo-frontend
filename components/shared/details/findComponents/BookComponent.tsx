"use client";

import {
  convertDataNavigate,
  defaultSearchFlightParams,
  defaultSearchStayParams,
  formatCurrency,
} from "@/utils/util";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BookComponent = ({
  type,
  imgUrl,
  country,
  description,
  locationName,
  locationId,
}: {
  type: string;
  imgUrl: string;
  country: string;
  description: string;
  locationName: string;
  locationId: string;
}) => {
  const router = useRouter();

  //

  const handleNavigateFlight = (params: Record<string, any>) => {
    const formattedParams: Record<string, string> = convertDataNavigate(params);

    const queryString = new URLSearchParams(formattedParams).toString();
    router.push(`/find-flights/flights-search?${queryString}`);
  };

  const validateAndNavigateWithParamsFlight = () => {
    const params = defaultSearchFlightParams(country, locationId);
    handleNavigateFlight(params);
  };

  //

  const handleNavigateHotel = (params: Record<string, any>) => {
    const formattedParams: Record<string, string> = convertDataNavigate(params);

    const queryString = new URLSearchParams(formattedParams).toString();
    router.push(`/find-stays/stays-search?${queryString}`);
  };

  const validateAndNavigateWithParamsHotel = () => {
    const params = defaultSearchStayParams(locationName, locationId);
    handleNavigateHotel(params);
  };

  const handleBook = () => {
    if (type === "Hotel") {
      validateAndNavigateWithParamsHotel();
    } else {
      validateAndNavigateWithParamsFlight();
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
              <div className="w-[100%]">
                <h3 className="header-semibold">{country}</h3>
                <p className="body-regular tracking-wider line-clamp-1">
                  {description}
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
