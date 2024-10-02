import "@/app/globals.css";
import React from "react";

interface LocationProps {
  location: string;
  className?: string;

}

const Location: React.FC<LocationProps> = (props) => {
  return (
    <div className={`flex flex-row gap-2 ${props.className}`}>
      <img src="/assets/icons/location.svg"
           alt="Location Icon"/>
      <span className="font-light">{props.location}</span>
    </div>
  );
};

export default Location;
