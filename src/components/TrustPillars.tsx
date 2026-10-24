import React from "react";
import { SearchIcon, CheckShieldIcon, CalendarIcon, StarIcon } from "@/components/ui/Icons";

export const TrustPillars: React.FC = () => {
  const pillars = [
    {
      iconComp: SearchIcon,
      title: "Search and Compare",
      description: "Find local trade specialists by exact problem symptoms, pilot area proximity, and transparent ratings.",
    },
    {
      iconComp: CheckShieldIcon,
      title: "Verified Providers",
      description: "Sample vetted technician profiles with transparent skill tags, visit fees, and zero hidden markups.",
    },
    {
      iconComp: CalendarIcon,
      title: "Book Instantly",
      description: "Schedule visits in your preferred morning, afternoon, or evening window with instant confirmation.",
    },
    {
      iconComp: StarIcon,
      title: "Real Reviews",
      description: "Explainable deterministic scoring with zero pay-to-win ranks or sponsored algorithmic distortion.",
    },
  ];

  return (
    <section className="py-8 border-y border-[#f0f0f0]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, idx) => {
          const IconComponent = pillar.iconComp;

          return (
            <div
              key={idx}
              className="flex flex-col sm:items-start items-center text-center sm:text-left space-y-2.5 p-2"
            >
              {/* 30% Squircle Icon Container */}
              <div className="w-12 h-12 bg-[#f3f3f3] text-[#141414] app-icon-squircle flex items-center justify-center shrink-0">
                <IconComponent className="w-5 h-5 text-current" />
              </div>

              <h4 className="font-bold text-sm sm:text-base text-[#141414] tracking-tight">
                {pillar.title}
              </h4>

              <p className="text-xs text-[#707070] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
