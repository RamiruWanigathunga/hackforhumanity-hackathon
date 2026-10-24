import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getProviderById, getProviderInbox, getProviderAvailableSlots } from "@/server/db/queries";
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
  const freeSlots = await getProviderAvailableSlots(providerId);

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
