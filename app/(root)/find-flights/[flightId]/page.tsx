"use client";
import "@/app/globals.css";
import FlightInformation from "@/components/shared/details/flights/FlightInformation";
import LocationComponent from "@/components/shared/details/LocationComponent";
import RatingSummaryComponent from "@/components/shared/details/RatingSummaryComponent";
import type FlightDetails from "@/types/FlightDetails";
import React, { useEffect, useState } from "react";
import { fetchFlightDetails } from "@/lib/actions/FlightActions";
import type Seat from "@/types/Seat";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";

interface FlightDetailProps {
  params: {
    flightId: string;
  };
}

const FlightDetail: React.FC<FlightDetailProps> = ({ params }) => {
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Changed to array

  useEffect(() => {
    fetchFlightDetails(params.flightId)
      .then((data) => {
        setFlightDetails(data);
        setMainImage(data.featured_images[0]?.url || "");
        setLowestPrice(
          Math.min(...data.seats.map((seat) => seat.base_fare))
        );
      })
      .catch((error) => {
        console.error("Error fetching flight details:", error);
      });
  }, [params.flightId]);

  const handleClassSelection = (seatClass: string) => {
    setSelectedClass(seatClass === selectedClass ? null : seatClass);
    setSelectedSeats([]); // Reset seat selection when class changes
  };

  const handleSeatSelection = (seatId: string) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatId)
        ? prevSeats.filter((id) => id !== seatId) // Deselect seat
        : [...prevSeats, seatId] // Select seat
    );
  };

  if (!flightDetails) {
    return <BigLoadingSpinner/>
  }

  const filteredSeats = selectedClass
    ? flightDetails.seats.filter((seat) => seat.seat_class === selectedClass)
    : flightDetails.seats;

  return (
    <main className="flex w-full flex-col gap-4 py-4">
      <div className="flex flex-row justify-between">
        <span className="h2-bold">{flightDetails.name}</span>
        <span className="h2-bold text-accent-orange">From ${lowestPrice}</span>
      </div>
      <LocationComponent location={flightDetails.departure_airport.name} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <RatingSummaryComponent
          rating={flightDetails.airline.rating}
          numberOfReviews={flightDetails.airline.review_count}
        />
        <div className="flex flex-row gap-4">
          <button>
            <img
              className="rounded-md p-4 border-primary-100 border-[1px]"
              src="/assets/icons/favorite-outlined.svg"
              alt="Favorite"
            />
          </button>
          <button>
            <img
              className="rounded-md p-4 border-primary-100 border-[1px]"
              src="/assets/icons/share.svg"
              alt="Share"
            />
          </button>
          <a
            href={
              selectedSeats.length > 0
                ? `/find-flights/flight-booking/${flightDetails.id}?seat_ids=${selectedSeats.join(
                  ","
                )}`
                : "#"
            }
            className={`rounded-md px-9 py-4 bg-primary-100 ${
              selectedSeats.length === 0 && "cursor-not-allowed opacity-50"
            }`}
          >
            Book Now
          </a>
        </div>
      </div>
      <img
        src={mainImage ?? ""}
        className="w-full h-[650px] object-cover"
        alt="Flight"
      />
      <div className="flex flex-row justify-between">
        <span className="h2-bold">Seat Class</span>
      </div>
      <div className="flex flex-row gap-4">
        {Array.from(new Set(flightDetails.seats.map((seat: Seat) => seat.seat_class))).map(
          (seatClass) => (
            <button
              key={seatClass}
              className={`p-2 rounded-md ${
                selectedClass === seatClass
                  ? "bg-accent-blue text-white"
                  : "bg-primary-100"
              }`}
              onClick={() => handleClassSelection(seatClass)}
            >
              {seatClass}
            </button>
          )
        )}
      </div>
      <div className="flex flex-row justify-between">
        <span className="h2-bold">Seat Selection</span>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {filteredSeats.map((seat) => (
          <button
            key={seat.id}
            className={`p-4 rounded-md text-center ${
              seat.available
                ? selectedSeats.includes(seat.id)
                  ? "bg-accent-blue text-white"
                  : "bg-primary-100"
                : "bg-gray-300 text-gray-500"
            }`}
            onClick={() => seat.available && handleSeatSelection(seat.id)}
            disabled={!seat.available}
          >
            <div>{seat.number}</div>
            <div className="text-sm">
              {seat.seat_class} - ${seat.base_fare + seat.service_fee}
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-row gap-4 overflow-x-auto">
        {flightDetails.featured_images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt="Flight"
            className="size-24 rounded cursor-pointer"
            onClick={() => setMainImage(image.url)}
          />
        ))}
      </div>
      <div className="flex flex-col rounded p-4 bg-primary-100">
        <span className="h2-bold">{flightDetails.airline.name} Policies</span>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          {flightDetails.airline.policies.map((policy) => (
            <div key={policy.id} className="flex flex-row items-center gap-4">
              <img src="/assets/icons/attention.svg" alt="Attention" />
              <span className="font-light">{policy.content}</span>
            </div>
          ))}
        </div>
      </div>
      <FlightInformation flightDetails={flightDetails} className="my-4" />
    </main>
  );
};

export default FlightDetail;
