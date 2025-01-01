import React, { useState } from "react";
import type Room from "@/types/Room";

interface RoomFormComponentProps {
  initialRoom?: Room;
  onSave: (room: Room) => void;
}

const RoomFormComponent: React.FC<RoomFormComponentProps> = ({ initialRoom, onSave }) => {
  const [room, setRoom] = useState<Room>(
    initialRoom || {
      id: "",
      name: "",
      discount: 0,
      tax: 0,
      type: "Standard",
      base_fare: 0,
      service_fee: 0,
      is_available: true,
      max_guests: 1,
      image_url: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type: inputType } = e.target;
    const val = inputType === "number" ? parseFloat(value) : value;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: val,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(room);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={room.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Type</label>
        <select
          name="type"
          value={room.type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
          <option value="Family">Family</option>
          <option value="Presidential">Presidential</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Base Fare</label>
        <input
          type="number"
          name="base_fare"
          value={room.base_fare}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Discount (%)</label>
        <input
          type="number"
          name="discount"
          value={room.discount}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Tax (%)</label>
        <input
          type="number"
          name="tax"
          value={room.tax}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Service Fee</label>
        <input
          type="number"
          name="service_fee"
          value={room.service_fee}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Available</label>
        <select
          name="is_available"
          value={String(room.is_available)}
          onChange={(e) =>
            setRoom((prevRoom) => ({
              ...prevRoom,
              is_available: e.target.value === "true",
            }))
          }
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Max Guests</label>
        <input
          type="number"
          name="max_guests"
          value={room.max_guests}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Image URL</label>
        <input
          type="text"
          name="image_url"
          value={room.image_url}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default RoomFormComponent;
