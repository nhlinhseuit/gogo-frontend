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

const MockFlightsData = [
  {
    id: 1,
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

const MockPlacesData = [
  {
    id: 1,
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
  return (
    <main>
      <h1 className="h1-bold mt-8">Favourites</h1>
      <div className="flex relative h-20 mt-4 bg-white rounded-lg shadow-md shadow-primary-400 justify-start ">
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

      <div className="h-400 mt-8">
        {isSelected === "Flights"
          ? MockFlightsData.map((item) => (
              <FavouriteComp
                id={item.id}
                img={item.img}
                title={item.title}
                address={item.address}
                star={item.star}
                aminities={item.aminities}
                rating={item.rating}
                review={item.review}
                countReview={item.countReview}
                price={item.price}
              />
            ))
          : MockPlacesData.map((item) => (
              <FavouriteComp
                id={item.id}
                img={item.img}
                title={item.title}
                address={item.address}
                star={item.star}
                aminities={item.aminities}
                rating={item.rating}
                review={item.review}
                countReview={item.countReview}
                price={item.price}
              />
            ))}
      </div>
    </main>
  );
}
