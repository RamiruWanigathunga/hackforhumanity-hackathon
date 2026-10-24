import { Suspense } from "react";
import { cookies } from "next/headers";
import { HeaderClient } from "@/components/HeaderClient";

async function HeaderAsync() {
  const cookieStore = await cookies();
  const demoProviderId = cookieStore.get("demo_provider_id")?.value;
  const recentBookingsRaw = cookieStore.get("resident_bookings")?.value;
  let bookingCount = 0;
  if (recentBookingsRaw) {
    try {
      bookingCount = JSON.parse(recentBookingsRaw).length;
    } catch {
      bookingCount = 0;
    }
  }

  return (
    <HeaderClient
      initialBookingCount={bookingCount}
      initialDemoProviderId={demoProviderId}
    />
  );
}

export default function Header() {
  return (
    <Suspense fallback={<HeaderClient initialBookingCount={0} />}>
      <HeaderAsync />
    </Suspense>
  );
}
