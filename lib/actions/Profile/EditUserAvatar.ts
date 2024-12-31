import { BASE_URL } from "@/constants";
import UserInfo from "@/types/UserInfo";
import { getToken, getCurrentUser } from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/users/`;

export const editUserAvatar = async (
  formData: FormData
): Promise<UserInfo[]> => {
  try {
    const token = getToken();
    const userInfo = getCurrentUser();
    const userId = userInfo?.["id"] ?? "";


    const response = await fetch(API_URL + userId + "/avatar", {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: formData,
    });

    console.log("response", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<UserInfo[]>;
  } catch (error) {
    console.error("Error editing user cover picture:", error);
    throw error;
  }
};
