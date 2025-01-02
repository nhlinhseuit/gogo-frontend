"use client";

import "@/app/globals.css";
import React, {useEffect, useMemo, useState} from "react";
import PaymentOptions from "@/components/shared/details/PaymentOptions";
import PaymentCardSelection from "@/components/shared/details/PaymentCardSelection";
import PriceDetailsComponent from "@/components/shared/details/PriceDetailsComponent";
import StayInformationComponent from "@/components/shared/details/stays/StayInformationComponent";
import type Stay from "@/types/Stay";
import type Room from "@/types/Room";
import {fetchStay} from "@/lib/actions/StayActions";
import CountriesDropdown from "@/components/shared/CountriesDropdown";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import Price from "@/types/Price";
import Card from "@/types/Card";
import {fetchUserCards} from "@/lib/actions/CardActions";
import {convertToLocaleDate, getCurrentUser} from "@/utils/util";
import {confirmStayBooking, fetchStayBooking} from "@/lib/actions/BookingActions";
import BigLoadingSpinner from "@/components/shared/BigLoadingSpinner";
import {toast} from "@/hooks/use-toast";

interface PageParams {
  stayId: string;
}

const StayBookingPage: React.FC = () => {
  const router = useRouter();
  const {stayId} = useParams() as unknown as PageParams;
  const searchParams = useSearchParams();
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const bookingId = searchParams.get("booking_id");
  const lock_expiration = searchParams.get("expiration");


  if (!stayId || !checkin || !checkout || !lock_expiration) {
    return <div>
      Missing required parameters
    </div>
  }
  const targetTime = useMemo(() => convertToLocaleDate(lock_expiration), [lock_expiration]);

  const [timeLeft, setTimeLeft] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [price, setPrice] = useState<Price | null>(null);
  const [stayData, setStayData] = useState<Stay | null>(null);
  const [roomData, setRoomData] = useState<Room | null>(null);
  const [bookingData, setBookingData] = useState<any | null>(null);

  const [guestFirstName, setGuestFirstName] = useState<string>(getCurrentUser().name);
  const [guestLastName, setGuestLastName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>(getCurrentUser().email);
  const [guestPhone, setGuestPhone] = useState<string>(getCurrentUser().phone_number);
  const [guestCountry, setGuestCountry] = useState<string>("United States");

  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);


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

  useEffect(() => {
    fetchStayBooking(bookingId!).then((data) => {
      setBookingData(data);
      setRoomData(data.room);

    }).catch((error) => {
      toast({
        title: `Error fetching booking: ${error}`,
        variant: "error",
        duration: 3000,
      });
    });

    fetchStay(stayId).then((data) => {
      setStayData(data);
    }).catch((error) => {
      toast({
        title: `Error fetching stay: ${error}`,
        variant: "error",
        duration: 3000,
      });
    });

    fetchCards();
  }, []);

  const onSelectCountry = (country: string) => {
    setGuestCountry(country);
  }

  if (!stayId || !checkin || !checkout || !targetTime) {
    return <div>
      Missing required parameters
    </div>
  }

  const handleBooking = () => {
    if (!selectedCard) {
      toast({
        title: "Please select a card",
        variant: "error",
        duration: 3000,
      });
      return;
    }

    const customerInfo = {
      customer_name: guestFirstName + " " + guestLastName,
      customer_email: guestEmail,
      customer_phone: guestPhone,
      customer_country: guestCountry,
    };

    setIsLoading(true);

    confirmStayBooking(customerInfo, selectedCard, bookingData.id)
      .then(() => {
        toast({
          title: "Booking successful",
          variant: "success",
          duration: 3000,
        });
      })
      .catch((error) => {
        toast({
          title: `Error confirming booking: ${error}`,
          variant: "error",
          duration: 3000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (roomData) {
      setPrice({
        base_fare: roomData.base_fare ?? 0,
        discount: roomData.discount ?? 0,
        tax: roomData.tax ?? 0,
        service_fee: roomData.service_fee ?? 0,
        total:
          (roomData.base_fare ?? 0) -
          (roomData.discount ?? 0) +
          (roomData.tax ?? 0) +
          (roomData.service_fee ?? 0),
      });
    }
  }, [roomData]);


  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetTime.getTime() - now;
      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft("Time's up!");
        router.back();
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer(); // Call immediately to avoid delay

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [targetTime]);

  if (!stayData || !roomData || isLoading) {
    return <BigLoadingSpinner/>
  }

  return (
    <main className="flex w-full flex-col gap-4">
      <div
        className="sticky top-0 flex w-screen mb-8 flex-row self-center items-center justify-center gap-4 bg-red-100 text-xl font-semibold">
        <span>We are holding this room. Please finish your booking in </span>
        <img src="/assets/icons/IC_CLOCK.svg" alt="clock"/>
        <span>{timeLeft}</span>
      </div>

      <div className="grid w-full grid-cols-5 gap-8 mt-">
        <div className="col-span-3 flex flex-col gap-8">
          <StayInformationComponent checkin={checkin} checkout={checkout} stayId={stayId} roomId={roomData.id}/>
          <div className="rounded-lg p-4 shadow bg-white w-full flex flex-col gap-4">
            <span className="h2-bold">Who is the lead guest?</span>
            <form action="" className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" placeholder="First Name" className="border-2 rounded-md p-2"
                       value={guestFirstName} onChange={
                  (e) => setGuestFirstName(e.target.value)
                }/>
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
                <label htmlFor="country">Country</label>
                <CountriesDropdown onSelectCountry={() => onSelectCountry(guestCountry)}
                                   selectedCountry={guestCountry}/>
              </div>
            </form>
          </div>
          <PaymentOptions total={price?.total ?? 0}/>
          <PaymentCardSelection cards={cards} fetchCards={fetchCards} onSelectCard={setSelectedCard}
                                selectedCard={selectedCard}/>
          <button onClick={() => handleBooking()} className="w-full rounded-lg p-4 bg-primary-100">Book</button>
        </div>
        <div className="col-span-2">
          <PriceDetailsComponent room={roomData} stay={stayData} seats={[]} flight={null} price={price!}/>
        </div>
      </div>
    </main>
  );
}

export default StayBookingPage;
