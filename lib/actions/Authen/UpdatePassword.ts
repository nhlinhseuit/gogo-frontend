import { BASE_URL } from "@/constants";
import UpdatePasswordResult from "@/types/UpdatePasswordResult";

const API_URL = `${BASE_URL}/api/v1/auth/forgot-password/verify`;

export const updatePassword = async (
  body: any
): Promise<UpdatePasswordResult | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });
    console.log("response: ", response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<UpdatePasswordResult>;
  } catch (error) {
    console.error("Error fetching updatePassword: ", error);
    return null;

    // TODO: Nếu try catch ở nơi gọi thì sd được throw error này
    // throw error;
  }
};
