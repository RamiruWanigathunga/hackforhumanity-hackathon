import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getProviderById, getProviderInbox } from "@/server/db/queries";
import { db } from "@/server/db/client";
import { providerSlots } from "@/server/db/schema";
import { eq, and, gte } from "drizzle-orm";
import { getColomboToday } from "@/lib/time";
import { StatusPoller } from "@/components/StatusPoller";
import ProviderInboxClient from "./ProviderInboxClient";

export const instant = false;


export default async function ProviderInboxPage() {
  const cookieStore = await cookies();
  const providerId = cookieStore.get("demo_provider_id")?.value;

  if (!providerId) {
    redirect("/provider");
  }

  const provider = await getProviderById(providerId);
  if (!provider) {
    redirect("/provider");
  }

  const inbox = await getProviderInbox(providerId);

  // Available slots for this provider
  const today = getColomboToday();
  const freeSlots = await db
    .select()
    .from(providerSlots)
    .where(
      and(
        eq(providerSlots.providerId, providerId),
        gte(providerSlots.date, today),
        eq(providerSlots.status, "available")
      )
    );

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6">
      {/* Real-time poller refreshes inbox so new resident bookings appear automatically */}
      <StatusPoller currentStatus="requested" />

      <ProviderInboxClient
        provider={provider}
        inbox={inbox}
        availableSlots={freeSlots}
      />
    </div>
  );
}
