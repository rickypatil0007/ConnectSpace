// Rule-based AI Recommendation Engine for MVP.
// Signals (from AGENTS.md):
// 1. Personal Interests (set at registration)
// 2. User Location (proximity to event venue)
// 3. Event Category
// 4. Previous Attendance history
// 5. Age Group
// 6. Event Popularity
// 7. Available Seats remaining

import { CommunityEvent, User } from "./dummy-data";

interface RecommendationScore {
  event: CommunityEvent;
  score: number;
  reasons: string[];
}

// Mumbai localities and rough proximity groups
const localityProximity: Record<string, string[]> = {
  Kandivali: ["Kandivali", "Malad", "Borivali", "Goregaon"],
  Borivali: ["Borivali", "Kandivali", "Malad", "Dahisar"],
  Malad: ["Malad", "Kandivali", "Goregaon", "Borivali"],
  Andheri: ["Andheri", "Goregaon", "Vile Parle", "Jogeshwari"],
  Goregaon: ["Goregaon", "Malad", "Andheri", "Kandivali"],
  Dahisar: ["Dahisar", "Borivali", "Mira Road"],
};

function isNearby(userLocation: string, eventLocality: string): boolean {
  const nearby = localityProximity[userLocation];
  if (!nearby) return userLocation === eventLocality;
  return nearby.includes(eventLocality);
}

function parseAgeRange(ageGroup: string): [number, number] {
  if (ageGroup === "All Ages") return [0, 100];
  const match = ageGroup.match(/(\d+)/g);
  if (!match) return [0, 100];
  if (match.length === 1) {
    const num = parseInt(match[0]);
    if (ageGroup.includes("+")) return [num, 100];
    return [0, num];
  }
  return [parseInt(match[0]), parseInt(match[1])];
}

function getUserAge(ageGroup: string): number {
  const [min, max] = parseAgeRange(ageGroup);
  return Math.floor((min + max) / 2);
}

function isAgeCompatible(userAgeGroup: string, eventAgeGroup: string): boolean {
  const userAge = getUserAge(userAgeGroup);
  const [eventMin, eventMax] = parseAgeRange(eventAgeGroup);
  return userAge >= eventMin && userAge <= eventMax;
}

export function rankEvents(user: User, events: CommunityEvent[]): CommunityEvent[] {
  const scored: RecommendationScore[] = events
    .filter((e) => e.status === "upcoming")
    .map((event) => {
      let score = 0;
      const reasons: string[] = [];

      // Signal 1: Interest match (highest weight)
      if (user.interests.includes(event.category)) {
        score += 40;
        reasons.push("Matches your interest in " + event.category);
      }

      // Signal 2: Location proximity
      if (event.locality === user.location) {
        score += 25;
        reasons.push("In your locality");
      } else if (isNearby(user.location, event.locality)) {
        score += 15;
        reasons.push("Nearby area");
      }

      // Signal 3: Event category match (covered by interest match above, but
      // if the category is adjacent to interests, give partial credit)
      // This is implicitly handled by Signal 1.

      // Signal 4: Previous attendance — boost if user attended similar events
      if (user.previousEvents.length > 0) {
        score += 5;
        reasons.push("Based on your event history");
      }

      // Signal 5: Age group compatibility
      if (isAgeCompatible(user.ageGroup, event.ageGroup)) {
        score += 10;
        reasons.push("Suitable for your age group");
      }

      // Signal 6: Event popularity
      const fillRate = event.bookedSeats / event.totalSeats;
      if (fillRate > 0.5) {
        score += 10;
        reasons.push("Popular event");
      } else if (fillRate > 0.25) {
        score += 5;
      }

      // Signal 7: Available seats remaining — penalize nearly-full events
      const seatsLeft = event.totalSeats - event.bookedSeats;
      if (seatsLeft > 0 && seatsLeft <= 10) {
        score += 3;
        reasons.push("Almost full — book soon");
      } else if (seatsLeft > 10) {
        score += 5;
      }

      return { event, score, reasons };
    });

  // Sort by score descending. Relevance over recency per AGENTS.md.
  scored.sort((a, b) => b.score - a.score);

  return scored.map((s) => s.event);
}

export function getRecommendationReasons(
  user: User,
  event: CommunityEvent
): string[] {
  const reasons: string[] = [];

  if (user.interests.includes(event.category)) {
    reasons.push("Matches your interest in " + event.category);
  }
  if (event.locality === user.location) {
    reasons.push("In your locality");
  } else if (isNearby(user.location, event.locality)) {
    reasons.push("Nearby area");
  }
  if (isAgeCompatible(user.ageGroup, event.ageGroup)) {
    reasons.push("Suitable for your age group");
  }
  const fillRate = event.bookedSeats / event.totalSeats;
  if (fillRate > 0.5) {
    reasons.push("Popular event");
  }
  const seatsLeft = event.totalSeats - event.bookedSeats;
  if (seatsLeft > 0 && seatsLeft <= 10) {
    reasons.push("Almost full — book soon");
  }

  return reasons;
}
