"use client";

import { useState } from "react";
import { ALL_INTERESTS, InterestCategory } from "@/lib/dummy-data";
import { Send } from "lucide-react";

interface EventCreationFormProps {
  onSubmit: (data: EventFormData) => void;
}

export interface EventFormData {
  eventTitle: string;
  purpose: string;
  socialImpact: string;
  budget: number;
  preferredLocality: string;
  expectedAudience: number;
  eventDuration: string;
  facilitiesRequired: string;
  volunteersRequired: number;
  freeOrPaid: "Free" | "Paid";
  ageGroup: string;
  eventCategory: InterestCategory;
}

const localities = ["Kandivali", "Borivali", "Malad", "Andheri", "Goregaon", "Dahisar"];
const ageGroups = ["All Ages", "18+", "18-45", "25+", "25-35", "35-45", "55-65"];

export default function EventCreationForm({ onSubmit }: EventCreationFormProps) {
  const [form, setForm] = useState<EventFormData>({
    eventTitle: "",
    purpose: "",
    socialImpact: "",
    budget: 0,
    preferredLocality: "",
    expectedAudience: 0,
    eventDuration: "",
    facilitiesRequired: "",
    volunteersRequired: 0,
    freeOrPaid: "Free",
    ageGroup: "All Ages",
    eventCategory: "Yoga",
  });

  const update = (field: keyof EventFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      eventTitle: "",
      purpose: "",
      socialImpact: "",
      budget: 0,
      preferredLocality: "",
      expectedAudience: 0,
      eventDuration: "",
      facilitiesRequired: "",
      volunteersRequired: 0,
      freeOrPaid: "Free",
      ageGroup: "All Ages",
      eventCategory: "Yoga",
    });
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray/20 rounded-lg text-sm text-navy placeholder:text-gray/50 focus:outline-none focus:border-blue transition-colors";
  const labelClass = "block text-sm font-medium text-navy mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-navy mb-2">Create Community Event</h3>

      {/* Field 1: Event Title */}
      <div>
        <label htmlFor="eventTitle" className={labelClass}>Event Title</label>
        <input
          id="eventTitle"
          type="text"
          required
          value={form.eventTitle}
          onChange={(e) => update("eventTitle", e.target.value)}
          placeholder="e.g., Mental Wellness Workshop"
          className={inputClass}
        />
      </div>

      {/* Field 2: Purpose */}
      <div>
        <label htmlFor="purpose" className={labelClass}>Purpose</label>
        <textarea
          id="purpose"
          required
          value={form.purpose}
          onChange={(e) => update("purpose", e.target.value)}
          rows={2}
          placeholder="What is the goal of this event?"
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Field 3: Social Impact */}
      <div>
        <label htmlFor="socialImpact" className={labelClass}>Social Impact</label>
        <textarea
          id="socialImpact"
          required
          value={form.socialImpact}
          onChange={(e) => update("socialImpact", e.target.value)}
          rows={2}
          placeholder="How will this event benefit the community?"
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Field 4: Budget */}
      <div>
        <label htmlFor="budget" className={labelClass}>Budget (Rs)</label>
        <input
          id="budget"
          type="number"
          required
          min={0}
          value={form.budget || ""}
          onChange={(e) => update("budget", parseInt(e.target.value) || 0)}
          placeholder="e.g., 200000"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Field 5: Preferred Locality */}
        <div>
          <label htmlFor="preferredLocality" className={labelClass}>Preferred Locality</label>
          <select
            id="preferredLocality"
            required
            value={form.preferredLocality}
            onChange={(e) => update("preferredLocality", e.target.value)}
            className={inputClass}
          >
            <option value="">Select locality</option>
            {localities.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Field 6: Expected Audience */}
        <div>
          <label htmlFor="expectedAudience" className={labelClass}>Expected Audience</label>
          <input
            id="expectedAudience"
            type="number"
            required
            min={1}
            value={form.expectedAudience || ""}
            onChange={(e) => update("expectedAudience", parseInt(e.target.value) || 0)}
            placeholder="e.g., 250"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Field 7: Event Duration */}
        <div>
          <label htmlFor="eventDuration" className={labelClass}>Event Duration</label>
          <input
            id="eventDuration"
            type="text"
            required
            value={form.eventDuration}
            onChange={(e) => update("eventDuration", e.target.value)}
            placeholder="e.g., 4 hours"
            className={inputClass}
          />
        </div>

        {/* Field 8: Facilities Required */}
        <div>
          <label htmlFor="facilitiesRequired" className={labelClass}>Facilities Required</label>
          <input
            id="facilitiesRequired"
            type="text"
            required
            value={form.facilitiesRequired}
            onChange={(e) => update("facilitiesRequired", e.target.value)}
            placeholder="e.g., Indoor Hall, Projector"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Field 9: Number of Volunteers Required */}
        <div>
          <label htmlFor="volunteersRequired" className={labelClass}>Volunteers Required</label>
          <input
            id="volunteersRequired"
            type="number"
            required
            min={0}
            value={form.volunteersRequired || ""}
            onChange={(e) => update("volunteersRequired", parseInt(e.target.value) || 0)}
            placeholder="e.g., 20"
            className={inputClass}
          />
        </div>

        {/* Field 10: Free or Paid Entry */}
        <div>
          <label htmlFor="freeOrPaid" className={labelClass}>Free or Paid Entry</label>
          <select
            id="freeOrPaid"
            value={form.freeOrPaid}
            onChange={(e) => update("freeOrPaid", e.target.value)}
            className={inputClass}
          >
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Field 11: Age Group */}
        <div>
          <label htmlFor="ageGroup" className={labelClass}>Age Group</label>
          <select
            id="ageGroup"
            value={form.ageGroup}
            onChange={(e) => update("ageGroup", e.target.value)}
            className={inputClass}
          >
            {ageGroups.map((ag) => (
              <option key={ag} value={ag}>{ag}</option>
            ))}
          </select>
        </div>

        {/* Field 12: Event Category */}
        <div>
          <label htmlFor="eventCategory" className={labelClass}>Event Category</label>
          <select
            id="eventCategory"
            value={form.eventCategory}
            onChange={(e) => update("eventCategory", e.target.value as InterestCategory)}
            className={inputClass}
          >
            {ALL_INTERESTS.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 px-4 rounded-lg bg-purple text-white text-sm font-medium transition-colors hover:bg-purple/90 flex items-center justify-center gap-2"
      >
        <Send size={16} />
        Publish Event Request
      </button>
    </form>
  );
}
