import Airline from "@/types/Airline";
import Seat from "@/types/Seat";
import Airport from "@/types/Airport";

  interface FlightDetails {
  id: string;
  airline: Airline;
  gate: string;
  timezone: string;
  seats: Seat[];
  min_base_fare: number;
  departure_airport: Airport;
  arrival_airport: Airport;
  departure_time: string; // ISO 8601 Date string
  arrival_time: string; // ISO 8601 Date string
}

export default FlightDetails;