import { BASE_URL } from "@/constants";
import UserInfo from "@/types/UserInfo";
import { getToken, getCurrentUser } from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/users/`;

export const editUserInfo = async (
  key: string,
  value: string
): Promise<UserInfo[]> => {
  try {
    const token = getToken();
    const userInfo = getCurrentUser();
    const userId = userInfo?.["id"] ?? "";

    // const updatedData = { ...userInfo, [key]: value };

    const updatedData = {
      "id": "1e47c634-21ef-44ea-a035-b89e3d01c775",
      "email": "linh72vn@gmail.com",
      "address": null,
      "enabled": true,
      "authorities": [
        {
          authority: "USER",
        },
      ],
      "username": "linh72vnvn@gmail.com",
      "accountNonExpired": true,
      "accountNonLocked": true,
      "credentialsNonExpired": true,
      "full_name": "nguyenlinh",
      "phone_number": "0378060972",
      "date_of_birth": null,
      "avatar_url":
        "http://res.cloudinary.com/dhwz3ojau/image/upload/v1735392961/gogo/avatars/1e47c634-21ef-44ea-a035-b89e3d01c775.png",
      "cover_url":
        "http://res.cloudinary.com/dhwz3ojau/image/upload/v1735392002/gogo/covers/1e47c634-21ef-44ea-a035-b89e3d01c775.jpg",
      "user_type": "USER",
      "is_deleted": false,
    };

    const response = await fetch(API_URL + userId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: JSON.stringify(updatedData),
    });

    console.log("response", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Promise<UserInfo[]>;
  } catch (error) {
    console.error("Error editing user info:", error);
    throw error;
  }
};
