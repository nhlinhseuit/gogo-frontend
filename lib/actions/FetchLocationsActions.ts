import { BASE_URL } from "@/constants";
import Location from "@/types/Location";
import { getToken } from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/locations`;

export const fetchLocations = async (): Promise<Location[]> => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,

      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<Location[]>;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};
