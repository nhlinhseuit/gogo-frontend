import "@/app/globals.css";
import React from "react";
import Review from "@/types/Review";
import {getReviewComment} from "@/utils/util";

interface ReviewComponentProps {
  review: Review
}

const ReviewComponent: React.FC<ReviewComponentProps> = (props) => {
  return (
    <div className="flex flex-row gap-4 border-b py-4">
      <img src={props.review.user.avatar_url || `/assets/images/flight-mock-image00001.jpg`} alt="User" className="rounded-full size-12 self-start"/>
      <div className="flex-grow flex flex-col">
        <div className="flex flex-row gap-4">
          <span className="font-bold w-24">{props.review.rating} {getReviewComment(props.review.rating)}</span>
          <span className="">|</span>
          <span className="">{props.review.user.username}</span>
          {/*<button className="ml-auto"><img src="/assets/icons/report.svg" alt="Report" /> </button>*/}
        </div>
        <span>{props.review.description}</span>

      </div>
    </div>
  );
}

export default ReviewComponent;
