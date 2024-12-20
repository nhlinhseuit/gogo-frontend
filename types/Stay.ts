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
  advantages: string[];
  star_rating: number;
  stay_type: "HOTEL" | "HOSTEL" | "RESORT" | "VILLA" | "APARTMENT" | string;
  featured_images: Image[];
}
export default Stay;
