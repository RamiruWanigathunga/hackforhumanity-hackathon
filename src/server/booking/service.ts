import "server-only";
import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { bookings, bookingEvents, providerSlots, jobTickets } from "../db/schema";
import { transitionBooking, ActionType, ActorRole, BookingStatus } from "./state";

export async function createBookingTransaction(input: {
  ticketId: string;
  providerId: string;
  slotId: string;
}) {
  const bookingId = `bk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const eventId = `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  // Run in atomic transaction
  return await db.transaction(async (tx) => {
    // 1. Verify slot is still available
    const slotRes = await tx
      .select()
      .from(providerSlots)
      .where(eq(providerSlots.id, input.slotId))
      .limit(1);

    const slot = slotRes[0];
    if (!slot || slot.status !== "available") {
      throw new Error("That slot was just taken. Please pick another available time.");
    }

    // 2. Mark slot as held
    await tx
      .update(providerSlots)
      .set({ status: "held" })
      .where(eq(providerSlots.id, input.slotId));

    // 3. Create booking
    await tx.insert(bookings).values({
      id: bookingId,
      ticketId: input.ticketId,
      providerId: input.providerId,
      slotId: input.slotId,
      status: "requested",
    });

    // 4. Log initial event
    await tx.insert(bookingEvents).values({
      id: eventId,
      bookingId,
      type: "requested",
      actor: "resident",
      note: "Resident requested booking for slot.",
    });

    // 5. Update ticket status to booked
    await tx
      .update(jobTickets)
      .set({ status: "booked" })
      .where(eq(jobTickets.id, input.ticketId));

    return bookingId;
  });
}

export async function applyBookingTransition(
  bookingId: string,
  action: ActionType,
  actor: ActorRole,
  newProposedSlotId?: string
) {
  return await db.transaction(async (tx) => {
    const bookingRes = await tx.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1);
    const booking = bookingRes[0];
    if (!booking) {
      throw new Error("Booking not found.");
    }

    // Run pure transition
    const result = transitionBooking(
      booking.status as BookingStatus,
      action,
      actor,
      {
        currentSlotId: booking.slotId,
        proposedSlotId: booking.proposedSlotId,
        newProposedSlotId,
      }
    );

    // Apply slot effects
    for (const effect of result.slotEffects) {
      await tx
        .update(providerSlots)
        .set({ status: effect.newStatus })
        .where(eq(providerSlots.id, effect.slotId));
    }

    // Update booking record
    const updateData: Partial<typeof bookings.$inferInsert> = {
      status: result.nextStatus,
      updatedAt: new Date(),
    };

    if (result.updatedSlotId) {
      updateData.slotId = result.updatedSlotId;
      updateData.proposedSlotId = null;
    } else if (newProposedSlotId && result.nextStatus === "alternative_proposed") {
      updateData.proposedSlotId = newProposedSlotId;
    } else if (result.nextStatus === "cancelled" || result.nextStatus === "declined") {
      updateData.proposedSlotId = null;
    }

    await tx.update(bookings).set(updateData).where(eq(bookings.id, bookingId));

    // Insert timeline event
    const eventId = `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    await tx.insert(bookingEvents).values({
      id: eventId,
      bookingId,
      type: result.nextStatus,
      actor,
      note: result.eventNote || null,
    });

    return result.nextStatus;
  });
}
