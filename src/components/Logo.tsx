import React from "react";

export interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
    >
      <circle cx="16" cy="16" r="16" fill="#0052ff" />
      <rect x="9" y="8" width="3.5" height="16" rx="1.75" fill="#ffffff" />
      <rect x="19.5" y="8" width="3.5" height="16" rx="1.75" fill="#ffffff" />
      <rect x="9" y="14.25" width="14" height="3.5" rx="1.75" fill="#ffffff" />
    </svg>
  );
}

