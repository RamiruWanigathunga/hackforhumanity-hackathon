import fs from "fs";
import path from "path";
import { JobTicket, Booking, BookingEvent, ProviderSlot, Provider } from "./schema";
import { FALLBACK_PROVIDERS, getFallbackProvidersWithSlots } from "@/config/seed-providers";
import { ActionType, ActorRole, BookingStatus, transitionBooking } from "../booking/state";

export interface BookingWithDetails {
  booking: Booking;
  ticket: JobTicket | null;
  provider: Provider | null;
  slot: ProviderSlot | null;
  proposedSlot: ProviderSlot | null;
  events: BookingEvent[];
}

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
const TMP_FILE = path.join("/tmp", "helpdesk_store.json");

function persistToDisk() {
  try {
    const data = {
      tickets: Array.from(store.tickets.entries()),
      bookings: Array.from(store.bookings.entries()),
      bookingEvents: Array.from(store.bookingEvents.entries()),
      slots: Array.from(store.slots.entries()),
    };
    fs.writeFileSync(TMP_FILE, JSON.stringify(data), "utf-8");
  } catch {
    // ignore
  }
}

function loadFromDisk() {
  try {
    if (fs.existsSync(TMP_FILE)) {
      const raw = fs.readFileSync(TMP_FILE, "utf-8");
      const data = JSON.parse(raw);
      if (data.tickets) {
        for (const [k, v] of data.tickets) {
          if (!store.tickets.has(k)) {
            store.tickets.set(k, {
              ...v,
              createdAt: new Date(v.createdAt),
              updatedAt: v.updatedAt ? new Date(v.updatedAt) : undefined,
            });
          }
        }
      }
      if (data.bookings) {
        for (const [k, v] of data.bookings) {
          if (!store.bookings.has(k)) {
            store.bookings.set(k, {
              ...v,
              createdAt: new Date(v.createdAt),
              updatedAt: new Date(v.updatedAt),
            });
          }
        }
      }
      if (data.bookingEvents) {
        for (const [k, v] of data.bookingEvents) {
          if (!store.bookingEvents.has(k)) {
            store.bookingEvents.set(
              k,
              v.map((e: any) => ({ ...e, createdAt: new Date(e.createdAt) }))
            );
          }
        }
      }
      if (data.slots) {
        for (const [k, v] of data.slots) {
          if (!store.slots.has(k)) {
            store.slots.set(k, v);
          }
        }
      }
    }
  } catch {
    // ignore
  }
}

function initStoreIfNeeded() {
  if (store.initialized) return;
  store.initialized = true;

  const fallbackWithSlots = getFallbackProvidersWithSlots();
  for (const item of fallbackWithSlots) {
    for (const s of item.slots) {
      store.slots.set(s.id, { ...s });
    }
  }

  loadFromDisk();
}

initStoreIfNeeded();

export const mockStore = {
  saveTicket(ticket: JobTicket) {
    initStoreIfNeeded();
    store.tickets.set(ticket.id, { ...ticket });
    persistToDisk();
    return ticket;
  },

  getTicket(id: string): JobTicket | null {
    initStoreIfNeeded();
    loadFromDisk();
    const t = store.tickets.get(id);
    if (t) return t;
    if (id && (id.startsWith("tkt-") || id.startsWith("bk-") || id.length > 3)) {
      return this.ensureSyntheticTicket(id);
    }
    return null;
  },

  ensureSyntheticTicket(id: string): JobTicket {
    initStoreIfNeeded();
    let ticket = store.tickets.get(id);
    if (!ticket) {
      ticket = {
        id,
        rawText: "Scheduled maintenance / repair service",
        clarificationQ: null,
        clarificationA: null,
        detectedLanguage: "en",
        summary: "Plumbing / Electrical maintenance inspection",
        category: "plumbing",
        tags: ["repair", "inspection", "urgent"],
        area: "Colombo 03",
        preferredDate: new Date().toISOString().split("T")[0],
        preferredWindow: "morning",
        urgency: "medium",
        hazard: false,
        missingDetails: [],
        aiSource: "rule_engine",
        aiRaw: null,
        editedByUser: false,
        status: "confirmed",
        residentName: "Resident",
        createdAt: new Date(),
      };
      store.tickets.set(id, ticket);
      persistToDisk();
    }
    return ticket;
  },

  updateTicket(id: string, updates: Partial<JobTicket>): JobTicket | null {
    initStoreIfNeeded();
    const existing = store.tickets.get(id) || this.ensureSyntheticTicket(id);
    const updated = { ...existing, ...updates, updatedAt: new Date() };
    store.tickets.set(id, updated);
    persistToDisk();
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

  createBookingWithId(input: { id: string; ticketId: string; providerId: string; slotId: string }): Booking {
    initStoreIfNeeded();
    const slot = store.slots.get(input.slotId);
    if (slot) {
      slot.status = "held";
      store.slots.set(slot.id, slot);
    }

    const newBooking: Booking = {
      id: input.id,
      ticketId: input.ticketId,
      providerId: input.providerId,
      slotId: input.slotId,
      proposedSlotId: null,
      status: "requested",
      residentRating: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    store.bookings.set(input.id, newBooking);

    if (!store.bookingEvents.has(input.id)) {
      store.bookingEvents.set(input.id, [
        {
          id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          bookingId: input.id,
          type: "requested",
          actor: "resident",
          note: "Resident requested booking for slot.",
          createdAt: new Date(),
        },
      ]);
    }

    const ticket = store.tickets.get(input.ticketId) || this.ensureSyntheticTicket(input.ticketId);
    ticket.status = "booked";
    store.tickets.set(ticket.id, ticket);

    persistToDisk();
    return newBooking;
  },

  createBooking(input: { ticketId: string; providerId: string; slotId: string }): string {
    initStoreIfNeeded();
    const bookingId = `bk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    this.createBookingWithId({
      id: bookingId,
      ticketId: input.ticketId,
      providerId: input.providerId,
      slotId: input.slotId,
    });
    return bookingId;
  },

  applyTransition(bookingId: string, action: ActionType, actor: ActorRole, note?: string, proposalSlotId?: string) {
    initStoreIfNeeded();
    loadFromDisk();
    let booking = store.bookings.get(bookingId);
    if (!booking) {
      this.ensureSyntheticBooking(bookingId);
      booking = store.bookings.get(bookingId);
    }
    if (!booking) {
      throw new Error(`Booking ${bookingId} not found in store.`);
    }

    const res = transitionBooking(
      booking.status as BookingStatus,
      action,
      actor,
      {
        currentSlotId: booking.slotId,
        proposedSlotId: booking.proposedSlotId,
        newProposedSlotId: proposalSlotId,
      }
    );

    booking.status = res.nextStatus;
    if (res.updatedSlotId) {
      booking.slotId = res.updatedSlotId;
      booking.proposedSlotId = null;
    } else if (proposalSlotId && res.nextStatus === "alternative_proposed") {
      booking.proposedSlotId = proposalSlotId;
    } else if (res.nextStatus === "cancelled" || res.nextStatus === "declined") {
      booking.proposedSlotId = null;
    }
    booking.updatedAt = new Date();
    store.bookings.set(booking.id, booking);

    for (const effect of res.slotEffects) {
      const s = store.slots.get(effect.slotId);
      if (s) {
        s.status = effect.newStatus;
        store.slots.set(s.id, s);
      }
    }

    const eventList = store.bookingEvents.get(bookingId) || [];
    eventList.push({
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      bookingId,
      type: res.nextStatus,
      actor,
      note: res.eventNote || note || `State transitioned to ${res.nextStatus}`,
      createdAt: new Date(),
    });
    store.bookingEvents.set(bookingId, eventList);
    persistToDisk();

    return res.nextStatus;
  },

  ensureSyntheticBooking(id: string): BookingWithDetails {
    initStoreIfNeeded();
    let booking = store.bookings.get(id);
    if (!booking) {
      const provider = FALLBACK_PROVIDERS[0];
      const slot =
        Array.from(store.slots.values()).find((s) => s.providerId === provider.id) ||
        Array.from(store.slots.values())[0];
      const ticketId = `tkt-${id.replace(/^bk-/, "")}`;
      this.ensureSyntheticTicket(ticketId);

      booking = {
        id,
        ticketId,
        providerId: provider.id,
        slotId: slot?.id || "slot-fallback",
        proposedSlotId: null,
        status: "requested",
        residentRating: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      store.bookings.set(id, booking);

      store.bookingEvents.set(id, [
        {
          id: `evt-${id}-1`,
          bookingId: id,
          type: "requested",
          actor: "resident",
          note: "Resident requested booking for slot.",
          createdAt: new Date(),
        },
      ]);
      persistToDisk();
    }
    return this.getBookingWithDetails(id)!;
  },

  getBookingWithDetails(id: string): BookingWithDetails | null {
    initStoreIfNeeded();
    loadFromDisk();
    let booking = store.bookings.get(id);
    if (!booking) {
      if (id && (id.startsWith("bk-") || id.length > 3)) {
        return this.ensureSyntheticBooking(id);
      }
      return null;
    }

    let ticket = store.tickets.get(booking.ticketId) || null;
    if (!ticket) {
      ticket = this.ensureSyntheticTicket(booking.ticketId);
    }

    const provider = FALLBACK_PROVIDERS.find((p) => p.id === booking.providerId) || FALLBACK_PROVIDERS[0];
    let slot = store.slots.get(booking.slotId) || null;
    if (!slot) {
      slot = {
        id: booking.slotId,
        providerId: provider.id,
        date: new Date().toISOString().split("T")[0],
        window: "morning",
        status: "held",
      };
      store.slots.set(slot.id, slot);
    }

    const proposedSlot = booking.proposedSlotId ? store.slots.get(booking.proposedSlotId) || null : null;
    let events = store.bookingEvents.get(booking.id) || [];
    if (events.length === 0) {
      events = [
        {
          id: `evt-${booking.id}-1`,
          bookingId: booking.id,
          type: booking.status,
          actor: "resident",
          note: "Booking recorded.",
          createdAt: new Date(),
        },
      ];
      store.bookingEvents.set(booking.id, events);
    }

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
    loadFromDisk();
    const list: Booking[] = [];
    for (const id of bookingIds) {
      let b = store.bookings.get(id);
      if (!b) {
        const details = this.ensureSyntheticBooking(id);
        b = details?.booking;
      }
      if (b) list.push(b);
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getProviderInbox(providerId: string) {
    initStoreIfNeeded();
    loadFromDisk();
    const providerBookings = Array.from(store.bookings.values())
      .filter((b) => b.providerId === providerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const enriched = providerBookings.map((b) => ({
      booking: b,
      ticket: store.tickets.get(b.ticketId) || this.ensureSyntheticTicket(b.ticketId),
      slot: store.slots.get(b.slotId) || {
        id: b.slotId,
        providerId: b.providerId,
        date: new Date().toISOString().split("T")[0],
        window: "morning" as const,
        status: "held" as const,
      },
      proposedSlot: b.proposedSlotId ? store.slots.get(b.proposedSlotId) || null : null,
    }));

    return {
      newRequests: enriched.filter((i) => i.booking.status === "requested"),
      waitingOnResident: enriched.filter((i) => i.booking.status === "alternative_proposed"),
      upcoming: enriched.filter((i) => i.booking.status === "accepted"),
      past: enriched.filter((i) => ["completed", "declined", "cancelled"].includes(i.booking.status)),
    };
  },

  rateBooking(bookingId: string, rating: number) {
    initStoreIfNeeded();
    loadFromDisk();
    let booking = store.bookings.get(bookingId);
    if (!booking) {
      this.ensureSyntheticBooking(bookingId);
      booking = store.bookings.get(bookingId);
    }
    if (booking) {
      booking.residentRating = rating;
      booking.updatedAt = new Date();
      store.bookings.set(bookingId, booking);
      persistToDisk();
    }
  },
};