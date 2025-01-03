"use client";

import React, {useEffect, useState} from "react";
import {usePDF} from "react-to-pdf";
import {useParams} from "next/navigation";
import StayBooking from "@/types/StayBooking";
import {fetchStay} from "@/lib/actions/StayActions";
import {fetchStayBooking} from "@/lib/actions/BookingActions";
import {toast} from "@/hooks/use-toast";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import StayTicket from "@/components/shared/details/stays/StayTicket";
import stayBooking from "@/types/StayBooking";


interface StayBookingInfoPageParams {
  bookingId: string;
}

const StayBookingInfoPage: React.FC = () => {
  const {toPDF, targetRef} = usePDF({filename: "boarding-pass.pdf"});
  const {bookingId} = useParams() as unknown as StayBookingInfoPageParams;


  const [stayBookingData, setStayBookingData] = useState<StayBooking | null>(null);

  useEffect(() => {
    fetchStayBooking(bookingId).then((data) => {
      setStayBookingData(data);
      console.log(stayBookingData)
    }).catch((error) => {
      console.error('Error fetching flight booking:', error);
      toast({
        title: `Error fetching Booking: ${error}`,
        variant: "error",
        duration: 3000,
      });
    });
  }, []);

  if (!bookingId) return <div>Invalid Flight ID</div>;

  if (!stayBookingData) return <BigLoadingSpinner/>;

  return (
    <div className="flex flex-col my-4 gap-8">
      <div className="flex flex-col justify-between">
        <span className="h2-bold">{stayBookingData.stay.name}</span>
        <span>{stayBookingData.stay.location.city}</span>
      </div>

      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex flex-row gap-4">
          <button className="rounded-md px-9 py-4 bg-primary-100" onClick={() => toPDF()}>Download</button>
        </div>
      </div>
      <div ref={targetRef}>
        {stayBookingData && <StayTicket booking={stayBookingData}/>}
      </div>

      <div className="h2-bold">Terms and Conditions</div>
      <div className="text-sm">
        <div className="my-4 text-xl">Payments</div>
        <ul className="flex list-disc flex-col gap-2 pl-4">
          <li>
            If you are purchasing your ticket using a debit or credit card via the Website, we will process these
            payments via the automated secure common payment gateway which will be subject to fraud screening purposes.
          </li>
          <li>
            If you do not supply the correct card billing address and/or cardholder information, your booking will not
            be confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is
            declined for any reason or if you have supplied incorrect card information. If we become aware of, or is
            notified of, any fraud or illegal activity associated with the payment for the booking, the booking will be
            cancelled and you will be liable for all costs and expenses arising from such cancellation, without
            prejudice to any action that may be taken against us.
          </li>
          <li>
            Gogo may require the card holder to provide additional payment verification upon request by either
            submitting an online form or visiting the nearest Gogo office, or at the airport at the time of check-in.
            Gogo reserves the right to deny boarding or to collect a guarantee payment (in cash or from another credit
            card) if the card originally used for the purchase cannot be presented by the cardholder at check-in or when
            collecting the tickets, or in the case the original payment has been withheld or disputed by the card
            issuing bank. Credit card details are held in a secured environment and transferred through an
            internationally accepted system.
          </li>
        </ul>
      </div>

      <div className="text-sm">
        <div className="my-4 text-xl">Contact Us</div>
        <div>If you have any questions about our Website or our Terms of Use, please contact:</div>
        <div>Gogo Group Q.C.S.C</div>
        <div>Gogo Tower</div>
        <div>P.O. Box:22550</div>
        <div>Doha, State of Qatar</div>
        <div>Further contact details can be found at <a href="" className="underline">gogo.com/help</a></div>
      </div>
    </div>

  )
};
export default StayBookingInfoPage
