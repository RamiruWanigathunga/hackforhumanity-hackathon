"use client";

import React, { useTransition } from "react";
import { MatchResultItem } from "@/server/matching/match";
import { ProviderCard } from "@/components/ProviderCard";
import { requestBookingAction } from "@/server/actions/bookings";

export default function MatchesList({
  ticketId,
  matches,
}: {
  ticketId: string;
  matches: MatchResultItem[];
}) {
  const [isPending, startTransition] = useTransition();

  const handleRequestBooking = (providerId: string, slotId: string) => {
    startTransition(async () => {
      await requestBookingAction(ticketId, providerId, slotId);
    });
  };

  return (
    <div className="space-y-6">
      {matches.map((item, idx) => (
        <ProviderCard
          key={item.provider.id}
          id={item.provider.id}
          displayName={item.provider.displayName}
          categories={item.provider.categories}
          homeArea={item.provider.homeArea}
          areasServed={item.provider.areasServed}
          languages={item.provider.languages}
          rating={item.provider.rating}
          jobsCompleted={item.provider.jobsCompleted}
          visitFeeLkr={item.provider.visitFeeLkr}
          bio={item.provider.bio}
          totalScore={item.total}
          scoreComponents={item.components}
          reasons={item.reasons}
          suggestedSlots={item.suggestedSlots}
          onSelectSlot={handleRequestBooking}
          loading={isPending}
          featured={idx === 0} // Mobbin featured card style on top match
        />
      ))}
    </div>
  );
}
