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

  let statusHeadline = "Requested: Waiting for provider.";
  let statusBadgeVariant: "neutral" | "commercial" | "hazard" | "sample" | "success" = "neutral";

  if (isAccepted) {
    statusHeadline = "Booking confirmed by technician.";
    statusBadgeVariant = "success";
  } else if (isProposal) {
    statusHeadline = "Alternative time proposed by technician.";
    statusBadgeVariant = "commercial";
  } else if (isCompleted) {
    statusHeadline = "Service marked as completed.";
    statusBadgeVariant = "neutral";
  } else if (isCancelled) {
    statusHeadline = "Booking request cancelled.";
    statusBadgeVariant = "hazard";
  } else if (isDeclined) {
    statusHeadline = "Request declined by technician.";
    statusBadgeVariant = "hazard";
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4 sm:py-6">
      {/* Real-time Poller auto-refreshes page every 5s while pending */}
      <StatusPoller currentStatus={booking.status} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider block">
            Booking Reference · {booking.id}
          </span>
          <h1 className="heading-2 text-[#141414]">
            {statusHeadline}
          </h1>
        </div>
        <Badge variant={statusBadgeVariant} size="md">
          {booking.status.replace(/_/g, " ").toUpperCase()}
        </Badge>
      </div>

      {/* Active Time Window Banner (24px radius, 1px hairline border) */}
      <div className="bg-white rounded-[24px] border border-[#f0f0f0] p-6 sm:p-7 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <span className="text-[#707070] block">Scheduled Appointment</span>
            <span className="font-bold text-base text-[#141414]">
              {slot?.date} · <span className="capitalize">{slot?.window}</span>
            </span>
          </div>

          {proposedSlot && isProposal && (
            <div className="bg-[#f3f3f3] p-4 rounded-[16px] border border-[#e0e0e0]">
              <span className="text-[#141414] font-semibold block">Proposed Alternative</span>
              <span className="font-bold text-sm text-[#141414]">
                {proposedSlot.date} · <span className="capitalize">{proposedSlot.window}</span>
              </span>
            </div>
          )}

          <div>
            <span className="text-[#707070] block">Assigned Technician</span>
            <span className="font-bold text-sm text-[#141414]">{provider?.displayName}</span>
            <span className="text-[11px] text-[#707070] block">
              ★ {provider?.rating} (demo) · Base: {provider?.homeArea}
            </span>
          </div>

          <div>
            <span className="text-[#707070] block">Contact Phone</span>
            {/* Honesty Rule H6/H10: Phone shown only after acceptance */}
            {isAccepted || isCompleted ? (
              <span className="font-mono font-bold text-sm text-[#141414] bg-[#f3f3f3] px-3 py-1 rounded-full inline-block mt-0.5">
                {provider?.phoneMasked} (Revealed)
              </span>
            ) : (
              <span className="text-xs text-[#707070] italic block mt-0.5">
                Masked until confirmed by technician
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

      {/* Structured Ticket Details */}
      {ticket && (
        <div className="bg-[#f3f3f3] rounded-[24px] p-6 space-y-3 text-xs">
          <span className="font-bold text-[#141414] uppercase tracking-wider block">
            Job Details
          </span>
          <p className="text-sm font-semibold text-[#141414]">{ticket.summary}</p>
          <div className="flex flex-wrap gap-2 pt-1">
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
      <div className="bg-white rounded-[24px] border border-[#f0f0f0] p-6 sm:p-7 space-y-3">
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
