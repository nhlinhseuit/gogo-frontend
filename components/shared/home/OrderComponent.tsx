import React from "react";
import Image from "next/image";

const OrderComponent = ({
  imgUrl,
  title,
  buttonTitle,
}: {
  imgUrl: string;
  title: string;
  buttonTitle: string;
}) => {
  return (
    <div>
      <div className="relative">
        <Image
          src={imgUrl}
          alt="Flights"
          width={604}
          height={559}
          className="shadow-xl"
        />

        <div className="absolute inset-0 bg-black opacity-30 rounded-[18px]"></div>

        <div className="absolute w-[389px] flex flex-col justify-center items-center bottom-0 my-12 mx-20">
          <h1 className="text-white title-semibold tracking-wide">{title}</h1>
          <p className="mt-2 h3-regular text-white text-center">
            Search Flights & Places Hire to our most popular destinations
          </p>
          <button className="flex justify-center items-center rounded-md gap-x-1 px-4 py-3 mt-2 bg-primary-100 transform transition-transform hover:scale-110 duration-500">
            <span>
              <Image
                src="/assets/icons/Paper-Plane.svg"
                alt="Plane"
                width={14}
                height={14}
              />
            </span>
            <p className="body-regular">{buttonTitle}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
