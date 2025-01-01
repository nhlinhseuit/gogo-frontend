"use client";

import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import PlacesComponent from "@/components/shared/home/PlaceComponent";
import { fetchLocations } from "@/lib/actions/FetchLocationsActions";
import Location from "@/types/Location";
import {
  convertDataNavigate,
  formatDayFromInputToISODateApi,
} from "@/utils/util";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const MockPlacesData = [
    {
      id: 1,
      imgUrl: "/assets/images/Turkey.svg",
      placeTitle: "Istanbul, Turkey",
    },
    {
      id: 2,
      imgUrl: "/assets/images/Australia.svg",
      placeTitle: "Sydney, Australia",
    },
    {
      id: 3,
      imgUrl: "/assets/images/Azerbaijan.svg",
      placeTitle: "Baku, Azerbaijan",
    },
    {
      id: 4,
      imgUrl: "/assets/images/Maldives.svg",
      placeTitle: "Malé, Maldives",
    },
    {
      id: 5,
      imgUrl: "/assets/images/France.svg",
      placeTitle: "Paris, France",
    },
    {
      id: 6,
      imgUrl: "/assets/images/US.svg",
      placeTitle: "New York, US",
    },
    {
      id: 7,
      imgUrl: "/assets/images/UK.svg",
      placeTitle: "London, UK",
    },
    {
      id: 8,
      imgUrl: "/assets/images/Japan.svg",
      placeTitle: "Tokyo, Japan",
    },
    {
      id: 9,
      imgUrl: "/assets/images/UAE.svg",
      placeTitle: "Dubai, UAE",
    },
  ];

  function getRandomImgUrl() {
    if (!MockPlacesData || MockPlacesData.length === 0) {
      throw new Error("The data array is empty or undefined.");
    }
    const randomIndex = Math.floor(Math.random() * MockPlacesData.length);
    return MockPlacesData[randomIndex].imgUrl;
  }

  const [locations, setLocations] = useState<{ data: Location[] }>({
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchLocations()
      .then((data: any) => {
        setLocations(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const router = useRouter();

  const handleNavigateFlight = () => {
    // const params = {
    //   roundTrip: paramsData.roundTrip,
    //   departure_location_id: paramsData.departure_location_id,
    //   arrival_location_id: paramsData.arrival_location_id,
    //   departure_time_from: formatDayFromInputToISODateApi(Date.now()),
    //   departure_time_to: paramsData.departure_time_from,
    //   return_time_from: paramsData.return_time_from,
    //   return_time_to: paramsData.return_time_to,
    //   seat_classes: paramsData.seat_classes,
    //   passenger_count: paramsData.passenger_count,
    // };

    router.push(`/find-flights/flights-search?${queryString}`);
  };

  return (
    <div>
      <div className="mt-16 flex justify-between items-center">
        <div>
          <h1 className="h1-bold tracking-normal">List of stay places</h1>
          <p className="mt-2 paragraph-medium text-gray-700 tracking-normal">
            Search Flights & Places Hire to our most popular destinations
          </p>
        </div>
      </div>

      {isLoading ? (
        <BigLoadingSpinner />
      ) : locations.data.length > 0 ? (
        <div className="flex flex-wrap justify-start gap-x-10 gap-y-6 mt-8">
          {locations.data.map((item) => (
            <PlacesComponent
              key={item.id}
              imgUrl={item.imageUrl ?? getRandomImgUrl()}
              placeTitle={`${item.city}, ${item.country}`}
              onClick={() => {
                handleNavigateFlight(item.id);
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default page;
