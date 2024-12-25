import type Stay from "@/types/Stay";
import type Room from "@/types/Room";

const API_URL = `http://52.64.172.62:8080/api/v1/stays`


export const fetchStay = async (stayId: string): Promise<Stay> => {
  try {
    const response = await fetch(`${API_URL}/${stayId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
        "Content-Type": "application/json",
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



export const fetchAvailableRooms = async(stayId: string): Promise<Room[]> => {
  try {
    // const response = await fetch(`${API_URL}/${stayId}/rooms`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // test url
    const testUrl = `http://52.64.172.62:8080/api/v1/stays/1/rooms/available?checkin_date=2024-12-29&checkout_date=2024-12-30&guests=1`

    const response = await fetch(testUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data as Room[];
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
}
