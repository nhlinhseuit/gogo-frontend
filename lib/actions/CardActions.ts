import {BASE_URL} from "@/constants";
import {getCurrentUser} from "@/utils/util";

const API_URL = `${BASE_URL}/api/v1/bank-card`

class Card {
}

export const fetchUserCards = async (userId: string): Promise<Card[]> => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCurrentUser().token}`,
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data as Card[];

  } catch (error) {
    console.error('Error fetching user cards:', error);
    throw error;
  }
}

export const fetchCard = async (cardId: string): Promise<Card> => {
  try {
    const response = await fetch(`${API_URL}/${cardId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCurrentUser().token}`,
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data as Card;
  } catch (error) {
    console.error('Error fetching card:', error);
    throw error;
  }
}

export const addCard = async ( number: string, expiryDate: string, cvc: string, nameOnCard: string, region: string): Promise<Card> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getCurrentUser().token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: getCurrentUser().id,
        number,
        expiryDate,
        cvc,
        nameOnCard,
        region
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data as Card;
  } catch (error) {
    console.error('Error adding card:', error);
    throw error;
  }
}
