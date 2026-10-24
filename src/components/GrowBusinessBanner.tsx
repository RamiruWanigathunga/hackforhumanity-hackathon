import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const GrowBusinessBanner: React.FC = () => {
  const benefits = [
    "Free marketplace listing",
    "Customer leads & bookings",
    "Invoicing & slot management",
    "Verified technician badge",
  ];

  return (
    <section className="bg-[#f3f3f3] rounded-[24px] border border-[#e0e0e0] p-6 sm:p-8 md:p-10 transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          {/* iOS 30% squircle icon */}
          <div className="w-16 h-16 bg-[#141414] text-white app-icon-squircle flex items-center justify-center text-3xl shrink-0">
            🛠️
          </div>

          <div className="space-y-3 max-w-2xl">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider block">
                For Technicians & Local Pros
              </span>
              <h3 className="heading-3 text-[#141414]">
                Grow Your Business with HelpDesk LK.
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
              Join skilled trade professionals across Colombo. Receive verified resident requests, publish your free availability calendar, and confirm bookings with zero commission fees.
            </p>

            {/* Checkmark pills in stadium shapes */}
            <div className="flex flex-wrap gap-2 pt-1">
              {benefits.map((b, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#e0e0e0] text-xs font-medium text-[#141414]"
                >
                  <span className="text-emerald-600 font-bold">✓</span> {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action buttons (Stadium pills per design.md) */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto md:w-48">
          <Link href="/provider" className="w-full">
            <Button variant="primary" size="md" className="w-full">
              Register Free →
            </Button>
          </Link>
          <Link href="/provider" className="w-full">
            <Button variant="outline" size="md" className="w-full">
              CRM Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
