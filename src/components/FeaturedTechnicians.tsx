"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PlumberIcon, ElectricianIcon, ACIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <section className="w-full bg-[#f7f7f7] py-20 sm:py-24 px-4 sm:px-6 border-t border-[#dee1e6]">
      <div className="max-w-[1200px] mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#dee1e6] pb-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#7c828a] uppercase tracking-wider block">
              {t.technicians.sectionBadge}
            </span>
            <h2 className="display-lg text-[#0a0b0d]">
              {t.technicians.title}
            </h2>
            <p className="body-md text-[#5b616e]">
              {t.technicians.subtitle}
            </p>
          </div>
          <Link href="/provider" className="text-sm font-semibold text-[#0052ff] hover:underline">
            {t.technicians.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="coinbase-card bg-white rounded-[24px] border border-[#dee1e6] p-7 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-full bg-[#eef0f3] text-[#0a0b0d] flex items-center justify-center shrink-0">
                      <IconComp className="w-5 h-5 text-current" />
                    </div>
                    <span className="text-xs font-medium text-[#7c828a] bg-[#f7f7f7] px-3 py-1 rounded-full border border-[#dee1e6]">
                      {provider.homeArea}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="title-md text-[#0a0b0d] tracking-tight">
                      {provider.displayName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#5b616e]">
                      <span>{t.technicians.ratingLabel}: <strong className="text-[#0a0b0d] font-semibold">{provider.rating}</strong></span>
                      <span>/</span>
                      <span className="number-display text-xs">{provider.jobsCompleted} {t.technicians.jobsLabel}</span>
                    </div>
                  </div>

                  <p className="body-sm text-[#5b616e] leading-relaxed line-clamp-2">
                    {provider.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#dee1e6] space-y-4">
                  {provider.visitFeeLkr && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#7c828a]">{t.technicians.visitFeeLabel}</span>
                      <span className="number-display text-sm text-[#0a0b0d]">
                        LKR {provider.visitFeeLkr.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full text-xs font-semibold"
                    onClick={() => onSelectProvider && onSelectProvider(provider)}
                  >
                    {t.technicians.selectBtn}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
