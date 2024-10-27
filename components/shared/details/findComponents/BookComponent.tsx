import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/utils/util";

const BookComponent = ({
  type,
  imgUrl,
  country,
  description,
  price,
}: {
  type: string;
  imgUrl: string;
  country: string;
  description: string;
  price: number;
}) => {
  return (
    <div>
      <div className="relative">
        <Image
          src={imgUrl}
          alt={country}
          width={296}
          height={420}
          className="shadow-lg"
        />

        <div className="absolute w-full bottom-0 flex flex-col justify-center items-center my-6">
          <div className="w-[85%]">
            <div className="flex justify-between items-center text-white mb-3">
              <div className="w-[70%]">
                <h3 className="header-semibold">{country}</h3>
                <p className="body-regular tracking-wider line-clamp-1">
                  {description}
                </p>
              </div>

              <div className="w-[30%] text-end">
                <p className="header-semibold">
                  $ {formatCurrency({ price: price })}
                </p>
              </div>
            </div>

            <button className="w-full bg-primary-100 py-3 px-12 rounded-md transform transition-transform hover:scale-95 duration-300">
              <p className="base-regular ">Book {type}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookComponent;
