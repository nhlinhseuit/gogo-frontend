"use client";

import MyAvatar from "@/components/shared/MyAvatar";
import AccountInfoSection from "@/components/shared/Profile/AccountInfoSection";
import AccountTab from "@/components/shared/Profile/AccountTab";
import Image from "next/image";
import { useState } from "react";
import "../../globals.css";
import HistoryInfoSection from "@/components/shared/Profile/HistoryInfoSection";
import PaymentInfoSection from "@/components/shared/Profile/PaymentInfoSection";

export default function Profile() {
  const [isSelected, setIsSelected] = useState("Account");

  const renderComponent = () => {
    if (isSelected === "Account") return <AccountInfoSection />;
    else if (isSelected === "Tickets/Bookings") return <HistoryInfoSection />;
    else return <PaymentInfoSection />;
  };

  const tabs = [
    {
      type: "Account",
      title: "Account",
    },
    {
      type: "Tickets/Bookings",
      title: "Tickets/Bookings",
    },
    {
      type: "Payment methods",
      title: "Payment methods",
    },
  ];

  return (
    <main className="mb-16">
      <div className="mt-16">
        <div className="w-full relative">
          <div className="relative">
            <Image
              src="/assets/images/background_avatar.svg"
              alt="Map"
              width={1440}
              height={486}
              className="rounded-lg"
            />
            <div className="cursor-pointer flex gap-2 items-center absolute right-6 bottom-6 py-2 px-3 bg-primary-100 rounded-md">
              <Image
                src={`/assets/icons/upload.svg`}
                width={16}
                height={16}
                alt="Favourite"
              />
              <p className="body-medium">Upload new cover</p>
            </div>
          </div>

          <div className="absolute -translate-y-[35%] left-[50%] transform -translate-x-[50%]">
            <MyAvatar />
            <div className="mt-4 flex flex-col gap-2 text-center justify-center items-center ">
              <p className="paragraph-semibold">John Doe.</p>
              <p className="body-medium text-[#112211]">john.doe@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[250px] flex justify-evenly h-18 bg-white rounded-lg shadow-full shadow-primary-400">
        {tabs.map((item, index) => {
          return item.type === "Account" ? (
            <AccountTab
              key={index}
              title={item.title}
              isSelected={isSelected}
              onClick={() => {
                setIsSelected(item.title);
              }}
            />
          ) : (
            <div className="flex">
              <div className="w-[1px] my-4 bg-gray-300"></div>
              <AccountTab
                key={index}
                title={item.title}
                isSelected={isSelected}
                onClick={() => {
                  setIsSelected(item.title);
                }}
              />
            </div>
          );
        })}
      </div>

      {renderComponent()}
    </main>
  );
}
