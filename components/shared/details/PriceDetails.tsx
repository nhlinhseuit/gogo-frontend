import "@/app/globals.css"

import React from "react";
import {mock} from "node:test";
import Ratings from "@/components/shared/details/Ratings";

interface PaymentDetailsProps {
  type: string;
  id: number;
}

const PriceDetails: React.FC<PaymentDetailsProps> = (props) => {

  const mockData = {
    name: "Emirates A390 Airbus",
    tier: "Economy",
    averageRating: 4.5,
    rating: "Very Good",
    totalRatings: 100,
  };

  const mockStayData = {
    name: "Hotel California",
    location: "Los Angeles, California",
    roomType: "Deluxe Room - 1 King Bed",
    averageRating: 4.5,
    rating: "Very Good",
    totalRatings: 100,
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg p-6 shadow-xl">
      <div className="flex flex-col gap-6 md:flex-row">
        <img className="rounded size-[120px]" src="/assets/images/flight-mock-image00001.jpg" alt="Stay"/>
        <div className="flex flex-grow flex-col gap-1">
          <span className="w-full overflow-ellipsis">{props.type === "flight" ? mockData.tier : mockStayData.name}</span>
          <span className="overflow-ellipsis text-xl font-semibold">{ props.type === "flight" ? mockData.name : mockStayData.roomType}</span>
          <Ratings rating={4.2} numberOfReviews={54}/>
        </div>
      </div>
      <div className="border-y-2 py-4">
        Your booking is protected by <strong>gogo</strong>
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
