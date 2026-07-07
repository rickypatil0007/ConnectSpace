"use client";

import { CommunityEvent } from "@/lib/dummy-data";
import { Calendar, MapPin, Users, Tag, Heart, Clock } from "lucide-react";

interface EventCardProps {
  event: CommunityEvent;
  reasons?: string[];
  isWishlisted?: boolean;
  onWishlistToggle?: () => void;
  onBook?: () => void;
  onRate?: () => void;
  showBookButton?: boolean;
  showRateButton?: boolean;
}

export default function EventCard({
  event,
  reasons,
  isWishlisted,
  onWishlistToggle,
  onBook,
  onRate,
  showBookButton = true,
  showRateButton = false,
}: EventCardProps) {
  const seatsLeft = event.totalSeats - event.bookedSeats;
  const isUpcoming = event.status === "upcoming";

  return (
    <div className="bg-white rounded-xl border border-gray/15 p-4 sm:p-5 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isUpcoming
                  ? "bg-blue/10 text-blue"
                  : "bg-gray/10 text-gray"
              }`}
            >
              {isUpcoming ? "Upcoming" : "Completed"}
            </span>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                event.freeOrPaid === "Free"
                  ? "bg-green-50 text-green-700"
                  : "bg-yellow/10 text-yellow"
              }`}
            >
              {event.freeOrPaid === "Free" ? "Free" : `Rs ${event.ticketPrice}`}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-navy">{event.title}</h3>
        </div>
        {onWishlistToggle && (
          <button
            onClick={onWishlistToggle}
            className="p-1.5 rounded-lg hover:bg-gray/5 transition-colors"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={20}
              className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray"}
            />
          </button>
        )}
      </div>

      <p className="text-xs sm:text-sm text-gray mb-3">{event.purpose}</p>

      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm mb-3">
        <div className="flex items-center gap-1.5 text-gray">
          <Calendar size={14} />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray">
          <MapPin size={14} />
          <span>{event.locality}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray">
          <Users size={14} />
          <span>{seatsLeft} seats left</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray">
          <Tag size={14} />
          <span>{event.category}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray">
          <Clock size={14} />
          <span>{event.duration}</span>
        </div>
      </div>

      <div className="text-xs text-gray mb-1">
        <span className="font-medium">Venue:</span> {event.venueName}
      </div>
      <div className="text-xs text-gray mb-3">
        <span className="font-medium">Age Group:</span> {event.ageGroup}
      </div>

      {reasons && reasons.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {reasons.map((reason, i) => (
            <span
              key={i}
              className="inline-block px-2 py-0.5 bg-purple/8 text-purple text-xs rounded-full"
            >
              {reason}
            </span>
          ))}
        </div>
      )}

      {event.ratings.length > 0 && (
        <div className="text-xs text-gray mb-3">
          <span className="font-medium">Rating:</span>{" "}
          {"★".repeat(Math.round(event.ratings.reduce((a, r) => a + r.rating, 0) / event.ratings.length))}{" "}
          ({event.ratings.length} review{event.ratings.length > 1 ? "s" : ""})
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2 mt-auto">
        {showBookButton && isUpcoming && seatsLeft > 0 && (
          <button
            onClick={onBook}
            className="flex-1 py-2 px-4 rounded-lg bg-purple text-white text-sm font-medium transition-colors hover:bg-purple/90"
          >
            Book Now
          </button>
        )}
        {showRateButton && event.status === "completed" && (
          <button
            onClick={onRate}
            className="flex-1 py-2 px-4 rounded-lg bg-blue text-white text-sm font-medium transition-colors hover:bg-blue/90"
          >
            Rate & Review
          </button>
        )}
      </div>
    </div>
  );
}
