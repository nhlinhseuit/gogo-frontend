"use client";

import "@/app/globals.css";
import FavouriteComp from "@/components/shared/details/favourite/FavouriteComp";
import FlightsInput from "@/components/shared/navbar/input-searchtab/FlightsInput";
import StaysInput from "@/components/shared/navbar/input-searchtab/StaysInput";
import CheckComponent from "@/components/shared/searchFlight/filters/CheckComponent";
import PriceComponent from "@/components/shared/searchFlight/filters/PriceComponent";
import RatingComponent from "@/components/shared/searchFlight/filters/RatingComponent";
import Reccomended from "@/components/shared/searchFlight/flightComponent/Reccomended";
import Tab from "@/components/shared/searchFlight/flightComponent/Tab";
import Link from "next/link";
import { useEffect, useState } from "react";

const MockHotelsData = [
  {
    id: 1,
    isFavourited: false,
    img: "/assets/images/favourite.svg",
    title: "Eresin Hotels - Boutique Class",
    address: "Chiet Giang, Trung Quoc",
    star: 5,
    aminities: "20+",
    rating: 4.2,
    review: "Very Good",
    countReview: 371,
    price: 240,
  },

  {
    id: 2,
    isFavourited: false,
    img: "/assets/images/favourite.svg",
    title: "Eresin Hotels - Boutique Class",
    address: "Chiet Giang, Trung Quoc",
    star: 5,
    aminities: "20+",
    rating: 4.2,
    review: "Very Good",
    countReview: 371,
    price: 240,
  },
  {
    id: 3,
    isFavourited: false,
    img: "/assets/images/favourite.svg",
    title: "Eresin Hotels - Boutique Class",
    address: "Chiet Giang, Trung Quoc",
    star: 5,
    aminities: "20+",
    rating: 4.2,
    review: "Very Good",
    countReview: 371,
    price: 240,
  },
];

const MockMotelsData = [
  {
    id: 1,
    isFavourited: false,
    img: "/assets/images/favourite.svg",
    title: "Eresin Hotels - Boutique Class",
    address: "Chiet Giang, Trung Quoc",
    star: 5,
    aminities: "20+",
    rating: 4.2,
    review: "Very Good",
    countReview: 371,
    price: 2400,
  },

  {
    id: 2,
    isFavourited: false,
    img: "/assets/images/favourite.svg",
    title: "Eresin Hotels - Boutique Class",
    address: "Chiet Giang, Trung Quoc",
    star: 5,
    aminities: "20+",
    rating: 4.2,
    review: "Very Good",
    countReview: 371,
    price: 240,
  },
];

const MockResortData = [
  {
    id: 1,
    isFavourited: false,
    img: "/assets/images/favourite.svg",
    title: "Eresin Hotels - Boutique Class",
    address: "Chiet Giang, Trung Quoc",
    star: 5,
    aminities: "20+",
    rating: 4.2,
    review: "Very Good",
    countReview: 371,
    price: 240,
  },
];

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
    type: "Hotels",
    title: "Hotels",
    countPlace: 257,
  },
  {
    type: "Motels",
    title: "Motels",
    countPlace: 51,
  },
  {
    type: "Resorts",
    title: "Resorts",
    countPlace: 72,
  },
];

export default function StaysSearch() {
  const [isSelected, setIsSelected] = useState("Hotels");

  let sourceData: StayData[] = [];
  switch (isSelected) {
    case "Hotels":
      sourceData = MockHotelsData;
      break;
    case "Motels":
      sourceData = MockMotelsData;
      break;
    case "Resorts":
      sourceData = MockResortData;
      break;
    default:
      break;
  }
  const [renderData, setRenderData] = useState(sourceData);

  useEffect(() => {
    setRenderData(sourceData);
  }, [isSelected]);

  return (
    <main className="w-full">
      <StaysInput
        isSearchStay
        otherClass="bg-white mt-8 px-4 py-6 rounded-lg shadow-full shadow-primary-400"
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
          <div className="w-full flex h-20 bg-white rounded-lg shadow-full shadow-primary-400">
            {tabs.map((item, index) => {
              return item.type === "Hotels" ? (
                <>
                  <Tab
                    key={index}
                    type={item.type}
                    title={item.title}
                    countPlace={item.countPlace}
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
                    countPlace={item.countPlace}
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

          <div>
            <Reccomended />
          </div>
          <div>
            {renderData.map((item, index) => (
              <FavouriteComp
                key={index}
                id={item.id}
                isFavourite={item.isFavourited}
                img={item.img}
                title={item.title}
                address={item.address}
                star={item.star}
                aminities={item.aminities}
                rating={item.rating}
                review={item.review}
                countReview={item.countReview}
                price={item.price}
                handleClick={(id?: number) => {
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
