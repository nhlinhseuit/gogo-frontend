"use client";
import "@/app/globals.css";
import Checkbox from "@/components/shared/Checkbox";
import FlightInformation from "@/components/shared/details/flights/FlightInformation";
import LocationComponent from "@/components/shared/details/LocationComponent";
import RatingSummaryComponent from "@/components/shared/details/RatingSummaryComponent";
import type FlightDetails from "@/types/FlightDetails";
import React, { useEffect, useState } from "react";
import { fetchFlightDetails } from "@/lib/actions/FlightActions";
// import ReviewsSection from "@/components/shared/details/ReviewsSection";

interface FlightDetailProps {
  params: {
    flightId: string;
  };
}

export default function FlightDetail({ params }: FlightDetailProps) {
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  useEffect(() => {
    fetchFlightDetails(params.flightId)
      .then((data) => {
        setFlightDetails(data);
        setMainImage(data.featured_images[0].url);
      })
      .catch((error) => {
        console.error("Error fetching flight details:", error);
      });
  }, []);

  useEffect(() => {
    if (!flightDetails) {
      return;
    }
    flightDetails.seats.forEach((seat) => {
      if (lowestPrice === null || seat.base_fare < lowestPrice) {
        setLowestPrice(seat.base_fare);
      }
    });
  }, [flightDetails]);

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
              alt="Favorite"
            />
          </button>
          <button className="rounded-md px-9 py-4 bg-primary-100">
            Book Now
          </button>
        </div>
      </div>
      <img
        src={mainImage ?? ""}
        className="w-full h-[650px] object-cover"
        alt="Flight"
      />
      <div className="flex flex-row justify-between">
        <span className="h2-bold">Basic Economy Features</span>
        <div className="flex gap-4">
          <Checkbox
            label={"Economy"}
            checked={selectedClass === "Economy"}
            onChange={() =>
              setSelectedClass(selectedClass === "Economy" ? null : "Economy")
            }
          />
          <Checkbox
            label={"First Class"}
            checked={selectedClass === "First Class"}
            onChange={() =>
              setSelectedClass(
                selectedClass === "First Class" ? null : "First Class"
              )
            }
          />
          <Checkbox
            label={"Business Class"}
            checked={selectedClass === "Business Class"}
            onChange={() =>
              setSelectedClass(
                selectedClass === "Business Class" ? null : "Business Class"
              )
            }
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 overflow-x-auto">
        {flightDetails.featured_images.map((image) => {
          return (
            <img
              key={image.id}
              src={image.url}
              alt="Flight"
              className="size-24 rounded"
              onClick={() => setMainImage(image.url)}
            />
          );
        })}
      </div>
      <div className="flex flex-col rounded p-4 bg-primary-100">
        <span className="h2-bold">{flightDetails.airline.name} Policies</span>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          {flightDetails.airline.policies.map((policy) => {
            return (
              <div key={policy.id} className="flex flex-row items-center gap-4">
                <img src="/assets/icons/attention.svg" alt="Checkmark" />
                <span className="font-light">{policy.content}</span>
              </div>
            );
          })}
        </div>
      </div>
      <FlightInformation flightDetails={flightDetails} className="my-4" />
    </main>
  );
}
