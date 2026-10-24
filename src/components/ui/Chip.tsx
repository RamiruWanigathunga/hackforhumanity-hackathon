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
          ? "bg-[#0052ff] text-white"
          : "bg-[#eef0f3] text-[#0a0b0d] hover:bg-[#dee1e6]"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
