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
          <label htmlFor={textareaId} className="text-xs font-semibold text-[#141414] tracking-tight">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`w-full bg-[#f0f0f0] border-none text-[#141414] placeholder-[#adadad] rounded-[16px] px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#141414] resize-none disabled:opacity-50 ${
            error ? "ring-2 ring-red-500" : ""
          } ${className}`}
          {...props}
        />
        {hint && !error && <span className="text-xs text-[#707070]">{hint}</span>}
        {error && <span className="text-xs text-red-600 font-medium">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
