"use client";

import "@/app/globals.css";
import React, {useEffect, useRef, useState} from "react";
import JsBarcode from "jsbarcode";
import FlightBooking from "@/types/FlightBooking";
import {fetchFlightBooking} from "@/lib/actions/BookingActions";
import {toast} from "@/hooks/use-toast";
import flightBooking from "@/types/FlightBooking";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import StayBooking from "@/types/StayBooking";
import stayBooking from "@/types/StayBooking";


interface StayTicketProps {
  booking: StayBooking;
}

const StayTicket: React.FC<StayTicketProps> = (props) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);
  const stayBookingData = props.booking;

  if (props.booking === null) return <BigLoadingSpinner />;

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, stayBookingData.id, {
        format: "CODE128",
        displayValue: false,
        height: 60,
        width: 2
      });
    }
  }, [barcodeRef, stayBookingData]);

  return (
    <div className="flex h-auto flex-row border-2 overflow-hidden rounded-lg w-[900px]">
      <div className="flex flex-col justify-between gap-2 p-8 pr-16 bg-primary-500">
        <div className="flex flex-col">
          <span className="h2-bold">{stayBookingData.checkinDate}</span>
          <span>Check-in</span>
        </div>
        <img src="/assets/icons/stay-booking-icon.svg" alt="" className="h-24 w-fit" />
        <div className="flex flex-col">
          <span className="h2-bold">{stayBookingData.checkoutDate}</span>
          <span>Check-out</span>
        </div>
      </div>
      <div className="flex flex-grow flex-col">
        <div className="flex flex-row items-center justify-between px-8 py-4 bg-primary-100">
          <div className="flex flex-col">
            <span className="h2-bold">{stayBookingData.firstName} {stayBookingData.lastName}</span>
          </div>
          <span className="font-bold">{stayBookingData.room.name}</span>
        </div>
        <div className="flex flex-col gap-16 h-full justify-between p-8">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <img src="/assets/icons/time-icon.svg" alt="time" className="flex-grow size-12" />
              <div className="flex flex-col">
                <span className="text-gray-500">Check-in Time</span>
                <span>12:00pm</span>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <img src="/assets/icons/time-icon.svg" alt="time" className="flex-grow size-12"/>
              <div className="flex flex-col">
                <span className="text-gray-500">Check-out Time</span>
                <span>12:00pm</span>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <img src="/assets/icons/gate-icon.svg" alt="seat" className="flex-grow size-12"/>
              <div className="flex flex-col">
                <span className="text-gray-500">Room no.</span>
                <span>On Arrival</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="h2-bold">{stayBookingData.id}</div>
            <svg ref={barcodeRef}></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StayTicket;
