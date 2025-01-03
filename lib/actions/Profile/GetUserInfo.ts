import { BASE_URL } from "@/constants";
import UserInfo from "@/types/UserInfo";
import { getCurrentUser, getToken } from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/users/`;

export const getUserInfo = async (): Promise<UserInfo[]> => {

  const token = getToken();
  const userInfo = getCurrentUser();
  const userId = userInfo?.["id"] ?? "";

  try {
    const response = await fetch(API_URL + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
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
