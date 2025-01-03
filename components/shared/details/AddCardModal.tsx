"use client";

import "@/app/globals.css";
import React from 'react';
import CountriesDropdown from "@/components/shared/CountriesDropdown";
import {addCard} from "@/lib/actions/CardActions";

interface AddCardModalProps {
  closeModal: () => void;
  fetchCards: () => void;
}

const AddCardModal: React.FC<AddCardModalProps> = (props) => {
  const [cardNumber, setCardNumber] = React.useState('');
  const [expDate, setExpDate] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const [nameOnCard, setNameOnCard] = React.useState('');
  const [country, setCountry] = React.useState('United States');

  const formatCardNumber = (value: string) => {
    const cleanValue = value.replace(/\D+/g, '').slice(0, 16); // Only digits, max length 16
    return cleanValue.replace(/(.{4})/g, '$1 ').trim(); // Add space after every 4 digits
  };

  const formatExpDate = (value: string) => {
    const cleanValue = value.replace(/\D+/g, '').slice(0, 4); // Only digits, max length 4
    if (cleanValue.length <= 2) return cleanValue;
    return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`; // Add '/' after MM
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Add Card", cardNumber, expDate, cvc, nameOnCard, country);
    // Validate inputs
    if (!cardNumber.match(/^\d{4} \d{4} \d{4} \d{4}$/)) {
      alert("Invalid card number format. Please use the format: 4321 4321 4321 4321");
      return;
    }
    if (!expDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      alert("Invalid expiration date format. Please use the format: MM/YY");
      return;
    }
    if (!cvc.match(/^\d{3}$/)) {
      alert("Invalid CVC format. Please enter a 3-digit CVC");
      return;
    }
    if (nameOnCard.trim() === "") {
      alert("Name on card cannot be empty");
      return;
    }

    addCard(cardNumber, expDate, cvc, nameOnCard, country).then((data) => {
      alert("Card added successfully");
      props.fetchCards();
      props.closeModal();
    }).catch((error) => {
      console.error('Error adding card:', error);
      alert("Error adding card. Please try again later");
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-16">
        <button
          onClick={props.closeModal}
          className="absolute top-10 right-16 text-2xl"
        >
          &times;
        </button>
        <h2 className="mb-6 text-2xl font-semibold">Add a new Card</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium">
              Card Number
            </label>
            <input
              type="text"
              required
              id="cardNumber"
              placeholder="4321 4321 4321 4321"
              className="mt-1 w-full rounded border p-2"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            />
          </div>

          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label htmlFor="expDate" className="block text-sm font-medium">
                Exp. Date
              </label>
              <input
                type="text"
                required
                id="expDate"
                placeholder="MM/YY"
                className="mt-1 w-full rounded border p-2"
                value={expDate}
                onChange={(e) => setExpDate(formatExpDate(e.target.value))}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="cvc" className="block text-sm font-medium">
                CVC
              </label>
              <input
                type="text"
                required
                id="cvc"
                placeholder="123"
                className="mt-1 w-full rounded border p-2"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D+/g, '').slice(0, 3))} // Only digits, max length 3
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="nameOnCard" className="block text-sm font-medium">
              Name on Card
            </label>
            <input
              type="text"
              required
              id="nameOnCard"
              placeholder="John Doe"
              className="mt-1 w-full rounded border p-2"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium">
              Country or Region
            </label>
            <CountriesDropdown selectedCountry={country} onSelectCountry={setCountry} />
          </div>

          <button
            type="submit"
            className="w-full rounded py-2 bg-primary-100"
          >
            Add Card
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-600">
          By confirming your subscription, you allow Gogo Travel to charge your card for this payment and future
          payments in accordance with their terms. You can always cancel your subscription.
        </p>
      </div>
    </div>
  );
};

export default AddCardModal;
