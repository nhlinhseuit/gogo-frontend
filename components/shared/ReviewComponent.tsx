import "@/app/globals.css";
import React from "react";
import Review from "@/types/Review";

interface ReviewComponentProps {
  review: Review
}

const ReviewComponent: React.FC<ReviewComponentProps> = (props) => {
  return (
    <div className="flex flex-row gap-4 border-b py-4">
      <img src="/assets/images/flight-mock-image00001.jpg" alt="User" className="rounded-full size-12 self-start"/>
      <div className="flex-grow flex flex-col">
        <div className="flex flex-row gap-4">
          <span className="font-bold w-24">{props.review.rating} Amazing</span>
          <span className="">|</span>
          <span className="">User {props.review.user.id}</span>
          <button className="ml-auto"><img src="/assets/icons/report.svg" alt="Report" /> </button>
        </div>
        <span>{props.review.description}</span>

      </div>
    </div>
  );
}

export default ReviewComponent;
