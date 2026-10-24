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
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
        active
          ? "bg-[#141414] text-white border-[#141414]"
          : "bg-[#f3f3f3] text-[#262626] border-transparent hover:bg-[#e0e0e0] hover:text-black"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
