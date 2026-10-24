import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getTicket, getActiveProvidersWithSlots } from "@/server/db/queries";
import { rankProviders } from "@/server/matching/match";
import MatchesList from "./MatchesList";
import { Button } from "@/components/ui/Button";

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

  if (ticket.status === "draft") {
    redirect(`/tickets/${ticket.id}`);
  }

  const providersWithSlots = await getActiveProvidersWithSlots(2);
  const { matches, emptyReason } = rankProviders(ticket, providersWithSlots);

  return (
    <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-[#7c828a] uppercase tracking-wider block">
            Step 3 of 4 / Matching
          </span>
          <h1 className="display-md text-[#0a0b0d]">
            Recommended local technicians in your area.
          </h1>
          <p className="body-md text-[#5b616e]">
            Ranked deterministically by category fit, area proximity, slot availability, and native language.
          </p>
        </div>
        <Link href={`/tickets/${ticket.id}`} className="shrink-0">
          <Button variant="outline" size="sm">
            Edit Ticket
          </Button>
        </Link>
      </div>

      {/* Ticket Summary Strip */}
      <div className="bg-[#f7f7f7] rounded-[24px] p-6 flex flex-wrap items-center justify-between gap-3 text-xs border border-[#dee1e6]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap text-[#0a0b0d]">
            <span className="font-bold text-sm capitalize">
              {ticket.category.replace(/_/g, " ")} Issue
            </span>
            <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#dee1e6] font-medium text-xs">
              {ticket.area || "Area not set"}
            </span>
            <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#dee1e6] font-medium text-xs">
              {ticket.preferredDate || "Anytime"} ({ticket.preferredWindow})
            </span>
          </div>
          <p className="text-[#5b616e] font-medium">{ticket.summary}</p>
        </div>
      </div>

      {/* Matches List or Empty State */}
      {matches.length > 0 ? (
        <MatchesList ticketId={ticket.id} matches={matches} />
      ) : (
        <div className="bg-white rounded-[24px] border border-[#dee1e6] p-10 text-center space-y-4">
          <h3 className="title-md text-[#0a0b0d]">No exact provider matches found.</h3>
          <p className="body-sm text-[#5b616e] max-w-md mx-auto leading-relaxed">
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
      <div className="text-[11px] text-[#7c828a] text-center sm:text-left space-y-1.5 pt-6 border-t border-[#dee1e6]">
        <p>
          Ranking is deterministically calculated from service fit (40%), availability (25%), area proximity (20%), rating (10%), and language (5%).
        </p>
        <p>
          AI does not select or prioritize providers. All ratings and credentials shown are fictional sample profiles for this demonstration.{" "}
          <Link href="/about#matching" className="text-[#0052ff] underline">
            Learn more about the ranking formula.
          </Link>
        </p>
      </div>
    </div>
  );
}
