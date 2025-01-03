import React, { useState } from "react";
import type Room from "@/types/Room";
import RoomAvailabilityComponent from "@/components/shared/manage/RoomAvailabilityComponent";

interface RoomTableComponentProps {
  rooms: Room[];
  onEdit: (room: Room) => void;
  onDelete: (roomId: string) => void;
}

const RoomTableComponent: React.FC<RoomTableComponentProps> = ({ rooms, onEdit, onDelete }) => {
  const [sortColumn, setSortColumn] = useState<keyof Room | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof Room) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedRooms = [...rooms].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
        <tr className="bg-primary-100">
          <th
            className="px-4 py-2 text-left cursor-pointer"
            onClick={() => handleSort("name")}
          >
            Name {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th
            className="px-4 py-2 text-left cursor-pointer"
            onClick={() => handleSort("type")}
          >
            Type {sortColumn === "type" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th
            className="px-4 py-2 text-right cursor-pointer"
            onClick={() => handleSort("base_fare")}
          >
            Base Fare {sortColumn === "base_fare" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th
            className="px-4 py-2 text-right cursor-pointer"
            onClick={() => handleSort("discount")}
          >
            Discount (%) {sortColumn === "discount" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th
            className="px-4 py-2 text-right cursor-pointer"
            onClick={() => handleSort("tax")}
          >
            Tax (%) {sortColumn === "tax" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th
            className="px-4 py-2 text-right cursor-pointer"
            onClick={() => handleSort("service_fee")}
          >
            Service Fee {sortColumn === "service_fee" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th className="px-4 py-2 text-center">Available</th>
          <th className="px-4 py-2 text-center">Max Guests</th>
          <th className="px-4 py-2 text-center">Image</th>
          <th className="px-4 py-2 text-center">Actions</th>
        </tr>
        </thead>
        <tbody>
        {sortedRooms.map((room: Room) => (
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
              {/*<button*/}
              {/*  onClick={() => onDelete(room.id)}*/}
              {/*  className="text-red-600 hover:underline ml-4"*/}
              {/*>*/}
              {/*  Delete*/}
              {/*</button>*/}
            </td>
          </tr>
        ))}
        </tbody>
      </table>

    </div>
  );
};

export default RoomTableComponent;
