import "@/app/globals.css"

import React from "react";
import {mock} from "node:test";
import Ratings from "@/components/shared/details/Ratings";

interface PaymentDetailsProps {
  flightId: number;
  stayId: number;
}

const PriceDetails: React.FC<PaymentDetailsProps> = (props) => {

  const mockData = {
    name: "Emirates A390 Airbus",
    tier: "Economy",
    averageRating: 4.5,
    rating: "Very Good",
    totalRatings: 100,
  };

  return (
    <div className="flex flex-col gap-4 p-6 rounded-lg shadow-xl">
      <div className="flex flex-col md:flex-row gap-6">
        <img className="rounded size-[120px]" src="/assets/images/flight-mock-image00001.jpg" alt="Stay"/>
        <div className="flex flex-grow flex-col gap-1">
          <span>{mockData.tier}</span>
          <span className="text-xl font-semibold">{mockData.name}</span>
          <Ratings rating={4.2} numberOfReviews={54}/>
        </div>
      </div>
      <div className="border-y-2 py-4">
        Your booking is protected by <strong>golobe</strong>
      </div>
      <div className="font-semibold">
        Price Details
      </div>
      <div className="flex flex-row justify-between">
        <span>Base Price</span>
        <span className="font-semibold">$100</span>
      </div>

      <div className="flex flex-row justify-between">
        <span>Discount</span>
        <span className="font-semibold">$100</span>
      </div>

      <div className="flex flex-row justify-between">
        <span>Taxes</span>
        <span className="font-semibold">$100</span>
      </div>

      <div className="flex flex-row justify-between">
        <span>Service Fee</span>
        <span className="font-semibold">$100</span>
      </div>

      <div className="flex flex-row justify-between border-t-2 pt-4">
        <span>Total</span>
        <span className="font-semibold">$100</span>
      </div>

    </div>
  );
}

export default PriceDetails;
