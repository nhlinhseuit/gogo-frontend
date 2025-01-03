"use client";

import "@/app/globals.css";
import React, {useEffect, useRef} from "react";
import JsBarcode from "jsbarcode";
import FlightBooking from "@/types/FlightBooking";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import {formatDateInWords, formatDateToYYYYMMDD, formatHHMM} from "@/utils/util";


interface FlightTicketProps {
  booking: FlightBooking;
}

const FlightTicket: React.FC<FlightTicketProps> = (props) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);
  const flightBookingData = props.booking;

  if (props.booking === null) return <BigLoadingSpinner/>;

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, flightBookingData.id, {
        format: "CODE128",
        displayValue: false,
        height: 60,
        width: 1
      });
    }
  }, [barcodeRef, flightBookingData]);

  return (
    <div className="flex h-auto flex-row border-2 overflow-hidden rounded-lg">
      <div className="flex flex-col justify-between gap-2 p-8 pr-16 bg-primary-500">
        <div className="flex flex-col">
          <span className="h2-bold">{formatDateInWords(flightBookingData.seats[0].seat.flight.departure_time)}</span>
          <span>{flightBookingData.seats[0].seat.flight.departure_airport.code}</span>
        </div>
        <img src="/assets/icons/flight-ticker-icon.svg" alt="" className="h-24 w-fit"/>
        <div className="flex flex-col">
          <span className="h2-bold">{formatDateInWords(flightBookingData.seats[0].seat.flight.arrival_time)}</span>
          <span>{flightBookingData.seats[0].seat.flight.arrival_airport.code}</span>
        </div>
      </div>
      <div className="flex flex-grow flex-col">
        <div className="flex flex-row items-center justify-between px-8 py-4 bg-primary-100">
          <div className="flex flex-col">
            <span className="h2-bold">{flightBookingData.seats[0].citizen_name}</span>
            <span>Boarding Pass {flightBookingData.seats[0].seat.flight.name}</span>
          </div>
          <span className="font-bold">{flightBookingData.seats[0].seat.seat_class}</span>
        </div>
        <div className="flex flex-col gap-16 h-full justify-between p-8">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <img src="/assets/icons/calendar-icon.svg" alt="date" className="flex-grow size-12"/>
              <div className="flex flex-col">
                <span className="text-gray-500">Date</span>
                <span>{formatDateToYYYYMMDD(flightBookingData.seats[0].seat.flight.departure_time)}</span>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <img src="/assets/icons/time-icon.svg" alt="time" className="flex-grow size-12"/>
              <div className="flex flex-col">
                <span className="text-gray-500">Flight time</span>
                <span>{formatHHMM(flightBookingData.seats[0].seat.flight.departure_time)}</span>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <img src="/assets/icons/gate-icon.svg" alt="gate" className="flex-grow size-12"/>
              <div className="flex flex-col">
                <span className="text-gray-500">Gate</span>
                <span>{flightBookingData.seats[0].seat.flight.gate}</span>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <img src="/assets/icons/seat-icon.svg" alt="seat" className="flex-grow size-12"/>
              <div className="flex flex-col">
                <span className="text-gray-500">Seat</span>
                <span>{flightBookingData.seats[0].seat.number}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-end">
            <svg ref={barcodeRef}></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightTicket;
