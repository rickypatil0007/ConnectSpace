"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/app/components/Navbar";
import InterestSelector from "@/app/components/InterestSelector";
import EventCard from "@/app/components/EventCard";
import QRTicketModal from "@/app/components/QRTicketModal";
import RatingForm from "@/app/components/RatingForm";
import {
  dummyUsers,
  dummyEvents,
  CommunityEvent,
  InterestCategory,
  EventRating,
} from "@/lib/dummy-data";
import { rankEvents, getRecommendationReasons } from "@/lib/recommendation-engine";
import { Sparkles, Heart, Clock, Users as UsersIcon, Bell } from "lucide-react";

// Simulate the current user (first user from dummy data)
const currentUser = { ...dummyUsers[0] };

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || (status === "authenticated" && session?.user?.role !== "user")) {
      router.replace("/");
    }
  }, [session, status, router]);


  const [interests, setInterests] = useState<InterestCategory[]>(currentUser.interests);
  const [events, setEvents] = useState<CommunityEvent[]>(dummyEvents);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [bookedEvents, setBookedEvents] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"recommended" | "all" | "wishlist" | "booked">("recommended");

  // QR Ticket modal state
  const [ticketModal, setTicketModal] = useState<{
    isOpen: boolean;
    eventId: string;
    eventTitle: string;
    eventDate: string;
    venueName: string;
    venueAddress: string;
  }>({ isOpen: false, eventId: "", eventTitle: "", eventDate: "", venueName: "", venueAddress: "" });

  // Rating form modal state
  const [ratingModal, setRatingModal] = useState<{
    isOpen: boolean;
    eventId: string;
    eventTitle: string;
  }>({ isOpen: false, eventId: "", eventTitle: "" });

  // Update user object when interests change
  const user = useMemo(() => ({ ...currentUser, interests }), [interests]);

  // Step 6: AI Recommendation Engine ranks events
  const rankedEvents = useMemo(() => rankEvents(user, events), [user, events]);

  const allUpcoming = events.filter((e) => e.status === "upcoming");
  const completedEvents = events.filter((e) => e.status === "completed");
  const wishlistedEvents = events.filter((e) => wishlist.has(e.id));
  const bookedEventsList = events.filter((e) => bookedEvents.has(e.id));

  const toggleWishlist = (eventId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  // Step 7: Book event and receive QR ticket
  const bookEvent = (event: CommunityEvent) => {
    setBookedEvents((prev) => new Set(prev).add(event.id));
    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id ? { ...e, bookedSeats: e.bookedSeats + 1 } : e
      )
    );
    setTicketModal({
      isOpen: true,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      venueName: event.venueName,
      venueAddress: event.venueAddress,
    });
  };

  // Step 9: Submit ratings and feedback
  const submitRating = (eventId: string, rating: number, review: string) => {
    const newRating: EventRating = {
      userId: user.id,
      userName: user.name,
      rating,
      review,
    };
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, ratings: [...e.ratings, newRating] }
          : e
      )
    );
  };

  const tabs = [
    { id: "recommended" as const, label: "Recommended", icon: Sparkles },
    { id: "all" as const, label: "All Events", icon: UsersIcon },
    { id: "wishlist" as const, label: "Wishlist", icon: Heart },
    { id: "booked" as const, label: "Booked", icon: Clock },
  ];

  if (status === "loading" || session?.user?.role !== "user") return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-navy mb-1">User Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray">
            Welcome, {user.name} — {user.location}
          </p>
        </div>

        {/* Interest Selection */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-navy mb-3 flex items-center gap-1.5">
            <Sparkles size={14} className="text-yellow" />
            Your Interests
          </h2>
          <InterestSelector selected={interests} onChange={setInterests} />
        </section>

        {/* Event Reminders */}
        {bookedEventsList.filter((e) => e.status === "upcoming").length > 0 && (
          <section className="mb-6 p-4 bg-blue/5 rounded-xl border border-blue/15">
            <h2 className="text-sm font-semibold text-navy mb-2 flex items-center gap-1.5">
              <Bell size={14} className="text-blue" />
              Event Reminders
            </h2>
            {bookedEventsList
              .filter((e) => e.status === "upcoming")
              .map((event) => (
                <p key={event.id} className="text-sm text-gray">
                  <span className="font-medium text-navy">{event.title}</span> on {event.date} at {event.venueName}
                </p>
              ))}
          </section>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray/10 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue text-blue"
                  : "border-transparent text-gray hover:text-navy"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
              {tab.id === "wishlist" && wishlist.size > 0 && (
                <span className="text-xs bg-gray/10 px-1.5 py-0.5 rounded-full">{wishlist.size}</span>
              )}
            </button>
          ))}
        </div>

        {/* Event Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === "recommended" &&
            rankedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                reasons={getRecommendationReasons(user, event)}
                isWishlisted={wishlist.has(event.id)}
                onWishlistToggle={() => toggleWishlist(event.id)}
                onBook={() => bookEvent(event)}
                showBookButton={!bookedEvents.has(event.id)}
              />
            ))}

          {activeTab === "all" &&
            [...allUpcoming, ...completedEvents].map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isWishlisted={wishlist.has(event.id)}
                onWishlistToggle={() => toggleWishlist(event.id)}
                onBook={() => bookEvent(event)}
                onRate={() =>
                  setRatingModal({ isOpen: true, eventId: event.id, eventTitle: event.title })
                }
                showBookButton={!bookedEvents.has(event.id) && event.status === "upcoming"}
                showRateButton={event.status === "completed"}
              />
            ))}

          {activeTab === "wishlist" &&
            (wishlistedEvents.length > 0 ? (
              wishlistedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isWishlisted={true}
                  onWishlistToggle={() => toggleWishlist(event.id)}
                  onBook={() => bookEvent(event)}
                  showBookButton={!bookedEvents.has(event.id) && event.status === "upcoming"}
                />
              ))
            ) : (
              <p className="text-sm text-gray col-span-full text-center py-8">
                No events in your wishlist yet. Browse events and tap the heart icon to save them.
              </p>
            ))}

          {activeTab === "booked" &&
            (bookedEventsList.length > 0 ? (
              bookedEventsList.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isWishlisted={wishlist.has(event.id)}
                  onWishlistToggle={() => toggleWishlist(event.id)}
                  showBookButton={false}
                  showRateButton={event.status === "completed"}
                  onRate={() =>
                    setRatingModal({ isOpen: true, eventId: event.id, eventTitle: event.title })
                  }
                />
              ))
            ) : (
              <p className="text-sm text-gray col-span-full text-center py-8">
                No booked events yet. Browse recommended events and book one.
              </p>
            ))}
        </div>

        {/* Community Networking section for completed events */}
        {completedEvents.length > 0 && (
          <section className="mt-8 p-5 bg-white rounded-xl border border-gray/15">
            <h2 className="text-base font-semibold text-navy mb-3 flex items-center gap-1.5">
              <UsersIcon size={16} className="text-purple" />
              Community Networking
            </h2>
            <p className="text-sm text-gray mb-3">
              Connect with attendees from events you have attended.
            </p>
            {completedEvents.map((event) => (
              <div key={event.id} className="mb-3 last:mb-0">
                <p className="text-sm font-medium text-navy">{event.title}</p>
                <p className="text-xs text-gray">
                  {event.attendees.length} attendees — {event.ratings.length} reviews
                </p>
                {event.ratings.map((r, i) => (
                  <div key={i} className="mt-1 pl-3 border-l-2 border-gray/10">
                    <p className="text-xs text-navy font-medium">{r.userName}</p>
                    <p className="text-xs text-gray">{"★".repeat(r.rating)} — {r.review}</p>
                  </div>
                ))}
              </div>
            ))}
          </section>
        )}
      </main>

      {/* QR Ticket Modal (Step 7) */}
      <QRTicketModal
        isOpen={ticketModal.isOpen}
        onClose={() => setTicketModal((prev) => ({ ...prev, isOpen: false }))}
        eventTitle={ticketModal.eventTitle}
        eventDate={ticketModal.eventDate}
        venueName={ticketModal.venueName}
        venueAddress={ticketModal.venueAddress}
        userName={user.name}
        ticketId={`CS-${ticketModal.eventId}-${Date.now().toString(36).toUpperCase()}`}
      />

      {/* Rating Form Modal (Step 9) */}
      <RatingForm
        isOpen={ratingModal.isOpen}
        onClose={() => setRatingModal((prev) => ({ ...prev, isOpen: false }))}
        onSubmit={(rating, review) => submitRating(ratingModal.eventId, rating, review)}
        eventTitle={ratingModal.eventTitle}
      />
    </div>
  );
}
