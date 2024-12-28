"use client";

import "@/app/globals.css";
import React, {useEffect, useState} from "react";
import PaymentOptions from "@/components/shared/details/PaymentOptions";
import PaymentCardSelection from "@/components/shared/details/PaymentCardSelection";
import PriceDetailsComponent from "@/components/shared/details/PriceDetailsComponent";
import StayInformationComponent from "@/components/shared/details/stays/StayInformationComponent";
import type Stay from "@/types/Stay";
import type Room from "@/types/Room";
import {fetchStay} from "@/lib/actions/StayActions";
import CountriesDropdown from "@/components/shared/CountriesDropdown";
import {useParams, useSearchParams} from "next/navigation";
import {fetchRoom} from "@/lib/actions/RoomActions";
import Price from "@/types/Price";

interface PageParams {
  stayId: string;
}

const StayBookingPage: React.FC = () => {
  const {stayId} = useParams() as unknown as PageParams;
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room_id");

  const targetTime = new Date("2024-12-30T00:00:00").getTime();
  const [price, setPrice] = useState<Price | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [stayData, setStayData] = useState<Stay | null>(null);
  const [roomData, setRoomData] = useState<Room | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("full"); // Default to 'full'

  useEffect(() => {
    fetchStay(stayId).then((data) => {
      setStayData(data);
    }).catch((error) => {
      console.error('Error fetching stay:', error);
    });
    fetchRoom(roomId!).then((data) => {
      setRoomData(data);
    }).catch((error) => {
      console.error('Error fetching room:', error);
    })

  }, []);

  useEffect(() => {
    if (roomData) {
      setPrice({
        base_fare: roomData.base_fare ?? 0,
        discount: roomData.discount ?? 0,
        tax: roomData.tax ?? 0,
        service_fee: roomData.service_fee ?? 0,
        total:
          (roomData.base_fare ?? 0) -
          (roomData.discount ?? 0) +
          (roomData.tax ?? 0) +
          (roomData.service_fee ?? 0),
      });
    }
  }, [roomData]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("Time's up!");
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  if (!stayId || !roomId) {
    return <div>Missing required parameters</div>;
  }

  if (!stayData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex w-full flex-col gap-4">
      <div
        className="sticky top-0 flex w-screen mb-8 flex-row self-center items-center justify-center gap-4 bg-red-100 text-xl font-semibold">
        <span>We are holding this room...</span>
        <img src="/assets/icons/IC_CLOCK.svg" alt="clock"/>
        <span>{timeLeft}</span>
      </div>

      <div className="grid w-full grid-cols-5 gap-8 mt-">
        <div className="col-span-3 flex flex-col gap-8">
          <StayInformationComponent stayId={stayId} roomId={roomId}/>
          <div className="rounded-lg p-4 shadow bg-white w-full flex flex-col gap-4">
            <span className="h2-bold">Who is the lead guest?</span>
            <form action="" className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" placeholder="First Name" className="border-2 rounded-md p-2"/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" placeholder="Last Name" className="border-2 rounded-md p-2"/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Email" className="border-2 rounded-md p-2"/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" placeholder="Phone" className="border-2 rounded-md p-2"/>
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="country">Country</label>
                <CountriesDropdown/>
              </div>
            </form>
          </div>
          <PaymentOptions total={price?.total ?? 0} />
          <PaymentCardSelection/>
          <button className="w-full rounded-lg p-4 bg-primary-100">Book</button>
        </div>
        <div className="col-span-2">
          <PriceDetailsComponent room={roomData} stay={stayData} seat={null} flight={null} price={price!}/>
        </div>
      </div>
    </main>
  );
}

export default StayBookingPage;
