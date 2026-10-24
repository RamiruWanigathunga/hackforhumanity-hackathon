import "server-only";
import { eq, and, gte, lte, desc, inArray } from "drizzle-orm";
import { db } from "./client";
import { providers, providerSlots, jobTickets, bookings, bookingEvents, Provider, JobTicket, ProviderSlot } from "./schema";
import { getColomboToday, getColomboOffsetDate } from "@/lib/time";
import { FALLBACK_PROVIDERS, getFallbackProvidersWithSlots } from "@/config/seed-providers";
import { mockStore } from "./mock-store";

export async function getTicket(id: string): Promise<JobTicket | null> {
  try {
    const result = await db.select().from(jobTickets).where(eq(jobTickets.id, id)).limit(1);
    if (result[0]) return result[0];
    return mockStore.getTicket(id);
  } catch {
    return mockStore.getTicket(id);
  }
}

export async function listProviders(): Promise<Provider[]> {
  try {
    const list = await db.select().from(providers).where(eq(providers.active, true)).orderBy(providers.displayName);
    if (list && list.length > 0) return list;
    return FALLBACK_PROVIDERS;
  } catch {
    return FALLBACK_PROVIDERS;
  }
}

export async function getProviderById(id: string): Promise<Provider | null> {
  try {
    const result = await db.select().from(providers).where(eq(providers.id, id)).limit(1);
    if (result[0]) return result[0];
    return FALLBACK_PROVIDERS.find((p) => p.id === id) || null;
  } catch {
    return FALLBACK_PROVIDERS.find((p) => p.id === id) || null;
  }
}

export interface ProviderWithSlots {
  provider: Provider;
  slots: ProviderSlot[];
}

export async function getActiveProvidersWithSlots(daysAhead: number = 2): Promise<ProviderWithSlots[]> {
  try {
    const today = getColomboToday();
    const endDate = getColomboOffsetDate(daysAhead);

    const activeProviders = await db.select().from(providers).where(eq(providers.active, true));
    if (!activeProviders || activeProviders.length === 0) {
      return getFallbackProvidersWithSlots();
    }

    const slots = await db
      .select()
      .from(providerSlots)
      .where(
        and(
          gte(providerSlots.date, today),
          lte(providerSlots.date, endDate),
          eq(providerSlots.status, "available")
        )
      );

    const slotMap = new Map<string, ProviderSlot[]>();
    for (const s of slots) {
      const list = slotMap.get(s.providerId) || [];
      list.push(s);
      slotMap.set(s.providerId, list);
    }

    return activeProviders.map((p) => ({
      provider: p,
      slots: (slotMap.get(p.id) || []).sort((a, b) => a.date.localeCompare(b.date)),
    }));
  } catch {
    return getFallbackProvidersWithSlots();
  }
}

export async function getBookingWithDetails(id: string) {
  try {
    const bookingRes = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    const booking = bookingRes[0] || null;
    if (!booking) {
      return mockStore.getBookingWithDetails(id);
    }

    const [ticketRes, providerRes, slotRes, proposedSlotRes, eventsRes] = await Promise.all([
      db.select().from(jobTickets).where(eq(jobTickets.id, booking.ticketId)).limit(1),
      db.select().from(providers).where(eq(providers.id, booking.providerId)).limit(1),
      db.select().from(providerSlots).where(eq(providerSlots.id, booking.slotId)).limit(1),
      booking.proposedSlotId
        ? db.select().from(providerSlots).where(eq(providerSlots.id, booking.proposedSlotId)).limit(1)
        : Promise.resolve([]),
      db.select().from(bookingEvents).where(eq(bookingEvents.bookingId, booking.id)).orderBy(bookingEvents.createdAt),
    ]);

    return {
      booking,
      ticket: ticketRes[0] || mockStore.getTicket(booking.ticketId),
      provider: providerRes[0] || FALLBACK_PROVIDERS.find((p) => p.id === booking.providerId) || null,
      slot: slotRes[0] || mockStore.getSlot(booking.slotId),
      proposedSlot: proposedSlotRes[0] || (booking.proposedSlotId ? mockStore.getSlot(booking.proposedSlotId) : null),
      events: eventsRes,
    };
  } catch {
    return mockStore.getBookingWithDetails(id);
  }
}

export async function getRecentResidentBookings(bookingIds: string[]): Promise<typeof bookings.$inferSelect[]> {
  if (bookingIds.length === 0) return [];
  try {
    const res = await db
      .select()
      .from(bookings)
      .where(inArray(bookings.id, bookingIds))
      .orderBy(desc(bookings.createdAt));
    if (res && res.length > 0) return res;
    return mockStore.getRecentResidentBookings(bookingIds);
  } catch {
    return mockStore.getRecentResidentBookings(bookingIds);
  }
}

export async function getProviderInbox(providerId: string) {
  try {
    const providerBookings = await db
      .select()
      .from(bookings)
      .where(eq(bookings.providerId, providerId))
      .orderBy(desc(bookings.createdAt));

    if (!providerBookings || providerBookings.length === 0) {
      return mockStore.getProviderInbox(providerId);
    }

    const ticketIds = providerBookings.map((b) => b.ticketId);
    const slotIds = providerBookings.map((b) => b.slotId);
    const proposedSlotIds = providerBookings.map((b) => b.proposedSlotId).filter(Boolean) as string[];

    const [tickets, slots, proposedSlots] = await Promise.all([
      db.select().from(jobTickets).where(inArray(jobTickets.id, ticketIds)),
      db.select().from(providerSlots).where(inArray(providerSlots.id, slotIds)),
      proposedSlotIds.length > 0
        ? db.select().from(providerSlots).where(inArray(providerSlots.id, proposedSlotIds))
        : Promise.resolve([]),
    ]);

    const ticketMap = new Map(tickets.map((t) => [t.id, t]));
    const slotMap = new Map(slots.map((s) => [s.id, s]));
    const proposedSlotMap = new Map(proposedSlots.map((s) => [s.id, s]));

    const enriched = providerBookings.map((b) => ({
      booking: b,
      ticket: ticketMap.get(b.ticketId) || mockStore.getTicket(b.ticketId)!,
      slot: slotMap.get(b.slotId) || mockStore.getSlot(b.slotId)!,
      proposedSlot: b.proposedSlotId ? proposedSlotMap.get(b.proposedSlotId) || mockStore.getSlot(b.proposedSlotId) : null,
    })).filter((item) => item.ticket && item.slot);

    return {
      newRequests: enriched.filter((i) => i.booking.status === "requested"),
      waitingOnResident: enriched.filter((i) => i.booking.status === "alternative_proposed"),
      upcoming: enriched.filter((i) => i.booking.status === "accepted"),
      past: enriched.filter((i) => ["completed", "declined", "cancelled"].includes(i.booking.status)),
    };
  } catch {
    return mockStore.getProviderInbox(providerId);
  }
}

export async function getProviderAvailableSlots(providerId: string): Promise<ProviderSlot[]> {
  try {
    const today = getColomboToday();
    const res = await db
      .select()
      .from(providerSlots)
      .where(
        and(
          eq(providerSlots.providerId, providerId),
          gte(providerSlots.date, today),
          eq(providerSlots.status, "available")
        )
      );
    if (res && res.length > 0) return res;
    return mockStore.getSlotsForProvider(providerId);
  } catch {
    return mockStore.getSlotsForProvider(providerId);
  }
}
