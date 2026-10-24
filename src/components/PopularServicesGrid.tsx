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
    <section id="categories" className="w-full bg-white py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#dee1e6] pb-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#7c828a] uppercase tracking-wider block">
              Trade Taxonomy
            </span>
            <h2 className="display-lg text-[#0a0b0d]">
              Explore verified services.
            </h2>
            <p className="body-md text-[#5b616e] max-w-xl text-base sm:text-lg">
              Select a trade to initiate an AI-assisted intake ticket or view specialist availability across the Colombo cluster.
            </p>
          </div>
          <div className="text-xs text-[#7c828a] font-medium hidden sm:block">
            10 Standard Categories / Live Pilot
          </div>
        </div>

        {/* 10-Up Grid: 2 rows of 5 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {POPULAR_SERVICES.map((service) => {
            const IconComp = service.iconComponent;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(service)}
                className="coinbase-card text-left bg-white rounded-[24px] p-6 border border-[#dee1e6] hover:border-[#0052ff] transition-all flex flex-col justify-between gap-6 cursor-pointer focus:outline-none focus:border-[#0052ff]"
              >
                {/* Top circular icon plate */}
                <div className="w-12 h-12 rounded-full bg-[#eef0f3] text-[#0a0b0d] flex items-center justify-center shrink-0">
                  <IconComp className="w-5 h-5 text-current" />
                </div>

                {/* Text info */}
                <div className="space-y-1.5">
                  <h3 className="title-sm text-[#0a0b0d] tracking-tight">
                    {service.name}
                  </h3>
                  <p className="body-sm text-[#5b616e] line-clamp-2">
                    {service.subtitle}
                  </p>
                </div>

                <div className="pt-2 text-xs font-semibold text-[#0052ff]">
                  Select Service
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
