import "@/app/globals.css"
import type Room from "@/types/Room";
import {requestStayBooking} from "@/lib/actions/BookingActions";
import {toast} from "@/hooks/use-toast";
import React from "react";
import {useRouter} from "next/navigation";

interface RoomProps {
  stayId: string;
  room: Room;
  checkin: string;
  checkout: string;
}

const RoomComponent: React.FC<RoomProps> = (props) => {
  const router = useRouter();
  const handleBookNow = (event: any) => {
    event.preventDefault();
    requestStayBooking(props.room.id, props.checkin, props.checkout).then((data) => {
      if (data.booking_id) {
        router.push(`/find-stays/stay-booking/${props.stayId}?booking_id=${data.booking_id}&checkin=${props.checkin}&checkout=${props.checkout}&expiration=${data.lock_expiration}`);
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
          variant: "error",
          duration: 3000,
        });
      }
    }).catch((error) => {
      console.error('Error requesting stay booking:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "error",
        duration: 3000,
      });
    });
  }
  return (
    <div className="flex flex-col items-start gap-4 border-b-2 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-row items-center gap-4">
        <img src={props.room.image_url}
             alt="Room"
             className="rounded-md size-12"/>
        <span className="text-xl font-semibold">{props.room.name}</span>
        <span className="ml-auto">{props.room.type}</span>
      </div>

      <div className="flex flex-row items-center gap-16">
        <span className="h2-bold">
          ${props.room.base_fare}<span className="text-sm">/night</span>
        </span>
        <button onClick={
          handleBookNow
        } className="rounded-md px-9 py-4 bg-primary-100">Book Now
        </button>
      </div>

    </div>
  );
}

export default RoomComponent;
