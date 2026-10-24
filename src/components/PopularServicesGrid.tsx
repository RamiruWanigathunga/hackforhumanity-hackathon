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
import { useLanguage } from "@/context/LanguageContext";

export interface ServiceCategoryItem {
  id: "electrical" | "plumbing" | "ac_appliance" | "mechanic" | "cleaning" | "carpenter" | "painter" | "pest_control" | "salon" | "security";
  name: string;
  subtitle: string;
  iconComponent: React.ComponentType<{ className?: string }>;
  isPilot: boolean;
  samplePrompt: string;
}

const CATEGORY_BASE: {
  id: ServiceCategoryItem["id"];
  iconComponent: React.ComponentType<{ className?: string }>;
  isPilot: boolean;
}[] = [
  { id: "electrical", iconComponent: ElectricianIcon, isPilot: true },
  { id: "plumbing", iconComponent: PlumberIcon, isPilot: true },
  { id: "ac_appliance", iconComponent: ACIcon, isPilot: true },
  { id: "mechanic", iconComponent: MechanicIcon, isPilot: false },
  { id: "cleaning", iconComponent: CleaningIcon, isPilot: false },
  { id: "carpenter", iconComponent: CarpenterIcon, isPilot: false },
  { id: "painter", iconComponent: PainterIcon, isPilot: false },
  { id: "pest_control", iconComponent: PestIcon, isPilot: false },
  { id: "salon", iconComponent: SalonIcon, isPilot: false },
  { id: "security", iconComponent: SecurityIcon, isPilot: false },
];

interface PopularServicesGridProps {
  onSelectCategory?: (category: ServiceCategoryItem) => void;
}

export const PopularServicesGrid: React.FC<PopularServicesGridProps> = ({ onSelectCategory }) => {
  const { t } = useLanguage();

  const services: ServiceCategoryItem[] = CATEGORY_BASE.map((cat) => {
    const localized = t.categories.items[cat.id];
    return {
      id: cat.id,
      name: localized.name,
      subtitle: localized.subtitle,
      samplePrompt: localized.samplePrompt,
      iconComponent: cat.iconComponent,
      isPilot: cat.isPilot,
    };
  });

  return (
    <section id="categories" className="w-full bg-white py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#dee1e6] pb-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#7c828a] uppercase tracking-wider block">
              {t.categories.sectionBadge}
            </span>
            <h2 className="display-lg text-[#0a0b0d]">
              {t.categories.title}
            </h2>
            <p className="body-md text-[#5b616e] max-w-xl text-base sm:text-lg">
              {t.categories.subtitle}
            </p>
          </div>
          <div className="text-xs text-[#7c828a] font-medium hidden sm:block">
            {t.categories.categoryCount}
          </div>
        </div>

        {/* 10-Up Grid: 2 rows of 5 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service) => {
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
                  {t.categories.selectService}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
