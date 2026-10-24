import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "featured" | "subtle";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: "bg-white border border-[#f0f0f0]",
      featured: "bg-[#f3f3f3] border-transparent",
      subtle: "bg-[#fafafa] border border-[#f0f0f0]",
    };

    return (
      <div
        ref={ref}
        className={`rounded-[24px] p-6 sm:p-7 ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
