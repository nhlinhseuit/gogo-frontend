import "@/app/globals.css"
import React, {useEffect, useState} from "react";
import type Room from "@/types/Room";
import RoomComponent from "@/components/shared/details/stays/RoomComponent";
import {fetchAvailableRooms} from "@/lib/actions/StayActions";

interface AvailableRoomsProps {
  stayId: string;
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

  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetchAvailableRooms(stayId)
      .then((data) => {
        setAvailableRooms(data);
      })
      .catch((error) => {
        console.error('Error fetching available rooms:', error);
      });
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <span className="h2-bold">Available Rooms</span>
      <div>
        {availableRooms.map((room) => {
          return (
            <RoomComponent room={room}/>
          )
        })}
      </div>
    </div>
  );
};

export default AvailableRooms;
