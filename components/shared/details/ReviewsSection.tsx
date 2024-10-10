import "@/app/globals.css";
import React from "react";
import Review from "@/components/shared/Review";

interface ReviewsSectionProps {
  type: String;
  id: number;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({type, id}) => {

  //TODO: Replace with actual reviews data
  const mockReviews = [
    {
      id: 1,
      userId: 1,
      rating: 4.5,
      review: "Great flight, would recommend!",
    },
    {
      id: 2,
      userId: 2,
      rating: 3.5,
      review: "Average flight, nothing special.",
    },
    {
      id: 3,
      userId: 3,
      rating: 5,
      review: "Best flight ever!",
    },
  ];
  const averageRating = 4.2;
  const reviewCount = mockReviews.length;

  // const [paginationModel, setPaginationModel] = React.useState({
  //   currentPage: 1,
  //   reviewsPerPage: 5,
  //   pageCount: Math.ceil(mockReviews.length / 5),
  // });


  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row md:items-center justify-between">
        <span className="h2-bold">Reviews</span>
        <button className="rounded p-4 bg-primary-100">Give your review</button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <span className="font-bold text-5xl">{averageRating}</span>
        <div className="flex flex-col gap-2">
          <span>Very good</span>
          <span>{reviewCount} verified reviews</span>
        </div>
      </div>
      <div className="flex flex-col">
        {mockReviews.map((review) => (
          <Review review={review} />
        ))}
      </div>

      <div className="flex flex-row gap-6 self-center">
        <button><img src="/assets/icons/backward.svg" alt="Backward"/></button>
        <span>1 of 40</span>
        <button><img src="/assets/icons/forward.svg" alt="Forward"/></button>
      </div>
    </div>
  );
};

export default ReviewsSection;
