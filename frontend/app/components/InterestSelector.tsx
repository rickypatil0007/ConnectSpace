"use client";

import { ALL_INTERESTS, InterestCategory } from "@/lib/dummy-data";

interface InterestSelectorProps {
  selected: InterestCategory[];
  onChange: (interests: InterestCategory[]) => void;
}

const interestIcons: Record<InterestCategory, string> = {
  Chess: "♟",
  Yoga: "🧘",
  Music: "🎵",
  Dance: "💃",
  Art: "🎨",
  Reading: "📚",
  Meditation: "☯",
  Fitness: "💪",
  Networking: "🤝",
  Volunteering: "❤",
};

export default function InterestSelector({ selected, onChange }: InterestSelectorProps) {
  const toggle = (interest: InterestCategory) => {
    if (selected.includes(interest)) {
      onChange(selected.filter((i) => i !== interest));
    } else {
      onChange([...selected, interest]);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {ALL_INTERESTS.map((interest) => {
        const isSelected = selected.includes(interest);
        return (
          <button
            key={interest}
            onClick={() => toggle(interest)}
            className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
              isSelected
                ? "bg-blue text-white border-blue shadow-sm"
                : "bg-white text-navy border-gray/20 hover:border-blue/40 hover:bg-blue/5"
            }`}
          >
            <span>{interestIcons[interest]}</span>
            <span>{interest}</span>
          </button>
        );
      })}
    </div>
  );
}
