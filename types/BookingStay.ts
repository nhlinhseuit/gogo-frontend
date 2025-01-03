import Room from "./Room";
import Seat from "./Seat";
import User from "./User";

interface BookingStay {
  id: string;
  user: User;
  status: string;
  bookingDate: string;
  updateDate?: string;
  seats?: SeatBookingStay[];
  room?: Room;
  checkinDate?: string;
  checkoutDate?: string;
  totalDiscount?: number;
  totalBill?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
}

interface SeatBookingStay {
  seatNumber: string; 
  seatType: string; 
}

export default BookingStay;