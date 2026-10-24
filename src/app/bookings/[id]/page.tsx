import { notFound } from "next/navigation";
import { getBookingWithDetails } from "@/server/db/queries";
import { StatusTimeline } from "@/components/StatusTimeline";
import { StatusPoller } from "@/components/StatusPoller";
import { Badge } from "@/components/ui/Badge";
import ResidentBookingActions from "./ResidentBookingActions";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getBookingWithDetails(id);

  if (!data || !data.booking) {
    notFound();
  }

  const { booking, ticket, provider, slot, proposedSlot, events } = data;

  // Honesty Rule H6: "Confirmed" only after provider acceptance.
  // Before that: "Requested: waiting for provider".
  const isAccepted = booking.status === "accepted";
  const isCompleted = booking.status === "completed";
  const isProposal = booking.status === "alternative_proposed";
  const isCancelled = booking.status === "cancelled";
  const isDeclined = booking.status === "declined";

  let statusHeadline = "Requested: Waiting for Provider";
  let statusBadgeVariant: "neutral" | "commercial" | "hazard" | "sample" | "success" = "neutral";

  if (isAccepted) {
    statusHeadline = "Booking Confirmed by Provider";
    statusBadgeVariant = "success";
  } else if (isProposal) {
    statusHeadline = "Alternative Time Proposed";
    statusBadgeVariant = "commercial";
  } else if (isCompleted) {
    statusHeadline = "Service Completed";
    statusBadgeVariant = "neutral";
  } else if (isCancelled) {
    statusHeadline = "Booking Cancelled";
    statusBadgeVariant = "hazard";
  } else if (isDeclined) {
    statusHeadline = "Request Declined by Provider";
    statusBadgeVariant = "hazard";
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      {/* Real-time Poller auto-refreshes page every 5s while pending */}
      <StatusPoller currentStatus={booking.status} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider">
            Booking Reference · {booking.id}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141414]">
            {statusHeadline}
          </h1>
        </div>
        <Badge variant={statusBadgeVariant} size="md">
          {booking.status.replace(/_/g, " ").toUpperCase()}
        </Badge>
      </div>

      {/* Active Time Window Banner */}
      <div className="bg-white rounded-2xl border border-[#f0f0f0] p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#707070] block">Scheduled Time</span>
            <span className="font-bold text-sm text-[#141414]">
              {slot?.date} · <span className="capitalize">{slot?.window}</span>
            </span>
          </div>

          {proposedSlot && isProposal && (
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
              <span className="text-amber-800 font-semibold block">Proposed Alternative</span>
              <span className="font-bold text-sm text-amber-950">
                {proposedSlot.date} · <span className="capitalize">{proposedSlot.window}</span>
              </span>
            </div>
          )}

          <div>
            <span className="text-[#707070] block">Technician</span>
            <span className="font-bold text-sm text-[#141414]">{provider?.displayName}</span>
            <span className="text-[11px] text-[#707070] block">
              ★ {provider?.rating} (demo) · {provider?.homeArea}
            </span>
          </div>

          <div>
            <span className="text-[#707070] block">Contact Phone</span>
            {/* Honesty Rule H6/H10: Phone shown only after acceptance */}
            {isAccepted || isCompleted ? (
              <span className="font-mono font-bold text-sm text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                {provider?.phoneMasked} (Revealed)
              </span>
            ) : (
              <span className="text-xs text-[#707070] italic">
                Masked until confirmed by provider
              </span>
            )}
          </div>
        </div>

        {/* Resident Actions (Accept proposed, cancel, rate) */}
        <ResidentBookingActions
          bookingId={booking.id}
          status={booking.status}
          hasRating={booking.residentRating}
        />
      </div>

      {/* Ticket Details */}
      {ticket && (
        <div className="bg-[#fafafa] rounded-2xl border border-[#f0f0f0] p-5 space-y-2 text-xs">
          <span className="font-bold text-[#141414] uppercase tracking-wider block">
            Job Details
          </span>
          <p className="text-sm font-medium text-[#141414]">{ticket.summary}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Badge variant="neutral" size="sm">
              Trade: {ticket.category.replace(/_/g, " ")}
            </Badge>
            <Badge variant="neutral" size="sm">
              Area: {ticket.area}
            </Badge>
            <Badge variant="neutral" size="sm">
              Urgency: {ticket.urgency}
            </Badge>
          </div>
        </div>
      )}

      {/* Live Timeline */}
      <div className="bg-white rounded-2xl border border-[#f0f0f0] p-5 space-y-2">
        <StatusTimeline
          currentStatus={booking.status}
          events={events.map((e) => ({
            id: e.id,
            type: e.type,
            actor: e.actor as "resident" | "provider" | "system",
            note: e.note,
            createdAt: e.createdAt,
          }))}
        />
      </div>

      {/* Footer Back Link */}
      <div className="text-center pt-2">
        <Link href="/">
          <Button variant="ghost" size="sm">
            ← Submit Another Repair Request
          </Button>
        </Link>
      </div>
    </div>
  );
}
