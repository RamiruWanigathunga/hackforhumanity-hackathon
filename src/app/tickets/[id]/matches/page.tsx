import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getTicket, getActiveProvidersWithSlots } from "@/server/db/queries";
import { rankProviders } from "@/server/matching/match";
import MatchesList from "./MatchesList";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function MatchesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = await getTicket(id);

  if (!ticket) {
    notFound();
  }

  // Guard: User must confirm ticket before viewing matches (Honesty Rule H5)
  if (ticket.status === "draft") {
    redirect(`/tickets/${ticket.id}`);
  }

  const providersWithSlots = await getActiveProvidersWithSlots(2);
  const { matches, emptyReason } = rankProviders(ticket, providersWithSlots);

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider">
            Step 3 of 4 · Matching
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141414]">
            Recommended Local Technicians
          </h1>
        </div>
        <Link href={`/tickets/${ticket.id}`}>
          <Button variant="outline" size="sm">
            ← Edit Ticket
          </Button>
        </Link>
      </div>

      {/* Ticket Summary Strip */}
      <div className="bg-[#f3f3f3] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs border border-[#e0e0e0]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#141414] capitalize">
              {ticket.category.replace(/_/g, " ")} Issue
            </span>
            <Badge variant="neutral" size="sm">
              {ticket.area || "Area not set"}
            </Badge>
            <Badge variant="neutral" size="sm">
              {ticket.preferredDate || "Anytime"} ({ticket.preferredWindow})
            </Badge>
          </div>
          <p className="text-[#525252] font-medium">{ticket.summary}</p>
        </div>
      </div>

      {/* Matches List or Empty State */}
      {matches.length > 0 ? (
        <MatchesList ticketId={ticket.id} matches={matches} />
      ) : (
        <div className="bg-white rounded-2xl border border-[#f0f0f0] p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#f3f3f3] text-[#141414] flex items-center justify-center mx-auto text-lg font-bold">
            🔍
          </div>
          <h3 className="font-bold text-lg text-[#141414]">No exact provider matches found</h3>
          <p className="text-xs sm:text-sm text-[#707070] max-w-md mx-auto leading-relaxed">
            {emptyReason}
          </p>
          <div className="pt-2">
            <Link href={`/tickets/${ticket.id}`}>
              <Button variant="primary" size="md">
                Widen Area or Change Date
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Footnote */}
      <div className="text-[11px] text-[#707070] text-center sm:text-left space-y-1 pt-4 border-t border-[#f0f0f0]">
        <p>
          Ranking is deterministically calculated from service fit (40%), availability (25%), area proximity (20%), rating (10%), and language (5%).
        </p>
        <p>
          AI does not select or prioritize providers. All ratings and credentials shown are fictional sample profiles for this demonstration.{" "}
          <Link href="/about#matching" className="text-[#0066ff] underline">
            Learn more about the ranking formula.
          </Link>
        </p>
      </div>
    </div>
  );
}
