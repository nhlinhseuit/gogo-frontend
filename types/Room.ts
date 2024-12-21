interface Room {
  id: string;
  name: string;
  discount: number;
  tax: number;
  type: string;
  base_fare: number;
  service_fee: number;
  is_available: boolean;
  max_guests: number;
}

export default Room;
