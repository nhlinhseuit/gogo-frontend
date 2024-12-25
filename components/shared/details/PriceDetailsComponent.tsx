import "@/app/globals.css"
import type Seat from "@/types/Seat";
import type Room from "@/types/Room";

import React, {useEffect} from "react";
import Ratings from "@/components/shared/details/Ratings";
import {fetchSeat} from "@/lib/actions/SeatActions";
import {fetchRoom} from "@/lib/actions/RoomActions";

interface PriceDetailsProps {
  type: string;
  id: string;
  parentId: string
}

const PriceDetailsComponent: React.FC<PriceDetailsProps> = (props) => {
  const [paymentDetails, setPaymentDetails] = React.useState<any>(null);
  const [parent, setParent] = React.useState<any>(null);
  useEffect(() => {
    if (props.type === 'seat') {
      fetchSeat(props.id).then((data) => {
        setPaymentDetails(data);
      }).catch((error) => {
        console.error('Error fetching seat:', error);
      });
      fetchFlight
    } else if (props.type === 'room') {
      fetchRoom(props.id).then((data) => {
        setPaymentDetails(data);
      }).catch((error) => {
        console.error('Error fetching room:', error);
      });
    }
  }, []);

  if (!paymentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg p-6 shadow-xl">
      <div className="flex flex-col gap-6 md:flex-row">
        <img className="rounded size-[120px]" src="/assets/images/flight-mock-image00001.jpg" alt="Stay"/>
        <div className="flex flex-grow flex-col gap-1">
          <span
            className="w-full overflow-ellipsis">{props.type === "seat" ? paymentDetails.seatClass : paymentDetails.name}</span>
          <span
            className="overflow-ellipsis text-xl font-semibold">{props.type === "seat" ? mockData.name : mockStayData.roomType}</span>
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

export default PriceDetailsComponent;
