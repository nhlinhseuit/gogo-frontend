import { BASE_URL } from "@/constants";
import ForgotPasswordResult from "@/types/ForgotPasswordResult";

const API_URL = `${BASE_URL}/api/v1/auth/forgot-password`;

export const forgotPassword = async (body: any): Promise<ForgotPasswordResult | null> => {
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

    return (await response.json()) as Promise<ForgotPasswordResult>;
  } catch (error) {
    console.error("Error fetching forgotPassword: ", error);
    return null;

    // TODO: Nếu try catch ở nơi gọi thì sd được throw error này
    // throw error;
  }
};
