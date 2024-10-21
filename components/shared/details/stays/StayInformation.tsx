import "@/app/globals.css";
import React from 'react';

interface FlightInformationProps {
  flightId: number
  className?: string
  showPrice?: boolean
}

const FlightInformation: React.FC<FlightInformationProps> = (props) => {
  const mockFlightData = {
    id: props.flightId,
    planeModel: "Boeing 737",
    departure: "2022-01-01T00:00:00Z",
    arrival: "2022-01-01T01:00:00Z",
    departureAirportName: "John F. Kennedy International Airport",
    arrivalAirportName: "Los Angeles International Airport",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    baseFare: 100,
    imageUrl: "/assets/images/flight.png",
    direction: "Away"
  };

  const mockStayData = {
    id: props.flightId,
    name: "Hotel California",
    address: "1234 California St, Los Angeles, CA",

    baseFare: 100,
    imageUrl: "/assets/images/mock-stay-image.png",
    rating: 4.5
  }

  const mockRoomData = {
    id: props.flightId,
    name: "Deluxe Room - 1 double bed or 2 single beds",
    stayId: 1,
    baseFare: 100,
    discount: 0,
    taxes: 0,
    serviceFee: 20,
    totalPrice: 120,
    checkIn: "2022-01-01T00:00:00Z",
    checkOut: "2022-01-03T01:00:00Z",
    imageUrl: "/assets/images/mock-room-image.png",
    type: "Single",
    rating: 4.5
  }


  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className={`bg-light-900 flex flex-col gap-4 px-6 py-8 rounded shadow ${props.className}`}>
      <div className="flex flex-row items-center justify-between h1-bold">
        <span
          className="h2-bold w-2/3">{mockRoomData.name}</span>
        <div>
          <span className="text-accent-orange">${mockFlightData.baseFare}</span>
          <span className="text-sm text-accent-orange">/night</span>
        </div>

      </div>

      <div
        className="flex w-full flex-col items-center gap-8 rounded-md px-8 py-4 border-[1px] border-primary-100 md:flex-row">
        <img src="/assets/icons/emirates-logo.svg" alt="Emirates Logo"/>
        <div className="flex flex-col justify-between gap-1">
          <span className="h3-semibold">{mockStayData.name}</span>
          <span className="text-sm font-light flex flex-row items-center"><img src="/assets/icons/location.svg" alt=""/>{mockStayData.address}</span>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-8 self-center md:flex-row md:gap-16">
        <div className="flex flex-col justify-between">
          <span
            className="h2-semibold">{
            `${daysOfWeek[new Date(mockRoomData.checkIn).getDay()]}, ${monthsOfYear[new Date(mockRoomData.checkIn).getMonth()]} ${new Date(mockRoomData.checkIn).getDate()}`
          }</span>
          <span className="font-light">Check In</span>
        </div>
        <img src="/assets/icons/stay-duration.svg" alt="Flight Duration"/>
        <div className="flex flex-col justify-between">
          <span
            className="h2-semibold">{
            `${daysOfWeek[new Date(mockRoomData.checkOut).getDay()]}, ${monthsOfYear[new Date(mockRoomData.checkOut).getMonth()]} ${new Date(mockRoomData.checkOut).getDate()}`
          }</span>
          <span className="font-light">Check Out</span>
        </div>
      </div>
    </div>
  );
};

export default FlightInformation;



