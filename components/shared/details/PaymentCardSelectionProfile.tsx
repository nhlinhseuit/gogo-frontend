"use client";

import "@/app/globals.css";
import React, { useState } from "react";
import AddCardModal from "@/components/shared/details/AddCardModal";
import Card from "@/types/Card";
import { formatDateToMMYY } from "@/utils/util";

interface PaymentCardSelectionProfileProps {
  cards: Card[];
  selectedCard: Card | null;
  onSelectCard: (card: Card | null) => void;
  fetchCards: () => void;
}

const PaymentCardSelectionProfile: React.FC<
  PaymentCardSelectionProfileProps
> = ({ cards, selectedCard, onSelectCard, fetchCards }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Helper function to extract the last 4 digits of a card number
  const getLastFourDigits = (cardNumber: string): string => {
    return cardNumber.slice(-4);
  };

  return (
    <div className="w-full grid grid-cols-3 gap-4 rounded-lg p-4">
      {/* Render Saved Cards */}
      {cards.map((card) => (
        <label
          key={card.id}
          htmlFor={`card-${card.id}`}
          className={`h-[180px] block p-3 rounded-xl cursor-pointer ${
            selectedCard?.id === card?.id
              ? "bg-primary-100"
              : "border border-gray-300"
          }`}
        >
          <div className="h-full flex flex-col items-between justify-between">
            <div className="flex justify-between items-center gap-2">
              <div className="leading-[1.0]">
                <div className="text-[22px] font-semibold">
                  **** {getLastFourDigits(card.number)}
                </div>
              </div>
              {/* Radio button */}
              <div className="relative">
                <input
                  type="radio"
                  id={`card-${card.id}`}
                  name="paymentOption"
                  value={card.id}
                  checked={selectedCard?.id === card.id}
                  onChange={() => onSelectCard(card)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    selectedCard?.id === card.id
                      ? "border-white"
                      : "border-black"
                  } flex items-center justify-center`}
                >
                  {selectedCard?.id === card.id && (
                    <div className="rounded-full bg-white w-2.5 h-2.5 selected"></div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div>
                <p className="small-medium text-[#112211]">Valid Thru</p>
                <p className="paragraph-semibold">
                  {formatDateToMMYY(card.expiryDate)}
                </p>
              </div>
              <img
                src="/assets/icons/visa.svg"
                alt="Visa Logo"
                className="mr-3 h-8 w-11"
              />
            </div>
          </div>
        </label>
      ))}

      {/* Add New Card Option */}
      <label
        htmlFor="add-new-card"
        className={`h-[180px] block p-8 border-2 border-dashed rounded-xl text-center cursor-pointer ${
          selectedCard === null
            ? "bg-green-100 border-primary-100"
            : "border-[#8dd3bb]"
        }`}
      >
        <input
          type="radio"
          id="add-new-card"
          name="paymentOption"
          value="new-card"
          checked={selectedCard === null}
          onChange={() => onSelectCard(null)}
          className="sr-only"
        />
        <div
          className="h-full flex flex-col items-center justify-center"
          onClick={handleAddCardClick}
        >
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-100">
            <span className="text-lg font-bold text-primary-100">+</span>
          </div>
          <p className="font-medium">Add a new card</p>
        </div>
      </label>

      {/* Add Card Modal */}
      {isModalOpen && (
        <AddCardModal closeModal={closeModal} fetchCards={fetchCards} />
      )}
    </div>
  );
};

export default PaymentCardSelectionProfile;
