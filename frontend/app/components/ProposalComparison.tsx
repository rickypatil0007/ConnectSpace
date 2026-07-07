"use client";

import { Proposal } from "@/lib/dummy-data";
import { Calendar, DollarSign, Wrench, Check, X } from "lucide-react";

interface ProposalComparisonProps {
  proposals: Proposal[];
  onAccept: (proposalId: string) => void;
  onReject: (proposalId: string) => void;
}

export default function ProposalComparison({ proposals, onAccept, onReject }: ProposalComparisonProps) {
  if (proposals.length === 0) {
    return (
      <div className="text-center py-8 text-gray text-sm">
        No proposals received yet. Space owners will submit proposals once notified.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-navy">Compare Proposals</h3>
      <p className="text-sm text-gray mb-4">Review and compare proposals from space owners side by side.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className={`bg-white rounded-xl border p-5 transition-all duration-200 ${
              proposal.status === "accepted"
                ? "border-green-400 bg-green-50/30"
                : proposal.status === "rejected"
                ? "border-red-200 opacity-60"
                : "border-gray/15 hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-navy">{proposal.spaceName}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray/10 text-gray">
                {proposal.spaceType}
              </span>
            </div>

            {proposal.status !== "pending" && (
              <span
                className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 ${
                  proposal.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {proposal.status === "accepted" ? "Accepted" : "Rejected"}
              </span>
            )}

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2 text-sm">
                <DollarSign size={14} className="text-gray mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-navy">Rs {proposal.price.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Calendar size={14} className="text-gray mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray">Available: </span>
                  <span className="text-navy">{proposal.availableDates.join(", ")}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Wrench size={14} className="text-gray mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray">Facilities: </span>
                  <span className="text-navy">{proposal.facilitiesOffered}</span>
                </div>
              </div>
            </div>

            {proposal.status === "pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => onAccept(proposal.id)}
                  className="flex-1 py-2 px-3 rounded-lg bg-green-600 text-white text-sm font-medium transition-colors hover:bg-green-700 flex items-center justify-center gap-1"
                >
                  <Check size={14} />
                  Confirm
                </button>
                <button
                  onClick={() => onReject(proposal.id)}
                  className="flex-1 py-2 px-3 rounded-lg border border-gray/20 text-gray text-sm font-medium transition-colors hover:bg-gray/5 flex items-center justify-center gap-1"
                >
                  <X size={14} />
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
