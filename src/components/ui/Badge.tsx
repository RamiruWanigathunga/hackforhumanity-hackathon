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
    md: "px-4 py-1.5 text-xs font-semibold leading-none",
  };

  const variantStyles = {
    neutral: "bg-[#f3f3f3] text-[#262626]",
    commercial: "bg-[#0066ff] text-white", // Electric blue accent (Mobbin)
    hazard: "bg-[#141414] text-white",
    sample: "bg-[#f0f0f0] text-[#707070] border border-[#e0e0e0]",
    success: "bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0]",
    overlay: "bg-[rgba(115,115,115,0.56)] text-white backdrop-blur-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
