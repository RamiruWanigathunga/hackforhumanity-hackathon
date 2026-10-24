import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "secondary-dark" | "outline" | "outline-dark" | "tertiary" | "danger";
  size?: "sm" | "md" | "lg" | "cta";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", loading = false, disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052ff] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const sizeStyles = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-5 text-sm",
      lg: "h-12 px-6 text-sm",
      cta: "h-14 px-8 text-base",
    };

    const variantStyles = {
      primary: "bg-[#0052ff] text-white hover:bg-[#0045d8] active:bg-[#003ecc] disabled:bg-[#a8b8cc]",
      secondary: "bg-[#eef0f3] text-[#0a0b0d] hover:bg-[#dee1e6] active:bg-[#cbd0d8]",
      "secondary-dark": "bg-[#16181c] text-white border border-white/10 hover:bg-[#202328] active:bg-[#262b32]",
      outline: "bg-white text-[#0a0b0d] border border-[#dee1e6] hover:bg-[#f7f7f7] active:bg-[#eef0f3]",
      "outline-dark": "bg-transparent text-white border border-white/30 hover:bg-white/10 active:bg-white/20",
      tertiary: "bg-transparent text-[#0052ff] hover:underline p-0 h-auto font-medium",
      danger: "bg-[#cf202f] text-white hover:bg-[#b01724] active:bg-[#96121d]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
