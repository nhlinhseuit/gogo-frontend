"use client";

import React from "react";

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (description: string, rating: number) => void;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = React.useState(0);
  const [description, setDescription] = React.useState("");

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(description, rating);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">Add Review</span>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            X
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {/* Star Rating */}
          <div>
            <span className="block font-semibold mb-2">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <span className="block font-semibold mb-2">Description:</span>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary-100"
              rows={4}
              placeholder="Write your review here..."
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full rounded p-3 bg-primary-100 text-white font-semibold hover:bg-primary-200"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
