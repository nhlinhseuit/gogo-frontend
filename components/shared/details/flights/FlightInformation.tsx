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
  className?: string;
}

const FlightInformation: React.FC<FlightInformationProps> = (props) => {
  return (
    <div className={`bg-light-900 flex flex-col rounded shadow ${props.className}`}>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col gap-4 p-4">
          <span className="h2-bold">{props.direction} Flight</span>
          <span className="font-light">{props.departureTime} - {props.arrivalTime}</span>
          <span className="font-light">{props.departureAirportName} ({props.departureAirport}) - {props.arrivalAirportName} ({props.arrivalAirport})</span>
        </div>
        <div className="flex flex-row items-center gap-4 p-4">
          {/*<img src="/assets/icons/airplane.svg" alt="Airplane icon"/>*/}
          <span className="font-light">Flight Information</span>
        </div>

      </div>
    </div>
  );
};

export default FlightInformation;


