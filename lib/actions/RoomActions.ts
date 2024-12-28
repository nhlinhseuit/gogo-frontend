import type Room from "@/types/Room";
import {BASE_URL} from "@/constants";

const API_URL = `${BASE_URL}/api/v1/rooms`
const TEST_TOKEN = `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`;

export const fetchRoom = async (roomId: string): Promise<Room> => {
  try {
    const response = await fetch(`${API_URL}/${roomId}`, {
      method: "GET",
      headers: {
        "Authorization": TEST_TOKEN,
        "Content-Type": "application/json",
      },
    });

    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data as Room;

  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
}
