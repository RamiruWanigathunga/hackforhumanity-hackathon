import "server-only";
import { Provider, JobTicket, ProviderSlot } from "./schema";
import { FALLBACK_PROVIDERS, getFallbackProvidersWithSlots } from "@/config/seed-providers";
import { mockStore } from "./mock-store";

export async function getTicket(id: string): Promise<JobTicket | null> {
  return mockStore.getTicket(id);
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
  return mockStore.getBookingWithDetails(id);
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
