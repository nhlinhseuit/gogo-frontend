"use client";
import React, {useEffect} from 'react';
import Room from "@/types/Room";
import RoomTableComponent from "@/components/shared/manage/RoomTableComponent";
import {getRoomsOfStay} from "@/lib/actions/ManageActions";

const ManageUserPage: React.FC = () => {
  const [rooms, setRooms] = React.useState<Room[]>([]);

  useEffect(() => {
  getRoomsOfStay("1").then((data) => {
    setRooms(data);
  })
  },[])

  const onEdit = (room: Room) => {
    console.log("Edit room", room);
  }

  const onDelete = (roomId: string) => {
    console.log("Delete room", roomId);
  }

  return (
    <div>
      <h1 className="h1-bold my-10">Manage Room</h1>
      <RoomTableComponent rooms={rooms} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

export default ManageUserPage;
