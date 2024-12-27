import React from "react";
import type Room from "@/types/Room";

interface RoomTableComponentProps {
  rooms: Room[];
  onEdit: (room: Room) => void;
  onDelete: (roomId: string) => void;
}

const RoomTableComponent: React.FC<RoomTableComponentProps> = ({ rooms, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Type</th>
          <th className="px-4 py-2 text-right">Base Fare</th>
          <th className="px-4 py-2 text-right">Discount (%)</th>
          <th className="px-4 py-2 text-right">Tax (%)</th>
          <th className="px-4 py-2 text-right">Service Fee</th>
          <th className="px-4 py-2 text-center">Available</th>
          <th className="px-4 py-2 text-center">Max Guests</th>
          <th className="px-4 py-2 text-center">Image</th>
          <th className="px-4 py-2 text-center">Actions</th>
        </tr>
        </thead>
        <tbody>
        {rooms.map((room: Room) => (
          <tr key={room.id} className="border-t">
            <td className="px-4 py-2">{room.name}</td>
            <td className="px-4 py-2">{room.type}</td>
            <td className="px-4 py-2 text-right">${room.base_fare.toFixed(2)}</td>
            <td className="px-4 py-2 text-right">${room.discount}</td>
            <td className="px-4 py-2 text-right">${room.tax}</td>
            <td className="px-4 py-2 text-right">${room.service_fee.toFixed(2)}</td>
            <td className="px-4 py-2 text-center">
              {room.is_available ? "Yes" : "No"}
            </td>
            <td className="px-4 py-2 text-center">{room.max_guests}</td>
            <td className="px-4 py-2 text-center">
              <img
                src={room.image_url}
                alt={room.name}
                className="h-16 w-16 object-cover rounded"
              />
            </td>
            <td className="px-4 py-2 text-center">
              <button
                onClick={() => onEdit(room)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(room.id)}
                className="text-red-600 hover:underline ml-4"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTableComponent;
