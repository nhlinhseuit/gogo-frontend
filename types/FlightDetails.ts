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
  departure_airport: Airport;
  arrival_airport: Airport;
  departure_time: string; // ISO 8601 Date string
  arrival_time: string; // ISO 8601 Date string
    featured_images: Image[];
}

export default FlightDetails;
