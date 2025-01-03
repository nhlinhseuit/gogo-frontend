import { BASE_URL } from "@/constants";
import BookingSeat from "@/types/BookingSeat";
import { getToken } from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/stays/booking/all`;

export const fetchMyStays = async (): Promise<BookingSeat[]> => {
  const token = getToken();

  console.log('token', token)
  console.log('API_URL', API_URL)
  
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    });
      console.log('response', response)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<BookingSeat[]>;
  } catch (error) {
    console.error("Error fetching Stays:", error);
    throw error;
  }
};
