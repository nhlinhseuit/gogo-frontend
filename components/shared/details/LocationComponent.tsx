import "@/app/globals.css";
import React from "react";
import Location from "@/types/Location"

interface LocationProps {
  location: string;
  className?: string;

}

const LocationComponent: React.FC<LocationProps> = (props) => {
  return (
    <div className={`flex flex-row gap-2 ${props.className}`}>
      <img src="/assets/icons/location.svg"
           alt="Location Icon"/>
      <div className="flex flex-col">
      <span className="font-light">{props.location}</span>
      </div>

    </div>
  );
};

export default LocationComponent;
