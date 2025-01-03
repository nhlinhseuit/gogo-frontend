import { BASE_URL } from "@/constants";
import LocationType from "@/types/LocationType";
import { getToken } from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/locations`;

export const fetchLocations = async (): Promise<LocationType[]> => {
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

    return (await response.json()) as Promise<LocationType[]>;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};
