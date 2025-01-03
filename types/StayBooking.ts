import User from "@/types/User";
import Room from "@/types/Room";
import Stay from "@/types/Stay";

interface StayBooking {
  id: string;
  user: User;
  total_discount: number;
  total_bill: 0;
  bookingDate: string;
  status: string;
  room: Room;
  checkinDate: string;
  checkoutDate: string;
  first_name: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  stay: Stay;
}

export default StayBooking;
