"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <div className="w-full mt-24">
      {/* Signature Coinbase CTA Band Dark */}
      <section className="w-full bg-[#0a0b0d] text-white py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-wider text-[#a8acb3] font-medium block">
            {t.footer.preTitle}
          </span>
          <h2 className="display-lg text-white max-w-2xl mx-auto">
            {t.footer.preHeading}
          </h2>
          <p className="body-md text-[#a8acb3] max-w-xl mx-auto">
            {t.footer.preSub}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button href="/#search-intake-bar" variant="primary" size="lg">
              {t.footer.preBtnFind}
            </Button>
            <Button href="/provider" variant="outline-dark" size="lg">
              {t.footer.preBtnRegister}
            </Button>
          </div>
        </div>
      </section>

      {/* Signature Coinbase Footer Light */}
      <footer className="w-full bg-white border-t border-[#dee1e6] py-16 px-4 sm:px-6 text-sm text-[#5b616e]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12">
          {/* Col 1: Brand */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <Logo size={24} />
              <span className="font-semibold text-base text-[#0a0b0d]">HelpDesk.lk</span>
            </div>
            <p className="body-sm text-[#7c828a] max-w-xs leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="text-xs text-[#7c828a] pt-2">
              {t.footer.pilotInfo}
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#0a0b0d] uppercase tracking-wider block">
              {t.footer.colServices}
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#categories" className="hover:text-[#0052ff] transition-colors">
                  {t.categories.items.electrical.name}
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-[#0052ff] transition-colors">
                  {t.categories.items.plumbing.name}
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-[#0052ff] transition-colors">
                  {t.categories.items.ac_appliance.name}
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-[#0052ff] transition-colors">
                  {t.categories.items.mechanic.name}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Technology */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#0a0b0d] uppercase tracking-wider block">
              {t.footer.colTech}
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#0052ff] transition-colors">
                  Multilingual AI Intake
                </Link>
              </li>
              <li>
                <Link href="/about#matching" className="hover:text-[#0052ff] transition-colors">
                  Deterministic Scoring
                </Link>
              </li>
              <li>
                <Link href="/about#ai" className="hover:text-[#0052ff] transition-colors">
                  Safety Guardrails
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0052ff] transition-colors">
                  Heuristic Fallback
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: For Providers */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#0a0b0d] uppercase tracking-wider block">
              {t.footer.colProviders}
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/provider" className="hover:text-[#0052ff] transition-colors">
                  Provider Portal
                </Link>
              </li>
              <li>
                <Link href="/provider" className="hover:text-[#0052ff] transition-colors">
                  Slot Calendar
                </Link>
              </li>
              <li>
                <Link href="/provider" className="hover:text-[#0052ff] transition-colors">
                  Lead Dispatch
                </Link>
              </li>
              <li>
                <Link href="/provider" className="hover:text-[#0052ff] transition-colors">
                  Sample Profiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Notice */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#0a0b0d] uppercase tracking-wider block">
              {t.footer.colGovernance}
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#0052ff] transition-colors">
                  Hackathon Prototype
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0052ff] transition-colors">
                  No Monetary Fees
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0052ff] transition-colors">
                  Open Source License
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Band */}
        <div className="max-w-[1200px] mx-auto pt-8 border-t border-[#dee1e6] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-[#7c828a]">
          <p>
            {t.footer.legalNote}
          </p>
          <p>
            {t.footer.poweredBy}
          </p>
        </div>
      </footer>
    </div>
  );
}
