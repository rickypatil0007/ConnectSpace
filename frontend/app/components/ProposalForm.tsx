"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface ProposalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProposalFormData) => void;
  eventTitle: string;
}

export interface ProposalFormData {
  availableDates: string[];
  price: number;
  facilitiesOffered: string;
}

export default function ProposalForm({ isOpen, onClose, onSubmit, eventTitle }: ProposalFormProps) {
  const [dates, setDates] = useState("");
  const [price, setPrice] = useState(0);
  const [facilities, setFacilities] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      availableDates: dates.split(",").map((d) => d.trim()),
      price,
      facilitiesOffered: facilities,
    });
    setDates("");
    setPrice(0);
    setFacilities("");
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray/20 rounded-lg text-sm text-navy placeholder:text-gray/50 focus:outline-none focus:border-blue transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-navy mb-1">Submit Proposal</h2>
        <p className="text-sm text-gray mb-5">For: {eventTitle}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Proposal Field 1: Available Dates */}
          <div>
            <label htmlFor="availableDates" className="block text-sm font-medium text-navy mb-1">
              Available Dates
            </label>
            <input
              id="availableDates"
              type="text"
              required
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder="e.g., 2026-08-10, 2026-08-17"
              className={inputClass}
            />
            <p className="text-xs text-gray mt-1">Comma-separated dates</p>
          </div>

          {/* Proposal Field 2: Price */}
          <div>
            <label htmlFor="proposalPrice" className="block text-sm font-medium text-navy mb-1">
              Price (Rs)
            </label>
            <input
              id="proposalPrice"
              type="number"
              required
              min={0}
              value={price || ""}
              onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
              placeholder="e.g., 15000"
              className={inputClass}
            />
          </div>

          {/* Proposal Field 3: Facilities Offered */}
          <div>
            <label htmlFor="facilitiesOffered" className="block text-sm font-medium text-navy mb-1">
              Facilities Offered
            </label>
            <textarea
              id="facilitiesOffered"
              required
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
              rows={3}
              placeholder="e.g., Projector, Sound System, AC, 300 Chairs"
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-lg border border-gray/20 text-sm font-medium text-gray hover:bg-gray/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 rounded-lg bg-purple text-white text-sm font-medium transition-colors hover:bg-purple/90 flex items-center justify-center gap-1.5"
            >
              <Send size={14} />
              Submit Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
