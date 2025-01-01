import type User from "@/types/User";
import {getToken} from "@/utils/util";
import type Room from "@/types/Room";
import {BASE_URL} from "@/constants";

const API_URL = `${BASE_URL}/api/v1/users`
export const fetchUser = async (userId: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data as User;

  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
}

