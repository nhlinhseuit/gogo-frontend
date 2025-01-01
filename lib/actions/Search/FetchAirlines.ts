import { BASE_URL } from "@/constants";
import Airline from "@/types/Airline";

const API_URL = `${BASE_URL}/api/v1/airlines`;

export const fetchAirlines = async (): Promise<Airline[]> => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<Airline[]>;
  } catch (error) {
    console.error("Error fetching Stays:", error);
    throw error;
  }
};
