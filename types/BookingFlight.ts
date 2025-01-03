import FlightDetails from "./FlightDetails";
import LocationType from "./LocationType";
import User from "./User";

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

interface Airport {
  id: string;
  code: string;
  name: string;
  location: LocationType;
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
      fullName: string;
      phone_number: string;
      date_of_birth: string;
      avatar_url: string;
      cover_url: string;
    };
    status: string;
    booking_date: string;
    update_date: string;
  };
  citizen_id: string;
  citizen_name: string;
}
