import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#141414] text-white rounded-t-[24px] mt-20 px-6 sm:px-12 py-12 md:py-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white text-[#141414] app-icon-squircle flex items-center justify-center font-bold text-xs">
              HD
            </div>
            <span className="font-bold text-xl tracking-tight">HelpDesk LK.</span>
          </div>
          <p className="text-xs text-[#adadad] max-w-md leading-relaxed">
            AI-driven local repair matching for Sri Lanka. Multilingual intake, transparent scoring, and provider-confirmed bookings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-xs text-[#adadad]">
          <Link href="/about" className="hover:text-white transition-colors">
            How matching works
          </Link>
          <Link href="/about#ai" className="hover:text-white transition-colors">
            AI Guardrails & Limits
          </Link>
          <Link href="/provider" className="hover:text-white transition-colors">
            Demo Provider Mode
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[11px] text-[#707070]">
        <p>
          Prototype for a hackathon. Providers are fictional sample profiles. No identity or licence checks have been performed. No payments.
        </p>
        <p className="shrink-0">
          Open source (MIT). Built with Google Gemini & Supabase.
        </p>
      </div>
    </footer>
  );
}
