import FlightDetails from "@/types/FlightDetails";


interface Flight {
  outbound_flight: FlightDetails;
  return_flight: FlightDetails;
  round_trip: boolean;
}

export default Flight;
