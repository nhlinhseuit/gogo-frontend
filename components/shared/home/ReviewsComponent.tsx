"use client";

import React, { useState } from "react";
import Image from "next/image";

const ReviewsComponent = ({
  reviewTitle,
  reviewContent,
  reviewStars,
  reviewerName,
  reviewerFrom,
  imgUrl,
  initialExpanded,
}: {
  reviewTitle: string;
  reviewContent: string;
  reviewStars: number;
  reviewerName: string;
  reviewerFrom: string;
  imgUrl: string;
  initialExpanded: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  return (
    <div className="min-w-[425px] flex flex-col justify-between p-6 rounded-2xl border-2 border-slate-200 custom-shadow">
      <div>
        <h1 className="h2-semibold mb-8">"{reviewTitle}"</h1>
        <div className="w-full min-h-[175px]">
          <p
            className={`paragraph-regular text-gray-600 mb-2 overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "line-clamp-none" : "line-clamp-3"
            }`}
          >
            {reviewContent}
          </p>

          <div className="text-right">
            <button
              className="mb-2 paragraph-semibold"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "View less" : "View more"}
            </button>
          </div>
        </div>

        <div className="flex space-x-1 mb-4">
          {Array.from({ length: reviewStars }, (_, index) => (
            <Image
              key={index}
              src="/assets/images/reviewStar.svg"
              alt="Star Icon"
              width={24}
              height={24}
            />
          ))}
        </div>
        <h6 className="base-semibold">{reviewerName}</h6>
        <p className="mb-4">{reviewerFrom}</p>
        <div className="flex space-x-1 mb-8">
          <div>
            <Image
              src="/assets/icons/google.svg"
              alt="Star Icon"
              width={24}
              height={24}
            />
          </div>
          <div>
            <p>Google</p>
          </div>
        </div>
      </div>
      <div>
        <Image src={imgUrl} alt="Review Image" width={377} height={200} />
      </div>
    </div>
  );
};

export default ReviewsComponent;
