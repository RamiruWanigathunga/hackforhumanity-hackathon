import React from "react";
import { AlertIcon } from "@/components/ui/Icons";

export interface SafetyBannerProps {
  hazardText?: string;
  className?: string;
}

export const SafetyBanner: React.FC<SafetyBannerProps> = ({
  hazardText = "Potential hazard detected with electrical or gas systems.",
  className = "",
}) => {
  return (
    <div
      role="alert"
      className={`bg-[#141414] text-white rounded-[24px] p-5 sm:p-6 flex items-start gap-4 ${className}`}
    >
      <div className="w-9 h-9 rounded-full bg-white text-[#141414] flex items-center justify-center shrink-0">
        <AlertIcon className="w-5 h-5 text-[#141414]" />
      </div>
      <div className="space-y-2 text-xs sm:text-sm">
        <h3 className="font-bold text-sm sm:text-base tracking-tight text-white">
          Safety Precaution Advised.
        </h3>
        <p className="font-medium text-[#adadad] leading-relaxed">{hazardText}</p>
        <ul className="list-disc list-inside space-y-1 text-xs text-[#adadad] pt-1">
          <li>Do not touch exposed wiring or appliances with wet hands.</li>
          <li>If safe, turn off the relevant circuit breaker at the main distribution board.</li>
          <li>If you detect burning smells, sparks, or gas, evacuate the area immediately.</li>
          <li>In an immediate emergency, contact local emergency services.</li>
        </ul>
      </div>
    </div>
  );
};
