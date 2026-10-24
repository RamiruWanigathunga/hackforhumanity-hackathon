"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";

export interface ServiceCategoryItem {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  isPilot: boolean;
  samplePrompt: string;
}

export const POPULAR_SERVICES: ServiceCategoryItem[] = [
  {
    id: "electrical",
    name: "Electrician",
    subtitle: "Wiring, fans, breakers & inverters",
    icon: "⚡",
    isPilot: true,
    samplePrompt: "Ceiling fan stopped working, breaker trips when turning on",
  },
  {
    id: "plumbing",
    name: "Plumber",
    subtitle: "Pipes, taps, pumps & drainage",
    icon: "🚰",
    isPilot: true,
    samplePrompt: "Kitchen sink drain leaking and bathroom tap dripping",
  },
  {
    id: "ac_appliance",
    name: "AC & Appliances",
    subtitle: "AC, fridge, washing machine",
    icon: "❄️",
    isPilot: true,
    samplePrompt: "Split AC not cooling properly and making vibrating noise",
  },
  {
    id: "mechanic",
    name: "Auto Mechanic",
    subtitle: "Car, van & vehicle repair",
    icon: "🚗",
    isPilot: false,
    samplePrompt: "Car battery dead and engine won't start in morning",
  },
  {
    id: "cleaning",
    name: "Cleaning",
    subtitle: "Home, office & deep cleaning",
    icon: "🧹",
    isPilot: false,
    samplePrompt: "Deep apartment cleaning needed before tenant move-in",
  },
  {
    id: "carpenter",
    name: "Carpenter",
    subtitle: "Furniture, doors & cabinets",
    icon: "🪚",
    isPilot: false,
    samplePrompt: "Wooden front door lock stuck and cupboard hinges broken",
  },
  {
    id: "painter",
    name: "Painter",
    subtitle: "House & building paint",
    icon: "🎨",
    isPilot: false,
    samplePrompt: "Living room wall repainting and water dampness touchup",
  },
  {
    id: "pest_control",
    name: "Pest Control",
    subtitle: "Termites, cockroaches & insects",
    icon: "🪲",
    isPilot: false,
    samplePrompt: "Termite treatment needed for bedroom wooden door frame",
  },
  {
    id: "salon",
    name: "Salon & Barber",
    subtitle: "Hair, beauty & home grooming",
    icon: "✂️",
    isPilot: false,
    samplePrompt: "Home haircut and beard trim appointment needed",
  },
  {
    id: "security",
    name: "CCTV & Security",
    subtitle: "Cameras, alarms & fences",
    icon: "📹",
    isPilot: false,
    samplePrompt: "CCTV camera offline and DVR recording storage check",
  },
];

interface PopularServicesGridProps {
  onSelectCategory?: (category: ServiceCategoryItem) => void;
}

export const PopularServicesGrid: React.FC<PopularServicesGridProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="space-y-6 pt-4">
      {/* Section Header with Mobbin weight hierarchy and terminal period */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider">
              Browse Directory
            </span>
          </div>
          <h2 className="heading-2 text-[#141414]">
            Popular Services.
          </h2>
          <p className="subtitle-lead text-sm sm:text-base">
            Select a category or search for what you need. Active pilot trades feature instant AI intake & matching.
          </p>
        </div>
        <div className="text-xs text-[#707070] font-medium hidden sm:block">
          10 Service Categories · Colombo Pilot
        </div>
      </div>

      {/* Grid: 2 rows of 5 on desktop (identical to ondemand.lk screenshot) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {POPULAR_SERVICES.map((service) => {
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelectCategory && onSelectCategory(service)}
              className="group relative text-left bg-white rounded-[20px] p-4 sm:p-5 border border-[#f0f0f0] hover:border-[#141414] hover:bg-[#fafafa] transition-all flex flex-col justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#141414]"
            >
              {/* Top row: Squircle icon + Commercial badge if Active Pilot */}
              <div className="flex items-start justify-between w-full">
                {/* 30% iOS Squircle Icon */}
                <div className="w-12 h-12 bg-[#f3f3f3] text-[#141414] group-hover:bg-[#141414] group-hover:text-white app-icon-squircle flex items-center justify-center text-xl transition-colors shrink-0">
                  {service.icon}
                </div>

                {service.isPilot ? (
                  <Badge variant="commercial" size="sm">
                    Instant Match
                  </Badge>
                ) : (
                  <span className="text-[10px] text-[#adadad] font-medium bg-[#f5f5f5] px-2 py-0.5 rounded-full">
                    Pilot Soon
                  </span>
                )}
              </div>

              {/* Text metadata */}
              <div className="space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-[#141414] group-hover:text-black tracking-tight leading-snug">
                  {service.name}
                </h3>
                <p className="text-xs text-[#707070] line-clamp-2 leading-relaxed">
                  {service.subtitle}
                </p>
              </div>

              {/* Hover indicator link */}
              <div className="text-[11px] font-semibold text-[#141414] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Select trade</span>
                <span>→</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
