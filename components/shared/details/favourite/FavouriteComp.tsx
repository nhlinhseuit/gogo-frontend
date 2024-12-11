import { formatCurrency } from "@/utils/util";
import Image from "next/image";
import React from "react";

const FavouriteComp = ({
  id,
  isFavourite,
  img,
  title,
  address,
  star,
  aminities,
  rating,
  review,
  countReview,
  price,
  handleClick,
}: {
  id: number;
  isFavourite: boolean;
  img: string;
  title: string;
  address: string;
  star: number;
  aminities: string;
  rating: number;
  review: string;
  countReview: number;
  price: number;
  handleClick: (id?: number) => void;
}) => {
  return (
    <div className="flex w-[100%] mb-6 rounded-lg shadow-full shadow-primary-400">
      <div className="w-[38%]">
        <Image
          src={img}
          alt="Ảnh hotel"
          width={0}
          height={0}
          className="w-full"
        />
      </div>

      <div className="w-[62%] p-5">
        <div className="flex justify-between">
          <div className="mb-5">
            <h2 className="h3-semibold">{title}</h2>

            <div className="flex mt-2">
              <Image
                src="/assets/icons/location.svg"
                alt="Anh"
                width={16}
                height={16}
              />
              <p>{address}</p>
            </div>

            <div className="flex items-center mt-1">
              <div className="flex gap-x-[1px]">
                {Array.from({ length: star }, (_, index) => (
                  <Image
                    key={index}
                    src="/assets/icons/Star.svg"
                    alt="Star Icon"
                    width={16}
                    height={16}
                  />
                ))}
              </div>

              <div>
                <p className="ml-2 body-regular leading-4">{star} Star Hotel</p>
              </div>

              <div className="ml-8 flex">
                <Image
                  src="/assets/icons/cafe.svg"
                  alt="Aminities"
                  width={17}
                  height={17}
                  className="mr-1"
                />
                <p>
                  <span className="mr-1 paragraph-semibold">{aminities}</span>
                  Aminities
                </p>
              </div>
            </div>

            <div className="flex mt-2">
              <div className="flex mr-1 px-3 border border-primary-100 rounded-md justify-center items-center">
                {rating}
              </div>

              <div className="py-2">
                <p>
                  <span className="body-semibold mr-1">{review}</span>
                  {countReview} reviews
                </p>
              </div>
            </div>
          </div>

          <div className="pt-1 pr-2">
            <div className="text-left body-regular">
              <p>starting from</p>
            </div>
            <div className="flex items-baseline text-[#FF8682]">
              <h1 className="h2-bold">${formatCurrency({ price: price })}</h1>
              <h1 className="body-semibold">/night</h1>
            </div>
            <div className="text-right">
              <p>excl.tax</p>
            </div>
          </div>
        </div>
        <div className="flex w-full pt-6 border-t-[1px]">
          <div
            onClick={() => {
              handleClick(id);
            }}
            className="flex px-3 mr-4 border border-primary-100 rounded-md justify-center items-center cursor-pointer "
          >
            {isFavourite ? (
              <Image
                src="/assets/icons/Heart.svg"
                alt="Anh heart"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/assets/icons/flightHeart.svg"
                alt="Anh heart"
                width={20}
                height={20}
              />
            )}
          </div>
          <button className="w-[90%] py-3 rounded-md bg-primary-100 font-semibold transform transition-transform hover:scale-95 duration-300">
            View Place
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavouriteComp;
