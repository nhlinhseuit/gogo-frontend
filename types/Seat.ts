interface Seat {
  id: string;
  number: string;
  seatClass: string;
  baseFare: number;
  serviceFee: number;
  available: boolean;
}

export default Seat;
