"use client";

import { useState } from "react";
import "../../globals.css";
import FavouriteComp from "@/components/shared/details/favourite/FavouriteComp";
import Tab from "@/components/shared/details/favourite/Tab";
const tabs = [
  {
    type: "Flights",
    title: "Flights",
    count: 2,
  },
  {
    type: "Places",
    title: "Places",
    count: 3,
  },
];

const MockFlightData = [
  {
    id: 1,
    isFavourite: true,
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
    isFavourite: true,
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
    isFavourite: true,
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

const MockPlaceData = [
  {
    id: 1,
    isFavourite: true,
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
    isFavourite: true,
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

export default function Favourites() {
  const [isSelected, setIsSelected] = useState("Flights");
  const [flightData, setFlightData] = useState(MockFlightData);
  const [placeData, setPlaceData] = useState(MockPlaceData);

  return (
    <main>
      <h1 className="h1-bold mt-8">Favourites</h1>
      <div className="flex relative h-20 mt-4 bg-white rounded-lg shadow-full shadow-primary-400 justify-start ">
        {tabs.map((item, index) => (
          <Tab
            key={index}
            type={item.type}
            title={item.title}
            count={item.count}
            isSelected={isSelected}
            onClick={() => {
              setIsSelected(item.type);
            }}
          />
        ))}
      </div>

      <div className="mt-10">
        {isSelected === "Flights"
          ? flightData.map((item) => (
              <FavouriteComp
                id={item.id}
                isFavourite={item.isFavourite}
                img={item.img}
                title={item.title}
                address={item.address}
                star={item.star}
                aminities={item.aminities}
                rating={item.rating}
                review={item.review}
                countReview={item.countReview}
                price={item.price}
                handleClick={() => {
                  //delete o API

                  const updatedFlightData = MockFlightData.map((data) => {
                    if (data.id === item.id) {
                      return {
                        ...data,
                        isFavourite: false,
                      };
                    } else {
                      return data;
                    }
                  });
                  setFlightData(updatedFlightData);
                }}
              />
            ))
          : placeData.map((item) => (
              <FavouriteComp
                id={item.id}
                isFavourite={item.isFavourite}
                img={item.img}
                title={item.title}
                address={item.address}
                star={item.star}
                aminities={item.aminities}
                rating={item.rating}
                review={item.review}
                countReview={item.countReview}
                price={item.price}
                handleClick={() => {
                  //delete o API

                  const updatedPlaceData = MockPlaceData.map((data) => {
                    if (data.id === item.id) {
                      return {
                        ...data,
                        isFavourite: false,
                      };
                    } else {
                      return {
                        ...data,
                      };
                    }
                  });
                  setPlaceData(updatedPlaceData);
                }}
              />
            ))}
      </div>
    </main>
  );
}
