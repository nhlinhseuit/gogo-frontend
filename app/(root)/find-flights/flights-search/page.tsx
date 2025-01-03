"use client";

import "@/app/globals.css";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import FlightsInput from "@/components/shared/navbar/input-searchtab/FlightsInput";
import NoResult from "@/components/shared/NoResult";
import DepartureTimeComponent from "@/components/shared/searchFlight/filters/DepartureTimeComponent";
import FlightCheckComponent from "@/components/shared/searchFlight/filters/FlightCheckComponent";
import PriceComponent from "@/components/shared/searchFlight/filters/PriceComponent";
import RatingComponent from "@/components/shared/searchFlight/filters/RatingComponent";
import FlightsComponent from "@/components/shared/searchFlight/flightComponent/FlightsComponent";
import { fetchAirlines } from "@/lib/actions/Search/FetchAirlines";
import { searchFlights } from "@/lib/actions/Search/SearchFlightActions";
import Airline from "@/types/Airline";
import Flight from "@/types/Flight";
import { convertDataReceive } from "@/utils/util";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const trips = ["Round trip", "On Way", "Multi-City"];

function FlightsSearch() {
  //? Thay đổi để custom truyền chọn chuyến đi chuyến về cho roundtrip

  const [isFirstStep, setIsFirstStep] = useState(true);
  const [selectedOutboundFlightId, setSelectedOutboundFlightId] = useState("");

  const router = useRouter();

  const [flights, setFlights] = useState<Flight[]>();
  const [airlines, setAirlines] = useState<Airline[]>();

  const [isUsingFilter, setIsUsingFilter] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const paramsData = convertDataReceive(searchParams);

  //TODO: paramsData.roundTrip just for call api 1 or 2nd time
  let params = {
    roundTrip: false,
    departure_location_id: paramsData.departure_location_id,
    arrival_location_id: paramsData.arrival_location_id,
    departure_time_from: paramsData.departure_time_from,
    departure_time_to: paramsData.departure_time_from,
    // return_time_from: paramsData.return_time_from,
    // return_time_to: paramsData.return_time_to,
    seat_classes: paramsData.seat_classes,
    passenger_count: paramsData.passenger_count,
  };

  const searchFlightsFunc = (params: any, isFilter?: boolean) => {
    if (isFilter) setIsLoadingFilter(true);
    else setIsLoading(true);

    searchFlights(params)
      .then((data: any) => {
        setFlights(data.data);
        if (isFilter) setIsLoadingFilter(false);
        else setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        if (isFilter) setIsLoadingFilter(false);
        else setIsLoading(false);
      });
  };

  const searchAirlinesFunc = () => {
    setIsLoading(true);
    fetchAirlines()
      .then((data: any) => {
        setAirlines(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    searchFlightsFunc(params);

    if (!isFirstStep) {
      params = {
        roundTrip: paramsData.false,
        // * đổi thứ tự
        departure_location_id: paramsData.arrival_location_id,
        arrival_location_id: paramsData.departure_location_id,
        departure_time_from: paramsData.return_time_from,
        departure_time_to: paramsData.return_time_to,
        // return_time_from: paramsData.return_time_from,
        // return_time_to: paramsData.return_time_to,
        seat_classes: paramsData.seat_classes,
        passenger_count: paramsData.passenger_count,
      };

      searchFlightsFunc(params);
    }
  }, [searchParams, isFirstStep]);

  useEffect(() => {
    searchAirlinesFunc();
  }, []);

  if (error) {
    return <div className="py-16 text-center text-red-500">{error}</div>;
  }

  const getMinMaxFare = (): { minFare: number; maxFare: number } => {
    if (!flights) return { minFare: 0, maxFare: 0 };
    const fares = flights.map((flight) => {
      const outboundFare = flight.outbound_flight.min_base_fare;
      const returnFare = flight.round_trip
        ? flight.return_flight.min_base_fare
        : 0;
      return outboundFare + returnFare;
    });

    const minFare = Math.min(...fares);
    const maxFare = Math.max(...fares);

    // return { minFare, maxFare };
    return { minFare: 0, maxFare: 200 };
  };

  //! PRICE COMPONENT
  const selectedPriceRangeRef = useRef<[number, number]>([0, 100]);

  const handlePriceChange = (priceRange: [number, number]) => {
    selectedPriceRangeRef.current = priceRange;
  };

  //! TIME COMPONENT
  const timeRangeRef = useRef<[string, string]>(["00:00", "23:59"]);

  const handleTimeRangeChange = (timeRange: [string, string]) => {
    timeRangeRef.current = timeRange;
  };

  //! RATING COMPONENT
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleRatingChange = (ratingId: number) => {
    setSelectedRating(ratingId);
  };

  //! Airlines, trips COMPONENT
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedTrips, setSelectedTrips] = useState<string[]>([]);

  const handleAirlinesChange = (selected: string[]) => {
    setSelectedAirlines(selected);
  };

  const handleTripsChange = (selected: string[]) => {
    setSelectedTrips(selected);
  };

  //TODO: FILTER
  const handleFilter = () => {
    setIsUsingFilter(true);

    const paramsFilter = {
      // page: 0,

      roundTrip: paramsData.roundTrip,
      departure_location_id: paramsData.departure_location_id,
      arrival_location_id: paramsData.arrival_location_id,
      departure_time_from: paramsData.departure_time_from,
      departure_time_to: paramsData.departure_time_from,
      return_time_from: paramsData.return_time_from,
      return_time_to: paramsData.return_time_to,
      seat_classes: paramsData.seat_classes,
      passenger_count: paramsData.passenger_count,

      min_price: selectedPriceRangeRef.current[0],
      max_price: selectedPriceRangeRef.current[1],
      // order_by: "CHEAPEST",
      // page_size: 10,
    };

    handleFetchFilter(paramsFilter);
  };

  const handleFetchFilter = (paramsFilter: Record<string, any>) => {
    searchFlightsFunc(paramsFilter, true);
  };

  const handleCancelFilter = () => {
    setIsUsingFilter(false);
    searchFlightsFunc(params);
  };

  return (
    <main className="w-full">
      <div>
        <FlightsInput
          isSearchFlight
          otherClasses="bg-white mt-8 px-4 py-6 rounded-lg shadow-full shadow-primary-400"
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
        ) : !isUsingFilter && (!flights || flights.length === 0) ? (
          <NoResult
            title="No Flights Found!"
            description="🔍 Sorry, we couldn't find any flights matching your search. Please try adjusting your search criteria."
          />
        ) : (
          <div className="flex w-full mt-8">
            <div className="w-[30%] px-4 border-r-[1px]">
              <div className="mx-2">
                <h3 className="h3-semibold">Filters</h3>
                <PriceComponent
                  minBaseFare={getMinMaxFare().minFare}
                  maxBaseFare={getMinMaxFare().maxFare}
                  onPriceChange={handlePriceChange}
                />
                <DepartureTimeComponent
                  onTimeRangeChange={handleTimeRangeChange}
                />
                <RatingComponent onRatingChange={handleRatingChange} />
                <FlightCheckComponent
                  type="Airlines"
                  data={airlines}
                  onSelectionChange={handleAirlinesChange}
                />
                <FlightCheckComponent
                  type="Trips"
                  data={trips}
                  onSelectionChange={handleTripsChange}
                />
              </div>

              {isUsingFilter ? (
                <button
                  onClick={handleCancelFilter}
                  className="mt-8 w-full py-3 rounded-md bg-primary-100 font-semibold"
                >
                  Close Filter
                </button>
              ) : (
                <button
                  onClick={handleFilter}
                  className="mt-8 w-full py-3 rounded-md bg-primary-100 font-semibold"
                >
                  Submit
                </button>
              )}
            </div>

            {isLoadingFilter ? (
              <BigLoadingSpinner />
            ) : isUsingFilter && (!flights || flights.length === 0) ? (
              <NoResult
                title="No Flights Found!"
                description="🔍 Sorry, we couldn't find any flights matching your search. Please try adjusting your filters search criteria."
              />
            ) : (
              <div className="w-[70%] ml-4">
                {params.roundTrip === false ? (
                  <div>
                    {flights?.map((flight, index) => (
                      <FlightsComponent
                        type="oneway"
                        key={`${flight.outbound_flight.id}_${index}`}
                        isFavorite
                        item={flight}
                        flightId={flight.outbound_flight.id}
                        paramsRef={paramsData}
                        handleClickFlightItem={() => {
                          router.push(
                            `/find-flights/${flight.outbound_flight.id}`
                          );
                        }}
                      />
                    ))}
                  </div>
                ) : isFirstStep ? (
                  <>
                    <p className="my-2 paragraph-semibold">
                      {paramsData.departure_location} ➡{" "}
                      {paramsData.arrival_location}
                    </p>

                    <div>
                      {flights?.map((flight, index) => (
                        <FlightsComponent
                          type="outbound"
                          key={`${flight.outbound_flight.id}_${index}`}
                          isFavorite
                          item={flight}
                          flightId={flight.outbound_flight.id}
                          paramsRef={paramsData}
                          handleClickOutboundFlight={() => {
                            setIsFirstStep(false);
                            setSelectedOutboundFlightId(
                              flight.outbound_flight.id
                            );
                          }}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="my-2 paragraph-semibold">
                      {paramsData.arrival_location} ➡{" "}
                      {paramsData.departure_location}
                    </p>
                    <div>
                      {flights?.map((flight, index) => (
                        <FlightsComponent
                          type="return"
                          key={`${flight.outbound_flight.id}_${index}`}
                          isFavorite
                          item={flight}
                          flightId={flight.outbound_flight.id}
                          paramsRef={paramsData}
                          handleClickReturnFlight={() => {
                            router.push(
                              `/find-flights/${selectedOutboundFlightId}?return_flight=${flight.outbound_flight.id}`
                            );
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}

                <div className="flex justify-center items-center h-[48px] bg-[#112211] mt-8 rounded-md cursor-pointer">
                  <p className="paragraph-semibold text-white">
                    Show more result
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function WrappedFlightsSearch() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightsSearch />
    </Suspense>
  );
}
