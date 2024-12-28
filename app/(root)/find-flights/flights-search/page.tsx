"use client";

import "@/app/globals.css";
import CheckComponent from "@/components/shared/searchFlight/filters/CheckComponent";
import DepartureTimeComponent from "@/components/shared/searchFlight/filters/DepartureTimeComponent";
import PriceComponent from "@/components/shared/searchFlight/filters/PriceComponent";
import RatingComponent from "@/components/shared/searchFlight/filters/RatingComponent";
import FlightsComp from "@/components/shared/searchFlight/flightComponent/FlightsContent";
import { searchFlights } from "@/lib/actions/Search/SearchFlightActions";
import Flight from "@/types/Flight";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MockAirlines = {
  type: "Airlines",
  data: ["Emirated", "Fly Dubai", "Qatar", "Etihad"],
};
const MockTrips = {
  type: "Trips",
  data: ["Round trip", "On Way", "Multi-City"],
};

export default function FlightsSearch() {
  const [isSelected, setIsSelected] = useState("Best");
  const [flights, setFlights] = useState<Flight[]>();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  // const params = convertDataReceive(searchParams);
  const params = {
    roundTrip: false,
    departure_location_id: "1",
    arrival_location_id: "2",
    departure_time_from: "2024-12-25T06:00:00Z",
    departure_time_to: "2024-12-25T10:00:00Z",
    return_time_from: "",
    return_time_to: "",
    seat_classes: ["ECONOMY"],
    passenger_count: 1,
  };
  useEffect(() => {
    searchFlights(params)
      .then((data: any) => {
        console.log("data", data);
        setFlights(data.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div className="py-16 text-center text-red-500">{error}</div>;
  }

  console.log("Flight", flights);

  return (
    <main className="w-full">
      <div>
        {/* <FlightsInput
          isSearchFlight
          otherClass="bg-white mt-8 px-4 py-6 rounded-lg shadow-full shadow-primary-400"
          departure_location={params.departure_location}
          arrival_location={params.arrival_location}
          tripTypeParams={params.roundTrip}
          classTypeParams={params.seat_classes}
          passegersParams={params.passenger_count}
          selectedDateDepartParams={params.departure_time_from}
          selectedDateReturnParams={params.return_time_from}
        /> */}

        <div className="flex w-full mt-8">
          <div className="w-[30%] px-4 border-r-[1px]">
            <div className="mx-2">
              <h3 className="h3-semibold">Filters</h3>
              <PriceComponent />
              <DepartureTimeComponent />
              <RatingComponent />
              <CheckComponent
                type={MockAirlines.type}
                data={MockAirlines.data}
              />
              <CheckComponent type={MockTrips.type} data={MockTrips.data} />
            </div>
          </div>

          <div className="w-[70%] ml-4">
            <div>
              {flights?.map((flight) => (
                <FlightsComp item={flight} />
              ))}
            </div>

            <div className="flex justify-center items-center h-[48px] bg-[#112211] mt-8 rounded-md cursor-pointer">
              <p className="paragraph-semibold text-white">Show more result</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
