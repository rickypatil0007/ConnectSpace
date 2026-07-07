"use client";

import { EventRequest } from "@/lib/dummy-data";
import { Bell, MapPin, Users, DollarSign, Calendar, Tag } from "lucide-react";

interface EventRequestCardProps {
  request: EventRequest;
  onSubmitProposal: () => void;
  hasSubmitted?: boolean;
}

export default function EventRequestCard({ request, onSubmitProposal, hasSubmitted }: EventRequestCardProps) {
  return (
    <div className="bg-white rounded-xl border border-yellow/30 p-4 sm:p-5 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <Bell size={16} className="text-yellow" />
        <span className="text-xs font-medium text-yellow bg-yellow/10 px-2 py-0.5 rounded-full">
          Venue Request
        </span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            request.status === "pending"
              ? "bg-blue/10 text-blue"
              : request.status === "proposals_received"
              ? "bg-purple/10 text-purple"
              : request.status === "venue_confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-gray/10 text-gray"
          }`}
        >
          {request.status.replace(/_/g, " ")}
        </span>
      </div>

      <h3 className="text-base font-semibold text-navy mb-2">{request.eventTitle}</h3>
      <p className="text-sm text-gray mb-3">{request.purpose}</p>

      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div className="flex items-center gap-1.5 text-gray">
          <MapPin size={14} />
          <span>{request.preferredLocality}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray">
          <Users size={14} />
          <span>{request.expectedAudience} expected</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray">
          <DollarSign size={14} />
          <span>Budget: Rs {request.budget.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray">
          <Calendar size={14} />
          <span>{request.eventDuration}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray">
          <Tag size={14} />
          <span>{request.eventCategory}</span>
        </div>
      </div>

      <div className="text-xs text-gray mb-1">
        <span className="font-medium">Facilities needed:</span> {request.facilitiesRequired}
      </div>
      <div className="text-xs text-gray mb-3">
        <span className="font-medium">Volunteers needed:</span> {request.volunteersRequired}
      </div>

      {hasSubmitted ? (
        <div className="py-2 px-4 rounded-lg bg-green-50 text-green-700 text-sm font-medium text-center">
          Proposal Submitted
        </div>
      ) : (
        <button
          onClick={onSubmitProposal}
          className="w-full py-2 px-4 rounded-lg bg-purple text-white text-sm font-medium transition-colors hover:bg-purple/90"
        >
          Submit Proposal
        </button>
      )}
    </div>
  );
}
