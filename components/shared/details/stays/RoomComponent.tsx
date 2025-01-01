import "@/app/globals.css"
import type Room from "@/types/Room";
import {router} from "next/client";
import Link from "next/link";

interface RoomProps {
  stayId: string;
  room: Room;
  checkin: string;
  checkout: string;
}

const RoomComponent: React.FC<RoomProps> = (props) => {

  const handleBookNow = () => {
    router.push("/find-stays/stay-booking/1");
    console.log("Book Now");
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
        <Link href={`/find-stays/stay-booking/${props.stayId}?room_id=${props.room.id}&checkin=${props.checkin}&checkout=${props.checkout}`} className="rounded-md px-9 py-4 bg-primary-100">Book Now</Link>
      </div>

    </div>
  );
}

export default RoomComponent;
