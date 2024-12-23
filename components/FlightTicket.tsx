"use client";

import "@/app/globals.css";
import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";


interface FlightTicketProps {
  bookingId: number;
}

const FlightTicket: React.FC<FlightTicketProps> = (props) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  const mockFlightData = {
    type: "flight",
    planeModel: "Boeing 737",
    class: "Economy",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureTime: "2022-12-31T23:59:59",
    arrivalTime: "2023-01-01T03:00:00",
    price: 100.00,
    gate: "A1",
    seat: "23A",
    departureAirportName: "John F. Kennedy International Airport",
    arrivalAirportName: "Los Angeles International Airport",
    passengerName: "John Doe",
    code: "ABC12345"
  };

  const departureTime = new Date(mockFlightData.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const arrivalTime = new Date(mockFlightData.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, mockFlightData.code, {
        format: "CODE128",
        displayValue: false,
        height: 60,
        width: 2
      });
    }
  }, [mockFlightData.code]);

  return (
    <div className="flex h-auto flex-row border-2 overflow-hidden rounded-lg w-[900px]">
      <div className="flex flex-col justify-between gap-2 p-8 pr-16 bg-primary-500">
        <div className="flex flex-col">
          <span className="h2-bold">{departureTime}</span>
          <span>{mockFlightData.departureAirport}</span>
        </div>
        <img src="/assets/icons/flight-ticker-icon.svg" alt="" className="h-24 w-fit" />
        <div className="flex flex-col">
          <span className="h2-bold">{arrivalTime}</span>
          <span>{mockFlightData.arrivalAirport}</span>
        </div>
      </div>
      <div className="flex flex-grow flex-col">
        <div className="flex flex-row items-center justify-between px-8 py-4 bg-primary-100">
          <div className="flex flex-col">
            <span className="h2-bold">{mockFlightData.passengerName}</span>
            <span>Boarding Pass N'{mockFlightData.code}</span>
          </div>
          <span className="font-bold">{mockFlightData.class}</span>
        </div>
        <div className="flex flex-col gap-16 h-full justify-between p-8">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <img src="/assets/icons/calendar-icon.svg" alt="date" className="flex-grow size-12" />
              <div className="flex flex-col">
                <span className="text-gray-500">Date</span>
                <span>{new Date(mockFlightData.arrivalTime).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <img src="/assets/icons/time-icon.svg" alt="time" className="flex-grow size-12" />
              <div className="flex flex-col">
                <span className="text-gray-500">Flight time</span>
                <span>{departureTime}</span>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <img src="/assets/icons/gate-icon.svg" alt="gate" className="flex-grow size-12" />
              <div className="flex flex-col">
                <span className="text-gray-500">Gate</span>
                <span>{mockFlightData.gate}</span>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <img src="/assets/icons/seat-icon.svg" alt="seat" className="flex-grow size-12" />
              <div className="flex flex-col">
                <span className="text-gray-500">Seat</span>
                <span>{mockFlightData.seat}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="h2-bold">{mockFlightData.code}</div>
            <svg ref={barcodeRef}></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightTicket;
