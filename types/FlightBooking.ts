import User from "@/types/User";
import BookingSeat from "@/types/BookingSeat";

interface FlightBooking {
  id: string;
  seats: BookingSeat[];
  user: User;
  status: string;
  booking_date: string;
  update_date: string;
  total_discount: number;
  total_bill: number;
}

export default FlightBooking;
