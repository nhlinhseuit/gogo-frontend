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
  departure_airport: Airport;
  arrival_airport: Airport;
  departure_time: string;
  arrival_time: string;
}

export default FavouriteFlightDetail;
