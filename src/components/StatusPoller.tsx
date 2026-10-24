"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export interface StatusPollerProps {
  currentStatus: string;
}

export const StatusPoller: React.FC<StatusPollerProps> = ({ currentStatus }) => {
  const router = useRouter();

  useEffect(() => {
    // Only poll while non-terminal
    const isNonTerminal = currentStatus === "requested" || currentStatus === "alternative_proposed";
    if (!isNonTerminal) return;

    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        router.refresh();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentStatus, router]);

  return null;
};
