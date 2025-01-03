import type Room from "@/types/Room";
import {BASE_URL} from "@/constants";
import {getToken} from "@/utils/util";
import {handleError} from "@/lib/actions/HandleError";

const API_URL = `${BASE_URL}/api/v1/rooms`
const TEST_TOKEN = `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`;

export const fetchRoom = async (roomId: string): Promise<Room> => {
  try {
    const response = await fetch(`${API_URL}/${roomId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }
    const data = await response.json();
    return data.data as Room;

  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
}
