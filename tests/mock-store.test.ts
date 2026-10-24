import { describe, it, expect } from "vitest";
import { mockStore } from "../src/server/db/mock-store";
import { JobTicket } from "../src/server/db/schema";

describe("Mock Store in-memory resilience", () => {
  it("saves and retrieves tickets correctly", () => {
    const ticket: JobTicket = {
      id: "tkt-test-1",
      rawText: "Kitchen sink pipe leaking under the counter",
      clarificationQ: null,
      clarificationA: null,
      detectedLanguage: "en",
      summary: "Kitchen sink pipe leaking",
      category: "plumbing",
      tags: ["leak", "pipe"],
      area: "Nugegoda",
      preferredDate: "2026-10-25",
      preferredWindow: "morning",
      urgency: "normal",
      hazard: false,
      missingDetails: [],
      aiSource: "fallback",
      aiRaw: null,
      editedByUser: false,
      status: "draft",
      residentName: "Anura",
      createdAt: new Date(),
    };

    mockStore.saveTicket(ticket);
    const retrieved = mockStore.getTicket("tkt-test-1");

    expect(retrieved).not.toBeNull();
    expect(retrieved?.summary).toBe("Kitchen sink pipe leaking");
    expect(retrieved?.category).toBe("plumbing");
  });

  it("handles booking creation and transitions", () => {
    const bookingId = mockStore.createBooking({
      ticketId: "tkt-test-1",
      providerId: "prov-p1",
      slotId: "slot-prov-p1-2026-10-25-morning",
    });

    expect(bookingId).toMatch(/^bk-/);

    const details = mockStore.getBookingWithDetails(bookingId);
    expect(details).not.toBeNull();
    expect(details?.booking.status).toBe("requested");

    // Transition to accepted
    const nextStatus = mockStore.applyTransition(bookingId, "provider_accept", "provider");
    expect(nextStatus).toBe("accepted");

    const updatedDetails = mockStore.getBookingWithDetails(bookingId);
    expect(updatedDetails?.booking.status).toBe("accepted");
  });
});
