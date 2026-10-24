import { describe, it, expect } from "vitest";
import { transitionBooking } from "../src/server/booking/state";

describe("Booking State Machine Transitions", () => {
  const context = {
    currentSlotId: "slot-1",
    proposedSlotId: "slot-2",
  };

  it("provider accepts requested booking -> accepted with slot booked", () => {
    const result = transitionBooking("requested", "provider_accept", "provider", context);
    expect(result.nextStatus).toBe("accepted");
    expect(result.slotEffects).toEqual([{ slotId: "slot-1", newStatus: "booked" }]);
  });

  it("provider declines requested booking -> declined with slot available", () => {
    const result = transitionBooking("requested", "provider_decline", "provider", context);
    expect(result.nextStatus).toBe("declined");
    expect(result.slotEffects).toEqual([{ slotId: "slot-1", newStatus: "available" }]);
  });

  it("provider proposes alternative slot -> alternative_proposed", () => {
    const result = transitionBooking("requested", "provider_propose", "provider", {
      ...context,
      newProposedSlotId: "slot-3",
    });
    expect(result.nextStatus).toBe("alternative_proposed");
    expect(result.slotEffects).toEqual([
      { slotId: "slot-1", newStatus: "available" },
      { slotId: "slot-3", newStatus: "held" },
    ]);
  });

  it("resident accepts proposed slot -> accepted with proposed slot booked", () => {
    const result = transitionBooking("alternative_proposed", "resident_accept_proposal", "resident", {
      currentSlotId: "slot-1",
      proposedSlotId: "slot-2",
    });
    expect(result.nextStatus).toBe("accepted");
    expect(result.updatedSlotId).toBe("slot-2");
    expect(result.slotEffects).toEqual([{ slotId: "slot-2", newStatus: "booked" }]);
  });

  it("resident rejects proposed slot -> cancelled with proposed slot released", () => {
    const result = transitionBooking("alternative_proposed", "resident_reject_proposal", "resident", {
      currentSlotId: "slot-1",
      proposedSlotId: "slot-2",
    });
    expect(result.nextStatus).toBe("cancelled");
    expect(result.slotEffects).toEqual([{ slotId: "slot-2", newStatus: "available" }]);
  });

  it("resident cancels requested booking -> cancelled", () => {
    const result = transitionBooking("requested", "resident_cancel", "resident", context);
    expect(result.nextStatus).toBe("cancelled");
  });

  it("forbids unauthorized actor transitions", () => {
    // Resident cannot accept requested booking
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transitionBooking("requested", "provider_accept", "resident" as any, context)
    ).toThrow();

    // Provider cannot accept proposed time (only resident can)
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transitionBooking("alternative_proposed", "resident_accept_proposal", "provider" as any, context)
    ).toThrow();
  });
});
