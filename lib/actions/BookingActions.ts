import {BASE_URL} from "@/constants";
import {formatDateToYYYYMMDD, getCurrentUser, getToken} from "@/utils/util";
import FlightBooking from "@/types/FlightBooking";
import Card from "@/types/Card";
import {createPayment} from "@/lib/actions/PaymentActions";
import {handleError} from "@/lib/actions/HandleError";
import StayBooking from "@/types/StayBooking";

const API_URL = `${BASE_URL}/api/v1`

export const requestStayBooking = async (roomId: string, checkin: string, checkout: string) => {
  console.log(roomId, checkin, checkout)
  try {
    const body = {
      user_id: getCurrentUser().id,
      room_id: roomId,
      booking_date: formatDateToYYYYMMDD(new Date().toISOString()),
      checkin_date: checkin,
      checkout_date: checkout,
    }
    const response = await fetch(`${API_URL}/stays/booking`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();
    return {
      booking_id: data.data.id,
      lock_expiration: data.data.lock_expiration,
    };
  } catch (error) {
    console.error('Error requesting booking:', error);
    throw error;
  }
}

export const confirmStayBooking = async (customerInfo: any, card: Card, booking_id: string) => {
  try {
    const body = {
      booking_id: booking_id,
      email: customerInfo.customer_email,
      phone: customerInfo.customer_phone,
      country: customerInfo.customer_country,
      first_name: customerInfo.first_name,
      last_name: customerInfo.last_name,
    }
    console.log(JSON.stringify(body))
    const response = await fetch(`${API_URL}/stays/booking/guest-info`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();
    const stayBooking = await createPayment(card.id, booking_id, 'ROOM');
    console.log(stayBooking)
    return data;
  } catch (error) {
    console.error('Error confirming booking:', error);
    throw error;
  }
}

export const fetchStayBooking = async (id: string): Promise<StayBooking> => {
  try {
    const response = await fetch(`${API_URL}/stays/booking/${id}`, {
      method: "GET",
      headers: {
        // "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();
    return data as StayBooking;
  } catch (error) {
    console.error('Error fetching stay booking:', error);
    throw error;
  }
}

// export const requestFlightBooking = async (seatIds: String[]): Promise<any> => {
//   try {
//     const body = {
//       seatIds: seatIds
//     }
//     const response = await fetch(`${API_URL}/flight-booking`, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${getToken()}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body)
//     })
//
//     if (!response.ok) {
//       const errorData = await response.json();
//       const apiError = errorData.apierror;
//       handleError(apiError);
//     }
//
//     const data = response.json();
//     return data.id;
//   } catch (error) {
//     console.error('Error requesting flight booking:', error);
//     throw error;
//   }
// }
export const confirmFlightBooking = async (passengerInfo: Array<any>, card: Card, bookingId: string): Promise<FlightBooking> => {
  try {
    const seats = passengerInfo.map((passenger) => {
      return {
        citizen_id: passenger.ciziten_id,
        citizen_name: passenger.citizen_name,
        seat_id: passenger.seat_id,
      }
    })
    const body = {
      seats: seats,
      user_id: getCurrentUser().id,
    }
    const response = await fetch(`${API_URL}/flight-booking/confirm`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();

    const flightBooking = data.data as FlightBooking;

    await createPayment(card.id, flightBooking.id, 'FLIGHT');

    return data.data as FlightBooking;

  } catch (error) {
    console.error('Error confirming flight booking:', error);
    throw error;
  }
}

export const fetchFlightBooking = async (id: string): Promise<FlightBooking> => {
  try {
    const response = await fetch(`${API_URL}/flight-booking/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();
    return data.data as FlightBooking;

  } catch (error) {
    console.error('Error fetching flight booking:', error);
    throw error;
  }
}
