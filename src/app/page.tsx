"use client";

import React, { useState, useTransition } from "react";
import { PILOT_AREAS, PILOT_NAME } from "@/config/pilot";
import { TIME_WINDOWS, TIME_WINDOW_LABELS, getColomboToday } from "@/lib/time";
import { createTicketAction } from "@/server/actions/tickets";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";

const DEMO_EXAMPLE_CHIPS = [
  {
    label: "Sink leak (English)",
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

export default function HomePage() {
  const [problemText, setProblemText] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("Nugegoda");
  const [selectedDay, setSelectedDay] = useState<string>("tomorrow");
  const [selectedWindow, setSelectedWindow] = useState<string>("morning");
  const [residentName, setResidentName] = useState<string>("");
  const [isPending, startTransition] = useTransition();

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
    <div className="max-w-2xl mx-auto space-y-8 py-4 sm:py-8">
      {/* Hero */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2">
          <Badge variant="neutral" size="sm">
            Pilot: {PILOT_NAME}
          </Badge>
          <Badge variant="neutral" size="sm">
            Plumbing · Electrical · AC
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#141414] leading-tight">
          Describe your repair in your own words.
        </h1>
        <p className="text-sm sm:text-base text-[#707070] max-w-xl">
          English, Sinhala, Tamil, or Singlish. AI structures your request into a verifiable ticket matched to available local technicians.
        </p>
      </div>

      {/* Example Chips */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-[#707070] block">
          One-click demo examples:
        </span>
        <div className="flex flex-wrap gap-2">
          {DEMO_EXAMPLE_CHIPS.map((chip, idx) => (
            <Chip
              key={idx}
              onClick={() => handleChipClick(chip)}
              className="text-xs"
            >
              ⚡ {chip.label}
            </Chip>
          ))}
        </div>
      </div>

      {/* Main Intake Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#f0f0f0] p-6 space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="problem" className="text-xs font-semibold text-[#141414] block">
            What needs fixing? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="problem"
            required
            rows={4}
            value={problemText}
            onChange={(e) => setProblemText(e.target.value)}
            placeholder="e.g. My kitchen sink pipe is leaking under the counter / fan eka karakenne na, switch eken burning smell ekak enawa / AC එක සීතල වෙන්නේ නැහැ..."
            className="w-full bg-[#f0f0f0] text-[#141414] placeholder-[#adadad] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#141414] resize-none"
          />
          <span className="text-[11px] text-[#707070] block">
            Today is {getColomboToday()} (Colombo time). Relative days like &quot;tomorrow&quot; or &quot;heta&quot; are automatically resolved.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Area select */}
          <div className="space-y-1.5">
            <label htmlFor="area" className="text-xs font-semibold text-[#141414] block">
              Pilot Area <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="area"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-[#f0f0f0] text-[#141414] rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#141414] cursor-pointer"
              >
                {PILOT_AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#707070]">
                ▼
              </div>
            </div>
          </div>

          {/* Preferred Day */}
          <div className="space-y-1.5">
            <label htmlFor="day" className="text-xs font-semibold text-[#141414] block">
              Preferred Day
            </label>
            <div className="relative">
              <select
                id="day"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full bg-[#f0f0f0] text-[#141414] rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#141414] cursor-pointer"
              >
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow (Recommended)</option>
                <option value="day_after">Day after tomorrow</option>
                <option value="flexible">Flexible / Next free</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#707070]">
                ▼
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Preferred Window */}
          <div className="space-y-1.5">
            <label htmlFor="window" className="text-xs font-semibold text-[#141414] block">
              Time Window
            </label>
            <div className="relative">
              <select
                id="window"
                value={selectedWindow}
                onChange={(e) => setSelectedWindow(e.target.value)}
                className="w-full bg-[#f0f0f0] text-[#141414] rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#141414] cursor-pointer"
              >
                {TIME_WINDOWS.map((w) => (
                  <option key={w} value={w}>
                    {TIME_WINDOW_LABELS[w]}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#707070]">
                ▼
              </div>
            </div>
          </div>

          {/* Optional Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-semibold text-[#141414] block">
              Your Name (Optional)
            </label>
            <input
              id="name"
              type="text"
              value={residentName}
              onChange={(e) => setResidentName(e.target.value)}
              placeholder="e.g. Anura (No address or phone needed)"
              className="w-full bg-[#f0f0f0] text-[#141414] placeholder-[#adadad] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#141414]"
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#707070]">
            AI structures your ticket. You review and edit before sending.
          </span>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isPending}
            disabled={!problemText.trim() || isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? "Understanding your problem..." : "Submit & Review Ticket →"}
          </Button>
        </div>
      </form>
    </div>
  );
}
