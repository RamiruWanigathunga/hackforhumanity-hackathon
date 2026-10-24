import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "commercial" | "hazard" | "sample" | "success" | "overlay";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className = "",
  variant = "neutral",
  size = "sm",
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: "px-3 py-1 text-[11px] font-semibold leading-none",
    md: "px-3.5 py-1.5 text-xs font-semibold leading-none",
  };

  const variantStyles = {
    neutral: "bg-[#eef0f3] text-[#0a0b0d]",
    commercial: "bg-[#0052ff] text-white", // Coinbase Blue
    hazard: "bg-[#0a0b0d] text-white",
    sample: "bg-[#eef0f3] text-[#5b616e] border border-[#dee1e6]",
    success: "bg-[#eef0f3] text-[#05b169] font-bold", // Coinbase Semantic Up
    overlay: "bg-[rgba(10,11,13,0.7)] text-white backdrop-blur-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
