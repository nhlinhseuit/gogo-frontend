"use client";
import React, {useEffect} from "react";
import type Room from "@/types/Room";
import {fetchRoom} from "@/lib/actions/RoomActions";
import {useParams} from "next/navigation";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import {toast} from "@/hooks/use-toast";
import {updateRoom} from "@/lib/actions/ManageActions";

interface ShowRoomPageParams {
  roomId: string;
}

const ShowRoomPage: React.FC = () => {
  const [room, setRoom] = React.useState<Room | null>(null);
  const {roomId} = useParams() as unknown as ShowRoomPageParams;
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetchRoom(roomId)
      .then((data) => {
        setRoom(data);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to fetch room",
          variant: "error",
          duration: 3000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [roomId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value, type} = e.target;
    setRoom((prevRoom) => {
      if (!prevRoom) return null; // Ensure prevRoom is not null
      return {
        ...prevRoom,
        [name]: type === "number" ? Number(value) : value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (room) {
      onSave(room);
    }
  };

  const onSave = (room: Room) => {
    setIsLoading(true);
    updateRoom(room).then((data) => {
      toast({
        title: "Success",
        description: "Room updated successfully",
        variant: "success",
        duration: 3000,
      });
    }).catch((error) => {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to update room",
        variant: "error",
        duration: 3000,
      });
    }).finally(() => {
      setIsLoading(false);
    })
  };

  if (isLoading || !room) {
    return <BigLoadingSpinner/>;
  }

  return (
    <div>
      <h1>Show Room</h1>
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
              setRoom((prevRoom) => {
                if (!prevRoom) return null;
                return {
                  ...prevRoom,
                  is_available: e.target.value === "true",
                };
              })
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
      {/*<RoomAvailabilityComponent roomId={"1"}/>*/}
    </div>
  );
};

export default ShowRoomPage;
