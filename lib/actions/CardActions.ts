import {BASE_URL} from "@/constants";

const API_URL = `${BASE_URL}/api/v1/bank-card`
const TEST_TOKEN = `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`;

class Card {
}

export const fetchUserCards = async (userId: string): Promise<Card[]> => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": TEST_TOKEN,
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
        "Authorization": TEST_TOKEN,
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

export const addCard = async (userId: string, number: string, expiryDate: string, cvc: string, nameOnCard: string, region: string): Promise<Card> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": TEST_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
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
