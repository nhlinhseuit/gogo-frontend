import User from "@/types/User";
import Room from "@/types/Room";
import Stay from "@/types/Stay";

interface StayBooking {
  id: string;
  user: User;
  totalDiscount: number;
  totalBill: 0;
  bookingDate: string;
  status: string;
  room: Room;
  checkinDate: string;
  checkoutDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  stay: Stay;
}

export default StayBooking;
