import Airline from "@/types/Airline";
import Seat from "@/types/Seat";
import Airport from "@/types/Airport";

  interface FavouriteFlightDetail {
  id: string;
  airline: Airline;
  gate: string;
  timezone: string;
  seats: Seat[];
  minBaseFare: number;
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureTime: string; 
  arrivalTime: string;
}

export default FavouriteFlightDetail;
