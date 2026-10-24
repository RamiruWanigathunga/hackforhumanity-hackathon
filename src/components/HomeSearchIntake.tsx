"use client";

import React, { useState, useTransition, useImperativeHandle, forwardRef } from "react";
import { PILOT_AREAS } from "@/config/pilot";
import { TIME_WINDOWS, TIME_WINDOW_LABELS, getColomboToday } from "@/lib/time";
import { createTicketAction } from "@/server/actions/tickets";
import { Button } from "@/components/ui/Button";
import { SearchIcon, ChevronDownIcon, CheckShieldIcon } from "@/components/ui/Icons";

export const DEMO_EXAMPLE_CHIPS = [
  {
    label: "Sink pipe leak (English)",
    text: "My kitchen sink pipe is leaking under the counter, need someone tomorrow morning",
    area: "Nugegoda",
    day: "tomorrow",
    window: "morning",
  },
  {
    label: "Fan and burning smell (Singlish)",
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
    <section className="w-full bg-[#0a0b0d] text-white py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left 7 Columns: Editorial Headline, Intake Bar, Demo Presets */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#a8acb3] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#0052ff]" />
              <span>Institutional Service Infrastructure / Colombo Pilot</span>
            </div>

            {/* Display Mega: Weight 400, tight line-height, negative letter-spacing */}
            <h1 className="display-mega text-white">
              The future of local trade verification.
            </h1>

            <p className="body-md text-[#a8acb3] max-w-xl text-base sm:text-lg leading-relaxed">
              Search verified electricians, plumbers, and AC technicians across Colombo. Describe your problem naturally in English, Sinhala, Tamil, or Singlish. Our explainable deterministic algorithm matches you with available local specialists.
            </p>
          </div>

          {/* Search and Intake Pill */}
          <form onSubmit={handleSubmit} id="search-intake-bar" className="space-y-3">
            <div className="bg-[#16181c] rounded-full p-2 sm:p-2.5 border border-white/10 flex flex-col sm:flex-row items-center gap-2 focus-within:border-[#0052ff] transition-all">
              <div className="flex items-center gap-3 flex-1 w-full px-3.5">
                <SearchIcon className="w-5 h-5 text-[#a8acb3] shrink-0" />
                <input
                  id="search-input"
                  type="text"
                  required
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  placeholder="What needs fixing? e.g. AC leaking, pipe burst, breaker tripping..."
                  className="w-full bg-transparent border-none text-white placeholder-[#7c828a] text-sm sm:text-base font-normal focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-between sm:justify-end px-2 sm:px-0">
                <div className="relative shrink-0">
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="bg-[#0a0b0d] text-white border border-white/15 text-xs font-semibold rounded-full pl-3.5 pr-8 py-2.5 appearance-none focus:outline-none focus:border-[#0052ff] cursor-pointer"
                  >
                    {PILOT_AREAS.map((a) => (
                      <option key={a} value={a}>
                        Near Me ({a})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#a8acb3]">
                    <ChevronDownIcon className="w-3.5 h-3.5 text-current" />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={isPending}
                  disabled={!problemText.trim() || isPending}
                  className="shrink-0 font-semibold"
                >
                  {isPending ? "Analyzing with AI..." : "Find Specialist"}
                </Button>
              </div>
            </div>

            {/* Advanced Preferences Toggle */}
            <div className="flex items-center justify-between px-2 pt-1 text-xs text-[#a8acb3]">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {showAdvanced ? "Hide scheduling options" : "Specify preferred day and time window"}
              </button>
              <span className="hidden sm:inline">
                Today is {getColomboToday()} (Colombo time)
              </span>
            </div>

            {/* Collapsible Advanced Form */}
            {showAdvanced && (
              <div className="bg-[#16181c] rounded-[24px] p-5 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left transition-all">
                <div className="space-y-1">
                  <label htmlFor="pref-day" className="text-xs font-semibold text-white block">
                    Preferred Day
                  </label>
                  <select
                    id="pref-day"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full bg-[#0a0b0d] border border-white/15 text-white rounded-full px-4 py-2.5 text-xs appearance-none focus:outline-none focus:border-[#0052ff] cursor-pointer"
                  >
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow (Recommended)</option>
                    <option value="day_after">Day after tomorrow</option>
                    <option value="flexible">Flexible / Any</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="pref-window" className="text-xs font-semibold text-white block">
                    Time Window
                  </label>
                  <select
                    id="pref-window"
                    value={selectedWindow}
                    onChange={(e) => setSelectedWindow(e.target.value)}
                    className="w-full bg-[#0a0b0d] border border-white/15 text-white rounded-full px-4 py-2.5 text-xs appearance-none focus:outline-none focus:border-[#0052ff] cursor-pointer"
                  >
                    {TIME_WINDOWS.map((w) => (
                      <option key={w} value={w}>
                        {TIME_WINDOW_LABELS[w]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="pref-name" className="text-xs font-semibold text-white block">
                    Your Name (Optional)
                  </label>
                  <input
                    id="pref-name"
                    type="text"
                    value={residentName}
                    onChange={(e) => setResidentName(e.target.value)}
                    placeholder="e.g. Anura"
                    className="w-full bg-[#0a0b0d] border border-white/15 text-white rounded-full px-4 py-2 text-xs focus:outline-none focus:border-[#0052ff]"
                  />
                </div>
              </div>
            )}
          </form>

          {/* One-Click Multilingual Demo Presets */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-medium text-[#7c828a] block">
              Sample scenario presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {DEMO_EXAMPLE_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#16181c] border border-white/10 text-[#a8acb3] hover:text-white hover:border-white/30 transition-all cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Signature Coinbase Layered product-ui-card-dark Mockup */}
        <div className="lg:col-span-5 relative">
          {/* Main Floating Product-UI Card */}
          <div className="bg-[#16181c] rounded-[24px] border border-white/10 p-6 sm:p-7 space-y-6 shadow-2xl relative z-10">
            {/* Top Bar with Status and Match Score */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <CheckShieldIcon className="w-5 h-5 text-[#0052ff]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  Verified Dispatch Engine
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#a8acb3] block">Match Confidence</span>
                <span className="number-display text-[#05b169]">96.4%</span>
              </div>
            </div>

            {/* Dispatch Ticket Preview */}
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-xs text-[#7c828a]">Active Resident Intake</span>
                <p className="text-sm font-semibold text-white">
                  Sink pipe leaking under counter / Urgent valve check
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-[#0a0b0d] p-3 rounded-[12px] border border-white/5 space-y-0.5">
                  <span className="text-[#7c828a] block">Category</span>
                  <span className="font-semibold text-white">Plumbing</span>
                </div>
                <div className="bg-[#0a0b0d] p-3 rounded-[12px] border border-white/5 space-y-0.5">
                  <span className="text-[#7c828a] block">Proximity Area</span>
                  <span className="font-semibold text-white">Nugegoda Cluster</span>
                </div>
              </div>
            </div>

            {/* Matched Specialist Candidate */}
            <div className="bg-[#0a0b0d] rounded-[16px] p-4 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-white">Kasun Perera</h4>
                  <span className="text-xs text-[#a8acb3]">Licensed Master Plumber / 142 jobs</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#7c828a] block">Visit Fee</span>
                  <span className="number-display text-white text-sm">LKR 2,000</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                <span className="text-[#a8acb3]">Next Availability:</span>
                <span className="text-[#05b169] font-medium">Tomorrow / Morning</span>
              </div>
            </div>

            <div className="text-[11px] text-[#7c828a] text-center">
              100% Deterministic match. Zero sponsored positioning.
            </div>
          </div>

          {/* Decorative Secondary Layered Card underneath at slight offset */}
          <div className="hidden sm:block absolute -bottom-5 -right-5 w-full h-full bg-[#16181c]/50 rounded-[24px] border border-white/5 -z-0 transform translate-x-3 translate-y-3 pointer-events-none" />
        </div>
      </div>
    </section>
  );
});

HomeSearchIntake.displayName = "HomeSearchIntake";
