"use client";

import "@/app/globals.css";
import { useState } from 'react';
import AddCardModal from "@/components/shared/details/AddCardModal";

const PaymentCardSelection = () => {
  const [selectedCard, setSelectedCard] = useState('card');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardSelection = (value: string) => {
    setSelectedCard(value);
  };

  const handleAddCardClick = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="w-full rounded-lg p-4 shadow">
      <label
        htmlFor="saved-card"
        className={`block p-4 rounded-lg mb-4 cursor-pointer ${
          selectedCard === 'card' ? 'bg-primary-100' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <img
              src="/assets/icons/visa.svg"
              alt="Visa Logo"
              className="mr-3 h-5 w-8"
            />
              <div className="font-medium">**** 4321</div>
              <div className="text-sm">Expires 02/27</div>
          </div>
          <div className="relative">
            <input
              type="radio"
              id="saved-card"
              name="paymentOption"
              value="card"
              checked={selectedCard === 'card'}
              onChange={() => handleCardSelection('card')}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                selectedCard === 'card' ? 'border-white' : 'border-black'
              } flex items-center justify-center`}
            >
              {selectedCard === 'card' && (
                <div className="rounded-full bg-white w-2.5 h-2.5 selected"></div>
              )}
            </div>
          </div>
        </div>
      </label>

      {/* Add a New Cad */}
      <label
        htmlFor="add-new-card"
        className={`block p-8 border-2 border-dashed rounded-lg text-center cursor-pointer ${
          selectedCard === 'new-card' ? 'bg-green-100 border-primary-100' : 'border-gray-300'
        }`}
      >
        <input
          type="radio"
          id="add-new-card"
          name="paymentOption"
          value="new-card"
          checked={selectedCard === 'new-card'}
          onChange={() => handleCardSelection('new-card')}
          className="sr-only"
        />
        <div className="flex flex-col items-center" onClick={handleAddCardClick}>
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-100">
            <span className="text-lg font-bold text-primary-100">+</span>
          </div>
          <p className="font-medium">Add a new card</p>
        </div>
      </label>
      {isModalOpen && <AddCardModal closeModal={closeModal}/>}
    </div>
  );
};

export default PaymentCardSelection;
