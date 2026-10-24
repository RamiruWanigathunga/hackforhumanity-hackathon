import { JobTicket, Booking, BookingEvent, ProviderSlot, Provider } from "./schema";
import { FALLBACK_PROVIDERS, getFallbackProvidersWithSlots } from "@/config/seed-providers";
import { ActionType, ActorRole, transitionBooking } from "../booking/state";

interface GlobalMockStore {
  tickets: Map<string, JobTicket>;
  bookings: Map<string, Booking>;
  bookingEvents: Map<string, BookingEvent[]>;
  slots: Map<string, ProviderSlot>;
  initialized: boolean;
}

const g = globalThis as unknown as { __mockStore?: GlobalMockStore };

if (!g.__mockStore) {
  g.__mockStore = {
    tickets: new Map(),
    bookings: new Map(),
    bookingEvents: new Map(),
    slots: new Map(),
    initialized: false,
  };
}

const store = g.__mockStore;

function initStoreIfNeeded() {
  if (store.initialized) return;
  store.initialized = true;

  const fallbackWithSlots = getFallbackProvidersWithSlots();
  for (const item of fallbackWithSlots) {
    for (const s of item.slots) {
      store.slots.set(s.id, { ...s });
    }
  }
}

initStoreIfNeeded();

export const mockStore = {
  saveTicket(ticket: JobTicket) {
    store.tickets.set(ticket.id, { ...ticket });
    return ticket;
  },

  getTicket(id: string): JobTicket | null {
    return store.tickets.get(id) || null;
  },

  updateTicket(id: string, updates: Partial<JobTicket>): JobTicket | null {
    const existing = store.tickets.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...updates, updatedAt: new Date() };
    store.tickets.set(id, updated);
    return updated;
  },

  getSlot(slotId: string): ProviderSlot | null {
    initStoreIfNeeded();
    return store.slots.get(slotId) || null;
  },

  getSlotsForProvider(providerId: string): ProviderSlot[] {
    initStoreIfNeeded();
    return Array.from(store.slots.values()).filter((s) => s.providerId === providerId);
  },

  createBooking(input: { ticketId: string; providerId: string; slotId: string }): string {
    initStoreIfNeeded();
    const slot = store.slots.get(input.slotId);
    if (slot) {
      slot.status = "held";
      store.slots.set(slot.id, slot);
    }

    const bookingId = `bk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const eventId = `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newBooking: Booking = {
      id: bookingId,
      ticketId: input.ticketId,
      providerId: input.providerId,
      slotId: input.slotId,
      proposedSlotId: null,
      status: "requested",
      residentRating: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    store.bookings.set(bookingId, newBooking);

    const initialEvent: BookingEvent = {
      id: eventId,
      bookingId,
      type: "requested",
      actor: "resident",
      note: "Resident requested booking for slot.",
      createdAt: new Date(),
    };

    store.bookingEvents.set(bookingId, [initialEvent]);

    const ticket = store.tickets.get(input.ticketId);
    if (ticket) {
      ticket.status = "booked";
      store.tickets.set(ticket.id, ticket);
    }

    return bookingId;
  },

  applyTransition(bookingId: string, action: ActionType, actor: ActorRole, note?: string, proposalSlotId?: string) {
    initStoreIfNeeded();
    const booking = store.bookings.get(bookingId);
    if (!booking) {
      throw new Error(`Booking ${bookingId} not found in store.`);
    }

    const res = transitionBooking(
      {
        id: booking.id,
        currentStatus: booking.status as any,
        slotId: booking.slotId,
        proposedSlotId: booking.proposedSlotId,
        providerId: booking.providerId,
        ticketId: booking.ticketId,
      },
      action,
      actor,
      proposalSlotId
    );

    booking.status = res.newStatus;
    if (res.updatedSlotId) booking.slotId = res.updatedSlotId;
    if (proposalSlotId) booking.proposedSlotId = proposalSlotId;
    if (action === "resident_accept_proposal" || action === "resident_reject_proposal") {
      booking.proposedSlotId = null;
    }
    booking.updatedAt = new Date();
    store.bookings.set(booking.id, booking);

    const eventList = store.bookingEvents.get(bookingId) || [];
    eventList.push({
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      bookingId,
      type: res.newStatus,
      actor,
      note: note || `State transitioned to ${res.newStatus}`,
      createdAt: new Date(),
    });
    store.bookingEvents.set(bookingId, eventList);

    return booking;
  },

  getBookingWithDetails(id: string) {
    initStoreIfNeeded();
    const booking = store.bookings.get(id);
    if (!booking) return null;

    const ticket = store.tickets.get(booking.ticketId) || null;
    const provider = FALLBACK_PROVIDERS.find((p) => p.id === booking.providerId) || null;
    const slot = store.slots.get(booking.slotId) || null;
    const proposedSlot = booking.proposedSlotId ? store.slots.get(booking.proposedSlotId) || null : null;
    const events = store.bookingEvents.get(booking.id) || [];

    return {
      booking,
      ticket,
      provider,
      slot,
      proposedSlot,
      events,
    };
  },

  getRecentResidentBookings(bookingIds: string[]): Booking[] {
    initStoreIfNeeded();
    const list: Booking[] = [];
    for (const id of bookingIds) {
      const b = store.bookings.get(id);
      if (b) list.push(b);
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getProviderInbox(providerId: string) {
    initStoreIfNeeded();
    const providerBookings = Array.from(store.bookings.values())
      .filter((b) => b.providerId === providerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const enriched = providerBookings.map((b) => ({
      booking: b,
      ticket: store.tickets.get(b.ticketId)!,
      slot: store.slots.get(b.slotId)!,
      proposedSlot: b.proposedSlotId ? store.slots.get(b.proposedSlotId) || null : null,
    })).filter((item) => item.ticket && item.slot);

    return {
      newRequests: enriched.filter((i) => i.booking.status === "requested"),
      waitingOnResident: enriched.filter((i) => i.booking.status === "alternative_proposed"),
      upcoming: enriched.filter((i) => i.booking.status === "accepted"),
      past: enriched.filter((i) => ["completed", "declined", "cancelled"].includes(i.booking.status)),
    };
  },

  rateBooking(bookingId: string, rating: number) {
    const booking = store.bookings.get(bookingId);
    if (booking) {
      booking.residentRating = rating;
      booking.updatedAt = new Date();
      store.bookings.set(bookingId, booking);
    }
  },
};
