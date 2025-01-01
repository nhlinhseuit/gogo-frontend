import Seat from "@/types/Seat";

interface BookingSeat {
  id: string;
  seat: Seat;
  citizen_id: string;
  citizen_name: string;
}

export default BookingSeat;
