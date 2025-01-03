import "@/app/globals.css";
import React from "react";
import FlightDetails from "@/types/FlightDetails";
import Seat from "@/types/Seat";
import flightDetails from "@/types/FlightDetails";

interface FlightInformationProps {
  flightDetails: FlightDetails;
  className?: string;
  showPrice?: boolean;
  seat?: Seat;
  direction?: string;
}

const FlightInformation: React.FC<FlightInformationProps> = (props) => {

  const departure = new Date(props.flightDetails.departureTime);
  const arrival = new Date(props.flightDetails.arrivalTime);
  const duration = arrival.getTime() - departure.getTime();
  const durationHours = Math.floor(duration / 1000 / 60 / 60);
  const durationMinutes = Math.floor(duration / 1000 / 60) % 60;

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div
      className={`bg-light-900 flex flex-col gap-4 px-6 py-8 rounded shadow ${props.className}`}
    >
      {(props.showPrice && props.seat) && (
        <div className="flex flex-row justify-between h1-bold">
          <span className="w-2/3">{props.flightDetails.name}</span>
          <span className="text-accent-orange">${props.seat.base_fare}</span>
        </div>
      )}
      <div className="flex flex-row justify-between">
        {duration &&
					<span className="h2-bold">
          {props.direction}{" "}
            {`${daysOfWeek[departure.getDay()]}, ${
              monthsOfYear[departure.getMonth()]
            } ${departure.getDate()}`}
        </span>
        }
        <span className="text-xl font-light">
          {durationHours}h {durationMinutes}m
        </span>
      </div>
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div
          className="flex flex-col items-center gap-8 rounded-md px-8 py-4 border-[1px] border-primary-100 md:flex-row">
          <img src={props.flightDetails.airline.image} className="w-16 h-12 object-contain" alt="Emirates Logo"/>
          <div className="flex flex-col justify-between gap-1">
            <span className="h3-semibold">Emirates</span>
            <span className="text-sm font-light">Airbus A320</span>
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-4">
          <img
            className="size-6"
            src="/assets/icons/airplane.svg"
            alt="Airplane"
          />
          <div className="h-6 hidden md:block border-l border-gray-300"></div>
          <img className="size-6" src="/assets/icons/IC_WIFI.svg" alt="wifi"/>
          <div className="h-6 hidden md:block border-l border-gray-300"></div>
          <img
            className="size-6"
            src="/assets/icons/stopwatch.svg"
            alt="time"
          />
          <div className="h-6 hidden md:block border-l border-gray-300"></div>
          <img className="size-6" src="/assets/icons/food.svg" alt="food"/>
          <div className="h-6 hidden md:block border-l border-gray-300"></div>
          <img className="size-6" src="/assets/icons/seat.svg" alt="seat"/>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 self-center md:flex-row md:gap-16">
        <div className="flex flex-row items-center justify-between gap-4">
          <span className="h2-semibold">
            {departure.getUTCHours().toString().padStart(2, "0")}:
            {departure.getUTCMinutes().toString().padStart(2, "0")}
          </span>
          <span className="font-light">{props.flightDetails.departureAirport.code}</span>
        </div>
        <img src="/assets/icons/flight-duration.svg" alt="Flight Duration"/>
        <div className="flex flex-row items-center justify-between gap-4">
          <span className="h2-semibold">
            {arrival.getUTCHours().toString().padStart(2, "0")}:
            {arrival.getUTCMinutes().toString().padStart(2, "0")}
          </span>
          <span className="font-light">{props.flightDetails.arrivalAirport.code}</span>
        </div>
      </div>
    </div>
  );
};

export default FlightInformation;
