import { BASE_URL } from "@/constants";
import Flight from "@/types/Flight";

const API_URL = `${BASE_URL}/api/v1/flight-booking/user/`;

export const fetchMyFlights = async (userId: string): Promise<Flight[]> => {
  try {
    const response = await fetch(API_URL + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<Flight[]>;
  } catch (error) {
    console.error("Error fetching Flights:", error);
    throw error;
  }
};
