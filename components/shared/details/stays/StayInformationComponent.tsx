"use client";
import "@/app/globals.css";
import React, {useEffect, useState} from "react";
import type Stay from "@/types/Stay";
import Room from "@/types/Room";
import {fetchStay} from "@/lib/actions/StayActions";
import {fetchRoom} from "@/lib/actions/RoomActions";
import {formatDateInWords} from "@/utils/util";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";

interface StayInformationComponentProps {
  stayId: string
  roomId: string
  checkin: string
  checkout: string
  className?: string
}

const StayInformationComponent: React.FC<StayInformationComponentProps> = (props) => {

  const [stayData, setStayData] = useState<Stay>();
  const [roomData, setRoomData] = useState<Room>();

  useEffect(() => {
    fetchStay(props.stayId).then((data) => {
      setStayData(data);
    }).catch((error) => {
      console.error('Error fetching stay:', error);
    });
    fetchRoom(props.roomId).then((data) => {
      setRoomData(data);
      console.log(data);
    }).catch((error) => {
      console.error('Error fetching stay:', error);
    });
  }, []);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (!stayData || !roomData) {
  return <BigLoadingSpinner/>
  }

  return (
    <div className={`bg-light-900 flex flex-col gap-4 px-6 py-8 rounded shadow ${props.className}`}>
      <div className="flex flex-row items-center justify-between h1-bold">
        <span
          className="h2-bold w-2/3">{stayData.name}</span>
        <div>
          <span className="text-accent-orange">${roomData.base_fare}</span>
          <span className="text-sm text-accent-orange">/night</span>
        </div>

      </div>

      <div
        className="flex w-full flex-col items-center gap-8 rounded-md px-4 py-2 border-[1px] border-primary-100 md:flex-row">
        <img className="h-20 w-24 rounded"
             src={typeof stayData.featured_images[0] === 'string' ? stayData.featured_images[0] : "/assets/images/image_not_available.png"}
             alt="Logo"/>
        <div className="flex flex-col justify-between gap-1">
          <span className="h3-semibold">{stayData.name}</span>
          <span className="text-sm font-light flex flex-row items-center"><img src="/assets/icons/location.svg"
                                                                               alt=""/>{stayData.address}</span>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-8 self-center md:flex-row md:gap-16">
        <div className="flex flex-col justify-between">
          <span
            className="font-bold">{
            formatDateInWords(props.checkin)
          }</span>
          <span className="font-light">Check In</span>
        </div>
        <img src="/assets/icons/stay-duration.svg" alt="Flight Duration"/>
        <div className="flex flex-col justify-between">
          <span
            className="font-bold">
            {
              formatDateInWords(props.checkout)

            }
          </span>
          <span className="font-light">Check Out</span>
        </div>
      </div>
    </div>
  );
};

export default StayInformationComponent;



