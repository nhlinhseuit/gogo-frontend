"use client";

import "@/app/globals.css";
import React, {useEffect, useState} from "react";
import PaymentOptions from "@/components/shared/details/PaymentOptions";
import PaymentCardSelection from "@/components/shared/details/PaymentCardSelection";
import PriceDetails from "@/components/shared/details/PriceDetails";
import StayInformation from "@/components/shared/details/stays/StayInformation";

interface StayBookingPageProps {
  id: number;
}

const StayBookingPage: React.FC<StayBookingPageProps> = (props) => {
  // Ensure target date format is consistent
  const targetTime = new Date("2024-11-01T24:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    console.log("useEffect is running");
    console.log(new Date().getTime());
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;
      console.log("haha")
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("Time's up!");
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return (

    <main className="flex w-full flex-col gap-4">
      <div
        className="sticky top-0 flex w-screen mb-8 flex-row self-center items-center justify-center gap-4 bg-red-100 text-xl font-semibold">
        <span>We are holding this room...</span>
        <img src="/assets/icons/clock.svg" alt="clock"/>
        <span>{timeLeft}</span>
      </div>

      <div className="grid w-full grid-cols-5 gap-8 mt-">
        <div className="col-span-3 flex flex-col gap-8">
          <StayInformation flightId={1} showPrice={true}/>
          <div className="rounded-lg p-4 shadow bg-white w-full flex flex-col gap-4">

            <span className="h2-bold">Who is the lead guest?</span>
            <form action="" className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Name" className="border-2 rounded-md p-2"/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" className="border-2 rounded-md p-2"/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone">Phone</label>
                <input type="tel" placeholder="Phone" className="border-2 rounded-md p-2"/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="country">Country</label>
                <select id="country" className="border-2 rounded-md p-2">
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">UK</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>


            </form>
          </div>
          <PaymentOptions/>
          <PaymentCardSelection/>
          <button className="w-full rounded-lg p-4 bg-primary-100">Book</button>
        </div>
        <div className="col-span-2">
          <PriceDetails type="flight" id={1}/>
        </div>
      </div>
    </main>

  );
}

export default StayBookingPage;
