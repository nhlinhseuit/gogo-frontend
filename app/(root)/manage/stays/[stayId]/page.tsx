"use client";
import React, {useEffect} from "react";
import {getRoomsOfStay} from "@/lib/actions/ManageActions";
import {toast} from "@/hooks/use-toast";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import RoomTableComponent from "@/components/shared/manage/RoomTableComponent";
import Room from "@/types/Room";
import {useParams, useRouter} from "next/navigation";

interface PageParams {
  stayId: string;
}

const ManageStayPage: React.FC = () => {

  const router = useRouter();
  const {stayId} = useParams() as unknown as PageParams;
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getRoomsOfStay(stayId).then((data) => {
      setRooms(data);
    }).catch((error) => {
      toast({
        title: "Error",
        description: "Failed to fetch rooms",
        variant: "error",
        duration: 3000,
      })
      console.log(error);
    }).finally(() => {
      setIsLoading(false);
    })
  }, [stayId])

  const onEdit = (room: Room) => {

    router.push(`/manage/stays/${stayId}/rooms/${room.id}`);
  }

  const onDelete = (roomId: string) => {
    if (confirm("Are you sure you want to delete this room?")) {
      // Add delete logic here
    }
  }
  if (isLoading || !rooms) {
    return <
      BigLoadingSpinner/>
  }

  return (
    <RoomTableComponent rooms={rooms} onEdit={onEdit} onDelete={onDelete}/>
  )
}

export default ManageStayPage;
