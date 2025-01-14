"use client";

import "@/app/globals.css";
import React, {useEffect, useState} from "react";
import PaymentOptions from "@/components/shared/details/PaymentOptions";
import PaymentCardSelection from "@/components/shared/details/PaymentCardSelection";
import PriceDetailsComponent from "@/components/shared/details/PriceDetailsComponent";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import Price from "@/types/Price";
import Card from "@/types/Card";
import {fetchUserCards} from "@/lib/actions/CardActions";
import {getCurrentUser} from "@/utils/util";
import FlightDetails from "@/types/FlightDetails";
import {fetchFlightDetails} from "@/lib/actions/FlightActions";
import Seat from "@/types/Seat";
import {fetchSeat} from "@/lib/actions/SeatActions";
import FlightInformation from "@/components/shared/details/flights/FlightInformation";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import {confirmFlightBooking} from "@/lib/actions/BookingActions";
import {toast} from "@/hooks/use-toast";
import NoResult from "@/components/shared/NoResult";

interface PageParams {
  flightId: string;
}

interface PassengerDetail {
  name?: string;
  gender?: "male" | "female" | "other";
  nationalID?: string;
}

const FlightBookingPage: React.FC = () => {
  const router = useRouter();
  const {flightId} = useParams() as unknown as PageParams;
  const searchParams = useSearchParams();
  const seatIds = searchParams.get("seat_ids")?.split(",") || [];
  const return_id = searchParams.get("return_id");

  const [price, setPrice] = useState<Price | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");
  const [seats, setSeats] = useState<Seat[]>([]);
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);
  const [returnFlightDetails, setReturnFlightDetails] = useState<FlightDetails | null>(null);

  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [passengerDetails, setPassengerDetails] = useState<Record<string, PassengerDetail>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentUser = getCurrentUser();

  const fetchCards = () => {
    fetchUserCards(getCurrentUser().id)
      .then((data) => {
        setCards(data);
        if (data.length > 0) {
          setSelectedCard(data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching user cards:', error);
        toast({
          title: `Error fetching user cards: ${error}`,
          variant: "error",
          duration: 3000,
        });
      });
  };

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

  const handleBooking = async (event: any) => {
    event.preventDefault();
    if (!cards || cards.length === 0) {
      toast({
        title: `Please add a card!`,
        variant: "error",
        duration: 3000,
      });
      return;
    }

    if (!selectedCard) {
      toast({
        title: `Please select a card!`,
        variant: "error",
        duration: 3000,
      });
      return;
    }

    if (
      Object.values(passengerDetails).some((passenger) => !passenger.name || !passenger) ||
      !passengerDetails
    ) {
      toast({
        title: `Please fill in all passenger details!`,
        variant: "error",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    const passengerInfo = Object.entries(passengerDetails).map(([seatId, passenger]) => ({
      citizen_id: passenger.nationalID,
      citizen_name: passenger.name,
      seat_id: seatId,
    }));

    confirmFlightBooking(passengerInfo, selectedCard, bookingId)
      .then((data) => {
        setBookingId(data.id);
        console.log('Flight booking confirmed:', data);
        toast({
          title: `Flight booking confirmed!`,
          variant: "success",
          duration: 3000,
        });
        router.push(`/booking/flight-booking/${data.id}`);
      })
      .catch((error) => {
        console.error('Error confirming flight booking:', error);
        toast({
          title: `Error confirming flight booking: ${error}`,
          variant: "error",
          duration: 3000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!currentUser) {
      setTimeout(() => {
        router.push(
          `/login?ref=find-flights/flight-booking/${flightId}&seats=${seatIds.join(",")}`
        );
      }, 2300);
      return;
    }

    // Fetch main flight details
    fetchFlightDetails(flightId)
      .then((data) => {
        setFlightDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching flight details:', error);
      });

    // Fetch return flight details if return_id exists
    if (return_id) {
      fetchFlightDetails(return_id)
        .then((data) => {
          setReturnFlightDetails(data);
        })
        .catch((error) => {
          console.error('Error fetching return flight details:', error);
        });
    }

    if (seatIds.length > 0) {
      fetchAllSeats(seatIds);
    }

    fetchCards();
  }, []);

  useEffect(() => {
    if (seats.length > 0) {
      const totalPrice: Price = seats.reduce(
        (acc, seat) => ({
          base_fare: (acc.base_fare || 0) + (seat.base_fare || 0),
          discount: (acc.discount || 0) + (seat.discount || 0),
          tax: (acc.tax || 0) + (seat.tax || 0),
          service_fee: (acc.service_fee || 0) + (seat.service_fee || 0),
          total: 0,
        }),
        {
          base_fare: 0,
          discount: 0,
          tax: 0,
          service_fee: 0,
          total: 0,
        }
      );

      totalPrice.total =
        totalPrice.base_fare - totalPrice.discount + totalPrice.tax + totalPrice.service_fee;

      setPrice(totalPrice);
    }
    const initialPassengers: Record<string, PassengerDetail> = {};
    seats.forEach((seat) => {
      initialPassengers[seat.id] = {
        name: "",
        gender: "male",
        nationalID: "",
      };
    });
    setPassengerDetails(initialPassengers);
  }, [seats]);

  if (!flightDetails || seats.length === 0 || !price || isLoading) {
    return <BigLoadingSpinner/>;
  }

  if (currentUser === null) {
    return (
      <NoResult
        title="Checking..."
        description="We are checking your informations..."
      />
    );
  }

  if (!currentUser) {
    return (
      <NoResult
        title="Wait a sec..."
        description="You will be redirected to login page in just a few seconds..."
      />
    );
  }

  return (
    <main className="flex w-full flex-col gap-4">
      <div className="grid w-full grid-cols-5 gap-8 mt-">
        <div className="col-span-3 flex flex-col gap-8">
          {/* Outbound Flight Information */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Outbound Flight</h2>
            <FlightInformation flightDetails={flightDetails}/>
          </div>

          {/* Return Flight Information (if exists) */}
          {returnFlightDetails && (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Return Flight</h2>
              <FlightInformation flightDetails={returnFlightDetails}/>
            </div>
          )}

          {/* Passenger Information */}
          {seats.map((seat) => (
            <div key={seat.id} className="rounded-lg p-4 shadow bg-white w-full flex flex-col gap-4">
              <h3 className="mb-4">Passenger Information for Seat {seat.number}</h3>
              <input
                type="text"
                placeholder="Full Name"
                className="border-2 rounded-md p-2"
                value={passengerDetails[seat.id]?.name || ""}
                onChange={(e) => {
                  setPassengerDetails((prev) => ({
                    ...prev,
                    [seat.id]: {
                      ...prev[seat.id],
                      name: e.target.value,
                    },
                  }));
                }}
              />

              <select
                className="border-2 rounded-md p-2"
                value={passengerDetails[seat.id]?.gender || ""}
                onChange={(e) => {
                  setPassengerDetails((prev) => ({
                    ...prev,
                    [seat.id]: {
                      ...prev[seat.id],
                      gender: e.target.value as "male" | "female" | "other",
                    },
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
                  setPassengerDetails((prev) => ({
                    ...prev,
                    [seat.id]: {
                      ...prev[seat.id],
                      nationalID: e.target.value,
                    },
                  }));
                }}
              />
            </div>
          ))}

          <PaymentOptions total={price?.total ?? 0}/>
          <PaymentCardSelection
            cards={cards}
            fetchCards={fetchCards}
            onSelectCard={setSelectedCard}
            selectedCard={selectedCard}
          />
          <button onClick={handleBooking} className="w-full rounded-lg p-4 bg-primary-100">
            Book
          </button>
        </div>
        <div className="col-span-2">
          <PriceDetailsComponent
            flight={flightDetails}
            returnFlight={returnFlightDetails}
            stay={null}
            seats={seats}
            room={null}
            price={price ?? {base_fare: 0, discount: 0, tax: 0, service_fee: 0, total: 0}}
          />
        </div>
      </div>
    </main>
  );
};

export default FlightBookingPage;
