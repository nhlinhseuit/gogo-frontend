"use client";
import React, {useEffect} from 'react';
import Room from "@/types/Room";
import {getStayByOwner} from "@/lib/actions/ManageActions";
import Stay from "@/types/Stay";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

const StaysManagingPage: React.FC = () => {
  const router = useRouter();
  const [stays, setStays] = React.useState<Stay[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getStayByOwner().then((data) => {
      setStays(data);
    }).catch((error) => {
      toast({
        title: "Error",
        description: "Failed to fetch stays",
        variant: "error",
        duration: 3000,
      });
      console.log(error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const onEdit = (room: Room) => {
    console.log("Edit room", room);
  };

  const onDelete = (roomId: string) => {
    console.log("Delete room", roomId);
  };

  const handleRowClick = (id: string) => {
    // Navigate to the hotel detail page
    router.push(`/manage/stays/${id}`);
  };

  if (isLoading || !stays) {
    return <BigLoadingSpinner/>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row items-center justify-between">
        <h1 className="h2-bold my-8">Manage your Stays</h1>
        <button
          onClick={() => router.push(`/manage/stays/new`)}
          className="px-4 py-2 bg-primary-100 rounded text-md font-semibold">Add New Stay
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
        <tr className="bg-primary-100">
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-left">City</th>
          <th className="py-3 px-6 text-left">Country</th>
          <th className="py-3 px-6 text-left">Rating</th>
          <th className="py-3 px-6 text-left">Star Rating</th>
          <th className="py-3 px-6 text-left">Amenities</th>
        </tr>
        </thead>
        <tbody>
        {stays.map((stay, index) => (
          <tr
            key={stay.id}
            onClick={() => handleRowClick(stay.id)}
            className={`border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
          >
            <td className="py-3 px-6">{stay.name}</td>
            <td className="py-3 px-6">{stay.location.city}</td>
            <td className="py-3 px-6">{stay.location.country}</td>
            <td className="py-3 px-6">{stay.rating}</td>
            <td className="py-3 px-6">{stay.star_rating}</td>
            <td className="py-3 px-6">{stay.amenities.map((amenity) => amenity.name).join(', ')}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaysManagingPage;
