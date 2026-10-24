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
      className={`inline-flex items-center p-1 bg-[#eef0f3] rounded-full gap-1 ${className}`}
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
                ? "bg-white text-[#0a0b0d] shadow-sm"
                : "text-[#5b616e] hover:text-[#0a0b0d]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
