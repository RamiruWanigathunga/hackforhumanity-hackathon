"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/i18n";

interface HeaderClientProps {
  initialBookingCount?: number;
  initialDemoProviderId?: string;
}

export function HeaderClient({
  initialBookingCount = 0,
  initialDemoProviderId,
}: HeaderClientProps) {
  const { language, setLanguage, t } = useLanguage();
  const [bookingCount, setBookingCount] = useState(initialBookingCount);
  const [demoProviderId, setDemoProviderId] = useState(initialDemoProviderId);

  useEffect(() => {
    const syncFromCookies = () => {
      try {
        const matchBookings = document.cookie.match(/(?:^|; )resident_bookings=([^;]*)/);
        if (matchBookings) {
          const parsed = JSON.parse(decodeURIComponent(matchBookings[1]));
          if (Array.isArray(parsed)) {
            setBookingCount(parsed.length);
          }
        }
        const matchProvider = document.cookie.match(/(?:^|; )demo_provider_id=([^;]*)/);
        if (matchProvider) {
          setDemoProviderId(decodeURIComponent(matchProvider[1]));
        }
      } catch {
        // Ignore parsing errors
      }
    };

    window.addEventListener("focus", syncFromCookies);
    return () => window.removeEventListener("focus", syncFromCookies);
  }, []);

  const languageOptions: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "si", label: "සිංහල" },
    { code: "ta", label: "தமிழ்" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#dee1e6] h-16 flex items-center">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Wordmark with Coinbase Blue Minimalist Logo */}
        <div className="flex items-center gap-6 lg:gap-8 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Logo size={28} />
            <span className="font-semibold text-lg tracking-tight text-[#0a0b0d]">
              HelpDesk<span className="text-[#0052ff]">.lk</span>
            </span>
          </Link>

          {/* Primary Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5b616e]">
            <Link href="/" className="hover:text-[#0a0b0d] transition-colors">
              {t.nav.findServices}
            </Link>
            <Link href="/#categories" className="hover:text-[#0a0b0d] transition-colors">
              {t.nav.directory}
            </Link>
            <Link href="/about" className="hover:text-[#0a0b0d] transition-colors">
              {t.nav.howItWorks}
            </Link>
            <Link href="/about#matching" className="hover:text-[#0a0b0d] transition-colors">
              {t.nav.scoringModel}
            </Link>
          </nav>
        </div>

        {/* Right Nav Actions: Language Switcher + Demo Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Institutional Segmented Language Switcher */}
          <div
            className="flex items-center bg-[#eef0f3] p-0.5 rounded-full border border-[#dee1e6]"
            role="group"
            aria-label="Language selection"
          >
            {languageOptions.map((opt) => {
              const isActive = language === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLanguage(opt.code)}
                  className={`px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-[#0a0b0d] shadow-sm"
                      : "text-[#5b616e] hover:text-[#0a0b0d]"
                  }`}
                  aria-pressed={isActive}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {bookingCount > 0 && (
            <Link
              href="/bookings"
              className="text-xs font-medium text-[#0a0b0d] bg-[#eef0f3] hover:bg-[#dee1e6] px-3 py-1.5 rounded-full transition-colors hidden sm:inline-block"
            >
              {t.nav.bookings} ({bookingCount})
            </Link>
          )}

          <Link
            href={demoProviderId ? "/provider/inbox" : "/provider"}
            className="text-xs font-medium text-[#5b616e] hover:text-[#0a0b0d] px-2.5 py-1.5 rounded-full transition-colors hidden md:inline-block"
          >
            {demoProviderId ? t.nav.providerInbox : t.nav.providerPortal}
          </Link>

          <Button href="/#search-intake-bar" variant="primary" size="sm" className="hidden xs:inline-flex">
            {t.nav.getStarted}
          </Button>
        </div>
      </div>
    </header>
  );
}
