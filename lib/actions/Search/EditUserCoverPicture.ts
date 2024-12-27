import { BASE_URL } from "@/constants";
import UserInfo from "@/types/UserInfo";

const API_URL = `${BASE_URL}/api/v1/users/`;

export const editUserCoverPicture = async (
  userId: string,
  formData: FormData
): Promise<UserInfo[]> => {
  try {
    console.log("formData", formData);

    const response = await fetch(API_URL + userId + "/cover", {
      method: "PUT",
      // headers: {
      //   "Content-Type": "application/json",
      // },
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
