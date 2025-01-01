interface BookingFlight {
  id: string;
  user: User;
  status: string;
  bookingDate: string;
  updateDate: string;
  seats: Seat[];
}

export default BookingFlight;

interface Amenity {
  id: string;
  amenity: {
    id: string;
    name: string;
    icon: string;
    isFeatured: boolean;
  };
}

interface AirlinePolicy {
  id: string;
  content: string;
  airline: string;
}

interface Location {
  id: string;
  city: string;
  country: string;
  description: string;
  imageUrl: string;
}

interface Airport {
  id: string;
  code: string;
  name: string;
  location: Location;
}

interface FlightDetails {
  id: string;
  name: string;
  amenities: Amenity[];
  airline: {
    id: string;
    name: string;
    image: string;
    policies: AirlinePolicy[];
  };
  departureAirport: Airport;
  arrivalAirport: Airport;
  gate: string;
  timezone: string;
  departureTime: string;
  arrivalTime: string;
  featured_images: {
    id: string;
    url: string;
  }[];
}

interface Seat {
  id: string;
  seat: {
    id: string;
    flight: FlightDetails;
    number: string;
    seatClass: string;
    baseFare: number;
    serviceFee: number;
    available: boolean;
  };
  booking: {
    id: string;
    user: {
      id: string;
      email: string;
      address: string;
      full_name: string;
      phone_number: string;
      date_of_birth: string;
      avatar_url: string;
      cover_url: string;
    };
    status: string;
    bookingDate: string;
    updateDate: string;
  };
  citizen_id: string;
  citizen_name: string;
}

interface User {
  id: string;
  email: string;
  address: string;
  full_name: string;
  phone_number: string;
  date_of_birth: string;
  avatar_url: string;
  cover_url: string;
}
