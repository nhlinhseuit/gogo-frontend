import FlightDetails from "@/types/FlightDetails";

interface Seat {
  id: string;
  flight: FlightDetails;
  number: string;
  seat_class: string;
  base_fare: number;
  service_fee: number;
  tax: number;
  discount: number;
  available: boolean;
}

export default Seat;
