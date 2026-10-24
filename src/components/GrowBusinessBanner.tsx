import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ToolsIcon } from "@/components/ui/Icons";

export const GrowBusinessBanner: React.FC = () => {
  const benefits = [
    "Direct resident dispatch",
    "Real-time calendar slot management",
    "Verified technician credential status",
    "Zero platform commission fees",
  ];

  return (
    <section className="w-full bg-white py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto bg-[#0a0b0d] text-white rounded-[24px] p-8 sm:p-12 md:p-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#16181c] border border-white/10 flex items-center justify-center shrink-0">
                <ToolsIcon className="w-6 h-6 text-[#0052ff]" />
              </div>
              <span className="text-xs font-semibold text-[#a8acb3] uppercase tracking-wider">
                For Independent Technicians
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="display-md text-white">
                Grow your business with HelpDesk LK.
              </h3>
              <p className="body-md text-[#a8acb3] leading-relaxed">
                Join licensed and certified trade professionals across Colombo. Receive verified resident requests, publish your free availability calendar, and confirm bookings with zero commission fees.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {benefits.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#a8acb3]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0052ff] shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto lg:w-56">
            <Link href="/provider" className="w-full">
              <Button variant="primary" size="lg" className="w-full">
                Register as Provider
              </Button>
            </Link>
            <Link href="/provider" className="w-full">
              <Button variant="outline-dark" size="lg" className="w-full">
                CRM Portal Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
