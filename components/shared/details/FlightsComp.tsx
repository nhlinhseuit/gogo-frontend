import React from "react";
import Image from "next/image";

const FlightsComp = ({
  id,
  rating,
  reviews,
  img,
  countReview,
  price,
}: {
  id: number;
  rating: number;
  reviews: string;
  img: string;
  countReview: number;
  price: number;
}) => {
  return (
    <div className="flex mt-4 w-[100%] rounded-lg shadow-md shadow-primary-400">
      <div className="w-[20%] p-3">
        <Image src={img} alt="places" width={0} height={0} className="w-full" />
      </div>

      <div className="w-[80%] mx-4 my-2">
        <div className="flex justify-between">
          <div>
            <div className="flex mt-2">
              <div className="flex mr-1 px-3 border border-primary-100 rounded-md justify-center items-center">
                {rating}
              </div>

              <div className="py-2">
                <p>
                  <span className="body-semibold mr-1">{reviews}</span>
                  {countReview} reviews
                </p>
              </div>
            </div>

            <div className="mt-6 flex">
                <div className="flex mr-8">
                    <div className="mr-2">
                        <input type="checkbox" className="h-5 w-5 border-gray-300 border-2 rounded-sm"></input>
                    </div>
                    <div>
                        <p className="paragraph-semibold"> 12:00 pm - 01:28 pm</p>
                        <p className="text-gray-400 regular">Emirates</p>
                    </div>
                </div>
                <div className="paragraph-semibold text-gray-700 mr-8">
                    <p>non stop</p>
                </div>
                <div>
                    <h6 className="paragraph-semobold text-gray-700">2h 28m</h6>
                    <p className="text-gray-400 body-regular">EWR-BNA</p>
                </div>
            </div>

            <div className="my-4 flex">
                <div className="flex mr-8">
                    <div className="mr-2">
                        <input type="checkbox" className="h-5 w-5 border-gray-300 border-2 rounded-sm"></input>
                    </div>
                    <div>
                        <p className="paragraph-semibold"> 12:00 pm - 01:28 pm</p>
                        <p className="text-gray-400 regular">Emirates</p>
                    </div>
                </div>
                <div className="paragraph-semibold text-gray-700 mr-8">
                    <p>non stop</p>
                </div>
                <div>
                    <h6 className="paragraph-semobold text-gray-700">2h 28m</h6>
                    <p className="text-gray-400 body-regular">EWR-BNA</p>
                </div>
            </div>

          </div>
          <div className="pt-1 pr-2">
            <div className="text-left body-regular">
              <p>starting from</p>
            </div>
            <div className="flex justify-end text-[#FF8682] text-right">
              <h1 className="h2-bold">${price}</h1>
            </div>
          </div>
        </div>

        <div className="flex w-full pt-5 border-t-[1px]">
          <div className="flex px-3 mr-4 border border-primary-100 rounded-md justify-center items-center">
            <Image
              src="/assets/icons/Vector.svg"
              alt="Anh heart"
              width={20}
              height={20}
            />
          </div>
          <button className="w-[90%] py-3 rounded-md bg-primary-100 font-semibold">
            View Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightsComp;
