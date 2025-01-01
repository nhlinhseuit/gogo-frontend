import "@/app/globals.css";
import React from 'react';

interface RatingSummaryComponentProps {
  rating: number;
  className?: string;
  numberOfReviews: number;
}

const RatingSummaryComponent: React.FC<RatingSummaryComponentProps> = (props) => {
  return (
    <div className={props.className}>
      <div className="flex items-center flex-col md:flex-row gap-2">
        <span className="rounded-md border px-2 py-1 border-primary-100">{props.rating}</span>
        <span className="font-semibold">Very Good</span>
        <span className="font-light">{props.numberOfReviews || 0} reviews</span>
      </div>

    </div>
  );
};

export default RatingSummaryComponent;
