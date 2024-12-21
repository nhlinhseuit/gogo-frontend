"use client";

import "@/app/globals.css";
import FlightsInput from "@/components/shared/navbar/input-searchtab/FlightsInput";
import CheckComponent from "@/components/shared/searchFlight/filters/CheckComponent";
import DepartureTimeComponent from "@/components/shared/searchFlight/filters/DepartureTimeComponent";
import PriceComponent from "@/components/shared/searchFlight/filters/PriceComponent";
import RatingComponent from "@/components/shared/searchFlight/filters/RatingComponent";
import FlightsComp from "@/components/shared/searchFlight/flightComponent/FlightsContent";
import Reccomended from "@/components/shared/searchFlight/flightComponent/Reccomended";
import Tab from "@/components/shared/searchFlight/flightComponent/Tab";
import { useEffect, useState } from "react";
const MockCheapestData = [
  {
    id: 1,
    isFavourited: false,
    rating: 4.2,
    reviews: "Very Good",
    price: 104,
    img: "/assets/images/emirates.svg",
    countReview: 54,
  },
  {
    id: 2,
    isFavourited: false,
    rating: 4.2,
    reviews: "Very Good",
    price: 104,
    img: "/assets/images/emirates.svg",
    countReview: 54,
  },
  {
    id: 3,
    isFavourited: false,
    rating: 4.2,
    reviews: "Very Good",
    price: 104,
    img: "/assets/images/emirates.svg",
    countReview: 54,
  },
];

const MockBestData = [
  {
    id: 1,
    isFavourited: false,
    rating: 4.2,
    reviews: "Very Good",
    price: 104,
    img: "/assets/images/emirates.svg",
    countReview: 54,
  },
  {
    id: 2,
    isFavourited: false,
    rating: 4.2,
    reviews: "Very Good",
    price: 104,
    img: "/assets/images/emirates.svg",
    countReview: 54,
  },
];

const MockQuickedData = [
  {
    id: 1,
    isFavourited: false,
    rating: 4.2,
    reviews: "Very Good",
    price: 1040,
    img: "/assets/images/emirates.svg",
    countReview: 54,
  },
];

const MockAirlines = {
  type: "Airlines",
  data: ["Emirated", "Fly Dubai", "Qatar", "Etihad"],
};
const MockTrips = {
  type: "Trips",
  data: ["Round trip", "On Way", "Multi-City"],
};
const tabs = [
  {
    type: "Cheapest",
    title: "Cheapest",
    price: 99,
    duration: "2h 18m",
  },
  {
    type: "Best",
    title: "Best",
    price: 99,
    duration: "2h 18m",
  },
  {
    type: "Quicked",
    title: "Quicked",
    price: 99,
    duration: "2h 18m",
  },
  {
    type: "Other",
    title: "Other sort",
  },
];
export default function FlightsSearch() {
  const [isSelected, setIsSelected] = useState("Best");

  let sourceData: FlightData[] = [];
  switch (isSelected) {
    case "Cheapest":
      sourceData = MockCheapestData;
      break;
    case "Best":
      sourceData = MockBestData;
      break;
    case "Quicked":
      sourceData = MockQuickedData;
      break;
    default:
      break;
  }

  useEffect(() => {
    setRenderData(sourceData);
  }, [isSelected]);

  const [renderData, setRenderData] = useState(sourceData);

  return (
    <main className="w-full">
      <FlightsInput
        isSearchFlight
        otherClass="bg-white mt-8 px-4 py-6 rounded-lg shadow-full shadow-primary-400"
      />

      <div className="flex w-full mt-8">
        <div className="w-[30%] px-4 border-r-[1px]">
          <div className="mx-2">
            <h3 className="h3-semibold">Filters</h3>
            <PriceComponent />
            <DepartureTimeComponent />
            <RatingComponent />
            <CheckComponent type={MockAirlines.type} data={MockAirlines.data} />
            <CheckComponent type={MockTrips.type} data={MockTrips.data} />
          </div>
        </div>

        <div className="w-[70%] ml-4">
          <div className="flex justify-start h-20 bg-white rounded-lg shadow-full shadow-primary-400">
            {tabs.map((item, index) => {
              return item.type === "Cheapest" ? (
                <Tab
                  key={index}
                  type={item.type}
                  title={item.title}
                  price={item.price}
                  duration={item.duration}
                  isSelected={isSelected}
                  onClick={() => {
                    setIsSelected(item.title);
                  }}
                />
              ) : (
                <div className="flex">
                  <div className="w-[1px] my-4 bg-gray-300"></div>
                  <Tab
                    key={index}
                    type={item.type}
                    title={item.title}
                    price={item.price}
                    duration={item.duration}
                    isSelected={isSelected}
                    onClick={() => {
                      setIsSelected(item.title);
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div>
            <Reccomended />
          </div>

          <div>
            {renderData.map((item) => (
              <FlightsComp
                item={item}
                handleClick={(id: number) => {
                  var updatedRenderData = renderData.map((data) => {
                    if (data.id === id) {
                      if (data.isFavourited === true) {
                        return {
                          ...data,
                          isFavourited: false,
                        };
                      } else {
                        return {
                          ...data,
                          isFavourited: true,
                        };
                      }
                    } else {
                      return data;
                    }
                  });
                  //  set
                  setRenderData(updatedRenderData);
                }}
              />
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
