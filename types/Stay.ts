import Location  from "./Location";
import Image from "@/types/Image";
import Amenity from "@/types/Amenity";
interface Stay  {

  id: string;
  name: string;
  amenities: Amenity[];
  address: string;
  location: Location
  rating: number;
  overview: string;
  latitude: number;
  longitude: number;
  advantages: StayAdvantage[];
  star_rating: number;
  stay_type: "HOTEL" | "MOTEL" | "RESORT" | string;
  featured_images: Image[];
  min_price: number,
  review_count: number,
  average_rating: number,
  amenity_count: number,
}
export default Stay;

interface StayAdvantage {
  id: string,
  stay: Stay,
  name: string
}
