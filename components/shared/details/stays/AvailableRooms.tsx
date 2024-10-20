import "@/app/globals.css"
import Room from "@/components/shared/details/stays/Room";
import {id} from "postcss-selector-parser";

interface AvailableRoomsProps {
  stayId: number;
}

const AvailableRooms: React.FC<AvailableRoomsProps> = ({stayId}) => {
  const mockRooms = [
    {
      id: 1,
      imageUrl: "/assets/images/mock-room-image.png",
      roomType: "Single room",
      price: 100,
    },
    {
      id: 2,
      imageUrl: "/assets/images/mock-room-image.png",
      roomType: "Double room",
      price: 150,
    },
    {
      id: 3,
      imageUrl: "/assets/images/mock-room-image.png",
      roomType: "Suite",
      price: 200,
    }
  ]
  return (
    <div className="flex flex-col gap-4">
      <span className="h2-bold">Available Rooms</span>
      <div>
        {mockRooms.map((room) => {
          return (
            <Room imageUrl={room.imageUrl} roomType={room.roomType} price={room.price} key={room.id}/>
          )
        })}
      </div>
    </div>
  );
};

export default AvailableRooms;
