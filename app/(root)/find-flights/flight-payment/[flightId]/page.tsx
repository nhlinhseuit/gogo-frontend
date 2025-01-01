// import "@/app/globals.css";
// import React from "react";
// import PriceDetailsComponent from "@/components/shared/details/PriceDetailsComponent";
// import FlightInformation from "@/components/shared/details/flights/FlightInformation";
// import PaymentOptions from "@/components/shared/details/PaymentOptions";
// import PaymentCardSelection from "@/components/shared/details/PaymentCardSelection";
//
// interface FlightPaymentProps {
//   flightId: number;
// }

const FlightPayment: React.FC = () => {
  return (
    <main className="flex w-full flex-col gap-4 py-4">
      {/*<div className="grid w-full grid-cols-5 gap-8 mt-">*/}
      {/*  <div className="col-span-3 flex flex-col gap-8">*/}
      {/*    <FlightInformation flightId={1} showPrice={true}/>*/}
      {/*    <PaymentOptions total={0}/>*/}
      {/*    <PaymentCardSelection/>*/}
      {/*    <button className="w-full rounded-lg p-4 bg-primary-100">Book</button>*/}
      {/*  </div>*/}
      {/*  <div className="col-span-2">*/}
      {/*    <PriceDetailsComponent type="flight" id={1}/>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <h1>flight payment</h1>
    </main>
  );
}

export default FlightPayment