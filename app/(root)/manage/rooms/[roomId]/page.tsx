"use client";
import React from "react";
import RoomFormComponent from "@/components/shared/manage/RoomFormComponent";
import type Room from "@/types/Room";
import RoomAvailabilityComponent from "@/components/shared/manage/RoomAvailabilityComponent";

const ShowRoomPage: React.FC = () => {

  const onSave = (room: Room) => {
    console.log("Save room", room);
  }


  return (
    <div>
      <h1>Show Room</h1>
      <RoomFormComponent onSave={onSave}/>
      <RoomAvailabilityComponent roomId={"1"}/>
    </div>
  );
}

export default ShowRoomPage;
