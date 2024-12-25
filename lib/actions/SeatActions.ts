import type Seat from "@/types/Seat";

const API_URL = `http://52.64.172.62:8080/api/v1/seats`

export const fetchSeat = async (seatId: string): Promise<Seat> => {
  try {
    const response = await fetch(`${API_URL}/${seatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data as Seat;

  } catch (error) {
    console.error('Error fetching seat:', error);
    throw error;
  }
}
