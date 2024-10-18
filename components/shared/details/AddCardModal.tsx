"use client";

import "@/app/globals.css";
import React from 'react';

const AddCardModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6">Add a new Card</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="4321 4321 4321 4321"
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label htmlFor="expDate" className="block text-sm font-medium">
                Exp. Date
              </label>
              <input
                type="text"
                id="expDate"
                placeholder="02/27"
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="cvc" className="block text-sm font-medium">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                placeholder="123"
                className="w-full border p-2 rounded mt-1"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="nameOnCard" className="block text-sm font-medium">
              Name on Card
            </label>
            <input
              type="text"
              id="nameOnCard"
              placeholder="John Doe"
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium">
              Country or Region
            </label>
            <select id="country" className="w-full border p-2 rounded mt-1">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
          </div>

          <div className="flex items-center mb-6">
            <input type="checkbox" id="saveCard" className="mr-2" />
            <label htmlFor="saveCard" className="text-sm">
              Securely save my information for 1-click checkout
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-100 py-2 rounded"
          >
            Add Card
          </button>
        </form>

        {/* Footer Note */}
        <p className="mt-4 text-xs text-center text-gray-600">
          By confirming your subscription, you allow The Outdoor Inn Crowd
          Limited to charge your card for this payment and future payments in
          accordance with their terms. You can always cancel your subscription.
        </p>
      </div>
    </div>
  );
};

export default AddCardModal;
