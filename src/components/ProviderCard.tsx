"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScoreBar, ScoreComponents } from "@/components/ScoreBar";

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

  return (
    <div className="bg-white rounded-2xl border border-[#f0f0f0] p-5 sm:p-6 space-y-4 transition-all hover:border-[#e0e0e0]">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-base sm:text-lg text-[#141414] tracking-tight">
              {displayName}
            </h3>
            {categories.map((cat) => (
              <Badge key={cat} variant="neutral" size="sm">
                {cat.replace(/_/g, " ")}
              </Badge>
            ))}
            {/* Honesty Rule H2 */}
            <Badge variant="sample" size="sm">
              Sample profile · demo data
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#707070] flex-wrap">
            <span>Area: <strong className="text-[#141414] font-medium">{homeArea}</strong></span>
            <span>•</span>
            {/* Honesty Rule H3 */}
            <span>★ <strong className="text-[#141414] font-medium">{rating}</strong> (demo)</span>
            <span>•</span>
            <span>{jobsCompleted} jobs (demo)</span>
            <span>•</span>
            <span>Languages: {languages.map((l) => l.toUpperCase()).join(", ")}</span>
          </div>
        </div>

        {visitFeeLkr && (
          <div className="text-right sm:text-right shrink-0">
            <span className="text-[11px] text-[#707070] block">Visit fee (provider-stated)</span>
            <span className="font-bold text-sm text-[#141414]">LKR {visitFeeLkr.toLocaleString()}</span>
          </div>
        )}
      </div>

      {bio && <p className="text-xs text-[#525252] leading-relaxed">{bio}</p>}

      {/* Score Bar Breakdown */}
      <div className="bg-[#fafafa] rounded-xl p-3.5 border border-[#f0f0f0] space-y-2">
        <ScoreBar total={totalScore} components={scoreComponents} showBreakdown={showReasons} />

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setShowReasons(!showReasons)}
            className="text-xs font-semibold text-[#0066ff] hover:underline cursor-pointer"
          >
            {showReasons ? "Hide why this match" : "Why this match (explainable reasons)"}
          </button>
        </div>

        {showReasons && (
          <div className="pt-2 border-t border-[#e0e0e0] flex flex-wrap gap-1.5">
            {reasons.map((r, i) => (
              <span
                key={i}
                className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-[#e0e0e0] text-[#141414]"
              >
                ✓ {r}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Available Slots & Request Action */}
      <div className="pt-1 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#141414]">Available Time Windows:</span>
          {suggestedSlots.length === 0 && (
            <span className="text-xs text-[#707070]">No slots within 3 days</span>
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
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#141414] text-white border-[#141414]"
                      : "bg-[#f3f3f3] text-[#262626] border-transparent hover:bg-[#e0e0e0]"
                  }`}
                >
                  {s.date} · <span className="capitalize">{s.window}</span>
                </button>
              );
            })}
          </div>
        )}

        {suggestedSlots.length > 0 && (
          <div className="flex justify-end pt-1">
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
