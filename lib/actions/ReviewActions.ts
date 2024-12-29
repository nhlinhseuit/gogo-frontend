import type Review from "@/types/Review";

import {BASE_URL} from "@/constants";
import {getCurrentUser} from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/reviews`

interface ReviewResponse {
  data: Review[];
  page: number;
  size: number;
  total: number;
  total_page: number;
}

export const fetchServiceReview = async (serviceId: string, page: number = 0, size: number = 10): Promise<ReviewResponse> => {

  console.log(getCurrentUser().token)

  try {
    const response = await fetch(`${API_URL}?service_id=${serviceId}&page=${page}&page_size=${size}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCurrentUser().token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as ReviewResponse;
  } catch (error) {
    console.error('Error fetching service reviews:', error);
    throw error;
  }
}

export const postReview = async (serviceId: string, description: string, rating: number, serviceType: string): Promise<Review> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getCurrentUser().token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: getCurrentUser().id,
        service_id: serviceId,
        description,
        rating,
        service_type: serviceType,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as Review;
  } catch (error) {
    console.error('Error posting review:', error);
    throw error;
  }
}
