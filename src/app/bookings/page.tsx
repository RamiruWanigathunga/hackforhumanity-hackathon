import { cookies } from "next/headers";
import Link from "next/link";
import { getRecentResidentBookings, getProviderById } from "@/server/db/queries";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function ResidentBookingsPage() {
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

  let bookingsList: any[] = [];
  try {
    if (bookingIds.length > 0) {
      bookingsList = await getRecentResidentBookings(bookingIds);
    }
  } catch (err) {
    console.error("Failed to fetch resident bookings:", err);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4 sm:py-6">
      {/* Page Header */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider block">
          Resident Portal
        </span>
        <h1 className="heading-2 text-[#141414]">
          Your service booking requests.
        </h1>
        <p className="subtitle-lead text-sm sm:text-base">
          Track status updates, review technician confirmations, and access contact details for confirmed appointments.
        </p>
      </div>

      {bookingsList.length > 0 ? (
        <div className="space-y-4">
          {bookingsList.map((booking) => {
            const isAccepted = booking.status === "accepted";
            const isCompleted = booking.status === "completed";
            const isProposal = booking.status === "alternative_proposed";
            const isCancelled = booking.status === "cancelled" || booking.status === "declined";

            let statusVariant: "neutral" | "commercial" | "hazard" | "sample" | "success" = "neutral";
            let statusText = "Requested (Waiting for provider)";

            if (isAccepted) {
              statusVariant = "success";
              statusText = "Confirmed by technician";
            } else if (isProposal) {
              statusVariant = "commercial";
              statusText = "Alternative time proposed";
            } else if (isCompleted) {
              statusVariant = "neutral";
              statusText = "Completed";
            } else if (isCancelled) {
              statusVariant = "hazard";
              statusText = booking.status === "cancelled" ? "Cancelled" : "Declined by technician";
            }

            return (
              <div
                key={booking.id}
                className="bg-white rounded-[24px] border border-[#f0f0f0] p-6 sm:p-7 space-y-4 hover:border-[#141414] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs text-[#707070] font-mono block">
                      Ref: {booking.id}
                    </span>
                    <h3 className="font-bold text-base text-[#141414]">
                      Service Request
                    </h3>
                  </div>
                  <Badge variant={statusVariant} size="sm">
                    {statusText}
                  </Badge>
                </div>

                <div className="pt-2 border-t border-[#f0f0f0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="text-xs text-[#707070]">
                    Submitted {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                  <Link href={`/bookings/${booking.id}`}>
                    <Button variant="primary" size="sm">
                      View Live Booking Status →
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-[24px] border border-[#f0f0f0] p-10 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#f3f3f3] text-[#141414] flex items-center justify-center mx-auto text-2xl font-bold">
            📋
          </div>
          <h3 className="heading-4 text-[#141414]">No booking requests found.</h3>
          <p className="text-xs sm:text-sm text-[#707070] max-w-md mx-auto leading-relaxed">
            You haven&apos;t submitted any repair requests from this browser yet. Use our natural language search to find a local specialist.
          </p>
          <div className="pt-2">
            <Link href="/">
              <Button variant="primary" size="md">
                Find Local Technician →
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
