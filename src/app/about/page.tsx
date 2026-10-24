import { SCORING_WEIGHTS } from "@/config/scoring";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 py-6 sm:py-8">
      {/* Intro */}
      <div className="space-y-3">
        <Badge variant="neutral" size="sm">
          About HelpDesk LK
        </Badge>
        <h1 className="heading-1 text-[#141414]">
          AI local service matching for Sri Lanka.
        </h1>
        <p className="subtitle-lead leading-relaxed">
          Residents describe problems in their own everyday words (English, Sinhala, Tamil, or Singlish). AI turns it into an editable job ticket, transparent database logic ranks real local technicians, and providers confirm appointments before bookings take place.
        </p>
      </div>

      {/* 4 Steps */}
      <div className="space-y-5">
        <h2 className="heading-3 text-[#141414]">How the platform works.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-white rounded-[24px] border border-[#f0f0f0] p-6 space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center font-bold text-xs">
              1
            </span>
            <h3 className="font-bold text-sm text-[#141414]">Describe Naturally</h3>
            <p className="text-[#707070] leading-relaxed">
              No need to know trade jargon. Type your problem in English, Sinhala, Tamil, or Singlish.
            </p>
          </div>

          <div className="bg-white rounded-[24px] border border-[#f0f0f0] p-6 space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center font-bold text-xs">
              2
            </span>
            <h3 className="font-bold text-sm text-[#141414]">Review & Edit</h3>
            <p className="text-[#707070] leading-relaxed">
              AI structures the issue into category, tags, urgency, and area. You inspect and adjust every field.
            </p>
          </div>

          <div className="bg-white rounded-[24px] border border-[#f0f0f0] p-6 space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center font-bold text-xs">
              3
            </span>
            <h3 className="font-bold text-sm text-[#141414]">Explainable Matching</h3>
            <p className="text-[#707070] leading-relaxed">
              Pure deterministic scoring matches technicians based on service fit, availability, proximity, and language.
            </p>
          </div>

          <div className="bg-white rounded-[24px] border border-[#f0f0f0] p-6 space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center font-bold text-xs">
              4
            </span>
            <h3 className="font-bold text-sm text-[#141414]">Confirmed Booking</h3>
            <p className="text-[#707070] leading-relaxed">
              Technicians accept, propose another slot, or decline. Contacts are unlocked only once confirmed.
            </p>
          </div>
        </div>
      </div>

      {/* Matching Weights Table */}
      <div id="matching" className="space-y-4 pt-6 border-t border-[#f0f0f0]">
        <h2 className="heading-3 text-[#141414]">
          Deterministic ranking formula.
        </h2>
        <p className="subtitle-lead text-xs sm:text-sm">
          Artificial Intelligence does not pick or rank providers. Providers are scored strictly using verifiable database records:
        </p>

        <div className="overflow-hidden rounded-[24px] border border-[#e0e0e0] bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f3f3f3] text-[#141414] font-semibold">
              <tr>
                <th className="p-4">Component</th>
                <th className="p-4">Weight</th>
                <th className="p-4">Evaluation Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0] text-[#262626]">
              <tr>
                <td className="p-4 font-bold">Service Fit</td>
                <td className="p-4 font-mono">{SCORING_WEIGHTS.service} pts</td>
                <td className="p-4">0.6 baseline for category match + 0.4 proportional to specific problem tag overlap.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Availability</td>
                <td className="p-4 font-mono">{SCORING_WEIGHTS.availability} pts</td>
                <td className="p-4">1.0 for exact date & window; 0.7 for same date different window; 0.4 for ±1 day; 0.2 within 3 days.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Area Proximity</td>
                <td className="p-4 font-mono">{SCORING_WEIGHTS.area} pts</td>
                <td className="p-4">1.0 if area served directly; 0.5 if adjacent neighboring area in pilot cluster.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Rating</td>
                <td className="p-4 font-mono">{SCORING_WEIGHTS.rating} pts</td>
                <td className="p-4">Historical user rating normalized from 3.0 to 5.0 scale (all demo profiles).</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Language Fit</td>
                <td className="p-4 font-mono">{SCORING_WEIGHTS.language} pts</td>
                <td className="p-4">1.0 if technician speaks the resident&apos;s detected native language (Sinhala, Tamil, or English).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Guardrails & Limitations */}
      <div id="ai" className="space-y-4 pt-6 border-t border-[#f0f0f0]">
        <h2 className="heading-3 text-[#141414]">
          AI guardrails and transparency.
        </h2>
        <ul className="space-y-2.5 text-xs text-[#525252] leading-relaxed list-disc list-inside">
          <li><strong>No Hallucinated Technicians:</strong> The AI intake schema has no fields for provider names, ratings, or prices. Providers come purely from the database.</li>
          <li><strong>User Confirmation Gate:</strong> Matching never executes on raw AI guesses; the resident must explicitly review and confirm the ticket first.</li>
          <li><strong>Hazard Detection:</strong> Gas leaks, sparks, burning odor, and live electrical faults trigger automatic safety warnings and high urgency classification.</li>
          <li><strong>No Repair Instructions:</strong> The system prompt strictly prohibits offering amateur repair advice to prevent personal injury.</li>
          <li><strong>Multilingual Heuristic Fallback:</strong> If the AI service is unreachable or times out, a deterministic rule-based parser continues powering the application seamlessly.</li>
        </ul>
      </div>

      {/* Hackathon Disclaimer */}
      <div className="bg-[#f3f3f3] rounded-[24px] p-6 sm:p-8 space-y-3 border border-[#e0e0e0]">
        <Badge variant="sample" size="sm">
          Hackathon Prototype Notice
        </Badge>
        <p className="text-xs text-[#525252] leading-relaxed">
          HelpDesk LK was developed for Hack for Humanity (Hacktoberfest Hack Day Colombo). All provider profiles and reviews are fictional sample data for demonstration. No identity checks or licensing verifications have been conducted, and no real monetary transactions take place.
        </p>
        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="md">
              Try the Demo Now →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
