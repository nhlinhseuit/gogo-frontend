import "@/app/globals.css";
import React from 'react';

interface FlightInformationProps {
  direction: String;
  departureTime: String;
  arrivalTime: String;
  departureAirportName: String;
  departureAirport: String;
  arrivalAirportName: String;
  arrivalAirport: String;
  className?: String;
}

const FlightInformation: React.FC<FlightInformationProps> = (props) => {
  const departureTime = new Date(props.departureTime)
  const arrivalTime = new Date(props.arrivalTime)
  const duration = new Date(props.arrivalTime) - new Date(props.departureTime);
  const durationHours = Math.floor(duration / 1000 / 60 / 60);
  const durationMinutes = Math.floor(duration / 1000 / 60) % 60;
  return (
    <div className={`bg-light-900 flex flex-col gap-4 px-6 py-8 rounded shadow ${props.className}`}>
      <div className="flex flex-row justify-between">
        <span className="h2-bold">{props.direction} Flight</span>
        <span className="text-xl font-light">{durationHours}h {durationMinutes}m</span>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
        <div className="flex flex-row items-center gap-8 rounded-md border-[1px] py-4 px-8 border-primary-100">
          <img src="/assets/icons/emirates-logo.svg" alt="Emirates Logo"/>
          <div className="flex flex-col gap-1 justify-between">
            <span className="h3-semibold">Emirates</span>
            <span className="text-sm font-light">Airbus A320</span>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <img className="size-6" src="/assets/icons/airplane.svg" alt="Airplane" />
          <div className="h-6 border-l border-gray-300"></div>
          <img className="size-6" src="/assets/icons/wifi.svg" alt="wifi" />
          <div className="h-6 border-l border-gray-300"></div>
          <img className="size-6" src="/assets/icons/stopwatch.svg" alt="time" />
          <div className="h-6 border-l border-gray-300"></div>
          <img className="size-6" src="/assets/icons/food.svg" alt="food" />
          <div className="h-6 border-l border-gray-300"></div>
          <img className="size-6" src="/assets/icons/seat.svg" alt="seat" />
        </div>

      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 self-center">
        <div className="flex flex-row items-center justify-between gap-4">
          <span
            className="h2-semibold">{departureTime.getUTCHours().toString().padStart(2, '0')}:{departureTime.getUTCMinutes().toString().padStart(2, '0')}</span>
          <span className="font-light">{props.departureAirport}</span>
        </div>
        <img src="/assets/icons/flight-duration.svg" alt="Flight Duration"/>
        <div className="flex flex-row items-center justify-between gap-4">
          <span
            className="h2-semibold">{arrivalTime.getUTCHours().toString().padStart(2, '0')}:{arrivalTime.getUTCMinutes().toString().padStart(2, '0')}</span>
          <span className="font-light">{props.arrivalAirport}</span>

        </div>
      </div>
    </div>
  );
};

export default FlightInformation;



