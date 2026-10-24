"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { applyBookingTransition } from "../booking/service";

export async function setDemoProviderAction(providerId: string) {
  const cookieStore = await cookies();
  cookieStore.set("demo_provider_id", providerId, {
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  revalidatePath("/provider");
  revalidatePath("/provider/inbox");
  redirect("/provider/inbox");
}

export async function clearDemoProviderAction() {
  const cookieStore = await cookies();
  cookieStore.delete("demo_provider_id");
  revalidatePath("/provider");
  redirect("/provider");
}

export async function providerAcceptAction(bookingId: string) {
  await applyBookingTransition(bookingId, "provider_accept", "provider");
  revalidatePath(`/bookings/${bookingId}`);
  revalidatePath("/provider/inbox");
}

export async function providerDeclineAction(bookingId: string) {
  await applyBookingTransition(bookingId, "provider_decline", "provider");
  revalidatePath(`/bookings/${bookingId}`);
  revalidatePath("/provider/inbox");
}

export async function providerProposeSlotAction(bookingId: string, proposedSlotId: string) {
  await applyBookingTransition(bookingId, "provider_propose", "provider", proposedSlotId);
  revalidatePath(`/bookings/${bookingId}`);
  revalidatePath("/provider/inbox");
}

export async function providerCompleteAction(bookingId: string) {
  await applyBookingTransition(bookingId, "provider_complete", "provider");
  revalidatePath(`/bookings/${bookingId}`);
  revalidatePath("/provider/inbox");
}
