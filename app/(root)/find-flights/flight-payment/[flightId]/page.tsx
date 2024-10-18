import "@/app/globals.css";
import React from "react";
import PriceDetails from "@/components/shared/details/PriceDetails";
import FlightInformation from "@/components/shared/details/flights/FlightInformation";
import PaymentOptions from "@/components/shared/details/PaymentOptons";
import PaymentCardSelection from "@/components/shared/details/PaymentCardSelection";

interface FlightPaymentProps {
  flightId: number;
}

const FlightPayment: React.FC<FlightPaymentProps> = ({flightId}) => {
  return (
    <div className="w-full grid grid-cols-5 gap-8">
      <div className="flex flex-col gap-8 col-span-3">
        <FlightInformation flightId={1} showPrice={true}/>
        <PaymentOptions />
        <PaymentCardSelection />
      </div>
      <div className="col-span-2">
        <PriceDetails flightId={1} stayId={1}/>
      </div>
    </div>
  );
}

export default FlightPayment

