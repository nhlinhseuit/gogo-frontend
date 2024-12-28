"use client";
import "@/app/globals.css"
import React from 'react';

interface PaymentOptionsComponentProps {
  total: number;
  className?: string;
}

const PaymentOptions: React.FC<PaymentOptionsComponentProps> = (props) => {

  return (
    <div className="w-full rounded-lg bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">Payment Info</h2>
      <div className="mt-4 bg-primary-100 rounded">
        <label
          htmlFor="pay-full"
          className={`block p-4 rounded-lg mb-2 cursor-pointer ${props.className
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="">
              <p className="font-medium">Pay in full</p>
              <p className="text-sm text-gray-600">Pay the total of ${props.total} and you are all set</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PaymentOptions;
