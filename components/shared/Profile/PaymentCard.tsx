"use client";

import "@/app/globals.css";
import { useState } from "react";
import AddCardModal from "@/components/shared/details/AddCardModal";

const PaymentCard = () => {
  const [selectedCard, setSelectedCard] = useState("card");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardSelection = (value: string) => {
    setSelectedCard(value);
  };

  const handleAddCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex gap-4 w-full">
      <label
        htmlFor="saved-card"
        className={`h-[180px] just w-[30%] block p-3 rounded-xl cursor-pointer ${
          selectedCard === "card" ? "bg-primary-100" : "border border-gray-300"
        }`}
      >
        <div className="h-full flex flex-col items-between justify-between">
          <div className="flex justify-between items-start gap-2">
            <div className="leading-[1.0]">
              <p className="text-[22px] font-semibold">**** **** ****</p>
              <p className="text-[22px] font-semibold">4321</p>
            </div>
            <img
              src="/assets/icons/bin.svg"
              alt="Visa Logo"
              className="mr-1 h-5 w-8"
            />
          </div>

          <div className="flex justify-between items-center gap-4">
            <div>
              <p className="small-medium text-[#112211]">Valid Thru</p>
              <p className="paragraph-semibold">02/27</p>
            </div>
            <img
              src="/assets/icons/visa.svg"
              alt="Visa Logo"
              className="mr-3 h-8 w-11"
            />
          </div>
        </div>
      </label>

      {/* Add a New Card */}
      <label
        htmlFor="add-new-card"
        className={`h-[180px] just w-[30%] block p-8 border-2 border-dashed rounded-xl text-center cursor-pointer ${
          selectedCard === "new-card"
            ? "bg-green-100 border-primary-100"
            : "border-[#8dd3bb]"
        }`}
      >
        <input
          type="radio"
          id="add-new-card"
          name="paymentOption"
          value="new-card"
          checked={selectedCard === "new-card"}
          onChange={() => handleCardSelection("new-card")}
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
      {isModalOpen && <AddCardModal fetchCards={() => {}} closeModal={closeModal} />}
    </div>
  );
};

export default PaymentCard;
