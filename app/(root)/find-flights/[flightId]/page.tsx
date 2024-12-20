import "@/app/globals.css";
import LocationComponent from "@/components/shared/details/LocationComponent";
import Ratings from "@/components/shared/details/Ratings";
import Checkbox from "@/components/shared/Checkbox";
import FlightInformation from "@/components/shared/details/flights/FlightInformation";
import ReviewsSection from "@/components/shared/details/ReviewsSection";

interface FlightDetailProps {
  params: {
    flightId: string;
    flightTitle: string;
  };
}

export default function FlightDetail({params}: FlightDetailProps) {
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

  return (
    <main className="flex flex-col w-full gap-4 py-4">
      <div className="flex flex-row justify-between">
        <span className="h2-bold">{mockFlightData.planeModel}</span>
        <span className="h2-bold text-accent-orange">
          ${mockFlightData.baseFare}
        </span>
      </div>
      <Location location={mockFlightData.departureAirportName}/>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Ratings rating={4.5} numberOfReviews={100}/>
        <div className="flex flex-row gap-4">
          <button><img className="rounded-md p-4 border-primary-100 border-[1px]"
                       src="/assets/icons/favorite-outlined.svg" alt="Favorite"/></button>
          <button><img className="rounded-md p-4 border-primary-100 border-[1px]" src="/assets/icons/share.svg"
                       alt="Favorite"/></button>
          <button className="rounded-md px-9 py-4 bg-primary-100">Book Now</button>
        </div>
      </div>
      <img src={mockFlightData.imageUrl} alt="Flight"/>
      <div className="flex flex-row justify-between">
        <span className="h2-bold">Basic Economy Features</span>
        <div className="flex gap-4">
          <Checkbox label={"Economy"}/>
          <Checkbox label={"First Class"}/>
          <Checkbox label={"Business Class"}/>
        </div>
      </div>
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

      <div className="flex flex-col rounded p-4 bg-primary-100">
        <span className="h2-bold">Emirates Airline Policies</span>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex flex-row items-center gap-4">
            <img src="/assets/icons/IC_CLOCK.svg" alt="Bullet point"/>
            <span className="font-light">Pre-flight cleaning, installation of cabin HEPA filters.</span>
          </div>
          <div className="flex flex-row items-center gap-4">
            <img src="/assets/icons/IC_CLOCK.svg" alt="Bullet point"/>
            <span className="font-light">Pre-flight health screening questions.</span>
          </div>
        </div>
      </div>

      <FlightInformation flightId={1}
                         className="my-4"/>

      <FlightInformation flightId={1}
                         className="my-4"/>

      <ReviewsSection type={"flight"} id={1} />
    </main>
  );
}
