"use client";

import "@/app/globals.css";
import { useState } from 'react';

const PaymentCardSelection = () => {
  const [selectedCard, setSelectedCard] = useState('card');

  const handleCardSelection = (value) => {
    setSelectedCard(value);
  };

  return (
    <div className="w-full shadow rounded-lg p-4">
      <label
        htmlFor="saved-card"
        className={`block p-4 rounded-lg mb-4 cursor-pointer ${
          selectedCard === 'card' ? 'bg-primary-100' : ''
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa Logo"
              className="w-8 h-5 mr-3"
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
                <div className="w-2.5 h-2.5 selected bg-white rounded-full"></div>
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
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 mb-2 rounded-full border-2 border-primary-100 flex items-center justify-center">
            <span className="text-primary-100 text-lg font-bold">+</span>
          </div>
          <p className="font-medium">Add a new card</p>
        </div>
      </label>
    </div>
  );
};

export default PaymentCardSelection;
