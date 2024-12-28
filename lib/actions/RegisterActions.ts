import { BASE_URL } from "@/constants";
import AuthenResult from "@/types/AuthenResult";

const API_URL = `${BASE_URL}/api/v1/auth/register`;

export const registerAccount = async (body: any): Promise<AuthenResult | null> => {
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

    return (await response.json()) as Promise<AuthenResult>;
  } catch (error) {
    console.error("Error fetching registerAccount: ", error);
    return null;

    // TODO: Nếu try catch ở nơi gọi thì sd được throw error này
    // throw error;
  }
};
