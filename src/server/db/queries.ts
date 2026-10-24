import "server-only";
import { eq, and, gte, lte, desc, inArray } from "drizzle-orm";
import { db } from "./client";
import { providers, providerSlots, jobTickets, bookings, bookingEvents, Provider, JobTicket, ProviderSlot } from "./schema";
import { getColomboToday, getColomboOffsetDate } from "@/lib/time";

export async function getTicket(id: string): Promise<JobTicket | null> {
  const result = await db.select().from(jobTickets).where(eq(jobTickets.id, id)).limit(1);
  return result[0] || null;
}

export async function listProviders(): Promise<Provider[]> {
  return db.select().from(providers).where(eq(providers.active, true)).orderBy(providers.displayName);
}

export async function getProviderById(id: string): Promise<Provider | null> {
  const result = await db.select().from(providers).where(eq(providers.id, id)).limit(1);
  return result[0] || null;
}

export interface ProviderWithSlots {
  provider: Provider;
  slots: ProviderSlot[];
}

export async function getActiveProvidersWithSlots(daysAhead: number = 2): Promise<ProviderWithSlots[]> {
  const today = getColomboToday();
  const endDate = getColomboOffsetDate(daysAhead);

  const activeProviders = await db.select().from(providers).where(eq(providers.active, true));
  if (activeProviders.length === 0) return [];

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
}

export async function getBookingWithDetails(id: string) {
  const bookingRes = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
  const booking = bookingRes[0] || null;
  if (!booking) return null;

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
    ticket: ticketRes[0] || null,
    provider: providerRes[0] || null,
    slot: slotRes[0] || null,
    proposedSlot: proposedSlotRes[0] || null,
    events: eventsRes,
  };
}

export async function getRecentResidentBookings(bookingIds: string[]) {
  if (bookingIds.length === 0) return [];
  return db
    .select()
    .from(bookings)
    .where(inArray(bookings.id, bookingIds))
    .orderBy(desc(bookings.createdAt));
}

export async function getProviderInbox(providerId: string) {
  const providerBookings = await db
    .select()
    .from(bookings)
    .where(eq(bookings.providerId, providerId))
    .orderBy(desc(bookings.createdAt));

  if (providerBookings.length === 0) {
    return {
      newRequests: [],
      waitingOnResident: [],
      upcoming: [],
      past: [],
    };
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
    ticket: ticketMap.get(b.ticketId)!,
    slot: slotMap.get(b.slotId)!,
    proposedSlot: b.proposedSlotId ? proposedSlotMap.get(b.proposedSlotId) : null,
  }));

  return {
    newRequests: enriched.filter((i) => i.booking.status === "requested"),
    waitingOnResident: enriched.filter((i) => i.booking.status === "alternative_proposed"),
    upcoming: enriched.filter((i) => i.booking.status === "accepted"),
    past: enriched.filter((i) => ["completed", "declined", "cancelled"].includes(i.booking.status)),
  };
}
