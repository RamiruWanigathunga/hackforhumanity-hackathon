import Link from "next/link";
import { cookies } from "next/headers";

export default async function Header() {
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
    <header className="sticky top-5 z-40 w-full px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-[#f3f3f3] rounded-full px-5 py-2.5 flex items-center justify-between border border-[#e0e0e0]">
        {/* Logomark + Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 bg-[#141414] text-white app-icon-squircle flex items-center justify-center font-bold text-xs tracking-tight">
            HD
          </div>
          <span className="font-semibold text-sm sm:text-base tracking-tight text-[#141414] group-hover:text-black">
            HelpDesk LK.
          </span>
        </Link>

        {/* Navigation links & CTA */}
        <nav className="flex items-center gap-1.5 sm:gap-3 text-xs font-semibold">
          <Link
            href="/"
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full text-[#141414] hover:bg-white transition-colors"
          >
            Resident
          </Link>
          <Link
            href="/about"
            className="hidden sm:inline-flex text-[#707070] hover:text-[#141414] px-3 py-1.5 rounded-full transition-colors"
          >
            About
          </Link>
          {bookingCount > 0 && (
            <Link
              href="/bookings"
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-white text-[#141414] border border-[#e0e0e0] gap-1"
            >
              Bookings <span className="text-[10px] bg-[#141414] text-white rounded-full px-1.5">{bookingCount}</span>
            </Link>
          )}

          {/* Provider CTA pill */}
          <Link
            href={demoProviderId ? "/provider/inbox" : "/provider"}
            className="px-4 py-1.5 rounded-full bg-[#141414] text-white hover:bg-[#262626] transition-colors"
          >
            {demoProviderId ? "Provider Inbox ●" : "Provider Mode"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
