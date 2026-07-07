Phase 1 — Project Setup

Scaffold a Next.js app (latest stable, App Router) inside a frontend/ subdirectory, per the Technical Requirements section.
Install Tailwind CSS and lucide-react for icons (same libraries used in the demo artifact, so the UI logic carries over directly).
No database, no auth packages, no ORM — MVP has no persistence layer and no login.
Set up the color tokens as CSS variables: Navy #032147, Blue #209dd7, Purple #753991, Yellow #ecad0a, Gray #888888.

Success criteria: npm run dev runs cleanly with a blank styled shell using the token colors.
Phase 2 — Data Layer (Dummy Data Only)

Create a lib/dummy-data.ts file holding the seed data: events, spaces, proposals, event requests (same shape as the artifact's dummy arrays).
No API routes, no fetch calls, no external requests — everything is read from this in-memory file so the app never shows an empty state.

Success criteria: All three dashboards can render fully from this one file with zero network calls.
Phase 3 — Three Dashboards
Build each as its own route or tab, matching AGENTS.md field-for-field:

User Dashboard (/user) — interest chips, AI-ranked event feed (rule-based scoring: interest match, locality match, popularity), wishlist, book-to-QR flow.
Organizer Dashboard (/organizer) — the 12-field event creation form, published events list, side-by-side proposal comparison, venue confirmation.
Space Owner Dashboard (/owner) — incoming request notifications, submit-proposal action, listed spaces with all required fields (capacity, rent, amenities, parking, accessibility).

Success criteria: All fields from the Platform Architecture section in AGENTS.md appear somewhere in the UI. No step of the 10-step workflow is skipped in the interaction flow (create event → notify owners → proposals → confirm → publish → recommend → book → attend → rate → report).
Phase 4 — Polish and Responsiveness

Mobile-friendly layout (field workers and space owners use phones).
Keyboard-navigable forms and buttons, visible focus states.
Clean up spacing, verify no CSS specificity clashes between components.

Success criteria: Works on a phone-width viewport without horizontal scroll or broken forms.
Phase 5 — Test and Finalize

Click through every flow once: create event, submit proposal, confirm venue, book event, view QR ticket, toggle wishlist.
Confirm the dev server starts without errors before calling it done — per your rule, the MVP is only "finished" when it's tested and the server is running and ready.

Success criteria: Server runs, every flow works end-to-end, no console errors.