import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, hint, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-[#0a0b0d] tracking-tight">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full bg-white border border-[#dee1e6] text-[#0a0b0d] placeholder-[#7c828a] rounded-[12px] px-4 py-3 text-sm transition-all focus:outline-none focus:border-[#0052ff] focus:ring-1 focus:ring-[#0052ff] disabled:opacity-50 ${
            error ? "border-[#cf202f] focus:border-[#cf202f] focus:ring-[#cf202f]" : ""
          } ${className}`}
          {...props}
        />
        {hint && !error && <span className="text-xs text-[#7c828a]">{hint}</span>}
        {error && <span className="text-xs text-[#cf202f] font-medium">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
