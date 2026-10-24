import React from "react";

export interface SegmentOption<T extends string = string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: SegmentedControlProps<T>) {
  return (
    <div
      className={`inline-flex items-center p-1 bg-[#f3f3f3] rounded-full gap-1 ${className}`}
      role="tablist"
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.value)}
            className={`px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              isActive
                ? "bg-white text-[#141414] shadow-sm" // The one soft shadow exception in Mobbin
                : "text-[#707070] hover:text-[#141414]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
