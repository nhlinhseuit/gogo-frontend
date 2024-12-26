import AccountChangeButton from "@/components/shared/Profile/AccountChangeButton";
import AddEmailButton from "@/components/shared/Profile/AddEmailButton";
import AccountTab from "./AccountTab";
import { useState } from "react";
import FlightsComp from "./FlightsItem";
import FlightsItem from "./FlightsItem";

const MockFlightData = [
  {
    id: 1,
    img: "/assets/images/emirates.svg",
  },
  {
    id: 2,
    img: "/assets/images/emirates.svg",
  },
  {
    id: 3,
    img: "/assets/images/emirates.svg",
  },
];

const MockStayData = [
  {
    id: 1,
    img: "/assets/images/favourite.svg",
  },
  {
    id: 2,
    img: "/assets/images/favourite.svg",
  },
  {
    id: 3,
    img: "/assets/images/favourite.svg",
  },
];

const HistoryInfoSection = () => {
  const [isSelected, setIsSelected] = useState("Flights");

  const tabs = [
    {
      type: "Flights",
      title: "Flights",
      icon: "/assets/icons/plane.svg",
    },
    {
      type: "Stays",
      title: "Stays",
      icon: "/assets/icons/hotel.svg",
    },
  ];

  const renderData = () => {
    if (isSelected === "Flights") return MockFlightData;
    else return MockStayData;
  };

  return (
    <>
      <p className="ml-2 mt-10 text-[24px] font-semibold leading-[20.8px]">
        Tickets/Bookings
      </p>

      <div className=" mt-4 flex justify-evenly h-14 bg-white rounded-lg shadow-full shadow-primary-400">
        <div className="w-full flex">
          <div className="w-1/2">
            <AccountTab
              key={0}
              title={tabs[0].title}
              isSelected={isSelected}
              onClick={() => {
                setIsSelected(tabs[0].title);
              }}
              icon={tabs[0].icon}
            />
          </div>
          <div className="w-[1px] my-4 bg-gray-300"></div>
          <div className="w-1/2">
            <AccountTab
              key={1}
              title={tabs[1].title}
              isSelected={isSelected}
              onClick={() => {
                setIsSelected(tabs[1].title);
              }}
              icon={tabs[1].icon}
            />
          </div>
        </div>
      </div>

      <div>
        {renderData().map((item) => (
          <FlightsItem item={item} />
        ))}
      </div>
    </>
  );
};

export default HistoryInfoSection;
