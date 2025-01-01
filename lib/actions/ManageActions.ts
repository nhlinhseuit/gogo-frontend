import {BASE_URL} from "@/constants";
import Room from "@/types/Room";
import {getToken} from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1`
export const getRoomsOfStay = async (stayId: string): Promise<Room[]> => {
  try {
    const response = await fetch(`${API_URL}/stays/admin/${stayId}/rooms/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${getToken()}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch rooms");
    }
    const data = await response.json();
    return data.data as Room[];

  } catch (error) {
    console.log(error);
    throw error;
  }
}