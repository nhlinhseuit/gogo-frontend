import {BASE_URL} from "@/constants";
import {formatDateToYYYYMMDD, getCurrentUser, getToken} from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1`

export const requestStayBooking = async (stayId: string, roomId: string, checkin: string, checkout: string) => {
  try {
    const body = {
      user_id: getCurrentUser().id,
      room_id: roomId,
      booking_date: formatDateToYYYYMMDD(new Date().toISOString()),
      checkin_date: checkin,
      checkout_date: checkout,
    }
    console.log(JSON.stringify(body))
    const response = await fetch(`${API_URL}/stays/booking`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })

    const data = await response.json();
    return {
      booking_id: data.id,
      lock_expiration: data.lock_expiration,
    };
  } catch (error) {
    console.error('Error requesting booking:', error);
    throw error;
  }
}

export const flightBookingInit = async (seatIds: string[]) => {
  try {
    const ids = seatIds.join(',');
    const response = await fetch(`${API_URL}/flight-booking`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({seat_ids: ids})
    });

    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data as string
  } catch(error) {
    console.error('Error initializing flight booking:', error);
    throw error;
  }
}

export const confirmFlightBooking = async (passengerName: string, nationalId: string, gender: string) => {
  try {
    const body = {
      name: passengerName,
      national_id: nationalId,
      gender}
    const response = await fetch(`${API_URL}/flight-booking/confirm`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    } catch (error) {
      console.error('Error confirming flight booking:', error);
      throw error;
    }
}
