"use client";

import React from "react";
import {
  ElectricianIcon,
  PlumberIcon,
  ACIcon,
  MechanicIcon,
  CleaningIcon,
  CarpenterIcon,
  PainterIcon,
  PestIcon,
  SalonIcon,
  SecurityIcon,
} from "@/components/ui/Icons";

export interface ServiceCategoryItem {
  id: string;
  name: string;
  subtitle: string;
  iconComponent: React.ComponentType<{ className?: string }>;
  isPilot: boolean;
  samplePrompt: string;
}

export const POPULAR_SERVICES: ServiceCategoryItem[] = [
  {
    id: "electrical",
    name: "Electrician",
    subtitle: "Wiring, fans, breakers and inverters",
    iconComponent: ElectricianIcon,
    isPilot: true,
    samplePrompt: "Ceiling fan stopped working, breaker trips when turning on",
  },
  {
    id: "plumbing",
    name: "Plumber",
    subtitle: "Pipes, taps, pumps and drainage",
    iconComponent: PlumberIcon,
    isPilot: true,
    samplePrompt: "Kitchen sink drain leaking and bathroom tap dripping",
  },
  {
    id: "ac_appliance",
    name: "AC and Appliances",
    subtitle: "AC, fridge, washing machine",
    iconComponent: ACIcon,
    isPilot: true,
    samplePrompt: "Split AC not cooling properly and making vibrating noise",
  },
  {
    id: "mechanic",
    name: "Auto Mechanic",
    subtitle: "Car, van and vehicle repair",
    iconComponent: MechanicIcon,
    isPilot: false,
    samplePrompt: "Car battery dead and engine will not start in morning",
  },
  {
    id: "cleaning",
    name: "Cleaning",
    subtitle: "Home, office and deep cleaning",
    iconComponent: CleaningIcon,
    isPilot: false,
    samplePrompt: "Deep apartment cleaning needed before tenant move-in",
  },
  {
    id: "carpenter",
    name: "Carpenter",
    subtitle: "Furniture, doors and cabinets",
    iconComponent: CarpenterIcon,
    isPilot: false,
    samplePrompt: "Wooden front door lock stuck and cupboard hinges broken",
  },
  {
    id: "painter",
    name: "Painter",
    subtitle: "House and building paint",
    iconComponent: PainterIcon,
    isPilot: false,
    samplePrompt: "Living room wall repainting and water dampness touchup",
  },
  {
    id: "pest_control",
    name: "Pest Control",
    subtitle: "Termites, cockroaches and insects",
    iconComponent: PestIcon,
    isPilot: false,
    samplePrompt: "Termite treatment needed for bedroom wooden door frame",
  },
  {
    id: "salon",
    name: "Salon and Barber",
    subtitle: "Hair, beauty and home grooming",
    iconComponent: SalonIcon,
    isPilot: false,
    samplePrompt: "Home haircut and beard trim appointment needed",
  },
  {
    id: "security",
    name: "CCTV and Security",
    subtitle: "Cameras, alarms and fences",
    iconComponent: SecurityIcon,
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
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider block">
            Browse Directory
          </span>
          <h2 className="heading-2 text-[#141414]">
            Popular Services.
          </h2>
          <p className="subtitle-lead text-sm sm:text-base">
            Select a category or search for what you need. Active pilot trades feature instant AI intake and matching.
          </p>
        </div>
        <div className="text-xs text-[#707070] font-medium hidden sm:block">
          10 Service Categories / Colombo Pilot
        </div>
      </div>

      {/* Grid: 2 rows of 5 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {POPULAR_SERVICES.map((service) => {
          const IconComp = service.iconComponent;

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelectCategory && onSelectCategory(service)}
              className="group relative text-left bg-white rounded-[20px] p-4 sm:p-5 border border-[#f0f0f0] hover:border-[#141414] hover:bg-[#fafafa] transition-all flex flex-col justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#141414]"
            >
              {/* Top row: Squircle icon with clean SVG */}
              <div className="flex items-start justify-between w-full">
                <div className="w-12 h-12 bg-[#f3f3f3] text-[#141414] group-hover:bg-[#141414] group-hover:text-white app-icon-squircle flex items-center justify-center transition-colors shrink-0">
                  <IconComp className="w-5 h-5 text-current" />
                </div>
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

              {/* Hover indicator link without arrow */}
              <div className="text-[11px] font-semibold text-[#141414] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Select trade</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
