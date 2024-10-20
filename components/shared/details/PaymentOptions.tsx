"use client";
import "@/app/globals.css"
import {useState} from 'react';

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState('full');

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="w-full rounded-lg bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">Choose your payment option</h2>
      <div className="mt-4">
        <label
          htmlFor="pay-full"
          className={`block p-4 rounded-lg mb-2 cursor-pointer ${
            selectedOption === 'full' ? 'bg-primary-100' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Pay in full</p>
              <p className="text-sm text-gray-600">Pay the total and you are all set</p>
            </div>
            <div className="relative">
              <input
                type="radio"
                id="pay-full"
                name="paymentOption"
                value="full"
                checked={selectedOption === 'full'}
                onChange={() => handleOptionChange('full')}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedOption === 'full' ? 'border-white' : 'border-black'
                } flex items-center justify-center`}
              >
                {selectedOption === 'full' && (
                  <div className="rounded-full bg-white w-2.5 h-2.5"></div>
                )}
              </div>
            </div>
          </div>
        </label>

        {/* Pay part now, part later option */}
        <label
          htmlFor="pay-part"
          className={`block p-4 rounded-lg cursor-pointer ${
            selectedOption === 'part' ? 'bg-primary-100' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Pay part now, part later</p>
              <p className="text-sm text-gray-600">
                Pay $207.43 now, and the rest ($207.43) will be automatically charged to the same payment method on Nov 14, 2022. No extra fees.
              </p>
              <div className="mt-4">
                <a href="#" className="text-sm underline">
                  More info
                </a>
              </div>
            </div>
            <div className="relative">
              <input
                type="radio"
                id="pay-part"
                name="paymentOption"
                value="part"
                checked={selectedOption === 'part'}
                onChange={() => handleOptionChange('part')}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedOption === 'part' ? 'border-white' : 'border-black'
                } flex items-center justify-center`}
              >
                {selectedOption === 'part' && (
                  <div className="rounded-full bg-white w-2.5 h-2.5"></div>
                )}
              </div>

            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PaymentOptions;
