"use client";
import React from 'react';
import Room from "@/types/Room";
import RoomTableComponent from "@/components/shared/manage/RoomTableComponent";

const ManageUserPage: React.FC = () => {

  const rooms: Room[] = [
    {
      id: "1",
      name: "Deluxe Room",
      discount: 10,
      tax: 5,
      type: "Deluxe",
      base_fare: 100,
      service_fee: 20,
      is_available: true,
      max_guests: 2,
      image_url: "https://example.com/deluxe.jpg",
    },
    {
      id: "2",
      name: "Suite",
      discount: 15,
      tax: 10,
      type: "Suite",
      base_fare: 200,
      service_fee: 30,
      is_available: false,
      max_guests: 4,
      image_url: "https://example.com/suite.jpg",
    },
  ];

  const onEdit = (room: Room) => {
    console.log("Edit room", room);
  }

  const onDelete = (roomId: string) => {
    console.log("Delete room", roomId);
  }

  return (
    <div>
      <h1>Manage Room</h1>
      <RoomTableComponent rooms={rooms} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

export default ManageUserPage;
