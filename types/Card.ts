import type User from "@/types/User";

interface Card {
  id: string;
  user: User;
  number: string;
  expiryDate: string;
  cvc: string;
  nameOnCard: string;
  region: string;
  deleted: boolean;
}

export default Card;
