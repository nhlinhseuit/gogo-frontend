import Card from "@/types/Card";
import User from "@/types/User";

interface BookingInfo {
  id: string;
  total_discount: number;
  total_bill: number;
  bookingData: string;
}

interface Payment {
  id: string;
  card: Card;
  user: User;
  booking: BookingInfo;
  type: string;
  payment_time: string;
}

export default Payment;
