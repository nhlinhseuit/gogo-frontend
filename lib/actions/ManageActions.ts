import {BASE_URL} from "@/constants";
import Room from "@/types/Room";
import {getToken} from "@/utils/util";
import {handleError} from "@/lib/actions/HandleError";
import Stay from "@/types/Stay";
import Amenity from "@/types/Amenity";
import LocationType from "@/types/LocationType";
import StayBooking from "@/types/StayBooking";

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

export const createRoom = async (formData: FormData): Promise<Room> => {
  try {
    console.log(formData)
    const response = await fetch(`${API_URL}/rooms/admin`, {
      method: "POST",
      headers: {
        // No 'Content-Type' header is needed for FormData
        "Authorization": `Bearer ${getToken()}`
      },
      body: formData
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
};


export const getAllLocations = async (): Promise<LocationType[]> => {
  try {
    const response = await fetch(`${API_URL}/locations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${getToken()}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();
    return  data.data as LocationType[];

  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
}

export const getAllAmenities = async (): Promise<Amenity[]> => {
  try {
    const response = await fetch(`${API_URL}/amenities`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();
    return data.data as Amenity[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const createNewStay = async (formData: FormData): Promise<Stay> => {
  try {
    const response = await fetch(`${API_URL}/stays/admin`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();
    return data.data as Stay;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllBookings = async (
  roomId: string,
  page: number = 0,
  size: number = 10
): Promise<{ data: StayBooking[]; totalElements: number }> => {
  try {
    const response = await fetch(
      `${API_URL}/stays/booking/admin/all?room_id=${roomId}&page=${page}&size=${size}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${getToken()}`
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();
    console.log(data)
    return {
      data: data.data,
      totalElements: data.total // Adjust this based on your API response
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const updateBookingStatus = async (
  bookingId: string,
  status: string
): Promise<StayBooking> => {
  try {
    const response = await fetch(`${API_URL}/stays/booking/${bookingId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();
    return data.data as StayBooking;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
