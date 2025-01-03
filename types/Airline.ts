import type Amenity from "@/types/Amenity";
import type Policy from "@/types/Policy";
import type Review from "@/types/Review";
import Image from "@/types/Image";

interface Airline {
  id: string;
  name: string;
  amenities: Amenity[];
  image: string
  policies: Policy[];
  // reviews: Review[];
  rating: number;
  featured_images: Image[];
  review_count: number;
}

export default Airline;
