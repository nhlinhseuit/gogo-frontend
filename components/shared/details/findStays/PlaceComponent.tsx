import React from "react";
import Image from "next/image";

const PlaceComponent = ({
  imgUrl,
  country,
  countPlace,
}: {
  imgUrl: string;
  country: string;
  countPlace: number;
}) => {
  return (
    <div className="flex justify-start items-center mt-6 gap-x-4 cursor-pointer transition-transform transform hover:scale-105 duration-300">
      <div>
        <Image src={imgUrl} alt={country} width={90} height={90} />
      </div>

      <div className="space-y-1">
        <h6 className="paragraph-semibold tracking-wide">{country}</h6>
        <p className="body-regular text-gray-500">{countPlace} places</p>
      </div>
    </div>
  );
};

export default PlaceComponent;
