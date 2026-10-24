import { notFound } from "next/navigation";
import { getTicket } from "@/server/db/queries";
import TicketReviewForm from "./TicketReviewForm";

export const instant = false;

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
    <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold text-[#7c828a] uppercase tracking-wider block">
          Step 2 of 4 / Ticket Review
        </span>
        <h1 className="display-md text-[#0a0b0d]">
          Review and verify your job ticket.
        </h1>
        <p className="body-md text-[#5b616e]">
          Verify the problem details below. Every field is editable before deterministic matching queries local technicians.
        </p>
      </div>

      <TicketReviewForm ticket={ticket} />
    </div>
  );
}
