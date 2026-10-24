import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, hint, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-xs font-semibold text-[#0a0b0d] tracking-tight">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`w-full bg-white border border-[#dee1e6] text-[#0a0b0d] placeholder-[#7c828a] rounded-[12px] px-4 py-3 text-sm transition-all focus:outline-none focus:border-[#0052ff] focus:ring-1 focus:ring-[#0052ff] resize-none disabled:opacity-50 ${
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
Textarea.displayName = "Textarea";
