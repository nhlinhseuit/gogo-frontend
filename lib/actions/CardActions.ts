import {BASE_URL} from "@/constants";
import {getCurrentUser} from "@/utils/util";
import type Card from "@/types/Card";

const API_URL = `${BASE_URL}/api/v1/bank-card`
const TEST_TOKEN = `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`
export const fetchUserCards = async (userId: string): Promise<Card[]> => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        // "Authorization": `Bearer ${getCurrentUser().token}`,
        "Content-Type": "application/json",
        "Authorization": TEST_TOKEN,

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

export const fetchCardWithId = async (cardId: string): Promise<Card> => {
  try {
    const response = await fetch(`${API_URL}/${cardId}`, {
      method: "GET",
      headers: {
        // "Authorization": `Bearer ${getCurrentUser().token}`,
        "Content-Type": "application/json",
        "Authorization": TEST_TOKEN,

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

export const addCard = async (number: string, expiryDate: string, cvc: string, nameOnCard: string, region: string): Promise<Card> => {
  const [month, year] = expiryDate.split('/');
  const body = {
    userId: getCurrentUser().id,
    number: number.replace(/\s/g, ''),
    expiryDate: new Date(`20${year}-${month}-01T00:00:00Z`).toISOString(),
    cvc: cvc,
    nameOnCard: nameOnCard,
    region: region
  }

  console.log(body)
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        // "Authorization": `Bearer ${getCurrentUser().token}`,

        "Authorization": TEST_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: getCurrentUser().id,
        number: number,
        expiryDate: new Date(`20${year}-${month}-01T00:00:00Z`).toISOString(),
        cvc: cvc,
        nameOnCard: nameOnCard,
        region: region
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
