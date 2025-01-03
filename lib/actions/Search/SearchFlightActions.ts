import { BASE_URL } from "@/constants";
import Flight from "@/types/Flight";
import { getToken } from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/flights/filter`;

export const searchFlights = async (body: any): Promise<Flight[]> => {
  try {
    // const token = getToken();
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token ?? ""}`,
      },
      body: body ? JSON.stringify(body) : null,
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
