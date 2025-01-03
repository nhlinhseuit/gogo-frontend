import type Stay from "@/types/Stay";
import type Room from "@/types/Room";
import {BASE_URL} from "@/constants";
import {getToken} from "@/utils/util";
import {handleError} from "@/lib/actions/HandleError";

const API_URL = `${BASE_URL}/api/v1/stays`


export const fetchStay = async (stayId: string): Promise<Stay> => {
  try {
    const response = await fetch(`${API_URL}/${stayId}`, {
      method: "GET",
      headers: {
        // "Authorization": `Bearer ${getCurrentUser().token}`,
        "Content-Type": "application/json",

      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    return await response.json() as Promise<Stay>;
  } catch (error) {
    console.error('Error fetching stay:', error);
    throw error;
  }
};

export const fetchStays = async (): Promise<Stay[]> => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        // "Authorization": `Bearer ${getCurrentUser().token}`,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,

      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() as Promise<Stay[]>;
  } catch (error) {
    console.error('Error fetching stays:', error);
    throw error;
  }
};


export const fetchAvailableRooms = async (stayId: string, checkin: string, checkout: string): Promise<Room[]> => {
  try {
    console.log(`${API_URL}/${stayId}/rooms/available?checkin_date=${checkin}&checkout_date=${checkout}&guests=1`)

    const response = await fetch(`${API_URL}/${stayId}/rooms/available?checkin_date=${checkin}&checkout_date=${checkout}&guests=1`, {
      method: "GET",
      headers: {
        // "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const result = await response.json();
    return result.data as Room[];
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
}

