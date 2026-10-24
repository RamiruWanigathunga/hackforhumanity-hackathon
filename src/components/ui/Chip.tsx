import React from "react";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  className = "",
  active = false,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
        active
          ? "bg-[#141414] text-white"
          : "bg-[#f3f3f3] text-[#141414] hover:bg-[#e0e0e0]"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
