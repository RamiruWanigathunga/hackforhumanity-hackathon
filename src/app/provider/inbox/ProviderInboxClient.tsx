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
      <div className="bg-[#141414] text-white rounded-[24px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h2 className="text-lg font-bold tracking-tight">Active as: {provider.displayName}</h2>
            <span className="text-[11px] text-[#adadad] bg-white/10 px-2 py-0.5 rounded-full">
              Demo Identity
            </span>
          </div>
          <p className="text-xs text-[#adadad]">
            Categories: {provider.categories.join(", ")} / Home Base: {provider.homeArea} / Rating: {provider.rating} (demo)
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleSwitchProvider}
          className="bg-transparent text-white border-white/20 hover:bg-white/10 shrink-0"
        >
          Switch Sample Provider
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#f0f0f0] pb-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("new")}
          className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === "new"
              ? "bg-[#141414] text-white"
              : "text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]"
          }`}
        >
          New Requests ({inbox.newRequests.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("waiting")}
          className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === "waiting"
              ? "bg-[#141414] text-white"
              : "text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]"
          }`}
        >
          Waiting on Resident ({inbox.waitingOnResident.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === "upcoming"
              ? "bg-[#141414] text-white"
              : "text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]"
          }`}
        >
          Confirmed Upcoming ({inbox.upcoming.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === "past"
              ? "bg-[#141414] text-white"
              : "text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]"
          }`}
        >
          History and Completed ({inbox.past.length})
        </button>
      </div>

      {/* Booking List */}
      <div className="space-y-4">
        {currentList.length === 0 ? (
          <div className="bg-white rounded-[24px] border border-[#f0f0f0] p-10 text-center space-y-2">
            <h3 className="font-bold text-[#141414] text-sm">No bookings in this tab</h3>
            <p className="text-xs text-[#707070]">
              New resident requests will automatically appear here within ~5 seconds.
            </p>
          </div>
        ) : (
          currentList.map(({ booking, ticket, slot, proposedSlot }) => (
            <div
              key={booking.id}
              className="bg-white rounded-[24px] border border-[#f0f0f0] p-5 sm:p-6 space-y-4"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-[#707070]">{booking.id}</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0]">
                      {booking.status.replace(/_/g, " ").toUpperCase()}
                    </span>
                    {ticket.residentName && (
                      <span className="text-xs text-[#141414] font-medium">
                        Resident: {ticket.residentName}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#141414]">{ticket.summary}</h3>
                </div>

                <div className="text-right sm:text-right shrink-0">
                  <span className="text-xs text-[#707070] block">Scheduled Slot</span>
                  <span className="font-bold text-sm text-[#141414]">
                    {slot.date} / <span className="capitalize">{slot.window}</span>
                  </span>
                </div>
              </div>

              {/* Hazard Banner */}
              {ticket.hazard && (
                <SafetyBanner hazardText="Hazard alert flagged by resident input (sparks, burning odor, or electrical danger). Exercise safety protocols on arrival." />
              )}

              {/* Structured Job Details Strip */}
              <div className="bg-[#f3f3f3] rounded-[16px] p-4 space-y-2 text-xs text-[#262626]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-[#141414]">Structured Job Ticket:</span>
                  <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#e0e0e0]">
                    Category: {ticket.category}
                  </span>
                  <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#e0e0e0]">
                    Area: {ticket.area}
                  </span>
                  <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#e0e0e0]">
                    Urgency: {ticket.urgency}
                  </span>
                  <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#e0e0e0]">
                    Language: {ticket.detectedLanguage.toUpperCase()}
                  </span>
                </div>

                {ticket.tags && ticket.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 items-center pt-1">
                    <span className="text-[11px] text-[#707070]">Tags:</span>
                    {ticket.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 bg-white rounded-full text-[11px] border border-[#e0e0e0] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-1 text-[11px] text-[#707070]">
                  Original Words: &quot;{ticket.rawText}&quot;
                </div>
              </div>

              {/* Proposal notification if waiting on resident */}
              {proposedSlot && booking.status === "alternative_proposed" && (
                <div className="bg-[#f3f3f3] p-4 rounded-[16px] border border-[#e0e0e0] text-xs text-[#141414]">
                  You proposed an alternative slot on <strong>{proposedSlot.date} ({proposedSlot.window})</strong>. Waiting for resident response.
                </div>
              )}

              {/* Propose another slot inline drawer */}
              {proposingBookingId === booking.id && (
                <div className="bg-[#fafafa] border border-[#e0e0e0] rounded-[16px] p-4 space-y-3">
                  <h4 className="text-xs font-bold text-[#141414]">
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
                              ? "bg-[#141414] text-white border-[#141414]"
                              : "bg-white text-[#262626] border-[#e0e0e0] hover:bg-[#f3f3f3]"
                          }`}
                        >
                          {s.date} / <span className="capitalize">{s.window}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#707070]">No other free slots in the next 3 days.</p>
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

              {/* Action Buttons without arrows or checkmark symbols */}
              <div className="flex flex-wrap items-center justify-end gap-2 pt-1 border-t border-[#f0f0f0]">
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
                      variant="soft"
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
