import "@/app/globals.css";
import React from "react";

interface HotelStarsProps {
  stars: number;
}

const HotelStars: React.FC<HotelStarsProps> = ({stars}) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <span className="flex flex-row items-center">
      {Array.from({length: stars}, (_, index) => (
        <img key={index} src="/assets/icons/star-filled.svg" alt="Star" className="size-4"/>
      ))}
      </span>
      <span>{stars} stars Hotel</span>
    </div>
  );
}

export default HotelStars;
