"use client";

import "@/app/globals.css";
import FavouriteStayComp from "@/components/shared/details/favourite/FavouriteStayComp";
import StaysInput from "@/components/shared/navbar/input-searchtab/StaysInput";
import CheckComponent from "@/components/shared/searchFlight/filters/CheckComponent";
import PriceComponent from "@/components/shared/searchFlight/filters/PriceComponent";
import RatingComponent from "@/components/shared/searchFlight/filters/RatingComponent";
import Tab from "@/components/shared/searchFlight/flightComponent/Tab";
import { searchStays } from "@/lib/actions/Search/SearchStayActions";
import Stay from "@/types/Stay";
import { convertDataReceive } from "@/utils/util";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MockFreebiesData = {
  type: "Freebies",
  data: [
    "Free breakfast",
    "Free parking",
    "Free internet",
    "Free airport shuttle",
    "Free cancellation",
  ],
};

const MockAmenitiesData = {
  type: "Amenities",
  data: ["24hr font desk", "Air-conditioned", "Fitness", "Pool"],
};

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

  const [isLoading, setIsLoading] = useState(true);
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

    searchStays(params)
      .then((data: any) => {
        setIsLoading(false);
        setStays(data.data);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

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

      <div className="flex w-full mt-8">
        <div className="w-[30%] px-4 border-r-[1px]">
          <div className="mx-2">
            <h3 className="h3-semibold">Filters</h3>
            <PriceComponent />
            <RatingComponent />
            <CheckComponent
              type={MockFreebiesData.type}
              data={MockFreebiesData.data}
            />
            <CheckComponent
              type={MockAmenitiesData.type}
              data={MockAmenitiesData.data}
            />
          </div>
        </div>

        <div className="w-[70%] ml-4">
          <div className="w-full flex h-20 bg-white rounded-lg shadow-full shadow-primary-400 mb-10">
            {tabs.map((item, index) => {
              return item.type === "HOTEL" ? (
                <>
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
                </>
              ) : (
                <div className="flex">
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
              .map((stay) => (
                <FavouriteStayComp item={stay} />
              ))}
          </div>
          <div className="flex justify-center items-center h-[48px] bg-[#112211] mt-8 rounded-md cursor-pointer">
            <p className="paragraph-semibold text-white">Show more result</p>
          </div>
        </div>
      </div>
    </main>
  );
}
