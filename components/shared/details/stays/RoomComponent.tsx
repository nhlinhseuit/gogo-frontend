import "@/app/globals.css"
import {pop} from "@jridgewell/set-array";

interface RoomProps {
  imageUrl: string;
  roomType: string;
  price: number;
}

const Room: React.FC<RoomProps> = (props) => {
  return (
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between border-b-2 py-4">
      <div className="flex flex-row items-center gap-4">
        <img src={props.imageUrl}
             alt="Room"
             className="rounded-md size-12"/>
        <span>{props.roomType}</span>
      </div>

      <div className="flex flex-row items-center gap-16">
        <span className="h2-bold">
          ${props.price}<span className="text-sm">/night</span>
        </span>
        <button className="rounded-md px-9 py-4 bg-primary-100">Book Now</button>

      </div>

    </div>
  );
}

export default Room;
