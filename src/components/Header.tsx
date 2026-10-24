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
    <header className="sticky top-4 sm:top-5 z-40 w-full px-4 sm:px-6">
      <div className="max-w-6xl mx-auto bg-[#f3f3f3] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between border border-[#e0e0e0]">
        {/* Brand Logomark + Wordmark */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-[#141414] text-white app-icon-squircle flex items-center justify-center font-bold text-xs tracking-tight">
              HD
            </div>
            <span className="font-bold text-sm sm:text-base tracking-tight text-[#141414] group-hover:text-black">
              HelpDesk<span className="text-[#707070]">.lk</span>
            </span>
          </Link>

          {/* Language Switcher Pill (similar to ondemand.lk screenshot, styled as Mobbin segmented pill) */}
          <div className="hidden md:flex items-center bg-white rounded-full p-0.5 border border-[#e0e0e0] text-[11px] font-semibold">
            <span className="px-2.5 py-0.5 rounded-full bg-[#141414] text-white">EN</span>
            <span className="px-2.5 py-0.5 text-[#707070] hover:text-[#141414] cursor-pointer">සිංහල</span>
            <span className="px-2.5 py-0.5 text-[#707070] hover:text-[#141414] cursor-pointer">தமிழ்</span>
          </div>
        </div>

        {/* Navigation links & Actions */}
        <nav className="flex items-center gap-1.5 sm:gap-3 text-xs font-semibold">
          <Link
            href="/"
            className="hidden sm:inline-flex px-3 py-1.5 rounded-full text-[#141414] hover:bg-white transition-colors"
          >
            Find Trades
          </Link>

          <Link
            href="/#categories"
            className="hidden md:inline-flex px-3 py-1.5 rounded-full text-[#707070] hover:text-[#141414] hover:bg-white transition-colors"
          >
            Categories
          </Link>

          <Link
            href="/about"
            className="hidden sm:inline-flex text-[#707070] hover:text-[#141414] px-3 py-1.5 rounded-full transition-colors"
          >
            How It Works
          </Link>

          {bookingCount > 0 && (
            <Link
              href="/bookings"
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-[#141414] border border-[#e0e0e0] gap-1 hover:border-[#141414] transition-colors"
            >
              Bookings <span className="text-[10px] bg-[#141414] text-white rounded-full px-1.5">{bookingCount}</span>
            </Link>
          )}

          {/* Become a Provider / Provider Mode CTA pill */}
          <Link
            href={demoProviderId ? "/provider/inbox" : "/provider"}
            className="px-4 py-2 rounded-full bg-[#141414] text-white hover:bg-[#262626] transition-colors text-xs font-semibold inline-flex items-center gap-1.5"
          >
            {demoProviderId ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Provider Inbox
              </>
            ) : (
              "Become a Provider"
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
