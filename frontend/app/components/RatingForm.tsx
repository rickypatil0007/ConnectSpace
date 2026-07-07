"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";

interface RatingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
  eventTitle: string;
}

export default function RatingForm({ isOpen, onClose, onSubmit, eventTitle }: RatingFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, review);
      setRating(0);
      setReview("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-navy mb-1">Rate & Review</h2>
        <p className="text-sm text-gray mb-5">{eventTitle}</p>

        <div className="mb-5">
          <label className="block text-sm font-medium text-navy mb-2">Your Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  size={28}
                  className={
                    star <= (hoveredRating || rating)
                      ? "fill-yellow text-yellow"
                      : "text-gray/30"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="review-text" className="block text-sm font-medium text-navy mb-2">
            Written Feedback
          </label>
          <textarea
            id="review-text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            placeholder="Share your experience..."
            className="w-full px-3 py-2 border border-gray/20 rounded-lg text-sm text-navy placeholder:text-gray/50 focus:outline-none focus:border-blue resize-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 rounded-lg border border-gray/20 text-sm font-medium text-gray hover:bg-gray/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="flex-1 py-2 px-4 rounded-lg bg-purple text-white text-sm font-medium transition-colors hover:bg-purple/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <Send size={14} />
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
