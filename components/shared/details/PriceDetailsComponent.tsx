import "@/app/globals.css"
import Room from "@/types/Room";
import type Seat from "@/types/Seat";

import React from "react";
import RatingSummaryComponent from "@/components/shared/details/RatingSummaryComponent";
import Stay from "@/types/Stay";
import Flight from "@/types/Flight";
import Price from "@/types/Price";
import FlightDetails from "@/types/FlightDetails";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";

interface PriceDetailsProps {
  room: Room | null;
  seats: Seat[];
  stay: Stay | null;
  flight: FlightDetails | null;
  price: Price;
}

const PriceDetailsComponent: React.FC<PriceDetailsProps> = (props) => {
  if (!props.room && props.seats.length === 0) {
    return <BigLoadingSpinner/>
  }

  if (!props.stay && !props.flight) {
    return <BigLoadingSpinner/>
  }

  const price = props.room ? {
    base_fare: props.room.base_fare ?? 0,
    discount: props.room.discount ?? 0,
    tax: props.room.tax ?? 0,
    service_fee: props.room.service_fee ?? 0,
    total: props.room.base_fare - props.room.discount + props.room.tax + props.room.service_fee
  } : props.price;

  // Get the seat class - if multiple seats, show first one with "(+X more)" if there are others
  const seatDisplay = props.seats.length > 0
    ? `${props.seats[0].seat_class}${props.seats.length > 1 ? ` (+${props.seats.length - 1} more)` : ''}`
    : '';

  return (
    <div className="flex flex-col gap-4 rounded-lg p-6 shadow-xl">
      <div className="flex flex-col gap-6 md:flex-row">
        <img className="rounded size-[120px] object-contain"
             src={props.room?.image_url ?? props.flight?.airline.image ?? ''}
             alt="Stay"/>
        <div className="flex flex-grow flex-col gap-1">
          <span className="w-full overflow-ellipsis">
            {props.room?.name ?? seatDisplay}
          </span>
          <span className="overflow-ellipsis text-xl font-semibold">
            {props.room?.type ?? props.flight?.airline.name ?? ''}
          </span>
          <RatingSummaryComponent
            rating={props.stay?.rating ?? props.flight?.airline.rating ?? 0}
            numberOfReviews={props.stay?.review_count ?? props.flight?.airline.review_count ?? 0}
          />
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
        <span className="font-semibold">${(price.base_fare ?? 0).toFixed(2)}</span>
      </div>

      <div className="flex flex-row justify-between">
        <span>Discount</span>
        <span className="font-semibold">${(price.discount ?? 0).toFixed(2)}</span>
      </div>

      <div className="flex flex-row justify-between">
        <span>Taxes</span>
        <span className="font-semibold">${(price.tax ?? 0).toFixed(2)}</span>
      </div>

      <div className="flex flex-row justify-between">
        <span>Service Fee</span>
        <span className="font-semibold">${(price.service_fee ?? 0).toFixed(2)}</span>
      </div>

      <div className="flex flex-row justify-between border-t-2 pt-4">
        <span>Total</span>
        <span className="font-semibold">${(price.total ?? 0).toFixed(2)}</span>
      </div>
    </div>
  );
};


export default PriceDetailsComponent;
