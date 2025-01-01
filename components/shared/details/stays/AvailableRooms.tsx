"use client";

import "@/app/globals.css"
import React, {useEffect, useState} from "react";
import type Room from "@/types/Room";
import RoomComponent from "@/components/shared/details/stays/RoomComponent";
import {fetchAvailableRooms} from "@/lib/actions/StayActions";

interface AvailableRoomsProps {
  stayId: string;
  checkin: string;
  checkout: string;
}

const AvailableRooms: React.FC<AvailableRoomsProps> = (props) => {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetchAvailableRooms(props.stayId)
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
            <RoomComponent stayId={props.stayId} room={room} key={room.id} checkin={props.checkin} checkout={props.checkout}/>
          )
        })}
      </div>
    </div>
  );
};

export default AvailableRooms;
