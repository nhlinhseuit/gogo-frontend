import { toast } from "@/hooks/use-toast";
import { fetchUserCards } from "@/lib/actions/CardActions";
import Card from "@/types/Card";
import { getCurrentUser } from "@/utils/util";
import { useEffect, useState } from "react";
import PaymentCardSelectionProfile from "../details/PaymentCardSelectionProfile";
import PaymentCard from "./PaymentCard";

const PaymentInfoSection = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const fetchCards = () => {
    fetchUserCards(getCurrentUser().id)
      .then((data) => {
        setCards(data);
        if (data.length > 0) {
          setSelectedCard(data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching user cards:", error);
        toast({
          title: `Error fetching user cards: ${error}`,
          variant: "error",
          duration: 3000,
        });
      });
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <>
      <p className="ml-2 mt-10 text-[24px] font-semibold leading-[20.8px]">
        Payment Methods
      </p>

      <div
        className={`mt-4 mb-[150px] flex flex-col gap-8 p-6 bg-white rounded-lg shadow-full `}
      >
        <PaymentCardSelectionProfile
          cards={cards}
          fetchCards={fetchCards}
          onSelectCard={setSelectedCard}
          selectedCard={selectedCard}
        />
      </div>
    </>
  );
};

export default PaymentInfoSection;
