import LocationType  from "./LocationType";
import Image from "@/types/Image";
import Amenity from "@/types/Amenity";
interface Stay  {
  id: string;
  name: string;
  amenities: Amenity[];
  address: string;
  location: LocationType
  rating: number;
  overview: string;
  latitude: number;
  longitude: number;
  star_rating: number;
  stay_type: "HOTEL" | "MOTEL" | "RESORT" | string;
  featured_images: Image[];
  min_price: number,
  review_count: number,
  average_rating: number,
  amenity_count: number,
}
export default Stay;

