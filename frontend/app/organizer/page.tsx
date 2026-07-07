"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/app/components/Navbar";
import EventCreationForm, { EventFormData } from "@/app/components/EventCreationForm";
import ProposalComparison from "@/app/components/ProposalComparison";
import ImpactReportView from "@/app/components/ImpactReport";
import {
  dummyEventRequests,
  dummyProposals,
  dummyEvents,
  dummyImpactReports,
  EventRequest,
  Proposal,
  CommunityEvent,
  ImpactReport,
} from "@/lib/dummy-data";
import { Plus, FileText, BarChart3, CheckCircle, ClipboardList } from "lucide-react";

export default function OrganizerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || (status === "authenticated" && session?.user?.role !== "organizer")) {
      router.replace("/");
    }
  }, [session, status, router]);


  const [eventRequests, setEventRequests] = useState<EventRequest[]>(dummyEventRequests);
  const [proposals, setProposals] = useState<Proposal[]>(dummyProposals);
  const [events, setEvents] = useState<CommunityEvent[]>(dummyEvents);
  const [impactReports] = useState<ImpactReport[]>(dummyImpactReports);
  const [activeTab, setActiveTab] = useState<"create" | "events" | "proposals" | "reports">("create");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  // Step 1: Organizer creates a community event
  const handleCreateEvent = (data: EventFormData) => {
    const newRequest: EventRequest = {
      id: `er_new_${Date.now()}`,
      eventTitle: data.eventTitle,
      purpose: data.purpose,
      socialImpact: data.socialImpact,
      budget: data.budget,
      preferredLocality: data.preferredLocality,
      expectedAudience: data.expectedAudience,
      eventDuration: data.eventDuration,
      facilitiesRequired: data.facilitiesRequired,
      volunteersRequired: data.volunteersRequired,
      freeOrPaid: data.freeOrPaid,
      ageGroup: data.ageGroup,
      eventCategory: data.eventCategory,
      status: "pending",
      organizerId: "org1",
    };
    setEventRequests((prev) => [newRequest, ...prev]);
    setActiveTab("events");
  };

  // Step 4: Organizer confirms a venue
  const handleAcceptProposal = (proposalId: string) => {
    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === proposalId) return { ...p, status: "accepted" as const };
        if (p.eventRequestId === prev.find((pp) => pp.id === proposalId)?.eventRequestId) {
          return { ...p, status: "rejected" as const };
        }
        return p;
      })
    );

    // Step 5: Publish the event
    const acceptedProposal = proposals.find((p) => p.id === proposalId);
    if (acceptedProposal) {
      const request = eventRequests.find((r) => r.id === acceptedProposal.eventRequestId);
      if (request) {
        setEventRequests((prev) =>
          prev.map((r) =>
            r.id === request.id ? { ...r, status: "venue_confirmed" as const } : r
          )
        );
        const newEvent: CommunityEvent = {
          id: `e_new_${Date.now()}`,
          eventRequestId: request.id,
          title: request.eventTitle,
          purpose: request.purpose,
          socialImpact: request.socialImpact,
          budget: request.budget,
          locality: request.preferredLocality,
          expectedAudience: request.expectedAudience,
          duration: request.eventDuration,
          facilitiesRequired: request.facilitiesRequired,
          volunteersRequired: request.volunteersRequired,
          freeOrPaid: request.freeOrPaid,
          ageGroup: request.ageGroup,
          category: request.eventCategory,
          venueName: acceptedProposal.spaceName,
          venueAddress: "Confirmed venue address",
          date: acceptedProposal.availableDates[0],
          ticketPrice: request.freeOrPaid === "Free" ? 0 : 100,
          totalSeats: request.expectedAudience,
          bookedSeats: 0,
          status: "upcoming",
          attendees: [],
          ratings: [],
        };
        setEvents((prev) => [newEvent, ...prev]);
      }
    }
  };

  const handleRejectProposal = (proposalId: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, status: "rejected" as const } : p))
    );
  };

  const requestsWithProposals = eventRequests.filter(
    (r) => r.status === "proposals_received" || r.status === "pending"
  );

  const tabs = [
    { id: "create" as const, label: "Create Event", icon: Plus },
    { id: "events" as const, label: "Published Events", icon: ClipboardList },
    { id: "proposals" as const, label: "Proposals", icon: FileText },
    { id: "reports" as const, label: "Impact Reports", icon: BarChart3 },
  ];

  if (status === "loading" || session?.user?.role !== "organizer") return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-navy mb-1">Organizer Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray">
            Corporates & NGOs — Create events, manage venues, measure impact
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
                  ? "border-purple text-purple"
                  : "border-transparent text-gray hover:text-navy"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "create" && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-xl border border-gray/15 p-6">
              <EventCreationForm onSubmit={handleCreateEvent} />
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-navy">Event Requests</h2>
            {eventRequests.length === 0 ? (
              <p className="text-sm text-gray text-center py-8">No event requests yet. Create one to get started.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eventRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white rounded-xl border border-gray/15 p-5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          request.status === "pending"
                            ? "bg-yellow/10 text-yellow"
                            : request.status === "proposals_received"
                            ? "bg-blue/10 text-blue"
                            : request.status === "venue_confirmed"
                            ? "bg-green-100 text-green-700"
                            : request.status === "published"
                            ? "bg-purple/10 text-purple"
                            : "bg-gray/10 text-gray"
                        }`}
                      >
                        {request.status.replace(/_/g, " ")}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-navy mb-1">{request.eventTitle}</h3>
                    <p className="text-sm text-gray mb-2">{request.purpose}</p>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray">
                      <span>Budget: Rs {request.budget.toLocaleString()}</span>
                      <span>Locality: {request.preferredLocality}</span>
                      <span>Audience: {request.expectedAudience}</span>
                      <span>Duration: {request.eventDuration}</span>
                      <span>Category: {request.eventCategory}</span>
                      <span>Entry: {request.freeOrPaid}</span>
                    </div>
                    {(request.status === "proposals_received" || request.status === "pending") && (
                      <button
                        onClick={() => {
                          setSelectedRequestId(request.id);
                          setActiveTab("proposals");
                        }}
                        className="mt-3 w-full py-1.5 px-3 rounded-lg bg-blue/10 text-blue text-sm font-medium transition-colors hover:bg-blue/20"
                      >
                        View Proposals ({proposals.filter((p) => p.eventRequestId === request.id).length})
                      </button>
                    )}
                    {request.status === "venue_confirmed" && (
                      <div className="mt-3 flex items-center gap-1.5 text-sm text-green-700">
                        <CheckCircle size={14} />
                        Venue confirmed — Event published
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Published events list */}
            <h2 className="text-lg font-semibold text-navy mt-8">Published Events</h2>
            {events.length === 0 ? (
              <p className="text-sm text-gray text-center py-8">No published events yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl border border-gray/15 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          event.status === "upcoming" ? "bg-blue/10 text-blue" : "bg-gray/10 text-gray"
                        }`}
                      >
                        {event.status}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        event.freeOrPaid === "Free" ? "bg-green-50 text-green-700" : "bg-yellow/10 text-yellow"
                      }`}>
                        {event.freeOrPaid}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-navy">{event.title}</h3>
                    <p className="text-sm text-gray mt-1">{event.purpose}</p>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray mt-2">
                      <span>Date: {event.date}</span>
                      <span>Venue: {event.venueName}</span>
                      <span>Booked: {event.bookedSeats}/{event.totalSeats}</span>
                      <span>Reviews: {event.ratings.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "proposals" && (
          <div>
            {selectedRequestId ? (
              <>
                <button
                  onClick={() => setSelectedRequestId(null)}
                  className="text-sm text-blue mb-4 hover:underline"
                >
                  View all event requests
                </button>
                <ProposalComparison
                  proposals={proposals.filter((p) => p.eventRequestId === selectedRequestId)}
                  onAccept={handleAcceptProposal}
                  onReject={handleRejectProposal}
                />
              </>
            ) : (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-navy">Select an Event Request</h2>
                {requestsWithProposals.length === 0 ? (
                  <p className="text-sm text-gray text-center py-8">No pending proposals.</p>
                ) : (
                  requestsWithProposals.map((request) => (
                    <button
                      key={request.id}
                      onClick={() => setSelectedRequestId(request.id)}
                      className="w-full text-left bg-white rounded-xl border border-gray/15 p-4 hover:shadow-md transition-all"
                    >
                      <h3 className="text-base font-semibold text-navy">{request.eventTitle}</h3>
                      <p className="text-sm text-gray">
                        {proposals.filter((p) => p.eventRequestId === request.id).length} proposal(s) received
                      </p>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-navy">Impact Reports</h2>
            {impactReports.length === 0 ? (
              <p className="text-sm text-gray text-center py-8">No impact reports yet. Reports are generated after events complete.</p>
            ) : (
              impactReports.map((report) => (
                <ImpactReportView key={report.eventId} report={report} />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
