import { BASE_URL } from "@/constants";
import VerifyCodeResult from "@/types/VerifyCodeResult";

const API_URL = `${BASE_URL}/api/v1/auth/forgot-password/verify`;

export const verifyCode = async (
  body: any
): Promise<VerifyCodeResult | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<VerifyCodeResult>;
  } catch (error) {
    console.error("Error fetching verifyCode: ", error);
    return null;

    // TODO: Nếu try catch ở nơi gọi thì sd được throw error này
    // throw error;
  }
};
