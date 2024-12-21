import Image from "../Image";

type SeatClass = "BUSINESS" | "ECONOMY" | "FIRST_CLASS";

interface Flight {
  outbound_flight: FlightDetails;
  return_flight: FlightDetails;
  round_trip: boolean;
}

export default Flight;

interface FlightDetails {
  id: string;
  airline: Airline;
  gate: string;
  timezone: string;
  seats: Seat[];
  departure_airport: Airport;
  arrival_airport: Airport;
  departure_time: string; // ISO 8601 Date string
  arrival_time: string; // ISO 8601 Date string
}

interface Airport {
  id: string;
  code: string;
  name: string;
  location: Location;
}

interface Airline {
  id: string;
  name: string;
  image: string;
  policies: Policy[];
}

interface Policy {
  id: string;
  content: string;
  airline: string;
}

interface Seat {
  id: string;
  flight: FlightInfo;
  number: string;
  seatClass: SeatClass;
  baseFare: number;
  serviceFee: number;
  available: boolean;
}

interface FlightInfo {
  id: string;
  name: string;
  amenities: Amenity[];
  airline: Airline;
  departureAirport: Airport;
  arrivalAirport: Airport;
  gate: string;
  timezone: string;
  departureTime: string; // ISO 8601 Date string
  arrivalTime: string; // ISO 8601 Date string
  featured_images: Image[];
}

interface Amenity {
  id: string;
  amenity: AmenityDetail;
}

interface AmenityDetail {
  id: string;
  name: string;
  icon: string; // Ví dụ: 'IC_WIFI'
  isFeatured: boolean;
}
