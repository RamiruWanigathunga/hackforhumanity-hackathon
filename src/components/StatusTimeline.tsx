import React from "react";

export interface BookingEventItem {
  id: string;
  type: string;
  actor: "resident" | "provider" | "system";
  note?: string | null;
  createdAt: string | Date;
}

export interface StatusTimelineProps {
  events: BookingEventItem[];
  currentStatus: string;
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({ events, currentStatus }) => {
  const getStatusLabel = (type: string) => {
    switch (type) {
      case "requested":
        return "Booking Requested";
      case "accepted":
        return "Confirmed by Provider";
      case "alternative_proposed":
        return "Alternative Time Proposed";
      case "declined":
        return "Declined by Provider";
      case "cancelled":
        return "Booking Cancelled";
      case "completed":
        return "Service Completed";
      default:
        return type.replace(/_/g, " ");
    }
  };

  const getActorLabel = (actor: string) => {
    switch (actor) {
      case "resident":
        return "Resident";
      case "provider":
        return "Provider";
      default:
        return "System";
    }
  };

  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-2">
        <span className="text-xs font-semibold text-[#707070]">Activity Timeline</span>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0]">
          Current: {getStatusLabel(currentStatus)}
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e0e0e0]">
        {events.map((evt, idx) => {
          const isLatest = idx === events.length - 1;
          const isAccepted = evt.type === "accepted" || evt.type === "completed";
          const isWarning = evt.type === "alternative_proposed";

          let dotColor = "bg-[#141414]";
          if (isAccepted) dotColor = "bg-[#141414]";
          if (isWarning) dotColor = "bg-[#707070]";

          return (
            <div key={evt.id} className="relative flex items-start gap-3">
              <span
                className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 border-white ring-2 ${
                  isLatest ? "ring-black/20 scale-110" : "ring-black/5"
                } ${dotColor}`}
              />
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-sm capitalize text-[#141414]">
                    {getStatusLabel(evt.type)}
                  </span>
                  <span className="text-[#adadad] text-[11px]">
                    {new Date(evt.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className="text-xs text-[#707070]">
                  Actor: <span className="font-medium text-[#262626]">{getActorLabel(evt.actor)}</span>
                  {evt.note && <p className="mt-1 text-xs text-[#141414] bg-[#f3f3f3] p-2.5 rounded-[12px]">{evt.note}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
