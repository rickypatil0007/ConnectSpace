"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/app/components/Navbar";
import SpaceListing from "@/app/components/SpaceListing";
import SpaceListingForm, { SpaceFormData } from "@/app/components/SpaceListingForm";
import EventRequestCard from "@/app/components/EventRequestCard";
import ProposalForm, { ProposalFormData } from "@/app/components/ProposalForm";
import {
  dummySpaces,
  dummyEventRequests,
  dummyProposals,
  Space,
  EventRequest,
  Proposal,
} from "@/lib/dummy-data";
import { Building, Bell, FileCheck, Plus } from "lucide-react";

export default function SpaceOwnerDashboard() {
  const { user: sessionUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!sessionUser || sessionUser.role !== "owner")) {
      router.replace("/");
    }
  }, [sessionUser, isLoading, router]);


  const [spaces, setSpaces] = useState<Space[]>(dummySpaces);
  const [eventRequests] = useState<EventRequest[]>(dummyEventRequests);
  const [proposals, setProposals] = useState<Proposal[]>(dummyProposals);
  const [activeTab, setActiveTab] = useState<"spaces" | "list" | "requests" | "proposals">("spaces");

  // Proposal form modal state
  const [proposalModal, setProposalModal] = useState<{
    isOpen: boolean;
    requestId: string;
    requestTitle: string;
  }>({ isOpen: false, requestId: "", requestTitle: "" });

  // Space owner lists a new space
  const handleListSpace = (data: SpaceFormData) => {
    const newSpace: Space = {
      id: `s_new_${Date.now()}`,
      name: data.name,
      type: data.type,
      address: data.address,
      locality: data.locality,
      capacity: data.capacity,
      availableTimeSlots: data.availableTimeSlots,
      rentalCharges: data.rentalCharges,
      photos: data.photos,
      amenities: data.amenities,
      parking: data.parking,
      accessibility: data.accessibility,
      ownerId: "owner1",
    };
    setSpaces((prev) => [newSpace, ...prev]);
    setActiveTab("spaces");
  };

  // Step 3: Space owner submits a proposal
  const handleSubmitProposal = (data: ProposalFormData) => {
    const newProposal: Proposal = {
      id: `p_new_${Date.now()}`,
      spaceId: spaces[0]?.id || "s1",
      eventRequestId: proposalModal.requestId,
      availableDates: data.availableDates,
      price: data.price,
      facilitiesOffered: data.facilitiesOffered,
      spaceName: spaces[0]?.name || "My Space",
      spaceType: spaces[0]?.type || "Community Hall",
      status: "pending",
    };
    setProposals((prev) => [...prev, newProposal]);
  };

  const submittedRequestIds = new Set(proposals.map((p) => p.eventRequestId));

  // Step 2: Space owners receive notifications for events matching their locality
  const matchingRequests = eventRequests.filter(
    (r) =>
      (r.status === "pending" || r.status === "proposals_received") &&
      spaces.some((s) => s.locality === r.preferredLocality)
  );

  const tabs = [
    { id: "spaces" as const, label: "My Spaces", icon: Building, count: spaces.length },
    { id: "list" as const, label: "List Space", icon: Plus },
    { id: "requests" as const, label: "Event Requests", icon: Bell, count: matchingRequests.length },
    { id: "proposals" as const, label: "My Proposals", icon: FileCheck },
  ];

  if (isLoading || sessionUser?.role !== "owner") return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-navy mb-1">Space Owner Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray">
            List your spaces, receive event requests, and submit proposals
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray/10 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-yellow text-yellow"
                  : "border-transparent text-gray hover:text-navy"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="text-xs bg-yellow/15 text-yellow px-1.5 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "spaces" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-navy">Listed Spaces</h2>
                <p className="text-sm text-gray">
                  Your registered spaces with all details visible to event organizers.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("list")}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple text-white text-sm font-medium hover:bg-purple/90 transition-colors"
              >
                <Plus size={16} />
                List New Space
              </button>
            </div>
            {spaces.length === 0 ? (
              <div className="text-center py-12">
                <Building size={40} className="text-gray/30 mx-auto mb-3" />
                <p className="text-sm text-gray mb-4">
                  No spaces listed yet. List your first space to start receiving event requests.
                </p>
                <button
                  onClick={() => setActiveTab("list")}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-purple text-white text-sm font-medium hover:bg-purple/90 transition-colors"
                >
                  <Plus size={16} />
                  List Your First Space
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {spaces.map((space) => (
                    <SpaceListing key={space.id} space={space} />
                  ))}
                </div>
                {/* Mobile-only button at bottom */}
                <button
                  onClick={() => setActiveTab("list")}
                  className="sm:hidden w-full flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg bg-purple text-white text-sm font-medium hover:bg-purple/90 transition-colors mt-2"
                >
                  <Plus size={16} />
                  List Another Space
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === "list" && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-xl border border-gray/15 p-4 sm:p-6">
              <SpaceListingForm onSubmit={handleListSpace} />
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-navy">Incoming Event Requests</h2>
            <p className="text-sm text-gray mb-4">
              Event requests matching your spaces&apos; localities. Submit a proposal to host these events.
            </p>
            {matchingRequests.length === 0 ? (
              <p className="text-sm text-gray text-center py-8">
                No matching event requests right now. Requests will appear when organizers create events in your locality.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchingRequests.map((request) => (
                  <EventRequestCard
                    key={request.id}
                    request={request}
                    hasSubmitted={submittedRequestIds.has(request.id)}
                    onSubmitProposal={() =>
                      setProposalModal({
                        isOpen: true,
                        requestId: request.id,
                        requestTitle: request.eventTitle,
                      })
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "proposals" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-navy">Submitted Proposals</h2>
            {proposals.length === 0 ? (
              <p className="text-sm text-gray text-center py-8">
                No proposals submitted yet. Go to Event Requests to submit one.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {proposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className={`bg-white rounded-xl border p-5 ${
                      proposal.status === "accepted"
                        ? "border-green-400 bg-green-50/30"
                        : proposal.status === "rejected"
                        ? "border-red-200 opacity-60"
                        : "border-gray/15"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-navy">{proposal.spaceName}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          proposal.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : proposal.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow/10 text-yellow"
                        }`}
                      >
                        {proposal.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray mb-1">
                      Price: Rs {proposal.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray">
                      Dates: {proposal.availableDates.join(", ")}
                    </p>
                    <p className="text-xs text-gray mt-1">
                      Facilities: {proposal.facilitiesOffered}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Proposal Form Modal (Step 3) */}
      <ProposalForm
        isOpen={proposalModal.isOpen}
        onClose={() => setProposalModal((prev) => ({ ...prev, isOpen: false }))}
        onSubmit={handleSubmitProposal}
        eventTitle={proposalModal.requestTitle}
      />
    </div>
  );
}
