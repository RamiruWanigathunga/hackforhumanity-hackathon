"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createBookingTransaction, applyBookingTransition } from "../booking/service";
import { db } from "../db/client";
import { bookings } from "../db/schema";
import { mockStore } from "../db/mock-store";
import { eq } from "drizzle-orm";

export async function requestBookingAction(ticketId: string, providerId: string, slotId: string) {
  const bookingId = await createBookingTransaction({
    ticketId,
    providerId,
    slotId,
  });

  // Store in resident_bookings cookie for header display
  const cookieStore = await cookies();
  const existingCookie = cookieStore.get("resident_bookings")?.value;
  let bookingList: string[] = [];
  if (existingCookie) {
    try {
      bookingList = JSON.parse(existingCookie);
    } catch {
      bookingList = [];
    }
  }

  if (!bookingList.includes(bookingId)) {
    bookingList.unshift(bookingId);
    cookieStore.set("resident_bookings", JSON.stringify(bookingList.slice(0, 10)), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  revalidatePath(`/bookings/${bookingId}`);
  redirect(`/bookings/${bookingId}`);
}

export async function residentRespondProposalAction(bookingId: string, accept: boolean) {
  const action = accept ? "resident_accept_proposal" : "resident_reject_proposal";
  await applyBookingTransition(bookingId, action, "resident");
  revalidatePath(`/bookings/${bookingId}`);
}

export async function residentCancelBookingAction(bookingId: string) {
  await applyBookingTransition(bookingId, "resident_cancel", "resident");
  revalidatePath(`/bookings/${bookingId}`);
}

export async function rateBookingAction(bookingId: string, rating: number) {
  try {
    await db
      .update(bookings)
      .set({
        residentRating: Math.max(1, Math.min(5, Math.round(rating))),
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, bookingId));
  } catch {
    mockStore.rateBooking(bookingId, Math.max(1, Math.min(5, Math.round(rating))));
  }

  revalidatePath(`/bookings/${bookingId}`);
}
