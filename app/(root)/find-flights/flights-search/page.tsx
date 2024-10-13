"use client";

import "@/app/globals.css";
import FlightsSearchTab from "@/components/shared/navbar/background-searchtab/FlightsSearchTab";
import FlightsInput from "@/components/shared/navbar/input-searchtab/FlightsInput";
import Link from "next/link";
import Image from "next/image";
import FlightsComp from "@/components/shared/searchFlight/flightComponent/FlightsContent";
import RatingComponent from "@/components/shared/searchFlight/filters/RatingComponent";
import PriceComponent from "@/components/shared/searchFlight/filters/PriceComponent";
import DepartureTimeComponent from "@/components/shared/searchFlight/filters/DepartureTimeComponent";
import CheckComponent from "@/components/shared/searchFlight/filters/CheckComponent";
import { useState } from "react";
import Tab from "@/components/shared/searchFlight/flightComponent/Tab";
const MockCheapestData = [
  {
    rating: 4.2,
    reviews: "Very Good",
    price: 104,
    img: "/assets/images/emirates.svg",
    countReview: 54,
  },
  {
    rating: 4.2,
    reviews: "Very Good",
    price: 104,
    img: "/assets/images/emirates.svg",
    countReview: 54,
  },
  {
    rating: 4.2,
    reviews: "Very Good",
    price: 104,
    img: "/assets/images/emirates.svg",
    countReview: 54,
  },
];

const MockBestData = [
  {
    rating: 4.2,
    reviews: "Very Good",
    price: 104,
    img: "/assets/images/emirates.svg",
    countReview: 54,
  },
  {
    rating: 4.2,
    reviews: "Very Good",
    price: 104,
    img: "/assets/images/emirates.svg",
    countReview: 54,
  },
];

const MockQuickedData = [
  {
    rating: 4.2,
    reviews: "Very Good",
    price: 104,
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
  const [isSelected, setIsSelected] = useState("Cheapest");

  let renderData: FlightData[] = [];
  switch (isSelected) {
    case "Cheapest":
      renderData = MockCheapestData;
      break;
    case "Best":
      renderData = MockBestData;
      break;
    case "Quicked":
      renderData = MockQuickedData;
      break;
  }

  return (
    <main className="w-full">
      <FlightsInput
        isSearchFlight
        otherClass="bg-white mt-8 px-4 py-6 rounded-lg shadow-md shadow-primary-400"
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
          <div className="flex justify-start h-20 bg-white rounded-lg shadow-md shadow-primary-400">
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

          <div className="flex justify-between py-5">
            <div>
              <h6 className="body-semibold">
                Showing 4 of
                <span className="text-[#FF8682] ml-1">257 places</span>
              </h6>
            </div>

            <div className="flex justify-center items-center space-x-1">
              <p className="paragraph-regular">Sort by</p>
              <span className="paragraph-semibold">Recommended</span>
              <button>
                <Image
                  src="/assets/icons/chevron_up.svg"
                  alt="up"
                  width={18}
                  height={18}
                />
              </button>
            </div>
          </div>

          <div>
            {renderData.map((item, index) => (
              <FlightsComp
                key={index}
                rating={item.rating}
                reviews={item.reviews}
                img={item.img}
                countReview={item.countReview}
                price={item.price}
              />
            ))}
          </div>

          <div className="flex justify-center items-center h-[48px] bg-[#112211] mt-8 rounded-md cursor-pointer">
            <p className=" paragraph-semibold text-white">Show more result</p>
          </div>
        </div>
      </div>
    </main>
  );
}
