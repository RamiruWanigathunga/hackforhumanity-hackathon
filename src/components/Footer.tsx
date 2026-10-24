import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Footer() {
  return (
    <div className="w-full mt-24">
      {/* Signature Coinbase CTA Band Dark */}
      <section className="w-full bg-[#0a0b0d] text-white py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-wider text-[#a8acb3] font-medium block">
            Institutional Verification
          </span>
          <h2 className="display-lg text-white max-w-2xl mx-auto">
            Transparent local trade matching for Sri Lanka.
          </h2>
          <p className="body-md text-[#a8acb3] max-w-xl mx-auto">
            Describe repair issues in everyday Sinhala, Tamil, Singlish, or English. Deterministic database rankings connect you directly to local technicians.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link href="/#search-intake-bar">
              <Button variant="primary" size="lg">
                Find Local Technician
              </Button>
            </Link>
            <Link href="/provider">
              <Button variant="outline-dark" size="lg">
                Provider Registration
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Coinbase Footer Light */}
      <footer className="w-full bg-white border-t border-[#dee1e6] py-16 px-4 sm:px-6 text-sm text-[#5b616e]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12">
          {/* Col 1: Brand */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#0052ff] flex items-center justify-center text-white text-xs font-bold">
                H
              </div>
              <span className="font-semibold text-base text-[#0a0b0d]">HelpDesk.lk</span>
            </div>
            <p className="body-sm text-[#7c828a] max-w-xs leading-relaxed">
              Institutional local service coordination platform. Multilingual AI problem intake with explainable open scoring weights.
            </p>
            <div className="text-xs text-[#7c828a] pt-2">
              Colombo Pilot Cluster : Nugegoda, Mirihana, Kirulapone
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#0a0b0d] uppercase tracking-wider block">
              Services
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#categories" className="hover:text-[#0052ff] transition-colors">
                  Electrical Repair
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-[#0052ff] transition-colors">
                  Plumbing Services
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-[#0052ff] transition-colors">
                  AC and Appliances
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-[#0052ff] transition-colors">
                  Automotive Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Technology */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#0a0b0d] uppercase tracking-wider block">
              Technology
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#0052ff] transition-colors">
                  Multilingual AI Intake
                </Link>
              </li>
              <li>
                <Link href="/about#matching" className="hover:text-[#0052ff] transition-colors">
                  Deterministic Scoring
                </Link>
              </li>
              <li>
                <Link href="/about#ai" className="hover:text-[#0052ff] transition-colors">
                  Safety Guardrails
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0052ff] transition-colors">
                  Heuristic Fallback
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: For Providers */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#0a0b0d] uppercase tracking-wider block">
              Providers
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/provider" className="hover:text-[#0052ff] transition-colors">
                  Provider Portal
                </Link>
              </li>
              <li>
                <Link href="/provider" className="hover:text-[#0052ff] transition-colors">
                  Slot Calendar
                </Link>
              </li>
              <li>
                <Link href="/provider" className="hover:text-[#0052ff] transition-colors">
                  Lead Dispatch
                </Link>
              </li>
              <li>
                <Link href="/provider" className="hover:text-[#0052ff] transition-colors">
                  Sample Profiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Notice */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#0a0b0d] uppercase tracking-wider block">
              Governance
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#0052ff] transition-colors">
                  Hackathon Prototype
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0052ff] transition-colors">
                  No Monetary Fees
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0052ff] transition-colors">
                  Open Source License
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Band */}
        <div className="max-w-[1200px] mx-auto pt-8 border-t border-[#dee1e6] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-[#7c828a]">
          <p>
            Prototype developed for Hack for Humanity Colombo. All provider profiles are fictional sample data.
          </p>
          <p>
            Powered by Google Gemini and Supabase PostgreSQL.
          </p>
        </div>
      </footer>
    </div>
  );
}
