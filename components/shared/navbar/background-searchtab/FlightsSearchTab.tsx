'use client';

import Image from "next/image";
import React, { use, useState } from "react";
import CustomButton from "../../../CustomButton";
import FlightsInput from "../input-searchtab/FlightsInput";

const FlightsSearchTab = () => {
  const [searchFilter, setSearchFilter] = useState("flights");

  const indicatorClass = "!border-primary-100";
  return (
    <div
      className="
              bg-white
               absolute 
              rounded-[18px]
              shadow-md
              shadow-primary-500
              shadow-(primary-100)
              bottom-0 translate-y-[70%]
              left-0 right-0 mx-24
              flex-col justify-start items-start p-5"
    >
      {/* TITLE */}
      <p
        className="
              font-inter 
             paragraph-semibold
              text-black
              dark:text-light-900 
              max-sm:hidden"
      >
        Where are you flying?
      </p>

      {/* INPUT & ACTION */}
      <FlightsInput />
    </div>
  );
};

export default FlightsSearchTab;
