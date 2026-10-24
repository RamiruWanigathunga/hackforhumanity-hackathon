import { notFound } from "next/navigation";
import { getBookingWithDetails } from "@/server/db/queries";
import { StatusTimeline } from "@/components/StatusTimeline";
import { StatusPoller } from "@/components/StatusPoller";
import ResidentBookingActions from "./ResidentBookingActions";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const instant = false;

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

  const isAccepted = booking.status === "accepted";
  const isCompleted = booking.status === "completed";
  const isProposal = booking.status === "alternative_proposed";
  const isCancelled = booking.status === "cancelled";
  const isDeclined = booking.status === "declined";

  let statusHeadline = "Requested: Waiting for provider.";

  if (isAccepted) {
    statusHeadline = "Booking confirmed by technician.";
  } else if (isProposal) {
    statusHeadline = "Alternative time proposed by technician.";
  } else if (isCompleted) {
    statusHeadline = "Service marked as completed.";
  } else if (isCancelled) {
    statusHeadline = "Booking request cancelled.";
  } else if (isDeclined) {
    statusHeadline = "Request declined by technician.";
  }

  return (
    <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      {/* Real-time Poller auto-refreshes page every 5s while pending */}
      <StatusPoller currentStatus={booking.status} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-[#7c828a] uppercase tracking-wider block">
            Booking Reference / {booking.id}
          </span>
          <h1 className="display-md text-[#0a0b0d]">
            {statusHeadline}
          </h1>
        </div>
        <span className="text-xs font-semibold bg-[#eef0f3] text-[#0a0b0d] px-3.5 py-1.5 rounded-full border border-[#dee1e6]">
          {booking.status.replace(/_/g, " ").toUpperCase()}
        </span>
      </div>

      {/* Active Time Window Banner */}
      <div className="bg-white rounded-[24px] border border-[#dee1e6] p-6 sm:p-8 space-y-6 coinbase-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <span className="text-[#7c828a] block">Scheduled Appointment</span>
            <span className="font-semibold text-base text-[#0a0b0d] block mt-1">
              {slot?.date} / <span className="capitalize">{slot?.window}</span>
            </span>
          </div>

          {proposedSlot && isProposal && (
            <div className="bg-[#f7f7f7] p-4 rounded-[12px] border border-[#dee1e6]">
              <span className="text-[#0a0b0d] font-semibold block">Proposed Alternative</span>
              <span className="font-bold text-sm text-[#0052ff] block mt-0.5">
                {proposedSlot.date} / <span className="capitalize">{proposedSlot.window}</span>
              </span>
            </div>
          )}

          <div>
            <span className="text-[#7c828a] block">Assigned Technician</span>
            <span className="font-semibold text-sm text-[#0a0b0d] block mt-1">{provider?.displayName}</span>
            <span className="text-[11px] text-[#7c828a] block mt-0.5">
              Rating: {provider?.rating} (demo) / Base: {provider?.homeArea}
            </span>
          </div>

          <div>
            <span className="text-[#7c828a] block">Contact Phone</span>
            {isAccepted || isCompleted ? (
              <span className="number-display text-sm text-[#0a0b0d] bg-[#eef0f3] px-3 py-1 rounded-full inline-block mt-1">
                {provider?.phoneMasked} (Revealed)
              </span>
            ) : (
              <span className="text-xs text-[#7c828a] italic block mt-1">
                Masked until confirmed by technician
              </span>
            )}
          </div>
        </div>

        {/* Resident Actions */}
        <ResidentBookingActions
          bookingId={booking.id}
          status={booking.status}
          hasRating={booking.residentRating}
        />
      </div>

      {/* Structured Ticket Details */}
      {ticket && (
        <div className="bg-[#f7f7f7] rounded-[24px] border border-[#dee1e6] p-6 sm:p-7 space-y-3 text-xs">
          <span className="font-semibold text-[#0a0b0d] uppercase tracking-wider block">
            Job Details
          </span>
          <p className="text-sm font-semibold text-[#0a0b0d]">{ticket.summary}</p>
          <div className="flex flex-wrap gap-2 pt-1 text-[#5b616e]">
            <span className="bg-white px-3 py-1 rounded-full border border-[#dee1e6]">
              Trade: {ticket.category.replace(/_/g, " ")}
            </span>
            <span className="bg-white px-3 py-1 rounded-full border border-[#dee1e6]">
              Area: {ticket.area}
            </span>
            <span className="bg-white px-3 py-1 rounded-full border border-[#dee1e6]">
              Urgency: {ticket.urgency}
            </span>
          </div>
        </div>
      )}

      {/* Live Timeline */}
      <div className="bg-white rounded-[24px] border border-[#dee1e6] p-6 sm:p-8 space-y-4 coinbase-card">
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
          <Button variant="outline" size="sm">
            Submit Another Repair Request
          </Button>
        </Link>
      </div>
    </div>
  );
}
