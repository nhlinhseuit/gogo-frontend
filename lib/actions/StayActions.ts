import Stay from "@/types/Stay";

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
