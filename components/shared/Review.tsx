import "@/app/globals.css";
import React from "react";

interface Review {
  review: {
    userId: number;
    rating: number;
    review: string;
  }
}

const Review: React.FC<Review> = ({review}) => {
  return (
    <div className="flex flex-row gap-4 border-b py-4">
      <img src="/assets/images/flight-mock-image00001.jpg" alt="User" className="rounded-full size-12 self-start"/>
      <div className="flex-grow flex flex-col">
        <div className="flex flex-row gap-4">
          <span className="font-bold w-24">{review.rating} Amazing</span>
          <span className="">|</span>
          <span className="">User {review.userId}</span>
          <button className="ml-auto"><img src="/assets/icons/report.svg" alt="Report" /> </button>
        </div>
        <span>{review.review}</span>

      </div>
    </div>
  );
}

export default Review;
