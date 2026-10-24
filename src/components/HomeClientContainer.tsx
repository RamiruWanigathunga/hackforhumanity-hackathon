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
    <div className="w-full flex flex-col">
      {/* 1. Full-Bleed Dark Hero Band with Layered Product-UI Mockups */}
      <HomeSearchIntake ref={searchIntakeRef} />

      {/* 2. White Editorial Section: 10-Item Trade Taxonomy Grid */}
      <PopularServicesGrid onSelectCategory={handleSelectCategory} />

      {/* 3. Soft-Gray Elevation Band: Trust & Deterministic Principles */}
      <TrustPillars />

      {/* 4. White Editorial Band: Provider Acquisition Card */}
      <GrowBusinessBanner />

      {/* 5. Soft-Gray Elevation Band: Verified Directory Grid */}
      <FeaturedTechnicians onSelectProvider={handleSelectProvider} />
    </div>
  );
}
