import "@/app/globals.css";
import React from "react";
import PriceDetails from "@/components/shared/details/PriceDetails";
import FlightInformation from "@/components/shared/details/flights/FlightInformation";
import PaymentOptions from "@/components/shared/details/PaymentOptions";
import PaymentCardSelection from "@/components/shared/details/PaymentCardSelection";
import StayInformation from "@/components/shared/details/stays/StayInformation";

interface FlightPaymentProps {
  flightId: number;
}

const FlightPayment: React.FC<FlightPaymentProps> = ({flightId}) => {
  return (
    <main className="flex flex-col w-full gap-4 py-4">
      <div className="w-full mt- grid grid-cols-5 gap-8">
        <div className="flex flex-col gap-8 col-span-3">
          <StayInformation flightId={1} showPrice={true}/>
          <PaymentOptions/>
          <PaymentCardSelection/>
          <button className="w-full rounded-lg p-4 bg-primary-100">Book</button>
        </div>
        <div className="col-span-2">
          <PriceDetails type="room" id={1}/>
        </div>
      </div>
    </main>
  );
}

export default FlightPayment

