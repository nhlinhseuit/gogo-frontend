import { BASE_URL } from "@/constants";
import UserInfo from "@/types/UserInfo";
import { getCurrentUser, getToken } from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/users/`;

export const editUserCoverPicture = async (
  formData: FormData
): Promise<{data: UserInfo}> => {
  try {
    const token = getToken();
    const userInfo = getCurrentUser();
    const userId = userInfo?.["id"] ?? "";

    const response = await fetch(API_URL + userId + "/cover", {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<{data: UserInfo}>;
  } catch (error) {
    console.error("Error editing user cover picture:", error);
    throw error;
  }
};
