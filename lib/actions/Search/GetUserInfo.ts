import { BASE_URL } from "@/constants";
import UserInfo from "@/types/UserInfo";

const API_URL = `${BASE_URL}/api/v1/users/`;

export const getUserInfo = async (userId: string): Promise<UserInfo[]> => {
  try {
    const response = await fetch(API_URL + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<UserInfo[]>;
  } catch (error) {
    console.error("Error fetching UserInfo:", error);
    throw error;
  }
};
