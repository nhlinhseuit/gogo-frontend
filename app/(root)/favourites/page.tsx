"use client";

import Tab from "@/components/shared/details/favourite/Tab";
import { fetchFavouriteStays } from "@/lib/actions/FavouriteStaysActions";
import { useEffect, useState } from "react";
import "../../globals.css";
import FavouriteStay from "@/types/FavouriteStay";
import FavouriteFlights from "@/types/FavouriteFlights";
import { fetchFavouriteFlights } from "@/lib/actions/FavouriteFlightsActions";
import FavouriteStayComp from "@/components/shared/details/favourite/FavouriteStayComp";
import FavouriteFlightComp from "@/components/shared/details/favourite/FavouriteFlightComp";
import { getCurrentUser } from "@/utils/util";
import { useRouter } from "next/navigation";

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

// const MockFlightData = [
//   {
//     id: 1,
//     isFavourite: true,
//     img: "/assets/images/favourite.svg",
//     title: "Eresin Hotels - Boutique Class",
//     address: "Chiet Giang, Trung Quoc",
//     star: 5,
//     aminities: "20+",
//     rating: 4.2,
//     review: "Very Good",
//     countReview: 371,
//     price: 240,
//   },

//   {
//     id: 2,
//     isFavourite: true,
//     img: "/assets/images/favourite.svg",
//     title: "Eresin Hotels - Boutique Class",
//     address: "Chiet Giang, Trung Quoc",
//     star: 5,
//     aminities: "20+",
//     rating: 4.2,
//     review: "Very Good",
//     countReview: 371,
//     price: 240,
//   },
//   {
//     id: 3,
//     isFavourite: true,
//     img: "/assets/images/favourite.svg",
//     title: "Eresin Hotels - Boutique Class",
//     address: "Chiet Giang, Trung Quoc",
//     star: 5,
//     aminities: "20+",
//     rating: 4.2,
//     review: "Very Good",
//     countReview: 371,
//     price: 240,
//   },
// ];

// const MockPlaceData = [
//   {
//     id: 1,
//     isFavourite: true,
//     img: "/assets/images/favourite.svg",
//     title: "Eresin Hotels - Boutique Class",
//     address: "Chiet Giang, Trung Quoc",
//     star: 5,
//     aminities: "20+",
//     rating: 4.2,
//     review: "Very Good",
//     countReview: 371,
//     price: 2400,
//   },

//   {
//     id: 2,
//     isFavourite: true,
//     img: "/assets/images/favourite.svg",
//     title: "Eresin Hotels - Boutique Class",
//     address: "Chiet Giang, Trung Quoc",
//     star: 5,
//     aminities: "20+",
//     rating: 4.2,
//     review: "Very Good",
//     countReview: 371,
//     price: 240,
//   },
// ];

export default function Favourites() {
  //? Middleware
  const router = useRouter();
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push(`/login?ref=favourites`);
    }
  }, []);

  const [isSelected, setIsSelected] = useState("Flights");
  const [error, setError] = useState<string | null>(null);
  const [favStays, setFavStays] = useState<FavouriteStay[]>();
  const [favFlights, setFavFlights] = useState<FavouriteFlights>();

  const params = {
    user_id: "2",
    page: 0,
    size: 10,
  };

  const userId = "2";
  useEffect(() => {
    fetchFavouriteFlights(userId)
      .then((data: any) => {
        setFavFlights(data.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  console.log("favFlights", favFlights?.flight_favorites);

  useEffect(() => {
    fetchFavouriteStays(params)
      .then((data: any) => {
        setFavStays(data.data);
        console.log("favStays", favStays);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  console.log("favStays", favStays);

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

      <div className="mt-10 flex flex-col gap-8">
        {isSelected === "Flights"
          ? favFlights?.flight_favorites.map((item, index) => (
              <FavouriteFlightComp key={index} item={item} />
            ))
          : favStays?.map((item) => <FavouriteStayComp item={item.stay} />)}
      </div>
    </main>
  );
}
