import { BASE_URL } from "@/constants";
import FavouriteFlights from "@/types/FavouriteFlights";

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
    console.log('params:',params)
    const queryString = new URLSearchParams(params).toString();
    console.log("query string", queryString)
    const urlWithParams = `${API_URL}?${queryString}`;
    console.log("urlWithParams", urlWithParams)

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

