"use client";

import "@/app/globals.css";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import FavouriteStayComp from "@/components/shared/details/favourite/FavouriteStayComp";
import StaysInput from "@/components/shared/navbar/input-searchtab/StaysInput";
import NoResult from "@/components/shared/NoResult";
import PriceComponent from "@/components/shared/searchFlight/filters/PriceComponent";
import RatingComponent from "@/components/shared/searchFlight/filters/RatingComponent";
import StayCheckComponent from "@/components/shared/searchFlight/filters/StayCheckComponent";
import Tab from "@/components/shared/searchFlight/flightComponent/Tab";
import { searchStays } from "@/lib/actions/Search/SearchStayActions";
import Amenity from "@/types/Amenity";
import Stay from "@/types/Stay";
import { convertDataReceive } from "@/utils/util";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const tabs = [
  {
    type: "HOTEL",
    title: "HOTEL",
  },
  {
    type: "VILLA",
    title: "VILLA",
  },
  {
    type: "RESORT",
    title: "RESORT",
  },
];

export default function StaysSearch() {
  const [isSelected, setIsSelected] = useState("HOTEL");
  const [stays, setStays] = useState<Stay[]>();

  const [isUsingFilter, setIsUsingFilter] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const params = convertDataReceive(searchParams);

  const handleRecentSearch = () => {
    const recentLocalStorage = localStorage.getItem("recentSearchs") || "[]";

    let recents: string[];

    try {
      recents = JSON.parse(recentLocalStorage);
      if (!Array.isArray(recents)) {
        throw new Error("Parsed data is not an array");
      }
    } catch (error) {
      console.error("Error parsing recentSearchs:", error);
      recents = [];
    }

    const locationId = params.location_id.toString();
    if (!recents.includes(locationId)) {
      recents.push(locationId);
    }

    localStorage.setItem("recentSearchs", JSON.stringify(recents));
  };

  useEffect(() => {
    handleRecentSearch();
  }, []);

  const searchStaysFunc = (params: any, isFilter?: boolean) => {
    if (isFilter) setIsLoadingFilter(true);
    else setIsLoading(true);

    searchStays(params)
      .then((data: any) => {
        setStays(data.data);
        if (isFilter) setIsLoadingFilter(false);
        else setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        if (isFilter) setIsLoadingFilter(false);
        else setIsLoading(false);
      });
  };

  useEffect(() => {
    searchStaysFunc(params);
  }, [searchParams]);

  if (error) {
    return <div className="py-16 text-center text-red-500">{error}</div>;
  }

  let sourceData: StayData[] = [];
  switch (isSelected) {
    case "HOTEL":
      break;
    case "MOTEL":
      break;
    case "RESORT":
      break;
    default:
      break;
  }
  const [renderData, setRenderData] = useState(sourceData);

  useEffect(() => {
    setRenderData(sourceData);
  }, [isSelected]);

  const getCountPlace = (title: string) => {
    return stays?.filter((item) => item.stay_type === title).length;
  };

  const getMinMaxFare = (): { minFare: number; maxFare: number } => {
    if (!stays) return { minFare: 0, maxFare: 0 };
    const fares = stays.map((stay) => {
      const price = stay.min_price;
      return price;
    });

    const minFare = Math.min(...fares);
    const maxFare = Math.max(...fares);

    return { minFare, maxFare };
  };

  const getSetAminities = () => {
    const allAminities = stays?.reduce((acc, item) => {
      if (item.amenities) {
        item.amenities.forEach((amenity: Amenity) => acc.add(amenity.name));
      }
      return acc;
    }, new Set<string>());

    // Chuyển đổi Set thành mảng
    return Array.from(allAminities ?? []);
  };

  //! PRICE COMPONENT
  const selectedPriceRangeRef = useRef<[number, number]>([0, 100]);

  const handlePriceChange = (priceRange: [number, number]) => {
    selectedPriceRangeRef.current = priceRange;
  };

  //! RATING COMPONENT
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleRatingChange = (ratingId: number) => {
    setSelectedRating(ratingId);
  };

  //TODO: FILTER
  const handleFilter = () => {
    setIsUsingFilter(true);

    const paramsFilter = {
      ...params,
      min_price: selectedPriceRangeRef.current[0],
      max_price: selectedPriceRangeRef.current[1],
      rating: selectedRating,
    };

    handleFetchFilter(paramsFilter);
  };

  const handleFetchFilter = (paramsFilter: any) => {
    searchStaysFunc(paramsFilter, true);
  };

  const handleCancelFilter = () => {
    setIsUsingFilter(false);
    searchStaysFunc(params);
  };

  return (
    <main className="w-full">
      <StaysInput
        isSearchStay
        otherClasses="bg-white mt-8 px-4 py-6 rounded-lg shadow-full shadow-primary-400"
        destination={params.location}
        roomsParams={params.rooms}
        guestsParams={params.guests}
        selectedCheckinDateParams={params.checkin_date}
        selectedCheckoutDateParams={params.checkout_date}
      />

      {isLoading ? (
        <BigLoadingSpinner />
      ) : !isUsingFilter && (!stays || stays.length === 0) ? (
        <NoResult
          title="No Stays Found!"
          description="🔍 Sorry, we couldn't find any stays matching your search. Please try adjusting your filters and search criteria."
        />
      ) : (
        <div className="flex w-full mt-8">
          <div className="w-[30%] px-4 border-r-[1px]">
            <div className="mx-2">
              <h3 className="h3-semibold">Filters</h3>
              <PriceComponent
                minBaseFare={getMinMaxFare().minFare}
                maxBaseFare={getMinMaxFare().maxFare}
                onPriceChange={handlePriceChange}
              />
              <RatingComponent onRatingChange={handleRatingChange} />

              {getSetAminities().length === 0 ? null : (
                <StayCheckComponent
                  type={"Amenities"}
                  data={getSetAminities()}
                />
              )}
            </div>

            {isUsingFilter ? (
              <button
                onClick={handleCancelFilter}
                className="mt-8 w-full py-3 rounded-md bg-primary-100 font-semibold"
              >
                Close Filter
              </button>
            ) : (
              <button
                onClick={handleFilter}
                className="mt-8 w-full py-3 rounded-md bg-primary-100 font-semibold"
              >
                Submit
              </button>
            )}
          </div>
          {isLoadingFilter ? (
            <BigLoadingSpinner />
          ) : isUsingFilter && (!stays || stays.length === 0) ? (
            <NoResult
              title="No Stays Found!"
              description="🔍 Sorry, we couldn't find any stays matching your search. Please try adjusting your filters and search criteria."
            />
          ) : (
            <div className="w-[70%] ml-4">
              <div className="w-full flex h-20 bg-white rounded-lg shadow-full shadow-primary-400 mb-10">
                {tabs.map((item, index) => {
                  return item.type === "HOTEL" ? (
                    <Tab
                      key={index}
                      type={item.type}
                      title={item.title}
                      countPlace={getCountPlace(item.title)}
                      isSelected={isSelected}
                      isSearchStay
                      onClick={() => {
                        setIsSelected(item.title);
                      }}
                    />
                  ) : (
                    <div key={index} className="flex">
                      <div className="w-[1px] my-4 bg-gray-300"></div>
                      <Tab
                        key={index}
                        type={item.type}
                        title={item.title}
                        countPlace={getCountPlace(item.title)}
                        isSearchStay
                        isSelected={isSelected}
                        onClick={() => {
                          setIsSelected(item.title);
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* <div>
            <Reccomended />
          </div> */}
              <div>
                {stays
                  ?.filter((item) => item.stay_type === isSelected)
                  .map((stay, index) => (
                    <FavouriteStayComp
                      key={index}
                      item={stay}
                      paramsRef={params}
                      // checkin={params["checkin_date"] ?? ""}
                      // checkout={params["checkout_date"] ?? ""}
                    />
                  ))}
              </div>
              <div className="flex justify-center items-center h-[48px] bg-[#112211] mt-8 rounded-md cursor-pointer">
                <p className="paragraph-semibold text-white">
                  Show more result
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
