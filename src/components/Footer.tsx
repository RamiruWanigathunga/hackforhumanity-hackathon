import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#141414] text-white rounded-t-[28px] mt-24 px-6 sm:px-12 py-14 md:py-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white text-[#141414] app-icon-squircle flex items-center justify-center font-bold text-xs">
                HD
              </div>
              <span className="font-bold text-xl tracking-tight">HelpDesk<span className="text-[#707070]">.lk</span></span>
            </div>
            <p className="text-xs text-[#adadad] max-w-sm leading-relaxed">
              AI-driven local trade and repair matching engineered for Sri Lanka. Multilingual problem intake in English, Sinhala, Tamil, and Singlish with 100% transparent, explainable provider scoring.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-[#adadad]">
              <span className="bg-[#262626] px-3 py-1 rounded-full">Pilot: Nugegoda & Mirihana</span>
              <span className="bg-[#262626] px-3 py-1 rounded-full">Zero Commission</span>
              <span className="bg-[#262626] px-3 py-1 rounded-full">No Upfront Payment</span>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              Popular Trades
            </span>
            <ul className="space-y-2 text-xs text-[#adadad]">
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">
                  Electricians (Wiring & Fans)
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">
                  Plumbers (Leaks & Drains)
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">
                  AC & Refrigeration
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">
                  Auto Mechanics & More
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              Transparency
            </span>
            <ul className="space-y-2 text-xs text-[#adadad]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  How Matching Works
                </Link>
              </li>
              <li>
                <Link href="/about#matching" className="hover:text-white transition-colors">
                  Deterministic Ranking Formula
                </Link>
              </li>
              <li>
                <Link href="/about#ai" className="hover:text-white transition-colors">
                  AI Guardrails & Safety
                </Link>
              </li>
              <li>
                <Link href="/provider" className="hover:text-white transition-colors">
                  Demo Provider Mode
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[11px] text-[#707070]">
          <p>
            Developed for Hack for Humanity. Providers and ratings are fictional sample data for demonstration. No payments or identity checks performed.
          </p>
          <p className="shrink-0">
            Open Source (MIT) · Powered by Google Gemini & PostgreSQL
          </p>
        </div>
      </div>
    </footer>
  );
}
