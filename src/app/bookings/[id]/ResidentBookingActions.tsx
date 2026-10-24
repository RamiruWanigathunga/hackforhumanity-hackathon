"use client";

import React, { useState, useTransition } from "react";
import { residentRespondProposalAction, residentCancelBookingAction, rateBookingAction } from "@/server/actions/bookings";
import { Button } from "@/components/ui/Button";
import { StarIcon } from "@/components/ui/Icons";

export default function ResidentBookingActions({
  bookingId,
  status,
  hasRating,
}: {
  bookingId: string;
  status: string;
  hasRating?: number | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [selectedRating, setSelectedRating] = useState<number>(hasRating || 5);

  const handleProposalResponse = (accept: boolean) => {
    startTransition(async () => {
      await residentRespondProposalAction(bookingId, accept);
    });
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      startTransition(async () => {
        await residentCancelBookingAction(bookingId);
      });
    }
  };

  const handleRate = (rating: number) => {
    setSelectedRating(rating);
    startTransition(async () => {
      await rateBookingAction(bookingId, rating);
    });
  };

  if (status === "alternative_proposed") {
    return (
      <div className="bg-[#f3f3f3] border border-[#e0e0e0] rounded-[20px] p-5 sm:p-6 space-y-3">
        <h4 className="font-bold text-sm text-[#141414]">
          The technician suggested another time. Does this work for you?
        </h4>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            loading={isPending}
            onClick={() => handleProposalResponse(true)}
          >
            Accept New Time
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            loading={isPending}
            onClick={() => handleProposalResponse(false)}
          >
            Decline and Cancel
          </Button>
        </div>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[20px] p-5 space-y-2">
        <span className="text-xs font-semibold text-[#141414] block">
          Rate your service experience:
        </span>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={isPending}
              onClick={() => handleRate(star)}
              className={`p-1 transition-transform hover:scale-110 cursor-pointer ${
                star <= selectedRating ? "text-[#141414]" : "text-gray-300"
              }`}
            >
              <StarIcon className="w-5 h-5 text-current" />
            </button>
          ))}
          <span className="text-xs text-[#707070] ml-2">
            {hasRating ? `Rated ${hasRating}/5 (demo)` : "Click to rate (demo)"}
          </span>
        </div>
      </div>
    );
  }

  if (status === "requested" || status === "accepted") {
    return (
      <div className="flex justify-end pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          loading={isPending}
          onClick={handleCancel}
          className="text-red-600 hover:bg-red-50 hover:border-red-200"
        >
          Cancel Booking
        </Button>
      </div>
    );
  }

  return null;
}
