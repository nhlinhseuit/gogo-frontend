import React from "react";
import Image from "next/image";

const PlaceComponent = ({ imgUrl, city }: { imgUrl: string; city: string }) => {
  return (
    <div className="flex justify-start items-center mt-6 gap-x-4 cursor-pointer transition-transform transform hover:scale-105 duration-300">
      <div>
        <Image src={imgUrl} alt={city} width={90} height={90} />
      </div>

      <div className="space-y-1">
        <h6 className="paragraph-semibold tracking-wide">{city}</h6>
      </div>
    </div>
  );
};

export default PlaceComponent;
