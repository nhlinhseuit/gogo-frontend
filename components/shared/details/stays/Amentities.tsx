"use client";

import "@/app/globals.css";
import React from "react";
import Amenity from "@/types/Amenity";

interface AmenityComponentProps {
  amenities: Amenity[];
}

const AmenitiesComponent: React.FC<AmenityComponentProps> = (props) => {
  const [visibleAmenities, setVisibleAmenities] = React.useState(3);

  const mockAmenities = [
    {
      id: 1,
      title: "Free Wi-Fi",
      icon: "/assets/icons/wifi.svg"
    },
    {
      id: 2,
      title: "Free Parking",
      icon: "/assets/icons/wifi.svg"
    },
    {
      id: 3,
      title: "Swimming Pool",
      icon: "/assets/icons/wifi.svg"
    },
    {
      id: 4,
      title: "Gym",
      icon: "/assets/icons/wifi.svg"
    },
    {
      id: 5,
      title: "Breakfast",
      icon: "/assets/icons/wifi.svg"
    },
    {
      id: 6,
      title: "Air Conditioning",
      icon: "/assets/icons/wifi.svg"
    },
    {
      id: 7,
      title: "Spa",
      icon: "/assets/icons/wifi.svg"
    },
    {
      id: 8,
      title: "Bar",
      icon: "/assets/icons/wifi.svg"
    },
    {
      id: 9,
      title: "Restaurant",
      icon: "/assets/icons/wifi.svg"
    }, {
      id: 9,
      title: "Restaurant",
      icon: "/assets/icons/wifi.svg"
    }, {
      id: 9,
      title: "Restaurant",
      icon: "/assets/icons/wifi.svg"
    }, {
      id: 9,
      title: "Restaurant",
      icon: "/assets/icons/wifi.svg"
    }, {
      id: 9,
      title: "Restaurant",
      icon: "/assets/icons/wifi.svg"
    }, {
      id: 9,
      title: "Restaurant",
      icon: "/assets/icons/wifi.svg"
    }, {
      id: 9,
      title: "Restaurant",
      icon: "/assets/icons/wifi.svg"
    }, {
      id: 9,
      title: "Restaurant",
      icon: "/assets/icons/wifi.svg"
    }, {
      id: 9,
      title: "Restaurant",
      icon: "/assets/icons/wifi.svg"
    },
  ];
  return (
    <div className="flex flex-col gap-4 py-8 border-b-2">
      <span className="h2-bold">Amenities</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockAmenities.slice(0, visibleAmenities).map((amenity) => {
          return (
            <div key={amenity.id} className="flex flex-row items-center gap-4">
              <img src={amenity.icon} alt={amenity.title} className="size-8"/>
              <span>{amenity.title}</span>
            </div>
          );
        })}
        {visibleAmenities < mockAmenities.length && (
          <button onClick={() => setVisibleAmenities(visibleAmenities + 4)}
                  className="w-auto text-accent-orange text-left">
            +{mockAmenities.length - visibleAmenities} more
          </button>
        )}
      </div>

    </div>
  );
}

export default AmenitiesComponent
