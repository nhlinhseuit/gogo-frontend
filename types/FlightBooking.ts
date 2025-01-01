import User from "@/types/User";
import Seat from "@/types/Seat";

interface FlightBooking {
  id: string;
  user: User;
  status: string;
  seats: Seat[];
  booking_date: string;
  update_date: string;
  total_discount: number;
  total_bill: number;
}

export default FlightBooking;
