import {BASE_URL} from "@/constants";
import Room from "@/types/Room";
import {getToken} from "@/utils/util";
import {handleError} from "@/lib/actions/HandleError";
import Stay from "@/types/Stay";

const API_URL = `${BASE_URL}/api/v1`
export const getRoomsOfStay = async (stayId: string): Promise<Room[]> => {
  try {
    const response = await fetch(`${API_URL}/stays/admin/${stayId}/rooms/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // "Authorization": `Bearer ${getToken()}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);    }
    const data = await response.json();
    return data.data as Room[];

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getStayByOwner = async (): Promise<Stay[]> => {
  try {
    const response = await fetch(`${API_URL}/stays/admin/stays-by-owner`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${getToken()}`
      }
    })

    if(!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();
    return data.data as Stay[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateRoom = async (room: Room): Promise<Room> => {
  try {
    console.log(JSON.stringify(room));
    const response = await fetch(`${API_URL}/rooms/admin/${room.id}`, {

      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify(room)
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();
    return data.data as Room;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
