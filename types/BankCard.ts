import type User from "@/types/User";

interface BankCard {
  id: string;
  user: User;
  number: string;
  expiryDate: string;
  cvc: string;
  nameOnCard: string;
  region: string
  deleted: true;
}

export default BankCard;
