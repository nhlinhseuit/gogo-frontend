import type Review from "@/types/Review";

import {BASE_URL} from "@/constants";
import {getCurrentUser, getToken} from "@/utils/util";
import {fetchUser} from "@/lib/actions/UserActions";
import User from "@/types/User";
import {handleError} from "@/lib/actions/HandleError";

const API_URL = `${BASE_URL}/api/v1/reviews`

interface ReviewResponse {
  data: Review[];
  page: number;
  size: number;
  total: number;
  total_page: number;
}

export const fetchServiceReview = async (serviceId: string, page: number = 0, size: number = 10): Promise<ReviewResponse> => {
  try {
    const response = await fetch(`${API_URL}?service_id=${serviceId}&page=${page}&page_size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();

    const reviews: Review[] = await Promise.all(
      data.data.map(async (reviewData: any): Promise<Review> => {
        const user: User = await fetchUser(reviewData.user_id); // Fetch user details
        return {
          id: reviewData.id,
          user,
          rating: reviewData.rating,
          description: reviewData.description,
          service_type: reviewData.service_type,
        };
      })
    );

    return {
      data: reviews,
      page: data.page,
      size: data.size,
      total: data.total,
      total_page: data.total_page,
    };
  } catch (error) {
    console.error('Error fetching service reviews:', error);
    throw error;
  }
};

export const postReview = async (serviceId: string, description: string, rating: number, serviceType: string): Promise<Review> => {
  try {
    console.log(getToken())
    const body = {
      user_id: getCurrentUser().id,
      service_id: serviceId,
      description,
      rating,
      service_type: serviceType,
    }
    console.log(JSON.stringify(body));
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }
    const data = await response.json();
    return data as Review;
  } catch (error) {
    console.error('Error posting review:', error);
    throw error;
  }
}
