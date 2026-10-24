import "server-only";
import { ActionType, ActorRole } from "./state";
import { mockStore } from "../db/mock-store";

export async function createBookingTransaction(input: {
  ticketId: string;
  providerId: string;
  slotId: string;
}) {
  return mockStore.createBooking(input);
}

export async function applyBookingTransition(
  bookingId: string,
  action: ActionType,
  actor: ActorRole,
  newProposedSlotId?: string
) {
  return mockStore.applyTransition(bookingId, action, actor, undefined, newProposedSlotId);
}
