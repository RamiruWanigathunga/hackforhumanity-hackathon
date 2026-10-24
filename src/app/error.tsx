"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error caught:", error);
  }, [error]);

  return (
    <div className="py-24 text-center space-y-6 max-w-md mx-auto">
      <div className="w-16 h-16 bg-red-100 text-red-700 rounded-full mx-auto flex items-center justify-center font-bold text-xl">
        !
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-[#141414]">Something went wrong.</h1>
        <p className="text-sm text-[#707070]">
          An unexpected error occurred while processing your request. Please try again.
        </p>
      </div>
      <div className="flex justify-center gap-3">
        <Button variant="primary" onClick={() => reset()}>
          Try Again
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go to Home
        </Button>
      </div>
    </div>
  );
}
