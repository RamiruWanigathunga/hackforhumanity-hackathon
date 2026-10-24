import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "commercial" | "hazard" | "sample" | "success";
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
    sm: "px-2.5 py-0.5 text-xs font-medium",
    md: "px-3.5 py-1 text-sm font-medium",
  };

  const variantStyles = {
    neutral: "bg-[#f3f3f3] text-[#262626]",
    commercial: "bg-[#0066ff] text-white",
    hazard: "bg-amber-100 text-amber-900 border border-amber-300",
    sample: "bg-[#f0f0f0] text-[#707070] border border-[#e0e0e0]",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
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
