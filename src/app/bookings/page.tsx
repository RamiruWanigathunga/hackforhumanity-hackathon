import { Suspense } from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { getRecentResidentBookings } from "@/server/db/queries";
import { Button } from "@/components/ui/Button";
import { Booking } from "@/server/db/schema";

async function ResidentBookingsContent() {
  const cookieStore = await cookies();
  const recentBookingsRaw = cookieStore.get("resident_bookings")?.value;
  let bookingIds: string[] = [];

  if (recentBookingsRaw) {
    try {
      bookingIds = JSON.parse(recentBookingsRaw);
    } catch {
      bookingIds = [];
    }
  }

  let bookingsList: Booking[] = [];
  try {
    if (bookingIds.length > 0) {
      bookingsList = await getRecentResidentBookings(bookingIds);
    }
  } catch (err) {
    console.error("Failed to fetch resident bookings:", err);
  }

  if (bookingsList.length === 0) {
    return (
      <div className="bg-white rounded-[24px] border border-[#dee1e6] p-12 text-center space-y-4 coinbase-card">
        <h3 className="title-md text-[#0a0b0d]">No booking requests found.</h3>
        <p className="body-sm text-[#5b616e] max-w-md mx-auto leading-relaxed">
          You have not submitted any repair requests from this browser yet. Use our natural language search to find a local specialist.
        </p>
        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="md">
              Find Local Technician
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookingsList.map((booking) => {
        const isAccepted = booking.status === "accepted";
        const isCompleted = booking.status === "completed";
        const isProposal = booking.status === "alternative_proposed";
        const isCancelled = booking.status === "cancelled" || booking.status === "declined";

        let statusText = "Requested (Waiting for provider)";

        if (isAccepted) {
          statusText = "Confirmed by technician";
        } else if (isProposal) {
          statusText = "Alternative time proposed";
        } else if (isCompleted) {
          statusText = "Completed";
        } else if (isCancelled) {
          statusText = booking.status === "cancelled" ? "Cancelled" : "Declined by technician";
        }

        return (
          <div
            key={booking.id}
            className="coinbase-card bg-white rounded-[24px] border border-[#dee1e6] p-6 sm:p-7 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs text-[#7c828a] font-mono block">
                  Ref: {booking.id}
                </span>
                <h3 className="title-md text-[#0a0b0d]">
                  Service Request
                </h3>
              </div>
              <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#f7f7f7] text-[#0a0b0d] border border-[#dee1e6]">
                {statusText}
              </span>
            </div>

            <div className="pt-3 border-t border-[#dee1e6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs text-[#7c828a]">
                Submitted {new Date(booking.createdAt).toLocaleDateString()}
              </span>
              <Link href={`/bookings/${booking.id}`}>
                <Button variant="primary" size="sm">
                  View Live Booking Status
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ResidentBookingsPage() {
  return (
    <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-[#7c828a] uppercase tracking-wider block">
          Resident Portal
        </span>
        <h1 className="display-md text-[#0a0b0d]">
          Your service booking requests.
        </h1>
        <p className="body-md text-[#5b616e]">
          Track status updates, review technician confirmations, and access contact details for confirmed appointments.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="bg-white rounded-[24px] border border-[#dee1e6] p-12 text-center text-sm text-[#7c828a] coinbase-card">
            Loading your bookings...
          </div>
        }
      >
        <ResidentBookingsContent />
      </Suspense>
    </div>
  );
}
