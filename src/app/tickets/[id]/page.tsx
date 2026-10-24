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
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider">
          Step 2 of 4 · Ticket Review
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141414]">
          Review & Confirm Job Ticket
        </h1>
        <p className="text-xs sm:text-sm text-[#707070]">
          Ensure the details match your needs. You can change any field before searching for local providers.
        </p>
      </div>

      <TicketReviewForm ticket={ticket} />
    </div>
  );
}
