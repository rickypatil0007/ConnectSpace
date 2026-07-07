# AGENTS.MD — ConnectSpace
# The Blueprint Ideathon 2026 | Problem Statement 3

---

## Project Identity

**Solution Name:** ConnectSpace
**Tagline:** Connecting People, Spaces & Communities
**Competition:** The Blueprint Ideathon 2026 — Rotaract Club of TCET
**Theme:** Community Innovation for Social Impact
**Problem Statement:** 3 — The Urban "Loneliness Epidemic" & Unused Public Spaces

---

## Problem Statement (Exact — PS3)

Mumbai has a rising epidemic of loneliness, especially among senior citizens, migrant workers,
and work-from-home professionals. Simultaneously, Mumbai has thousands of underutilized
public spaces: empty playgrounds, dead community halls, quiet gardens. There is no bridge
between lonely people and empty spaces. Corporates want to sponsor wellness events, but they
do not know where to host them or who to invite.

### Two Parallel Problems

Problem A — Human:
- Senior citizens, migrant workers, and work-from-home professionals suffer from loneliness.
- Citizens are unaware of nearby community events matching their interests.

Problem B — Infrastructure:
- Playgrounds, community halls, gardens, and recreational spaces remain unused most of the year.
- Corporates cannot find suitable venues for CSR and wellness events.
- NGOs cannot find funding or proper infrastructure for social initiatives.

### Root Cause

No single platform connects these stakeholders. Each operates in isolation, so the problem
compounds on both sides.

---

## Solution Overview

ConnectSpace is an AI-powered web platform that transforms unused public spaces into active
community hubs by connecting three stakeholders into one ecosystem:

- Users (Citizens)
- Organizers (Corporates and NGOs)
- Space Owners

Instead of each stakeholder working independently, ConnectSpace enables community events
to be funded, hosted, managed, and attended seamlessly on a single platform.

---

## Platform Architecture

### 1. User Dashboard

Users create an account and select interests at registration.

Supported interest categories:
- Chess
- Yoga
- Music
- Dance
- Art
- Reading
- Meditation
- Fitness
- Networking
- Volunteering

After login, users receive personalized event recommendations.

Features:
- AI-powered event recommendations
- Nearby events (location-based)
- Free and paid event browsing
- Event booking
- QR-code digital ticket
- Wishlist
- Event reminders
- Ratings and reviews
- Community networking after events

---

### 2. Organizer Dashboard (Corporate + NGO)

Used by both Corporates and NGOs. Corporates sponsor and fund events. NGOs organize and
manage events. Together they create events using this form:

Fields required to create an event:
- Event Title
- Purpose
- Social Impact
- Budget
- Preferred Locality
- Expected Audience
- Event Duration
- Facilities Required
- Number of Volunteers Required
- Free or Paid Entry
- Age Group
- Event Category

Example event created via this dashboard:

    Event: Mental Wellness Workshop
    Budget: Rs 2,00,000
    Preferred Area: Borivali
    Audience: 250 people
    Venue Required: Indoor Hall
    Volunteers Needed: 20

Once published, the platform notifies nearby space owners matching the locality and
requirements of the event request.

---

### 3. Space Owner Dashboard

Owners register idle or underutilized spaces.

Supported space types:
- Community Halls
- Playgrounds
- Gardens
- Rooftops
- Auditoriums
- Indoor Sports Halls

Each listing must include:
- Address
- Capacity
- Available Time Slots
- Rental Charges
- Photos
- Amenities
- Parking availability
- Accessibility features

When a new event request matches their locality, space owners receive a notification.

Interested space owners submit a proposal containing:
- Available Dates
- Price
- Facilities Offered

The organizer compares all received proposals and selects the most suitable venue.

---

## Complete Platform Workflow (10 Steps — Accurate)

Step 1:
Organizer (Corporate + NGO) creates a community event via the Organizer Dashboard.

Step 2:
The platform identifies nearby space owners based on the preferred locality and sends them
the venue request notification.

Step 3:
Interested space owners review the event requirements and submit booking proposals with
their available dates, price, and facilities.

Step 4:
The Organizer reviews all submitted proposals side by side and confirms one venue.

Step 5:
The confirmed event is automatically published on the platform and made visible to users.

Step 6:
The AI Recommendation Engine analyzes registered users and pushes personalized event
suggestions based on:
- Personal interests selected at registration
- User's current location / distance to the event
- Previous event participation history
- Age group compatibility
- Event popularity and available seats
- Event category match

Step 7:
Interested users register for the event and receive a digital QR-code ticket for entry.

Step 8:
The event takes place at the confirmed venue.

Step 9:
Attendees submit ratings and written feedback for the event.

Step 10:
The Organizer receives a detailed impact report covering attendance figures, user engagement
metrics, and community response data.

---

## AI Recommendation Engine

Purpose: Ensure every user sees relevant events rather than a generic list.

Signals used by the engine:
- Personal Interests (set at registration)
- User Location (proximity to event venue)
- Event Category
- Previous Attendance history
- Age Group
- Event Popularity
- Available Seats remaining

Ranking logic example:

    User profile: Interests = Chess, Location = Kandivali
    Result: Chess Tournament in Kandivali ranks above Yoga Workshop in Andheri.

The engine prioritizes relevance over recency. A geographically close, interest-matched event
always outranks a popular but distant or mismatched event.

---

## Revenue Model

### Space Booking Commission
A commission of 5 to 10 percent is charged on every successfully completed venue booking.

### Organizer Service Fee
Corporates and NGOs pay a flat platform fee covering event management, venue matching,
and promotion services.

### Ticket Commission
For paid events, ConnectSpace collects a percentage of every ticket sold through the platform.

### Featured Event Promotion
Organizers pay to have their events highlighted on the homepage for increased visibility
and discovery.

### Analytics Subscription (Future Phase)
Premium organizers access advanced analytics including:
- Attendance Reports
- User Engagement metrics
- Community Impact Score
- Event Performance Analytics
- CSR Reporting Dashboard

---

## Social Impact Summary

For Citizens:
- Reduces loneliness through structured community interaction
- Encourages meaningful social engagement
- Helps individuals discover nearby interest-based communities

For Organizers (Corporate + NGO):
- Simplifies CSR and community event planning end-to-end
- Provides access to pre-vetted, suitable venues
- Reaches the right audience through AI targeting
- Measures event impact with post-event analytics

For Space Owners:
- Generates income from previously idle properties
- Improves utilization of community infrastructure

For Society:
- Revives unused public spaces
- Builds stronger neighborhood connections
- Promotes healthier, more engaged communities

---


## Strategy

### Phase 1 — Research and Problem Framing

Success criteria:
- PS3 problem is documented with Mumbai-specific data points (loneliness statistics,
  number of underutilized public spaces, CSR budget figures).
- Clear differentiation from existing event platforms is articulated in writing.
- All three stakeholder pain points are mapped to the three dashboards.
- Agent has confirmed all PS3 details are consistent with the ideathon docket.

---

### Phase 2 — Solution Architecture and Content

Success criteria:
- All three dashboards (User, Organizer, Space Owner) are fully documented with
  every field and feature listed in this file.
- The 10-step workflow is presented clearly in the PPT without omitting any step.
- The AI recommendation engine is explained with at least one concrete example.
- The revenue model covers all four current streams.
- Impact is categorized by stakeholder group.

---

### Phase 3 — Round 1 PPT Production

Success criteria:
- Slide count is between 5 and 6. No more. No fewer.
- Output format is PDF only.
- File is named exactly: TeamLeaderName_Blueprint.pdf
- All six required sections are present: Introduction, Problem Statement, Proposed Solution,
  Feasibility, Impact, Tech Stack and Future Scope.
- Visual design is clean, professional, and consistent.
- No offensive, unethical, or discriminatory content is present.
- Content is submitted before the deadline.

---

### Phase 4 — Round 2 Pitch Preparation

Success criteria:
- A complete 5-minute script exists covering both segments.
- Each team member has an assigned role in the Creative CEO Persuasion segment.
- A Q&A answer bank covers feasibility, risks, implementation strategy, scalability,
  and monetization.
- At least one rehearsal run has been completed and timed.
- The pitch fits within 5 minutes including transitions.
- All team members can independently answer questions about any part of the solution.

---

### Phase 5 — Final Review and Submission

Success criteria:
- PDF has been reviewed for formatting issues on at least two different devices.
- All facts, figures, and claims in the PPT can be defended verbally.
- File naming follows the exact convention: TeamLeaderName_Blueprint.pdf
- Submission has been sent before the deadline.
- The team is ready for Round 2 regardless of shortlisting timeline.

---

## Technical Requirements (Platform MVP — If Building)

Stack:
- Frontend: Next.js (client-rendered, latest stable version)
- Subdirectory: frontend/
- No persistence layer for MVP
- No user authentication for MVP
- Use well-supported, popular libraries only

AI Recommendation Engine (MVP scope):
- Rule-based interest and location matching for MVP
- Full ML-based ranking deferred to post-MVP

Dashboards to build (MVP):
- User Dashboard with interest selection and event browsing
- Organizer Dashboard with event creation form
- Space Owner Dashboard with listing form and proposal submission

Data:
- Populate with dummy data on launch (no empty states for demo)
- No search, no filter, no archive in MVP scope

---

## Design Standards

Color Scheme:
- Accent Yellow: #ecad0a — accent lines and highlights
- Blue Primary: #209dd7 — links and key sections
- Purple Secondary: #753991 — submit buttons and important actions
- Dark Navy: #032147 — main headings
- Gray Text: #888888 — supporting text and labels

Visual principles:
- Clean, professional, and modern
- No unnecessary complexity
- Every screen must work for non-technical users (senior citizens, NGO staff)
- Mobile-friendly layout for field workers and space owners

---

## Coding Standards (If Building MVP)

1. Use latest stable versions of all libraries. Use idiomatic patterns for each framework.
2. Keep it simple. Never over-engineer. No defensive programming beyond what is necessary.
   No extra features beyond what is listed in this file.
3. Be concise. Keep README minimal. No emojis anywhere in the codebase or documentation.

---

## Key Features Checklist

- AI-powered event recommendations
- Smart venue matching between organizers and space owners
- Digital event booking for users
- QR code check-in ticket system
- Free and paid event support
- Community networking after events
- Organizer analytics and impact report dashboard
- Post-event feedback and ratings system

---

## Agent Rules

1. Do not add features not listed in this file. The scope is fixed.
2. Do not change the 10-step workflow. It is the canonical flow.
3. All three dashboards must be treated as equally important.
4. The AI recommendation engine signals listed in this file are the complete list for MVP.
5. Every deliverable must satisfy the success criteria for its phase before moving to the next.
6. Round 1 PPT must never exceed 6 slides. This is a hard limit from the ideathon docket.
7. Round 2 pitch must fit in 5 minutes. This is strictly timed by judges.
8. The problem being solved is PS3 only. Do not mix content from other problem statements.
9. Claims about Mumbai loneliness or space underutilization must be accurate and verifiable.
10. The judges' decision is final. The agent's role is to prepare the strongest possible submission,
    not to predict or game the judging criteria.