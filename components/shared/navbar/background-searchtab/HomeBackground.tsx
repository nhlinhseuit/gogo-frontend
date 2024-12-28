import Image from "next/image";
import React from "react";
import HomeSearchTab from "./HomeSearchTab";

const HomeBackground = () => {
  return (
    <div className="absolute top-0 left-0 right-0 -z-10 p-2">
      <Image
        src={"/assets/images/background.svg"}
        alt="DevFlow"
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover" // Image nằm phía sau
        style={{ width: "100%", height: "70vh", borderRadius: "18px" }}
      />
      <div
        className="absolute inset-0 left-0 right-0 justify-center items-center flex flex-col" // Thêm lớp này để căn giữa
      >
        <p
          className="
            font-inter
            title-semibold 
            text-white
            dark:text-light-900 
            max-sm:hidden"
        >
          Helping Others
        </p>
        <p
          className="
            font-inter 
            main-title-semibold 
            text-white
            m-4
            dark:text-light-900 
            max-sm:hidden"
        >
          LIVE & TRAVEL
        </p>
        <p
          className="
            font-inter 
            subtitle-semibold 
            text-white
            m-0
            dark:text-light-900 
            max-sm:hidden"
        >
          Special offers to suit your plan
        </p>

        {/* SEARCH TAB - HOME*/}
        <HomeSearchTab />
      </div>
    </div>
  );
};

export default HomeBackground;
