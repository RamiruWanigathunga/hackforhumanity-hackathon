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
      className={`inline-flex items-center p-1 bg-[#f3f3f3] rounded-full border border-[#f0f0f0] gap-1 ${className}`}
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
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              isActive
                ? "bg-white text-[#141414] shadow-sm"
                : "text-[#707070] hover:text-[#141414] hover:bg-black/5"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
