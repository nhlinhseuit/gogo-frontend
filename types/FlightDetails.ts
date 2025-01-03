import Airline from "@/types/Airline";
import Seat from "@/types/Seat";
import Airport from "@/types/Airport";
import Image from "@/types/Image";

  interface FlightDetails {
  id: string;
  name: string;
  airline: Airline;
  gate: string;
  timezone: string;
  seats: Seat[];
  minBaseFare: number;
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureTime: string; // ISO 8601 Date string
  arrivalTime: string; // ISO 8601 Date string
    featured_images: Image[];
}

export default FlightDetails;
