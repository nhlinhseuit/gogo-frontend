"use client";

import "@/app/globals.css";
import React from "react";
import Amenity from "@/types/Amenity";
import icon from "@/public/assets/icons/IC_WIFI.svg"
interface AmenityComponentProps {
  amenities: Amenity[];
}

const AmenitiesComponent: React.FC<AmenityComponentProps> = (props) => {
  const [visibleAmenities, setVisibleAmenities] = React.useState(3);
  return (
    <div className="flex flex-col gap-4 py-8 border-b-2">
      <span className="h2-bold">Amenities</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {props.amenities.slice(0, visibleAmenities).map((amenity) => {
          return (
            <div key={amenity.id} className="flex flex-row items-center gap-4">

              <img src={`/assets/icons/${amenity.icon}.svg`} alt={amenity.name} className="size-8"/>

              <span>{amenity.name}</span>
            </div>
          );
        })}
        {visibleAmenities < props.amenities.length && (
          <button onClick={() => setVisibleAmenities(visibleAmenities + 4)}
                  className="w-auto text-accent-orange text-left">
            +{props.amenities.length - visibleAmenities} more
          </button>
        )}
      </div>

    </div>
  );
}

export default AmenitiesComponent

