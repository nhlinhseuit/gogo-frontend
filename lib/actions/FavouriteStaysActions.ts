import { BASE_URL } from "@/constants";
import FavoriteAStayResult from "@/types/FavoriteAStayResult";
import FavouriteStay from "@/types/FavouriteStay";
import { getCurrentUser, getToken } from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/favorites/stays`;

export const fetchFavouriteStays = async (
  params: any
): Promise<FavouriteStay[]> => {
  try {
    console.log("fetchFavouriteStays");

    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${API_URL}?${queryString}`;

    const token = getToken();

    const response = await fetch(urlWithParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<FavouriteStay[]>;
  } catch (error) {
    console.error("Error fetching favourite stays:", error);
    throw error;
  }
};

export const favouriteAStay = async (
  stay_id: any
): Promise<FavoriteAStayResult> => {
  try {
    console.log("favouriteAStay");

    const user = getCurrentUser();
    const userId = user["id"] ?? "";

    const body = {
      user_id: userId,
      stay_id: stay_id,
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

    return (await response.json()) as Promise<FavoriteAStayResult>;
  } catch (error) {
    console.error("Error favouriteAStay:", error);
    throw error;
  }
};

export const deleteFavouriteAStay = async (id: any) => {
  try {
    console.log("deleteFavouriteAStay");

    const token = getToken();

    const response = await fetch(API_URL + `/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleteFavouriteAStay:", error);
    throw error;
  }
};
