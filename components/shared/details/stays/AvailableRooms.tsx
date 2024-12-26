"use client";

import "@/app/globals.css"
import React, {useEffect, useState} from "react";
import type Room from "@/types/Room";
import RoomComponent from "@/components/shared/details/stays/RoomComponent";
import {fetchAvailableRooms} from "@/lib/actions/StayActions";

interface AvailableRoomsProps {
  stayId: string;
}

const AvailableRooms: React.FC<AvailableRoomsProps> = ({stayId}) => {
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
            <RoomComponent stayId={stayId} room={room} key={room.id}/>
          )
        })}
      </div>
    </div>
  );
};

export default AvailableRooms;
