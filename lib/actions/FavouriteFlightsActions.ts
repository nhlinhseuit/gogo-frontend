import { BASE_URL } from "@/constants";
import FavouriteFlight from "@/types/FavouriteFlight";
import FavouriteFlights from "@/types/FavouriteFlights";
import { getCurrentUser, getToken } from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/flights/favorites`;

export const fetchFavouriteFlights = async (): Promise<FavouriteFlights[]> => {
  try {
    console.log("fetchFavouriteFlights");

    const token = getToken();

    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<FavouriteFlights[]>;
  } catch (error) {
    console.error("Error fetching favourite flights:", error);
    throw error;
  }
};

export const favouriteAFlight = async (
  outbound_flight_id: any,
  return_flight_id: any
): Promise<FavouriteFlight[]> => {
  try {
    console.log("favouriteAFlight");

    const user = getCurrentUser();
    const userId = user["id"] ?? "";

    const body = {
      user_id: userId,
      outbound_flight_id: outbound_flight_id,
      return_flight_id: return_flight_id,
    };

    const token = getToken();

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<FavouriteFlight[]>;
  } catch (error) {
    console.error("Error favouriteAFlight:", error);
    throw error;
  }
};

export const deleteFavouriteAFlight = async (
  favoriteFlightId: any
): Promise<FavouriteFlight[]> => {
  try {
    console.log("deleteFavouriteAFlight");

    const token = getToken();

    const response = await fetch(API_URL + `/${favoriteFlightId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    });

    console.log("response", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<FavouriteFlight[]>;
  } catch (error) {
    console.error("Error deleteFavouriteAFlight:", error);
    throw error;
  }
};
