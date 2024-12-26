interface Seat {
  id: string;
  number: string;
  seat_class: string;
  base_fare: number;
  service_fee: number;
  available: boolean;
}

export default Seat;
