import { BASE_URL } from "@/constants";
import UserInfo from "@/types/UserInfo";
import { getToken, getCurrentUser } from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/users`;

export const editUserInfo = async (
  key: string,
  value: string
): Promise<UserInfo[]> => {
  try {
    
    const params = { [key]: value };
    const token = getToken();

    const response = await fetch(API_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: params ? JSON.stringify(params) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<UserInfo[]>;
  } catch (error) {
    console.error("Error editing user info:", error);
    throw error;
  }
};
