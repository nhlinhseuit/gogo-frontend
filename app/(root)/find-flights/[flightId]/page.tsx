"use client";
import "@/app/globals.css";
import Checkbox from "@/components/shared/Checkbox";
import FlightInformation from "@/components/shared/details/flights/FlightInformation";
import LocationComponent from "@/components/shared/details/LocationComponent";
import RatingSummaryComponent from "@/components/shared/details/RatingSummaryComponent";
import type FlightDetails from "@/types/FlightDetails";
import {useEffect, useState} from "react";
import {fetchFlightDetails} from "@/lib/actions/FlightActions";

interface FlightDetailProps {
  params: {
    flightId: string;
  };
}

export default function FlightDetail({params}: FlightDetailProps) {
  const mockFlightData = {
    id: params.flightId,
    departure: "2022-01-01T00:00:00Z",
    arrival: "2022-01-01T01:00:00Z",
    departureAirportName: "John F. Kennedy International Airport",
    arrivalAirportName: "Los Angeles International Airport",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    planeModel: "Boeing 737",
    baseFare: 100,
    imageUrl: "/assets/images/flight.png",
  };

  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);

  useEffect(() => {
    fetchFlightDetails(params.flightId).then((data) => {
      setFlightDetails(data);

    }).catch((error) => {
      console.error("Error fetching flight details:", error);
    });
  }, [])

  useEffect(() => {
    if (!flightDetails) {
      return;
    }
    flightDetails.seats.forEach((seat) => {
      if (lowestPrice === null || seat.base_fare < lowestPrice) {
        console.log("Setting lowest price to", seat.base_fare);
        setLowestPrice(seat.base_fare);
      }
    }, [flightDetails]);
  })

  if (!flightDetails) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex w-full flex-col gap-4 py-4">
      <div className="flex flex-row justify-between">
        <span className="h2-bold">{flightDetails.name}</span>
        <span className="h2-bold text-accent-orange">
         From ${lowestPrice}
        </span>
      </div>
      <LocationComponent location={flightDetails.departure_airport.name}/>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <RatingSummaryComponent rating={flightDetails.airline.rating} numberOfReviews={flightDetails.airline.review_count}/>
        <div className="flex flex-row gap-4">
          <button><img className="rounded-md p-4 border-primary-100 border-[1px]"
                       src="/assets/icons/favorite-outlined.svg" alt="Favorite"/></button>
          <button><img className="rounded-md p-4 border-primary-100 border-[1px]" src="/assets/icons/share.svg"
                       alt="Favorite"/></button>
          <button className="rounded-md px-9 py-4 bg-primary-100">Book Now</button>
        </div>
      </div>
      <img src={mockFlightData.imageUrl} alt="Flight"/>
      <div className="flex flex-row justify-between">
        <span className="h2-bold">Basic Economy Features</span>
        <div className="flex gap-4">
          <Checkbox label={"Economy"}/>
          <Checkbox label={"First Class"}/>
          <Checkbox label={"Business Class"}/>
        </div>
      </div>
      {/*TODO: Replace with carousel*/}
      <div className="flex flex-row items-center justify-between gap-4 overflow-x-auto">
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
      </div>

      <div className="flex flex-col rounded p-4 bg-primary-100">
        <span className="h2-bold">{flightDetails.airline.name} Policies</span>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          {
            flightDetails.airline.policies.map((policy) => {
              return (
                <div key={policy.id} className="flex flex-row items-center gap-4">
                  <img src="/assets/icons/attention.svg" alt="Checkmark"/>
                  <span className="font-light">{policy.content}</span>
                </div>
              );
            })
          }
        </div>
      </div>

      <FlightInformation flightDetails={flightDetails}
                         className="my-4"/>

      <FlightInformation flightDetails={flightDetails}
                         className="my-4"/>

      {/*<ReviewsSection type={"flight"} id={1} />*/}
    </main>
  );
}
