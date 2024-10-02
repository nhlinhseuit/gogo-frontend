import Image from "next/image";
import React from "react";
import FlightsSearchTab from "./FlightsSearchTab";

const FlightsBackground = () => {
  return (
    <div className="absolute top-0 left-0 right-0 -z-10 mt-20">
      <Image
        src={"/assets/images/background_flights.svg"}
        alt="DevFlow"
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover object-left-top"
        style={{ width: "100%", height: "calc(70vh - 80px)" }}
      />
      <div
        className="absolute inset-0 left-0 right-0 items-start flex flex-col" // Thêm lớp này để căn giữa
      >
        <div className="w-[30%] ml-40 mt-14"> 
          <p
            className="
              font-inter 
              title-semibold 
              text-white
              dark:text-light-900 
              
              max-sm:hidden"
          >
            Make your travel wishlist, we'll do the rest
          </p>
        </div>
        <p
          className="
            font-inter 
            subtitle-semibold 
            text-white
            ml-40
            mt-4
            dark:text-light-900 
            max-sm:hidden"
        >
          Special offers to suit your plan
        </p>

        {/* SEARCH TAB - HOME*/}
        <FlightsSearchTab />
      </div>
    </div>
  );
};

export default FlightsBackground;
