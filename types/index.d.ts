interface FlightData {
  id: number;
  isFavourited: boolean;
  rating: number;
  reviews: string;
  price: number;
  img: string;
  countReview: number;
}

interface StayData {
  id: number,
  isFavourited: boolean,
  img: string,
  title: string,
  address: string,
  star: number,
  aminities: string,
  rating: number,
  review: string,
  countReview: number,
  price: number,
}