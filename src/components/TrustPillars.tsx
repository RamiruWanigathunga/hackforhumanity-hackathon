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
    <section className="w-full bg-[#f7f7f7] py-20 sm:py-24 px-4 sm:px-6 border-y border-[#dee1e6]">
      <div className="max-w-[1200px] mx-auto space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold text-[#7c828a] uppercase tracking-wider block">
            Platform Principles
          </span>
          <h2 className="display-lg text-[#0a0b0d]">
            Engineered for transparency.
          </h2>
          <p className="body-md text-[#5b616e]">
            Every technician match is calculated deterministically with zero opaque ranking logic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.iconComp;

            return (
              <div
                key={idx}
                className="coinbase-card bg-white rounded-[24px] p-8 border border-[#dee1e6] space-y-4 flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-full bg-[#eef0f3] text-[#0a0b0d] flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5 text-current" />
                </div>

                <div className="space-y-2">
                  <h4 className="title-md text-[#0a0b0d] tracking-tight">
                    {pillar.title}
                  </h4>

                  <p className="body-sm text-[#5b616e] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
