import type FlightDetails from "@/types/FlightDetails";

import {BASE_URL} from "@/constants";
import {getToken} from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/flights`
const TEST_TOKEN = `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`;

export const fetchFlightDetails = async (flightId: string): Promise<FlightDetails> => {
  try {

    const response = await fetch(`${API_URL}/${flightId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getToken()}`,

        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data as FlightDetails;
  } catch (error) {
    console.error('Error fetching flight details:', error);
    throw error;
  }

}
