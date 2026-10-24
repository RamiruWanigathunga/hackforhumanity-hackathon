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
    <header className="sticky top-4 z-40 w-full px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-[#f3f3f3]/95 backdrop-blur-md rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between border border-[#e0e0e0]">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-[#141414] text-white rounded-full flex items-center justify-center font-bold text-xs tracking-wider">
            HD
          </div>
          <span className="font-semibold text-sm sm:text-base tracking-tight text-[#141414] group-hover:text-black">
            HelpDesk LK
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4 text-xs font-medium">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-full text-[#141414] hover:bg-white transition-colors"
          >
            Resident
          </Link>
          <Link
            href="/provider"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              demoProviderId
                ? "bg-[#141414] text-white"
                : "text-[#707070] hover:text-[#141414] hover:bg-white"
            }`}
          >
            Provider {demoProviderId ? "●" : ""}
          </Link>

          {bookingCount > 0 && (
            <Link
              href="/bookings"
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-white text-[#141414] border border-[#e0e0e0] gap-1"
            >
              Bookings <span className="text-[10px] bg-[#141414] text-white rounded-full px-1.5">{bookingCount}</span>
            </Link>
          )}

          <Link
            href="/about"
            className="text-[#707070] hover:text-[#141414] px-2 py-1.5 rounded-full transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
