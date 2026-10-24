import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#dee1e6] h-16 flex items-center">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Wordmark with Coinbase Blue Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Logo size={28} />
            <span className="font-semibold text-lg tracking-tight text-[#0a0b0d]">
              HelpDesk<span className="text-[#0052ff]">.lk</span>
            </span>
          </Link>

          {/* Primary Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5b616e]">
            <Link href="/" className="hover:text-[#0a0b0d] transition-colors">
              Find Services
            </Link>
            <Link href="/#categories" className="hover:text-[#0a0b0d] transition-colors">
              Directory
            </Link>
            <Link href="/about" className="hover:text-[#0a0b0d] transition-colors">
              How It Works
            </Link>
            <Link href="/about#matching" className="hover:text-[#0a0b0d] transition-colors">
              Scoring Model
            </Link>
          </nav>
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-3">
          {bookingCount > 0 && (
            <Link
              href="/bookings"
              className="text-xs font-medium text-[#0a0b0d] bg-[#eef0f3] hover:bg-[#dee1e6] px-3.5 py-1.5 rounded-full transition-colors"
            >
              Bookings ({bookingCount})
            </Link>
          )}

          <Link
            href={demoProviderId ? "/provider/inbox" : "/provider"}
            className="text-xs font-medium text-[#5b616e] hover:text-[#0a0b0d] px-3 py-1.5 rounded-full transition-colors hidden sm:inline-block"
          >
            {demoProviderId ? "Provider Inbox" : "Provider Portal"}
          </Link>

          <Link href="/#search-intake-bar">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
