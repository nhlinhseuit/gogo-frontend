import type Room from "@/types/Room";

const API_URL = `http://52.64.172.62:8080/api/v1/rooms`

export const fetchRoom = async (roomId: string): Promise<Room> => {
  try {
    const response = await fetch(`${API_URL}/${roomId}`, {
      method: "GET",
      headers: {
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
