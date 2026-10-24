"use client";

import React, { useState, useTransition } from "react";
import { JobTicket } from "@/server/db/schema";
import { PILOT_AREAS } from "@/config/pilot";
import { CATEGORIES, getTagsForCategory, Category } from "@/config/taxonomy";
import { TIME_WINDOWS, TIME_WINDOW_LABELS } from "@/lib/time";
import { updateTicketAction, confirmTicketAction, answerClarificationAction } from "@/server/actions/tickets";
import { Button } from "@/components/ui/Button";
import { SafetyBanner } from "@/components/SafetyBanner";
import Link from "next/link";

export default function TicketReviewForm({ ticket }: { ticket: JobTicket }) {
  const [summary, setSummary] = useState(ticket.summary);
  const [category, setCategory] = useState<Category>(ticket.category as Category);
  const [tags, setTags] = useState<string[]>(ticket.tags);
  const [area, setArea] = useState(ticket.area || "Nugegoda");
  const [preferredDate, setPreferredDate] = useState(ticket.preferredDate || "");
  const [preferredWindow, setPreferredWindow] = useState(ticket.preferredWindow || "morning");
  const [urgency, setUrgency] = useState(ticket.urgency || "normal");
  const [clarificationAnswer, setClarificationAnswer] = useState("");
  const [showOriginal, setShowOriginal] = useState(false);
  const [isUpdating, startUpdateTransition] = useTransition();
  const [isConfirming, startConfirmTransition] = useTransition();
  const [isClarifying, startClarifyTransition] = useTransition();

  const availableTags = getTagsForCategory(category);

  const toggleTag = (tagId: string) => {
    if (tags.includes(tagId)) {
      setTags(tags.filter((t) => t !== tagId));
    } else {
      if (tags.length < 4) {
        setTags([...tags, tagId]);
      }
    }
  };

  const handleCategoryChange = (newCat: Category) => {
    setCategory(newCat);
    const validTags = getTagsForCategory(newCat).map((t) => t.id);
    setTags(tags.filter((t) => validTags.includes(t)));
  };

  const handleUpdate = () => {
    startUpdateTransition(async () => {
      await updateTicketAction(ticket.id, {
        summary,
        category,
        tags,
        area,
        preferredDate,
        preferredWindow,
        urgency,
      });
    });
  };

  const handleConfirm = () => {
    startConfirmTransition(async () => {
      await confirmTicketAction(ticket.id);
    });
  };

  const handleClarification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarificationAnswer.trim()) return;
    startClarifyTransition(async () => {
      await answerClarificationAction(ticket.id, clarificationAnswer);
      setClarificationAnswer("");
    });
  };

  return (
    <div className="space-y-6">
      {/* Safety Hazard Alert */}
      {ticket.hazard && (
        <SafetyBanner hazardText="Hazard indicators detected in your description (sparks, burning odor, or live wires). Prioritize immediate safety before technician arrival." />
      )}

      {/* Clarifying Question Block */}
      {ticket.clarificationQ && !ticket.clarificationA && (
        <div className="bg-[#fafafa] border border-[#141414] rounded-[24px] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#141414]">
              Clarification Question
            </span>
            <span className="text-[11px] text-[#707070] bg-[#f0f0f0] px-2 py-0.5 rounded-full font-medium">
              AI Request
            </span>
          </div>
          <p className="text-sm font-semibold text-[#141414]">{ticket.clarificationQ}</p>
          <form onSubmit={handleClarification} className="flex gap-2">
            <input
              type="text"
              value={clarificationAnswer}
              onChange={(e) => setClarificationAnswer(e.target.value)}
              placeholder="Your answer..."
              className="flex-1 bg-white border border-[#e0e0e0] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141414]"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={isClarifying}
              disabled={!clarificationAnswer.trim() || isClarifying}
            >
              Answer and Refine
            </Button>
          </form>
        </div>
      )}

      {/* What we understood review card */}
      <div className="bg-white rounded-[24px] border border-[#f0f0f0] p-6 sm:p-8 space-y-6">
        {/* Meta row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0f0f0] pb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#141414] tracking-tight">
              What the AI Understood
            </h2>
            <span className="text-xs text-[#707070] bg-[#f5f5f5] px-2.5 py-0.5 rounded-full font-medium">
              Source: {ticket.aiSource === "ai" ? "AI Model" : "Basic Parser"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#707070]">
            <span>Language: <strong className="text-[#141414] uppercase">{ticket.detectedLanguage}</strong></span>
            <span>/</span>
            <span>Confidence: <strong className="text-[#141414]">High</strong></span>
          </div>
        </div>

        {/* Editable Summary */}
        <div className="space-y-1.5">
          <label htmlFor="summary" className="text-xs font-semibold text-[#141414] block">
            Structured Problem Summary (Editable)
          </label>
          <textarea
            id="summary"
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full bg-[#f0f0f0] text-[#141414] rounded-[16px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#141414] resize-none"
          />
        </div>

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#141414] block">
            Trade Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#141414] text-white border-[#141414]"
                      : "bg-[#f3f3f3] text-[#262626] border-transparent hover:bg-[#e0e0e0]"
                  }`}
                >
                  {cat.replace(/_/g, " ").toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Taxonomy Tags */}
        {availableTags.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#141414] block">
              Issue Tags (Click to toggle, max 4)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isSelected = tags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#141414] text-white border-[#141414]"
                        : "bg-[#f3f3f3] text-[#262626] border-transparent hover:bg-[#e0e0e0]"
                    }`}
                  >
                    {tag.label_en}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Area, Date, Window, Urgency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="area" className="text-xs font-semibold text-[#141414] block">
              Area
            </label>
            <select
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-[#f0f0f0] text-[#141414] rounded-[16px] px-3.5 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#141414] cursor-pointer"
            >
              {PILOT_AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="date" className="text-xs font-semibold text-[#141414] block">
              Date (YYYY-MM-DD)
            </label>
            <input
              id="date"
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full bg-[#f0f0f0] text-[#141414] rounded-[16px] px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#141414]"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="window" className="text-xs font-semibold text-[#141414] block">
              Window
            </label>
            <select
              id="window"
              value={preferredWindow}
              onChange={(e) => setPreferredWindow(e.target.value)}
              className="w-full bg-[#f0f0f0] text-[#141414] rounded-[16px] px-3.5 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#141414] cursor-pointer"
            >
              {TIME_WINDOWS.map((w) => (
                <option key={w} value={w}>
                  {TIME_WINDOW_LABELS[w]}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="urgency" className="text-xs font-semibold text-[#141414] block">
              Urgency
            </label>
            <select
              id="urgency"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full bg-[#f0f0f0] text-[#141414] rounded-[16px] px-3.5 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#141414] cursor-pointer"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Collapsible Original Text */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowOriginal(!showOriginal)}
            className="text-xs font-semibold text-[#707070] hover:text-[#141414] cursor-pointer flex items-center gap-1"
          >
            {showOriginal ? "Hide your original words" : "Show your original words"}
          </button>
          {showOriginal && (
            <div className="mt-2 p-4 bg-[#f3f3f3] rounded-[16px] text-xs text-[#262626] font-mono leading-relaxed">
              &quot;{ticket.rawText}&quot;
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[#f0f0f0] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="soft"
              size="md"
              loading={isUpdating}
              onClick={handleUpdate}
              className="w-full sm:w-auto"
            >
              Save Changes
            </Button>
            <Link href="/" className="w-full sm:w-auto">
              <Button type="button" variant="outline" size="md" className="w-full sm:w-auto">
                Start Over
              </Button>
            </Link>
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            loading={isConfirming}
            onClick={handleConfirm}
            className="w-full sm:w-auto"
          >
            Confirm Ticket and Find Providers
          </Button>
        </div>
      </div>
    </div>
  );
}
