"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PlumberIcon, ElectricianIcon, ACIcon } from "@/components/ui/Icons";

export interface FeaturedProviderItem {
  id: string;
  displayName: string;
  category: "plumbing" | "electrical" | "ac_appliance";
  homeArea: string;
  rating: string | number;
  jobsCompleted: number;
  visitFeeLkr?: number | null;
  tagline: string;
  samplePrompt: string;
}

const SAMPLE_FEATURED_PROVIDERS: FeaturedProviderItem[] = [
  {
    id: "prov-e1",
    displayName: "Tharindu Silva",
    category: "electrical",
    homeArea: "Nugegoda",
    rating: "4.9",
    jobsCompleted: 184,
    visitFeeLkr: 2500,
    tagline: "Licensed domestic wireman / tripping breakers, switches and fan repairs",
    samplePrompt: "Main breaker tripping repeatedly and ceiling fan speed regulator broken",
  },
  {
    id: "prov-p1",
    displayName: "Kasun Perera",
    category: "plumbing",
    homeArea: "Nugegoda",
    rating: "4.8",
    jobsCompleted: 142,
    visitFeeLkr: 2000,
    tagline: "Domestic master plumber / kitchen sink leaks, tap fittings and drainage",
    samplePrompt: "Kitchen sink pipe leaking under the counter, need repair tomorrow morning",
  },
  {
    id: "prov-a1",
    displayName: "Ruwan Senanayake",
    category: "ac_appliance",
    homeArea: "Nugegoda",
    rating: "4.8",
    jobsCompleted: 165,
    visitFeeLkr: 3500,
    tagline: "HVAC specialist / inverter AC servicing, gas charging and coil leaks",
    samplePrompt: "Split AC not cooling properly and blowing warm air",
  },
  {
    id: "prov-p4",
    displayName: "Nadeesha Fernando",
    category: "plumbing",
    homeArea: "Pagoda",
    rating: "4.9",
    jobsCompleted: 210,
    visitFeeLkr: 3000,
    tagline: "Sanitary fittings specialist / blocked drains and commode cistern valves",
    samplePrompt: "Bathroom drain blocked and toilet commode flush leaking constantly",
  },
];

interface FeaturedTechniciansProps {
  onSelectProvider?: (provider: FeaturedProviderItem) => void;
}

export const FeaturedTechnicians: React.FC<FeaturedTechniciansProps> = ({ onSelectProvider }) => {
  return (
    <section className="space-y-6 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider block">
            Verified Directory
          </span>
          <h2 className="heading-2 text-[#141414]">
            Featured Verified Technicians.
          </h2>
          <p className="subtitle-lead text-sm sm:text-base">
            Sample licensed specialists available in the Colombo pilot cluster.
          </p>
        </div>
        <Link href="/provider" className="text-xs font-semibold text-[#141414] hover:underline">
          View all technicians
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SAMPLE_FEATURED_PROVIDERS.map((provider) => {
          const IconComp =
            provider.category === "plumbing"
              ? PlumberIcon
              : provider.category === "electrical"
              ? ElectricianIcon
              : ACIcon;

          return (
            <div
              key={provider.id}
              className="bg-white rounded-[24px] border border-[#f0f0f0] p-5 sm:p-6 space-y-4 hover:border-[#141414] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  {/* 30% iOS Squircle Icon Container */}
                  <div className="w-12 h-12 bg-[#141414] text-white app-icon-squircle flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-[#707070] bg-[#f5f5f5] px-2.5 py-1 rounded-full">
                    {provider.homeArea}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-base text-[#141414] tracking-tight">
                    {provider.displayName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#707070]">
                    <span className="text-[#141414] font-semibold">Rating: {provider.rating}</span>
                    <span>(demo)</span>
                    <span>/</span>
                    <span>{provider.jobsCompleted} jobs</span>
                  </div>
                </div>

                <p className="text-xs text-[#525252] leading-relaxed line-clamp-2">
                  {provider.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f0f0f0] space-y-3">
                {provider.visitFeeLkr && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#707070]">Visit fee:</span>
                    <span className="font-bold text-[#141414]">
                      LKR {provider.visitFeeLkr.toLocaleString()}
                    </span>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs font-semibold"
                  onClick={() => onSelectProvider && onSelectProvider(provider)}
                >
                  Book Specialist
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
