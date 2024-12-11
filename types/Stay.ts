import Location  from "./Location";
interface Stay  {

  id: string;
  name: string;
  amenities: string[];
  address: string;
  location: Location
  rating: number;
  overview: string;
  latitude: number;
  longitude: number;
  advantages: string[];
  star_rating: number;
  stay_type: "HOTEL" | "HOSTEL" | "RESORT" | "VILLA" | "APARTMENT" | string;
  featured_images: string[];
}
export default Stay;
