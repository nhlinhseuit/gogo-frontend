import "@/app/globals.css"
import Room from "@/types/Room";
import type Seat from "@/types/Seat";

import React from "react";
import RatingSummaryComponent from "@/components/shared/details/RatingSummaryComponent";
import Stay from "@/types/Stay";
import Flight from "@/types/Flight";
import Price from "@/types/Price";
import FlightDetails from "@/types/FlightDetails";

interface PriceDetailsProps {
  room: Room | null;
  seat: Seat | null;
  stay: Stay | null
  flight: FlightDetails | null;
  price: Price
}

const PriceDetailsComponent: React.FC<PriceDetailsProps> = (props) => {
  if (!props.room && !props.seat) {
    return <div>Loading...</div>
  }

  if (!props.stay && !props.flight) {
    return <div>Loading...</div>
  }

  const price = props.room ? {
    base_fare: props.room.base_fare,
    discount: props.room.discount,
    tax: props.room.tax,
    service_fee: props.room.service_fee,
    total: props.room.base_fare - props.room.discount + props.room.tax + props.room.service_fee
  } : {
    base_fare: props.seat?.base_fare,
    service_fee: props.seat?.service_fee,
    tax: 0,
    discount: 0,
    total: (props.seat?.service_fee ?? 0) + (props.seat?.base_fare ?? 0)
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg p-6 shadow-xl">
      <div className="flex flex-col gap-6 md:flex-row">
        <img className="rounded size-[120px]" src={props.room ? props.room.image_url : props.flight?.airline.image}
             alt="Stay"/>
        <div className="flex flex-grow flex-col gap-1">
          <span
            className="w-full overflow-ellipsis">{props.room ? props.room.name : props.seat?.seat_class}</span>
          <span
            className="overflow-ellipsis text-xl font-semibold">{props.room ? props.room.type : props.flight?.airline.name}</span>
          <RatingSummaryComponent rating={props.room ? props.stay?.rating ?? 0 : props.flight?.airline.rating ?? 0} numberOfReviews={54}/>
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
        <span className="font-semibold">${price.base_fare}</span>
      </div>

      <div className="flex flex-row justify-between">
        <span>Discount</span>
        <span className="font-semibold">${price.discount}</span>
      </div>

      <div className="flex flex-row justify-between">
        <span>Taxes</span>
        <span className="font-semibold">${price.tax}</span>
      </div>

      <div className="flex flex-row justify-between">
        <span>Service Fee</span>
        <span className="font-semibold">${price.service_fee}</span>
      </div>

      <div className="flex flex-row justify-between border-t-2 pt-4">
        <span>Total</span>
        <span className="font-semibold">${price.total}</span>
      </div>

    </div>
  );
}

export default PriceDetailsComponent;
