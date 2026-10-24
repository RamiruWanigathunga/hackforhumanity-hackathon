import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "featured" | "subtle" | "dark";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: "bg-white border border-[#dee1e6] text-[#0a0b0d]",
      featured: "bg-[#0a0b0d] text-white border-transparent", // Coinbase dark card
      subtle: "bg-[#f7f7f7] border border-[#dee1e6] text-[#0a0b0d]",
      dark: "bg-[#16181c] text-white border border-white/10",
    };

    return (
      <div
        ref={ref}
        className={`rounded-[24px] p-6 sm:p-8 coinbase-card ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
