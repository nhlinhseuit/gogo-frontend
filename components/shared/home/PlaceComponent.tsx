import React from "react";
import Image from "next/image";

const PlacesComponent = ({
  imgUrl,
  placeTitle,
}: {
  imgUrl: string;
  placeTitle: string;
}) => {
  return (
    <div className="cursor-pointer flex justify-center items-center gap-x-4 rounded-2xl shadow-full pl-4 pr-16 py-4 transition-transform transform hover:scale-105 duration-300">
      <div>
        <Image src={imgUrl} alt={placeTitle} width={90} height={90} />
      </div>

      <div>
        <h6 className="mb-1 paragraph-semibold text-gray-600 tracking-wide">
          {placeTitle}
        </h6>
        <ul className="flex gap-x-6 list-disc body-regular">
          <li className="first:list-none">Flights</li>
          <li>Hotels</li>
          <li>Resorts</li>
        </ul>
      </div>
    </div>
  );
};

export default PlacesComponent;
