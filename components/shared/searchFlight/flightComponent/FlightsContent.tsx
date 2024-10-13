"use client";

import React, { useState } from "react";
import Image from "next/image";
import CheckFlight from "./CheckFlight";

const MockCheckFlight = [
  {
    startTime: '12:00 pm',
    endTime: '01:28 pm',
    duration: '2h 28m',
    airline: 'Emirates',
    flightPath: 'EWR-BNA'
  },
  {
    startTime: '12:00 pm',
    endTime: '01:28 pm',
    duration: '2h 28m',
    airline: 'Emirates',
    flightPath: 'EWR-BNA'
  },
]

const FlightsComp = ({
  rating,
  reviews,
  img,
  countReview,
  price,
}: FlightData) => {
  const [isFavourited, setIsFavourited] = useState(false);
  return (
    <div className="flex p-4 mt-4 w-[100%] rounded-lg shadow-md shadow-primary-400">
      <div className="w-[20%] p-3">
        <Image src={img} alt="places" width={0} height={0} className="w-full" />
      </div>

      <div className="w-[80%] mx-4 my-2">
        <div className="flex justify-between">
          <div>
            <div className="flex mt-2">
              <div className="flex mr-1 px-3 border border-primary-100 rounded-md justify-center items-center">
                {rating}
              </div>

              <div className="py-2">
                <p>
                  <span className="body-semibold mr-1">{reviews}</span>
                  {countReview} reviews
                </p>
              </div>
            </div>

            <div className="mb-4">
              {MockCheckFlight.map((item, index) => (
                <CheckFlight
                  key={index}
                  startTime = {item.startTime}
                  endTime = {item.endTime}
                  duration = {item.duration}
                  airline = {item.airline}
                  flightPath = {item.flightPath}
                />
              ))}
            </div>

          </div>
          <div className="pt-1 pr-2">
            <div className="text-left body-regular">
              <p>starting from</p>
            </div>
            <div className="flex justify-end text-[#FF8682] text-right">
              <h1 className="h2-bold">${price}</h1>
            </div>
          </div>
        </div>

        <div className="flex w-full pt-5 border-t-[1px]">
          <div
            onClick={() => {
              setIsFavourited(!isFavourited);
            }}
            className="flex px-3 mr-4 border border-primary-100 rounded-md justify-center items-center cursor-pointer"
          >
            {isFavourited ? (
              <Image
                src="/assets/icons/Heart.svg"
                alt="Anh heart"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/assets/icons/flightHeart.svg"
                alt="Anh heart"
                width={20}
                height={20}
              />
            )}
          </div>
          <button className="w-[90%] py-3 rounded-md bg-primary-100 font-semibold">
            View Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightsComp;
