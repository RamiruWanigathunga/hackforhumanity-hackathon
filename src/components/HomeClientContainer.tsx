"use client";

import React, { useRef } from "react";
import { HomeSearchIntake, HomeSearchIntakeHandle } from "./HomeSearchIntake";
import { PopularServicesGrid, ServiceCategoryItem } from "./PopularServicesGrid";
import { TrustPillars } from "./TrustPillars";
import { GrowBusinessBanner } from "./GrowBusinessBanner";
import { FeaturedTechnicians, FeaturedProviderItem } from "./FeaturedTechnicians";

export function HomeClientContainer() {
  const searchIntakeRef = useRef<HomeSearchIntakeHandle>(null);

  const handleSelectCategory = (category: ServiceCategoryItem) => {
    if (searchIntakeRef.current) {
      searchIntakeRef.current.setProblem(category.samplePrompt);
    }
  };

  const handleSelectProvider = (provider: FeaturedProviderItem) => {
    if (searchIntakeRef.current) {
      searchIntakeRef.current.setProblem(provider.samplePrompt, provider.homeArea);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-20 py-2 sm:py-6">
      {/* 1. Hero Section & Search / Intake Bar */}
      <HomeSearchIntake ref={searchIntakeRef} />

      {/* 2. Popular Services Grid (10 items like ondemand.lk, elevated in Mobbin monochrome) */}
      <PopularServicesGrid onSelectCategory={handleSelectCategory} />

      {/* 3. Four Trust & Feature Value Pillars */}
      <TrustPillars />

      {/* 4. Grow Your Business / Provider Acquisition Banner */}
      <GrowBusinessBanner />

      {/* 5. Featured Verified Local Technicians */}
      <FeaturedTechnicians onSelectProvider={handleSelectProvider} />
    </div>
  );
}
