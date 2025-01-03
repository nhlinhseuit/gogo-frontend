"use client";

import "@/app/globals.css";
import React from "react";
import ReviewComponent from "@/components/shared/ReviewComponent";
import type Review from "@/types/Review";
import {getReviewComment} from "@/utils/util";

interface ReviewsSectionProps {
  averageRating: number;
  reviewCount: number;
  reviews: Review[];
  type: string;
  id: number;
  onGiveReview: () => void;
  paginationModel: {
    page: number;
    size: number;
    total: number;
    total_page: number;
  }
  onPageChange: (page: number) => void;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = (props) => {


  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row md:items-center justify-between">
        <span className="h2-bold">Reviews</span>
        <button onClick={props.onGiveReview} className="rounded p-4 bg-primary-100">Give your review</button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <span className="font-bold text-5xl">{props.averageRating}</span>
        <div className="flex flex-col gap-2">
          <span>{getReviewComment(props.averageRating)}</span>
          <span>{props.reviewCount} verified reviews</span>
        </div>
      </div>
      <div className="flex flex-col">
        {props.reviews.map((review: Review) => (
          <ReviewComponent review={review} key={review.id} />
        ))}
      </div>

      <div className="flex flex-row gap-6 self-center">
        <button><img src="/assets/icons/backward.svg" alt="Backward"/></button>
        <span>{props.paginationModel.page + 1} of {props.paginationModel.total_page}</span>
        <button><img src="/assets/icons/forward.svg" alt="Forward"/></button>
      </div>
    </div>
  );
};

export default ReviewsSection;
