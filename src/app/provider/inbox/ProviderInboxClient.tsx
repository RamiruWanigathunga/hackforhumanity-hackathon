"use client";

import React, { useState, useTransition } from "react";
import { Booking, JobTicket, ProviderSlot, Provider } from "@/server/db/schema";
import { Button } from "@/components/ui/Button";
import { SafetyBanner } from "@/components/SafetyBanner";
import {
  providerAcceptAction,
  providerDeclineAction,
  providerProposeSlotAction,
  providerCompleteAction,
  clearDemoProviderAction,
} from "@/server/actions/provider";

export interface EnrichedBooking {
  booking: Booking;
  ticket: JobTicket;
  slot: ProviderSlot;
  proposedSlot: ProviderSlot | null | undefined;
}

export default function ProviderInboxClient({
  provider,
  inbox,
  availableSlots,
}: {
  provider: Provider;
  inbox: {
    newRequests: EnrichedBooking[];
    waitingOnResident: EnrichedBooking[];
    upcoming: EnrichedBooking[];
    past: EnrichedBooking[];
  };
  availableSlots: ProviderSlot[];
}) {
  const [activeTab, setActiveTab] = useState<"new" | "waiting" | "upcoming" | "past">("new");
  const [proposingBookingId, setProposingBookingId] = useState<string | null>(null);
  const [selectedProposalSlot, setSelectedProposalSlot] = useState<string>(
    availableSlots.length > 0 ? availableSlots[0].id : ""
  );
  const [isPending, startTransition] = useTransition();

  const handleAccept = (bookingId: string) => {
    startTransition(async () => {
      await providerAcceptAction(bookingId);
    });
  };

  const handleDecline = (bookingId: string) => {
    if (confirm("Decline this job request?")) {
      startTransition(async () => {
        await providerDeclineAction(bookingId);
      });
    }
  };

  const handlePropose = (bookingId: string) => {
    if (!selectedProposalSlot) return;
    startTransition(async () => {
      await providerProposeSlotAction(bookingId, selectedProposalSlot);
      setProposingBookingId(null);
    });
  };

  const handleComplete = (bookingId: string) => {
    startTransition(async () => {
      await providerCompleteAction(bookingId);
    });
  };

  const handleSwitchProvider = () => {
    startTransition(async () => {
      await clearDemoProviderAction();
    });
  };

  const currentList =
    activeTab === "new"
      ? inbox.newRequests
      : activeTab === "waiting"
      ? inbox.waitingOnResident
      : activeTab === "upcoming"
      ? inbox.upcoming
      : inbox.past;

  return (
    <div className="space-y-6">
      {/* Provider Identity Header Banner */}
      <div className="bg-[#0a0b0d] text-white rounded-[24px] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#05b169]" />
            <h2 className="title-md text-white">Active Identity: {provider.displayName}</h2>
            <span className="text-[11px] text-[#a8acb3] bg-white/10 px-2.5 py-0.5 rounded-full">
              Demo Identity
            </span>
          </div>
          <p className="text-xs text-[#a8acb3]">
            Categories: {provider.categories.join(", ")} / Home Base: {provider.homeArea} / Rating: {provider.rating} (demo)
          </p>
        </div>

        <Button
          type="button"
          variant="outline-dark"
          size="sm"
          onClick={handleSwitchProvider}
          className="shrink-0"
        >
          Switch Sample Provider
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#dee1e6] pb-3 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("new")}
          className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === "new"
              ? "bg-[#0052ff] text-white"
              : "text-[#5b616e] hover:text-[#0a0b0d] hover:bg-[#eef0f3]"
          }`}
        >
          New Requests ({inbox.newRequests.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("waiting")}
          className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === "waiting"
              ? "bg-[#0052ff] text-white"
              : "text-[#5b616e] hover:text-[#0a0b0d] hover:bg-[#eef0f3]"
          }`}
        >
          Waiting on Resident ({inbox.waitingOnResident.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === "upcoming"
              ? "bg-[#0052ff] text-white"
              : "text-[#5b616e] hover:text-[#0a0b0d] hover:bg-[#eef0f3]"
          }`}
        >
          Confirmed Upcoming ({inbox.upcoming.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === "past"
              ? "bg-[#0052ff] text-white"
              : "text-[#5b616e] hover:text-[#0a0b0d] hover:bg-[#eef0f3]"
          }`}
        >
          History and Completed ({inbox.past.length})
        </button>
      </div>

      {/* Booking List */}
      <div className="space-y-4">
        {currentList.length === 0 ? (
          <div className="bg-white rounded-[24px] border border-[#dee1e6] p-12 text-center space-y-2 coinbase-card">
            <h3 className="title-md text-[#0a0b0d]">No bookings in this tab</h3>
            <p className="body-sm text-[#5b616e]">
              New resident requests will automatically appear here within ~5 seconds.
            </p>
          </div>
        ) : (
          currentList.map(({ booking, ticket, slot, proposedSlot }) => (
            <div
              key={booking.id}
              className="coinbase-card bg-white rounded-[24px] border border-[#dee1e6] p-6 sm:p-7 space-y-5"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-[#7c828a]">{booking.id}</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#eef0f3] text-[#0a0b0d] border border-[#dee1e6]">
                      {booking.status.replace(/_/g, " ").toUpperCase()}
                    </span>
                    {ticket.residentName && (
                      <span className="text-xs text-[#0a0b0d] font-medium">
                        Resident: {ticket.residentName}
                      </span>
                    )}
                  </div>
                  <h3 className="title-md text-[#0a0b0d]">{ticket.summary}</h3>
                </div>

                <div className="text-right sm:text-right shrink-0">
                  <span className="text-xs text-[#7c828a] block">Scheduled Slot</span>
                  <span className="number-display text-sm text-[#0a0b0d]">
                    {slot.date} / <span className="capitalize">{slot.window}</span>
                  </span>
                </div>
              </div>

              {/* Hazard Banner */}
              {ticket.hazard && (
                <SafetyBanner hazardText="Hazard alert flagged by resident input (sparks, burning odor, or electrical danger). Exercise safety protocols on arrival." />
              )}

              {/* Structured Job Details Strip */}
              <div className="bg-[#f7f7f7] rounded-[16px] border border-[#dee1e6] p-4 space-y-2.5 text-xs text-[#0a0b0d]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-[#0a0b0d]">Structured Job Ticket:</span>
                  <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#dee1e6]">
                    Category: {ticket.category}
                  </span>
                  <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#dee1e6]">
                    Area: {ticket.area}
                  </span>
                  <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#dee1e6]">
                    Urgency: {ticket.urgency}
                  </span>
                  <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#dee1e6]">
                    Language: {ticket.detectedLanguage.toUpperCase()}
                  </span>
                </div>

                {ticket.tags && ticket.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 items-center pt-1">
                    <span className="text-[11px] text-[#7c828a]">Tags:</span>
                    {ticket.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 bg-white rounded-full text-[11px] border border-[#dee1e6] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-1 text-[11px] text-[#7c828a]">
                  Original Words: &quot;{ticket.rawText}&quot;
                </div>
              </div>

              {/* Proposal notification if waiting on resident */}
              {proposedSlot && booking.status === "alternative_proposed" && (
                <div className="bg-[#f7f7f7] p-4 rounded-[12px] border border-[#dee1e6] text-xs text-[#0a0b0d]">
                  You proposed an alternative slot on <strong>{proposedSlot.date} ({proposedSlot.window})</strong>. Waiting for resident response.
                </div>
              )}

              {/* Propose another slot inline drawer */}
              {proposingBookingId === booking.id && (
                <div className="bg-[#f7f7f7] border border-[#dee1e6] rounded-[16px] p-5 space-y-3">
                  <h4 className="text-xs font-bold text-[#0a0b0d]">
                    Select another available time to propose to resident:
                  </h4>
                  {availableSlots.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {availableSlots.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedProposalSlot(s.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                            selectedProposalSlot === s.id
                              ? "bg-[#0052ff] text-white border-[#0052ff]"
                              : "bg-white text-[#0a0b0d] border-[#dee1e6] hover:bg-[#eef0f3]"
                          }`}
                        >
                          {s.date} / <span className="capitalize">{s.window}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#7c828a]">No other free slots in the next 3 days.</p>
                  )}
                  <div className="flex gap-2 justify-end pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setProposingBookingId(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      loading={isPending}
                      disabled={!selectedProposalSlot}
                      onClick={() => handlePropose(booking.id)}
                    >
                      Send Proposal to Resident
                    </Button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-[#dee1e6]">
                {booking.status === "requested" && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      loading={isPending}
                      onClick={() => handleDecline(booking.id)}
                    >
                      Decline
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setProposingBookingId(booking.id)}
                    >
                      Propose Another Time
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      loading={isPending}
                      onClick={() => handleAccept(booking.id)}
                    >
                      Accept Booking
                    </Button>
                  </>
                )}

                {booking.status === "accepted" && (
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    loading={isPending}
                    onClick={() => handleComplete(booking.id)}
                  >
                    Mark Job Completed
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
