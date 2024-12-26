import type User from "@/types/User";

interface Review {
  id: string;
  user: User;
  rating: number,
  description: string;
  service_type: string;
}

export default Review;
