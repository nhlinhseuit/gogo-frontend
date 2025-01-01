import { BASE_URL } from "@/constants";
import FavouriteFlights from "@/types/FavouriteFlight";

const API_URL = `${BASE_URL}/api/v1/flights/favorites`;


export const fetchFavouriteFlights = async (userId: string): Promise<FavouriteFlights[]> => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log('response: ', response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<FavouriteFlights[]>;
  } catch (error) {
    console.error("Error fetching favourite stays:", error);
    throw error;
  }
};

export const changeFavouriteStayStatus = async (params: any): Promise<FavouriteFlights[]> => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${API_URL}?${queryString}`;

    const response = await fetch(urlWithParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log('response: ', response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<FavouriteFlights[]>;
  } catch (error) {
    console.error("Error fetching favourite stays:", error);
    throw error;
  }
};

