import { BASE_URL } from "@/constants";
import Stay from "@/types/Stay";

const API_URL = `${BASE_URL}/api/v1/stays/search`;

export const searchStays = async (params: any): Promise<Stay[]> => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${API_URL}?${queryString}`;

    const response = await fetch(urlWithParams, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<Stay[]>;
  } catch (error) {
    console.error("Error fetching Stays:", error);
    throw error;
  }
};
