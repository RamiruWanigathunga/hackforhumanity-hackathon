import "server-only";
import { Provider, JobTicket, ProviderSlot } from "./schema";
import { FALLBACK_PROVIDERS, getFallbackProvidersWithSlots } from "@/config/seed-providers";
import { mockStore } from "./mock-store";

export async function getTicket(id: string): Promise<JobTicket | null> {
  let ticket = mockStore.getTicket(id);
  if (!ticket) {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const rawTkt = cookieStore.get(`tkt_${id}`)?.value;
      if (rawTkt) {
        const parsed = JSON.parse(rawTkt);
        const newTicket: JobTicket = { ...parsed, createdAt: new Date(parsed.createdAt) };
        mockStore.saveTicket(newTicket);
        return newTicket;
      }
    } catch {
      // ignore
    }
  }
  return ticket || mockStore.ensureSyntheticTicket(id);
}

export async function listProviders(): Promise<Provider[]> {
  return FALLBACK_PROVIDERS;
}

export async function getProviderById(id: string): Promise<Provider | null> {
  return FALLBACK_PROVIDERS.find((p) => p.id === id) || null;
}

export interface ProviderWithSlots {
  provider: Provider;
  slots: ProviderSlot[];
}

export async function getActiveProvidersWithSlots(daysAhead: number = 2): Promise<ProviderWithSlots[]> {
  void daysAhead;
  return getFallbackProvidersWithSlots();
}

export async function getBookingWithDetails(id: string) {
  let details = mockStore.getBookingWithDetails(id);
  if (!details || !details.booking) {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const rawBk = cookieStore.get(`bk_${id}`)?.value;
      if (rawBk) {
        const parsed = JSON.parse(rawBk);
        mockStore.createBookingWithId({
          id,
          ticketId: parsed.ticketId,
          providerId: parsed.providerId,
          slotId: parsed.slotId,
        });

        const rawTkt = cookieStore.get(`tkt_${parsed.ticketId}`)?.value;
        if (rawTkt) {
          const tkt = JSON.parse(rawTkt);
          mockStore.saveTicket({ ...tkt, createdAt: new Date(tkt.createdAt) });
        }
        details = mockStore.getBookingWithDetails(id);
      }
    } catch {
      // ignore
    }
  }

  if (!details || !details.booking) {
    details = mockStore.ensureSyntheticBooking(id);
  }

  return details;
}

export async function getRecentResidentBookings(bookingIds: string[]) {
  if (bookingIds.length === 0) return [];
  return mockStore.getRecentResidentBookings(bookingIds);
}

export async function getProviderInbox(providerId: string) {
  return mockStore.getProviderInbox(providerId);
}

export async function getProviderAvailableSlots(providerId: string): Promise<ProviderSlot[]> {
  return mockStore.getSlotsForProvider(providerId);
}
