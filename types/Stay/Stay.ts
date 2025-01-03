import LocationType from "../LocationType";

type StayType = "HOTEL" | "HOSTEL" | "RESORT" | "VILLA"; // Example types
type ServiceType = "AIRLINE" | "TRAIN" | "CAR_RENTAL"; // Example types

interface Stay {
  id: string;
  name: string;
  amenities: Amenity[];
  address: string;
  location: LocationType;
  rating: number;
  overview: string;
  latitude: number;
  longitude: number;
  advantages: Advantage[];
  starRating: number;
  stayType: StayType;
  featuredImages: FeaturedImage[];
}

interface Amenity {
  id: string;
  name: string;
  icon: string; // E.g., "IC_WIFI"
  isFeatured: boolean;
}

interface Advantage {
  id: string;
  stay: NestedStay;
  name: string;
}

interface NestedStay {
  id: string;
  name: string;
  amenities: NestedAmenity[];
  address: string;
  location: LocationType;
  rating: number;
  overview: string;
  latitude: number;
  longitude: number;
  advantages: string[];
  reviews: Review[];
  featuredImages: FeaturedImage[];
  starRating: number;
  stayType: StayType;
}

interface NestedAmenity {
  id: string;
  amenity: Amenity;
}

interface Review {
  id: string;
  service: Service;
  user: UserInfo;
  rating: number;
  description: string;
  serviceType: ServiceType;
}

interface Service {
  id: string;
  name: string;
  amenities: NestedAmenity[];
  featuredImages: FeaturedImage[];
}

interface UserInfo {
  id: string;
  first_name: string;
  lastName: string;
}

interface FeaturedImage {
  id: string;
  url: string;
}

interface StayResponse {
  data: Stay[];
  page: number;
  size: number;
  total: number;
  totalPage: number;
}
