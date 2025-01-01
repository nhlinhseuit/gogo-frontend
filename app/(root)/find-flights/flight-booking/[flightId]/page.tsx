"use client";

import "@/app/globals.css";
import React, {useEffect, useState} from "react";
import PaymentOptions from "@/components/shared/details/PaymentOptions";
import PaymentCardSelection from "@/components/shared/details/PaymentCardSelection";
import PriceDetailsComponent from "@/components/shared/details/PriceDetailsComponent";
import CountriesDropdown from "@/components/shared/CountriesDropdown";
import {useParams, useSearchParams} from "next/navigation";
import Price from "@/types/Price";
import Card from "@/types/Card";
import {fetchUserCards} from "@/lib/actions/CardActions";
import {getCurrentUser} from "@/utils/util";
import FlightDetails from "@/types/FlightDetails";
import {fetchFlightDetails} from "@/lib/actions/FlightActions";
import Seat from "@/types/Seat";
import {fetchSeat} from "@/lib/actions/SeatActions";
import FlightInformation from "@/components/shared/details/flights/FlightInformation";

interface PageParams {
  flightId: string;
}

interface PassengerDetail {
  name?: string;
  gender?: "male" | "female" | "other";
  nationalID?: string;
}

const FlightBookingPage: React.FC = () => {
  const {flightId} = useParams() as unknown as PageParams;
  const searchParams = useSearchParams();
  const seatIds = searchParams.get("seat_ids")?.split(",") || [];

  const [targetTimeLeft, setTargetTimeLeft] = useState<Date>(new Date());
  const [price, setPrice] = useState<Price | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");
  const [seats, setSeats] = useState<Seat[]>([]);

  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);

  const [guestFirstName, setGuestFirstName] = useState<string>(getCurrentUser().name);
  const [guestLastName, setGuestLastName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>(getCurrentUser().email);
  const [guestPhone, setGuestPhone] = useState<string>(getCurrentUser().phone_number);
  const [guestCountry, setGuestCountry] = useState<string>("United States");

  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [passengerDetails, setPassengerDetails] = useState<Record<string, PassengerDetail>>({});
  const fetchCards = () => {
    fetchUserCards(getCurrentUser().id).then((data) => {
      setCards(data);
      if (data.length > 0) {
        setSelectedCard(data[0]);
      }
    }).catch((error) => {
      console.error('Error fetching user cards:', error);
    });
  }

  const fetchAllSeats = async (seatIds: string[]) => {
    const fetchedSeats: Seat[] = [];

    for (const seatId of seatIds) {
      try {
        const seat = await fetchSeat(seatId);
        console.log(`Fetched seat ${seatId}:`, seat);
        fetchedSeats.push(seat);
      } catch (error) {
        console.error(`Error fetching seat ${seatId}:`, error);
      }
    }

    setSeats(fetchedSeats);
  };

  useEffect(() => {
    fetchFlightDetails(flightId).then((data) => {
      setFlightDetails(data);
    }).catch((error) => {
      console.error('Error fetching flight details:', error);
    });

    if (seatIds.length > 0) {
      fetchAllSeats(seatIds);
    }

    fetchCards();
  }, []);

  const onSelectCountry = (country: string) => {
    setGuestCountry(country);
  }

  useEffect(() => {
    if (seats.length > 0) {
      const totalPrice: Price = seats.reduce((acc, seat) => ({
        base_fare: (acc.base_fare || 0) + (seat.base_fare || 0),
        discount: (acc.discount || 0) + (seat.discount || 0),
        tax: (acc.tax || 0) + (seat.tax || 0),
        service_fee: (acc.service_fee || 0) + (seat.service_fee || 0),
        total: 0, // Will be calculated below
      }), {
        base_fare: 0,
        discount: 0,
        tax: 0,
        service_fee: 0,
        total: 0
      });

      totalPrice.total =
        totalPrice.base_fare -
        totalPrice.discount +
        totalPrice.tax +
        totalPrice.service_fee;

      setPrice(totalPrice);
    }
    const initialPassengers: Record<string, PassengerDetail> = {};
    seats.forEach((seat) => {
      initialPassengers[seat.id] = {
        name: "",
        gender: "male",
        nationalID: ""
      };
    });
    setPassengerDetails(initialPassengers);
  }, [seats]);

  const handleFormSubmit = (seatId: string, passenger: PassengerDetail) => {
    console.log(`Passenger details for seat ${seatId}:`, passenger);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTimeLeft.getTime() - now;

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
  }, [targetTimeLeft]);

  if (!flightId || seatIds.length === 0) {
    return <div>Missing required parameters</div>;
  }

  if (!flightDetails || seats.length === 0 || !price) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex w-full flex-col gap-4">
      <div className="sticky top-0 flex w-screen mb-8 flex-row self-center items-center justify-center gap-4 bg-red-100 text-xl font-semibold">
        <span>We are holding the seats ...</span>
        <img src="/assets/icons/IC_CLOCK.svg" alt="clock"/>
        <span>{timeLeft}</span>
      </div>

      <div className="grid w-full grid-cols-5 gap-8 mt-">
        <div className="col-span-3 flex flex-col gap-8">
          <FlightInformation flightDetails={flightDetails}/>
          {seats.map((seat) => (
            <form key={seat.id} onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit(seat.id, passengerDetails[seat.id]);
            }}>
              <h3 className="mb-4">Passenger Information for Seat {seat.number}</h3>
              <div className="rounded-lg p-4 shadow bg-white w-full flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border-2 rounded-md p-2"

                  value={passengerDetails[seat.id]?.name}
                  onChange={(e) => {
                    setPassengerDetails(prev => ({
                      ...prev,
                      [seat.id]: {
                        ...prev[seat.id],
                        name: e.target.value
                      }
                    }));
                  }}
                />

                <select
                  className="border-2 rounded-md p-2"
                  value={passengerDetails[seat.id]?.gender || ""}
                  onChange={(e) => {
                    setPassengerDetails(prev => ({
                      ...prev,
                      [seat.id]: {
                        ...prev[seat.id],
                        gender: e.target.value as "male" | "female" | "other"
                      }
                    }));
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>


                <input
                  type="text"
                  placeholder="National ID"
                  className="border-2 rounded-md p-2"
                  value={passengerDetails[seat.id]?.nationalID || ""}
                  onChange={(e) => {
                    setPassengerDetails(prev => ({
                      ...prev,
                      [seat.id]: {
                        ...prev[seat.id],
                        nationalID: e.target.value
                      }
                    }));
                  }}
                />

                <button type="submit" className="w-full rounded-lg p-4 bg-primary-100">Save Passenger Info</button>
              </div>
            </form>
          ))}
          <div className="rounded-lg p-4 shadow bg-white w-full flex flex-col gap-4">
            <span className="h2-bold">Who is the Passenger?</span>
            <form className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" placeholder="First Name" className="border-2 rounded-md p-2"
                       value={guestFirstName} onChange={(e) => setGuestFirstName(e.target.value)}/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" placeholder="Last Name" className="border-2 rounded-md p-2"
                       value={guestLastName} onChange={(e) => setGuestLastName(e.target.value)}/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Email" className="border-2 rounded-md p-2"
                       value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)}/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" placeholder="Phone" className="border-2 rounded-md p-2"
                       value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)}/>
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="national-id">National ID</label>
                <input id="national-id" type="text" placeholder="National ID" className="border-2 w-full rounded-md p-2"/>
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="country">Country</label>
                <CountriesDropdown onSelectCountry={onSelectCountry}
                                   selectedCountry={guestCountry}/>
              </div>
            </form>
          </div>

          <PaymentOptions total={price?.total ?? 0}/>
          <PaymentCardSelection cards={cards} fetchCards={fetchCards} onSelectCard={setSelectedCard}
                                selectedCard={selectedCard}/>
          <button className="w-full rounded-lg p-4 bg-primary-100">Book</button>
        </div>
        <div className="col-span-2">
          <PriceDetailsComponent
            flight={flightDetails}
            stay={null}
            seats={seats}
            room={null}
            price={price ?? { base_fare: 0, discount: 0, tax: 0, service_fee: 0, total: 0 }}
          />

        </div>
      </div>
    </main>
  );
}

export default FlightBookingPage;
