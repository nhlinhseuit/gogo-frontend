import { fetchMyFlights } from "@/lib/actions/MyBooking/FetchMyFlights";
import { fetchMyStays } from "@/lib/actions/MyBooking/FetchMyStays";
import BookingFlight from "@/types/BookingFlight";
import BookingStay from "@/types/BookingStay";
import { useEffect, useState } from "react";
import AccountTab from "./AccountTab";
import FlightsItem from "./FlightsItem";

const HistoryInfoSection = () => {
  const [bookingFlights, setBookingFlights] = useState<{
    data: BookingFlight[];
  }>({
    data: [],
  });
  const [bookingStays, setBookingStays] = useState<{
    data: BookingStay[];
  }>({
    data: [],
  });

  const [isSelected, setIsSelected] = useState("Flights");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    {
      type: "Flights",
      title: "Flights",
      icon: "/assets/icons/plane.svg",
    },
    {
      type: "Stays",
      title: "Stays",
      icon: "/assets/icons/hotel.svg",
    },
  ];

  const renderData = () => {
    if (isSelected === "Flights") return bookingFlights.data;
    else return bookingStays.data;
  };

  const fetchFlights = async () => {
    setIsLoading(true);
    try {
      fetchMyFlights()
      .then((data: any) => {
        setBookingFlights(data);
        // setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        // setIsLoading(false);
      })
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStays = async () => {
    setIsLoading(true);
    try {
      fetchMyStays()
      .then((data: any) => {
        setBookingStays(data);
        // setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        // setIsLoading(false);
      })
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSelected === "Flights") fetchFlights();
  }, []);

  useEffect(() => {
    if (isSelected === "Stays" && !bookingStays) fetchStays();
  }, [isSelected]);

  console.log('bookingFlights', bookingFlights)
  console.log('bookingStays', bookingStays)

  return (
    <>
      <p className="ml-2 mt-10 text-[24px] font-semibold leading-[20.8px]">
        Tickets/Bookings
      </p>

      <div className=" mt-4 flex justify-evenly h-14 bg-white rounded-lg shadow-full shadow-primary-400">
        <div className="w-full flex">
          <div className="w-1/2">
            <AccountTab
              key={0}
              title={tabs[0].title}
              isSelected={isSelected}
              onClick={() => {
                setIsSelected(tabs[0].title);
              }}
              icon={tabs[0].icon}
            />
          </div>
          <div className="w-[1px] my-4 bg-gray-300"></div>
          <div className="w-1/2">
            <AccountTab
              key={1}
              title={tabs[1].title}
              isSelected={isSelected}
              onClick={() => {
                setIsSelected(tabs[1].title);
              }}
              icon={tabs[1].icon}
            />
          </div>
        </div>
      </div>

      <div>
        {renderData().map((item: any) => (
          <FlightsItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default HistoryInfoSection;
