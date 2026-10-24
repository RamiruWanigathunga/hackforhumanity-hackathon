import React from "react";

export const TrustPillars: React.FC = () => {
  const pillars = [
    {
      icon: "🔍",
      title: "Search & Compare",
      description: "Find local trade specialists by exact problem symptoms, pilot area proximity, and transparent ratings.",
    },
    {
      icon: "✅",
      title: "Verified Providers",
      description: "Sample vetted technician profiles with transparent skill tags, visit fees, and zero hidden markups.",
    },
    {
      icon: "📅",
      title: "Book Instantly",
      description: "Schedule visits in your preferred morning, afternoon, or evening window with instant confirmation.",
    },
    {
      icon: "⭐",
      title: "Real Reviews",
      description: "Explainable deterministic scoring with zero pay-to-win ranks or sponsored algorithmic distortion.",
    },
  ];

  return (
    <section className="py-8 border-y border-[#f0f0f0]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:items-start items-center text-center sm:text-left space-y-2.5 p-2"
          >
            {/* 30% iOS Squircle Icon */}
            <div className="w-12 h-12 bg-[#f3f3f3] text-[#141414] app-icon-squircle flex items-center justify-center text-xl shrink-0">
              {pillar.icon}
            </div>

            <h4 className="font-bold text-sm sm:text-base text-[#141414] tracking-tight">
              {pillar.title}
            </h4>

            <p className="text-xs text-[#707070] leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
