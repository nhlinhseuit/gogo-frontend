import { BASE_URL } from "@/constants";
import Flight from "@/types/Flight";
import { getToken } from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/stays/booking/all`;

export const fetchMyStays = async (): Promise<Flight[]> => {
  const token = getToken();

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<Flight[]>;
  } catch (error) {
    console.error("Error fetching Stays:", error);
    throw error;
  }
};
