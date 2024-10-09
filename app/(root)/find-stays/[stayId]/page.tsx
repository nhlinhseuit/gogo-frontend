import "@/app/globals.css";
import Location from "@/components/shared/details/Location";
import Ratings from "@/components/shared/details/Ratings";
import Checkbox from "@/components/shared/Checkbox";
import FlightInformation from "@/components/shared/details/flights/FlightInformation";
import ReviewsSection from "@/components/shared/details/ReviewsSection";
import HotelStars from "@/components/shared/details/stays/HotelStars";

interface StayDetailProp {
  params: {
    flightId: string;
    flightTitle: string;
    stayId: string;
  };
}

export default function StayDetail({params}: StayDetailProp) {
  const mockFlightData = {
    id: params.flightId,
    departure: "2022-01-01T00:00:00Z",
    arrival: "2022-01-01T01:00:00Z",
    departureAirportName: "John F. Kennedy International Airport",
    arrivalAirportName: "Los Angeles International Airport",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    planeModel: "Boeing 737",
    baseFare: 100,
    imageUrl: "/assets/images/flight.png",
  };

  const mockStaysData = {
    id: params.stayId,
    name: "Hotel California",
    location: "Los Angeles, California",
    rating: 4.5,
    stars: 5,
    numberOfReviews: 100,
    price: 100,
    imageUrl: "/assets/images/flight.png",
  };

  return (
    <main className="flex w-full flex-col gap-4 py-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start md:flex-row md:items-center gap-4">
          <span className="h2-bold">{mockStaysData.name}</span>
          <HotelStars stars={mockStaysData.stars} />
        </div>
        <span className="h2-bold text-accent-orange">
          ${mockStaysData.price}<span className="text-sm">/night</span>
        </span>
      </div>
      <Location location={mockStaysData.location}/>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Ratings rating={mockStaysData.rating} numberOfReviews={mockStaysData.numberOfReviews}/>
        <div className="flex flex-row gap-4">
          <button><img className="rounded-md p-4 border-primary-100 border-[1px]"
                       src="/assets/icons/favorite-outlined.svg" alt="Favorite"/></button>
          <button><img className="rounded-md p-4 border-primary-100 border-[1px]" src="/assets/icons/share.svg"
                       alt="Favorite"/></button>
          <button className="rounded-md px-9 py-4 bg-primary-100">Book Now</button>
        </div>
      </div>
      <img src={mockStaysData.imageUrl} alt="Hotel"/>
      {/*TODO: Replace with carousel*/}
      <div className="flex flex-row items-center justify-between gap-4 overflow-x-auto">
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
        <img src="/assets/images/flight-mock-image00001.jpg"/>
      </div>


      <ReviewsSection type={"flight"} id={1} />
    </main>
  );
}
