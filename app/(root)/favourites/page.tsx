"use client";

import FavouriteFlightComp from "@/components/shared/details/favourite/FavouriteFlightComp";
import FavouriteStayComp from "@/components/shared/details/favourite/FavouriteStayComp";
import Tab from "@/components/shared/details/favourite/Tab";
import NoResult from "@/components/shared/NoResult";
import { fetchFavouriteFlights } from "@/lib/actions/FavouriteFlightsActions";
import { fetchFavouriteStays } from "@/lib/actions/FavouriteStaysActions";
import FavouriteFlights from "@/types/FavouriteFlights";
import FavouriteStay from "@/types/FavouriteStay";
import {
  formatDayFromInputToNormalDateApi,
  getCurrentUser,
} from "@/utils/util";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../globals.css";

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

export default function Favourites() {
  const [isSelected, setIsSelected] = useState("Flights");
  const [error, setError] = useState<string | null>(null);
  const [favStays, setFavStays] = useState<FavouriteStay[]>();
  const [favFlights, setFavFlights] = useState<FavouriteFlights>();

  const currentUser = getCurrentUser();

  //? Middleware
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      setIsAuthenticated(false);

      setTimeout(() => {
        router.push(`/login?ref=favourites`);
      }, 2300);
    } else {
      setIsAuthenticated(true);

      fetchFavouriteFlights()
        .then((data: any) => {
          setFavFlights(data.data);
        })
        .catch((error) => {
          setError(error.message);
        });

      fetchFavouriteStays({
        user_id: currentUser.id ?? "",
        page: 0,
        size: 10,
      })
        .then((data: any) => {
          setFavStays(data.data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, []);

  if (isAuthenticated === null) {
    return (
      <NoResult
        title="Checking..."
        description="We are checking your informations..."
      />
    );
  }

  if (isAuthenticated === false) {
    return (
      <NoResult
        title="Wait a sec..."
        description="You will be redirected to login page in just a few seconds..."
      />
    );
  }

  return (
    <main>
      <h1 className="h1-bold mt-8">Favourites</h1>
      <div className="flex relative h-20 mt-4 bg-white rounded-lg shadow-full shadow-primary-400 justify-start ">
        {tabs.map((item, index) => (
          <Tab
            key={index}
            type={item.type}
            title={item.title}
            countFlights={favFlights?.flight_favorites.length ?? 0}
            countPlaces={favStays?.length ?? 0}
            isSelected={isSelected}
            onClick={() => {
              setIsSelected(item.type);
            }}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-8">
        {isSelected === "Flights" ? (
          !favFlights || favFlights?.flight_favorites.length === 0 ? (
            <NoResult title="No Favorites Flights Found!" description=" " />
          ) : (
            favFlights?.flight_favorites.map((item, index) => (
              <FavouriteFlightComp key={index} item={item} />
            ))
          )
        ) : !favStays || favStays.length === 0 ? (
          <NoResult title="No Favorites Places Found!" description=" " />
        ) : (
          favStays?.map((item) => (
            <FavouriteStayComp
              item={item.stay}
              checkin={formatDayFromInputToNormalDateApi(new Date())}
              checkout={formatDayFromInputToNormalDateApi(new Date())}
            />
          ))
        )}
      </div>
    </main>
  );
}
