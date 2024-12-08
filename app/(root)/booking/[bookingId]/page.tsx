"use client";

import "@/app/globals.css";

import FlightTicket from "@/components/FlightTicket";
import {usePDF} from "react-to-pdf";

const BookingPage = () => {
  const { toPDF, targetRef } = usePDF({filename: "boarding-pass.pdf"});


  const mockFlightBookingData = {
    bookingId: "123456",
    type: "flight",
    planeModel: "Boeing 737",
    class: "Economy",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureTime: "2022-12-31T23:59:59",
    arrivalTime: "2023-01-01T03:00:00",
    price: 100.00,
    gate: "A1",
    seat: "23A",
    departureAirportName: "John F. Kennedy International Airport",
    arrivalAirportName: "Los Angeles International Airport",
    passengerName: "John Doe",
    code: "ABC12345",
  }

  const mockHotelBookingData = {
    bookingId: "123456",
    type: "hotel",
    hotelName: "Hilton",
    roomType: "Standard",
    checkIn: "2022-12-31T15:00:00",
    checkOut: "2023-01-01T11:00:00",
    price: 100.00,
    roomNumber: "123",
    address: "123 Main St, New York, NY 10001",
    guestName: "John Doe",
    code: "ABC12345",
  }

  return (
    <div className="flex flex-col my-4 gap-8">
      <div className="flex flex-col justify-between md:flex-row">
        <span
          className="h2-bold">{mockFlightBookingData.type === "flight" ? mockFlightBookingData.planeModel : mockHotelBookingData.hotelName}</span>
        <span className="h2-bold text-accent-orange">${mockFlightBookingData.price}</span>
      </div>

      <div className="flex flex-col justify-between md:flex-row">
        <span></span>
        <div className="flex flex-row gap-4">
          <button><img className="rounded-md p-4 border-primary-100 border-[1px]" src="/assets/icons/share.svg"
                       alt="Favorite"/></button>
          <button className="rounded-md px-9 py-4 bg-primary-100" onClick={() => toPDF()}>Download</button>

        </div>
      </div>

      <div ref={targetRef}>
        <FlightTicket bookingId={1}/>
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

export default BookingPage;
