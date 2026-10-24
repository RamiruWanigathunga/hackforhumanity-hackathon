"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ScoreBar, ScoreComponents } from "@/components/ScoreBar";
import { PlumberIcon, ElectricianIcon, ACIcon } from "@/components/ui/Icons";

export interface ProviderSlotOption {
  id: string;
  date: string;
  window: string;
}

export interface ProviderCardProps {
  id: string;
  displayName: string;
  categories: string[];
  homeArea: string;
  areasServed: string[];
  languages: string[];
  rating: number | string;
  jobsCompleted: number;
  visitFeeLkr?: number | null;
  bio?: string | null;
  totalScore: number;
  scoreComponents: ScoreComponents;
  reasons: string[];
  suggestedSlots: ProviderSlotOption[];
  onSelectSlot?: (providerId: string, slotId: string) => void;
  selectedSlotId?: string;
  loading?: boolean;
  featured?: boolean;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  id,
  displayName,
  categories,
  homeArea,
  languages,
  rating,
  jobsCompleted,
  visitFeeLkr,
  bio,
  totalScore,
  scoreComponents,
  reasons,
  suggestedSlots,
  onSelectSlot,
  selectedSlotId,
  loading = false,
  featured = false,
}) => {
  const [showReasons, setShowReasons] = useState(false);
  const [internalSlotId, setInternalSlotId] = useState<string | undefined>(
    selectedSlotId || (suggestedSlots.length > 0 ? suggestedSlots[0].id : undefined)
  );

  const activeSlotId = selectedSlotId || internalSlotId;

  const handleSlotPick = (slotId: string) => {
    setInternalSlotId(slotId);
  };

  const handleRequest = () => {
    if (activeSlotId && onSelectSlot) {
      onSelectSlot(id, activeSlotId);
    }
  };

  const IconComponent = categories.includes("plumbing")
    ? PlumberIcon
    : categories.includes("electrical")
    ? ElectricianIcon
    : ACIcon;

  return (
    <div
      className={`rounded-[24px] p-6 sm:p-8 space-y-6 transition-all ${
        featured
          ? "bg-[#0a0b0d] text-white shadow-xl"
          : "bg-white text-[#0a0b0d] border border-[#dee1e6] coinbase-card"
      }`}
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Circular Icon Plate */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              featured ? "bg-[#16181c] text-white border border-white/10" : "bg-[#eef0f3] text-[#0a0b0d]"
            }`}
          >
            <IconComponent className="w-5 h-5 text-current" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`title-md tracking-tight ${featured ? "text-white" : "text-[#0a0b0d]"}`}>
                {displayName}
              </h3>
              {featured && (
                <span className="text-[11px] font-semibold text-[#0052ff] bg-[#0052ff]/15 px-2.5 py-0.5 rounded-full">
                  Top Recommended
                </span>
              )}
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full ${
                  featured ? "text-[#a8acb3] bg-white/10" : "text-[#7c828a] bg-[#f7f7f7] border border-[#dee1e6]"
                }`}
              >
                Sample profile / demo data
              </span>
            </div>

            <div
              className={`flex items-center gap-2 text-xs flex-wrap ${
                featured ? "text-[#a8acb3]" : "text-[#5b616e]"
              }`}
            >
              <span>Area: <strong className={featured ? "text-white font-medium" : "text-[#0a0b0d] font-medium"}>{homeArea}</strong></span>
              <span>/</span>
              <span>Rating: <strong className={featured ? "text-white font-medium" : "text-[#0a0b0d] font-medium"}>{rating}</strong> (demo)</span>
              <span>/</span>
              <span className="number-display text-xs">{jobsCompleted} jobs</span>
              <span>/</span>
              <span>{languages.map((l) => l.toUpperCase()).join("/")}</span>
            </div>
          </div>
        </div>

        {visitFeeLkr && (
          <div className="text-left sm:text-right shrink-0">
            <span className={`text-[11px] block ${featured ? "text-[#a8acb3]" : "text-[#7c828a]"}`}>
              Visit fee (provider-stated)
            </span>
            <span className={`number-display text-base font-semibold ${featured ? "text-white" : "text-[#0a0b0d]"}`}>
              LKR {visitFeeLkr.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {bio && (
        <p className={`body-sm leading-relaxed max-w-2xl ${featured ? "text-[#a8acb3]" : "text-[#5b616e]"}`}>
          {bio}
        </p>
      )}

      {/* Score Bar Breakdown */}
      <div
        className={`rounded-[16px] p-5 space-y-3 ${
          featured ? "bg-[#16181c] border border-white/10" : "bg-[#f7f7f7] border border-[#dee1e6]"
        }`}
      >
        <ScoreBar total={totalScore} components={scoreComponents} showBreakdown={showReasons} />

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setShowReasons(!showReasons)}
            className={`text-xs font-semibold hover:underline cursor-pointer ${
              featured ? "text-white" : "text-[#0052ff]"
            }`}
          >
            {showReasons ? "Hide match reasoning" : "Why this match was ranked here"}
          </button>
        </div>

        {showReasons && (
          <div
            className={`pt-3 border-t flex flex-wrap gap-2 ${
              featured ? "border-white/10" : "border-[#dee1e6]"
            }`}
          >
            {reasons.map((r, i) => (
              <span
                key={i}
                className={`inline-flex items-center text-[11px] font-medium px-3 py-1 rounded-full ${
                  featured
                    ? "bg-[#0a0b0d] text-white border border-white/15"
                    : "bg-white text-[#0a0b0d] border border-[#dee1e6]"
                }`}
              >
                {r}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Available Slots and Request Action */}
      <div className="pt-1 space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className={featured ? "text-white" : "text-[#0a0b0d]"}>Next Free Time Slots:</span>
          {suggestedSlots.length === 0 && (
            <span className={`font-normal ${featured ? "text-[#a8acb3]" : "text-[#7c828a]"}`}>
              No slots within 3 days
            </span>
          )}
        </div>

        {suggestedSlots.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestedSlots.map((s) => {
              const isSelected = activeSlotId === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSlotPick(s.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0052ff] text-white border-[#0052ff]"
                      : featured
                      ? "bg-[#16181c] text-[#a8acb3] border-white/10 hover:text-white hover:border-white/30"
                      : "bg-[#eef0f3] text-[#0a0b0d] border-transparent hover:bg-[#dee1e6]"
                  }`}
                >
                  {s.date} / <span className="capitalize">{s.window}</span>
                </button>
              );
            })}
          </div>
        )}

        {suggestedSlots.length > 0 && (
          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              size="md"
              loading={loading}
              disabled={!activeSlotId}
              onClick={handleRequest}
            >
              Request Booking
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
