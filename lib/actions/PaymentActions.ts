import Payment from "@/types/Payment";
import {BASE_URL} from "@/constants";
import {getToken} from "@/utils/util";
import {handleError} from "@/lib/actions/HandleError";

const API_URL = `${BASE_URL}/api/v1`

export const createPayment = async (cardId: string, bookingId: string, type: string): Promise<Payment> => {
  try {
    const body = JSON.stringify({
      cardId: cardId,
      bookingId: bookingId,
      type: type,
    })
    const response = await fetch(`${API_URL}/payment`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: body
    })

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = errorData.apierror;
      handleError(apiError);
    }

    const data = await response.json();
    return data.data as Payment;

  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}
