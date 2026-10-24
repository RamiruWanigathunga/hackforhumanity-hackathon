"use client";

import React, { useState, useTransition, useImperativeHandle, forwardRef } from "react";
import { PILOT_AREAS, PILOT_NAME } from "@/config/pilot";
import { TIME_WINDOWS, TIME_WINDOW_LABELS, getColomboToday } from "@/lib/time";
import { createTicketAction } from "@/server/actions/tickets";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";

export const DEMO_EXAMPLE_CHIPS = [
  {
    label: "Sink pipe leak (English)",
    text: "My kitchen sink pipe is leaking under the counter, need someone tomorrow morning",
    area: "Nugegoda",
    day: "tomorrow",
    window: "morning",
  },
  {
    label: "Fan & burning smell (Singlish)",
    text: "fan eka karakenne na, switch eken burning smell ekak enawa",
    area: "Nugegoda",
    day: "today",
    window: "anytime",
  },
  {
    label: "AC not cooling (Sinhala)",
    text: "AC එක හරියට සීතල වෙන්නේ නැහැ, හෙට හවස එන්න පුළුවන්ද?",
    area: "Mirihana",
    day: "tomorrow",
    window: "afternoon",
  },
  {
    label: "Bathroom tap (Tamil)",
    text: "குளியலறை குழாய் ஒழுகுகிறது, நாளை காலை வர முடியுமா?",
    area: "Kirulapone",
    day: "tomorrow",
    window: "morning",
  },
];

export interface HomeSearchIntakeHandle {
  setProblem: (text: string, area?: string) => void;
}

export const HomeSearchIntake = forwardRef<HomeSearchIntakeHandle>((_, ref) => {
  const [problemText, setProblemText] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("Nugegoda");
  const [selectedDay, setSelectedDay] = useState<string>("tomorrow");
  const [selectedWindow, setSelectedWindow] = useState<string>("morning");
  const [residentName, setResidentName] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPending, startTransition] = useTransition();

  useImperativeHandle(ref, () => ({
    setProblem: (text: string, area?: string) => {
      setProblemText(text);
      if (area) setSelectedArea(area);
      // Smooth scroll to intake bar
      const element = document.getElementById("search-intake-bar");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = document.getElementById("search-input");
        if (input) input.focus();
      }
    },
  }));

  const handleChipClick = (chip: (typeof DEMO_EXAMPLE_CHIPS)[0]) => {
    setProblemText(chip.text);
    setSelectedArea(chip.area);
    setSelectedDay(chip.day);
    setSelectedWindow(chip.window);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!problemText.trim()) return;

    const formData = new FormData();
    formData.append("rawText", problemText);
    formData.append("area", selectedArea);
    formData.append("preferredDay", selectedDay);
    formData.append("preferredWindow", selectedWindow);
    if (residentName) formData.append("residentName", residentName);

    startTransition(async () => {
      await createTicketAction(formData);
    });
  };

  return (
    <div className="space-y-6 text-center sm:text-left">
      {/* Eyebrow Badges */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
        <Badge variant="neutral" size="sm">
          Pilot: {PILOT_NAME}
        </Badge>
        <Badge variant="neutral" size="sm">
          Multilingual AI Intake
        </Badge>
        {/* Electric Blue Accent per design.md */}
        <Badge variant="commercial" size="sm">
          Zero Upfront Fees
        </Badge>
      </div>

      {/* Hero Typography: 652 heading with 1.0 tight line-height and terminal period */}
      <div className="space-y-3 max-w-3xl mx-auto sm:mx-0">
        <h1 className="heading-1 text-[#141414] tracking-tight">
          Find trusted local repair services.
        </h1>
        <p className="subtitle-lead text-base sm:text-lg max-w-2xl leading-relaxed">
          Search verified electricians, plumbers, and AC technicians across Colombo. Describe your problem naturally in English, Sinhala, Tamil, or Singlish — our explainable matching connects you with verified local specialists.
        </p>
      </div>

      {/* Main Stadium Search & Intake Bar (Inspired by ondemand.lk, elevated with Mobbin geometry) */}
      <form onSubmit={handleSubmit} id="search-intake-bar" className="space-y-3">
        <div className="bg-[#f0f0f0] rounded-full p-2 sm:p-2.5 border border-[#e0e0e0] flex flex-col md:flex-row items-center gap-2 focus-within:ring-2 focus-within:ring-[#141414] focus-within:bg-white transition-all">
          {/* Search Icon & Problem Input */}
          <div className="flex items-center gap-3 flex-1 w-full px-3.5 sm:px-4">
            <span className="text-lg text-[#707070] shrink-0">🔍</span>
            <input
              id="search-input"
              type="text"
              required
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="What do you need fixed? e.g. AC leaking, pipe burst, breaker tripping..."
              className="w-full bg-transparent border-none text-[#141414] placeholder-[#707070] text-sm sm:text-base font-normal focus:outline-none"
            />
          </div>

          {/* Area Selector ("Near Me" pill like ondemand.lk) */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-between md:justify-end px-2 sm:px-0">
            <div className="relative shrink-0">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="bg-white text-[#141414] border border-[#e0e0e0] text-xs font-semibold rounded-full pl-3.5 pr-7 py-2.5 appearance-none focus:outline-none focus:ring-1 focus:ring-[#141414] cursor-pointer"
              >
                {PILOT_AREAS.map((a) => (
                  <option key={a} value={a}>
                    📍 Near Me ({a})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#707070] text-[10px]">
                ▼
              </div>
            </div>

            {/* Primary Action Button (Stadium pill per design.md) */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isPending}
              disabled={!problemText.trim() || isPending}
              className="shrink-0 px-6 sm:px-7 font-bold text-xs sm:text-sm"
            >
              {isPending ? "Analyzing with AI..." : "Find Specialist →"}
            </Button>
          </div>
        </div>

        {/* Optional Time & Preferences Expandable Toggle */}
        <div className="flex items-center justify-between px-2 pt-0.5">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs font-semibold text-[#707070] hover:text-[#141414] transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{showAdvanced ? "▲ Hide scheduling options" : "▼ Specify preferred day & time window"}</span>
          </button>
          <span className="text-[11px] text-[#707070] hidden sm:block">
            Today is {getColomboToday()} (Colombo time)
          </span>
        </div>

        {/* Collapsible Advanced Preferences */}
        {showAdvanced && (
          <div className="bg-[#f3f3f3] rounded-[24px] p-5 border border-[#e0e0e0] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left transition-all">
            <div className="space-y-1">
              <label htmlFor="pref-day" className="text-xs font-semibold text-[#141414] block">
                Preferred Day
              </label>
              <select
                id="pref-day"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full bg-white border border-[#e0e0e0] text-[#141414] rounded-full px-4 py-2.5 text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-[#141414] cursor-pointer"
              >
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow (Recommended)</option>
                <option value="day_after">Day after tomorrow</option>
                <option value="flexible">Flexible / Any</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="pref-window" className="text-xs font-semibold text-[#141414] block">
                Time Window
              </label>
              <select
                id="pref-window"
                value={selectedWindow}
                onChange={(e) => setSelectedWindow(e.target.value)}
                className="w-full bg-white border border-[#e0e0e0] text-[#141414] rounded-full px-4 py-2.5 text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-[#141414] cursor-pointer"
              >
                {TIME_WINDOWS.map((w) => (
                  <option key={w} value={w}>
                    {TIME_WINDOW_LABELS[w]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="pref-name" className="text-xs font-semibold text-[#141414] block">
                Your Name (Optional)
              </label>
              <input
                id="pref-name"
                type="text"
                value={residentName}
                onChange={(e) => setResidentName(e.target.value)}
                placeholder="e.g. Anura"
                className="w-full bg-white border border-[#e0e0e0] text-[#141414] rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#141414]"
              />
            </div>
          </div>
        )}
      </form>

      {/* One-Click Multilingual Demo Presets */}
      <div className="space-y-2 pt-1 text-center sm:text-left">
        <span className="text-xs font-semibold text-[#707070] block">
          One-click demo problem scenarios:
        </span>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {DEMO_EXAMPLE_CHIPS.map((chip, idx) => (
            <Chip key={idx} onClick={() => handleChipClick(chip)}>
              ⚡ {chip.label}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
});

HomeSearchIntake.displayName = "HomeSearchIntake";
