import { notFound } from "next/navigation";
import { getTicket } from "@/server/db/queries";
import TicketReviewForm from "./TicketReviewForm";


export default async function TicketReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = await getTicket(id);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4 sm:py-6">
      <div className="space-y-2">
        <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider block">
          Step 2 of 4 · Ticket Review
        </span>
        <h1 className="heading-2 text-[#141414]">
          Review and confirm your job ticket.
        </h1>
        <p className="subtitle-lead text-sm sm:text-base">
          Verify the problem details below. Every field is editable before we search for local technicians.
        </p>
      </div>

      <TicketReviewForm ticket={ticket} />
    </div>
  );
}
