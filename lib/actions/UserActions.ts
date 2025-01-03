import type User from "@/types/User";
import {getToken} from "@/utils/util";
import {BASE_URL} from "@/constants";
import {handleError} from "@/lib/actions/HandleError";

const API_URL = `${BASE_URL}/api/v1/users`
export const fetchUser = async (userId: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
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
    const data = await response.json();
    return data.data as User;

  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
}

