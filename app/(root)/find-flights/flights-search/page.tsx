"use client";

import "@/app/globals.css";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import FlightsInput from "@/components/shared/navbar/input-searchtab/FlightsInput";
import NoResult from "@/components/shared/NoResult";
import CheckComponent from "@/components/shared/searchFlight/filters/CheckComponent";
import DepartureTimeComponent from "@/components/shared/searchFlight/filters/DepartureTimeComponent";
import PriceComponent from "@/components/shared/searchFlight/filters/PriceComponent";
import RatingComponent from "@/components/shared/searchFlight/filters/RatingComponent";
import FlightsComp from "@/components/shared/searchFlight/flightComponent/FlightsContent";
import { searchFlights } from "@/lib/actions/Search/SearchFlightActions";
import Flight from "@/types/Flight";
import { convertDataReceive } from "@/utils/util";
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

  const paramsData = convertDataReceive(searchParams);
  const params = {
    roundTrip: paramsData.roundTrip,
    departure_location_id: paramsData.departure_location_id,
    arrival_location_id: paramsData.arrival_location_id,
    departure_time_from: paramsData.departure_time_from,
    departure_time_to: paramsData.departure_time_from,
    return_time_from: paramsData.return_time_from,
    return_time_to: paramsData.return_time_to,
    seat_classes: paramsData.seat_classes,
    passenger_count: paramsData.passenger_count,
  };

  useEffect(() => {
    setIsLoading(true);
    searchFlights(params)
      .then((data: any) => {
        console.log("data", data);
        setFlights(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <div className="py-16 text-center text-red-500">{error}</div>;
  }

  return (
    <main className="w-full">
      <div>
        <FlightsInput
          isSearchFlight
          otherClass="bg-white mt-8 px-4 py-6 rounded-lg shadow-full shadow-primary-400"
          departure_location={paramsData.departure_location}
          arrival_location={paramsData.arrival_location}
          tripTypeParams={paramsData.roundTrip}
          classTypeParams={paramsData.seat_classes}
          passegersParams={paramsData.passenger_count}
          selectedDateDepartParams={paramsData.departure_time_from}
          selectedDateReturnParams={paramsData.return_time_from}
        />

        {isLoading ? (
          <BigLoadingSpinner />
        ) : !flights || flights.length === 0 ? (
          <NoResult
            title="No Flights Found!"
            description="🔍 Sorry, we couldn't find any flights matching your search. Please try adjusting your filters or search criteria."
          />
        ) : (
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
                  <FlightsComp
                    item={flight}
                    departure_time_from={params["departure_time_from"] ?? ""}
                    departure_time_to={params["departure_time_to"] ?? ""}
                    passenger_count={params["passenger_count"] ?? ""}
                  />
                ))}
              </div>

              <div className="flex justify-center items-center h-[48px] bg-[#112211] mt-8 rounded-md cursor-pointer">
                <p className="paragraph-semibold text-white">
                  Show more result
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
