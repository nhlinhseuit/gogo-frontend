import React from 'react';
import {getReviewComment} from "@/utils/util";

interface AdvantageSummaryComponentProps {
  rating: number;
  reviewCount: number;
}

const AdvantageSummaryComponent: React.FC<AdvantageSummaryComponentProps> = ({rating, reviewCount}) => {
  return (

    <div className="flex flex-col justify-between rounded-xl border-2 p-4 pr-16 min-w-40 min-h-40 border-primary-100 bg-primary-100">
      <span className="h1-bold">{rating}</span>

      <div className="mt-auto flex flex-col text-sm">
        <span className="font-bold">{getReviewComment(rating)}</span>
        <span>{reviewCount} reviews</span>
      </div>

    </div>
  );
};

export default AdvantageSummaryComponent;
