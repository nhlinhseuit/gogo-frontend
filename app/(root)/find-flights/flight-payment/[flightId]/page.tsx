import "@/app/globals.css";
import React from "react";
import PriceDetails from "@/components/shared/details/PriceDetails";
import FlightInformation from "@/components/shared/details/flights/FlightInformation";
import PaymentOptions from "@/components/shared/details/PaymentOptions";
import PaymentCardSelection from "@/components/shared/details/PaymentCardSelection";

interface FlightPaymentProps {
  flightId: number;
}

const FlightPayment: React.FC<FlightPaymentProps> = ({flightId}) => {
  return (
    <main className="flex w-full flex-col gap-4 py-4">
      <div className="grid w-full grid-cols-5 gap-8 mt-">
        <div className="col-span-3 flex flex-col gap-8">
          <FlightInformation flightId={1} showPrice={true}/>
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

export default FlightPayment

