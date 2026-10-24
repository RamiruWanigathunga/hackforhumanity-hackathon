"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "../db/client";
import { jobTickets } from "../db/schema";
import { processIntake } from "../ai/intake";
import { eq } from "drizzle-orm";
import { resolveRelativeDay, getColomboToday } from "@/lib/time";

export async function createTicketAction(formData: FormData) {
  const rawText = formData.get("rawText") as string;
  const area = formData.get("area") as string;
  const preferredDay = (formData.get("preferredDay") as string) || "tomorrow";
  const preferredWindow = (formData.get("preferredWindow") as string) || "morning";
  const residentName = (formData.get("residentName") as string) || null;

  if (!rawText || rawText.trim().length < 3) {
    throw new Error("Please describe your problem in a few words.");
  }

  const preferredDate = resolveRelativeDay(preferredDay, getColomboToday());

  // Run AI Intake
  const intakeResult = await processIntake({
    rawText,
    area,
    preferredDate: preferredDate || undefined,
    preferredWindow,
  });

  const { draft, source, rawAiResponse } = intakeResult;
  const ticketId = `tkt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  await db.insert(jobTickets).values({
    id: ticketId,
    rawText,
    clarificationQ: draft.clarifyingQuestion,
    clarificationA: null,
    detectedLanguage: draft.detectedLanguage,
    summary: draft.summary,
    category: draft.category,
    tags: draft.tags,
    area: draft.area || area || null,
    preferredDate: draft.preferredDate,
    preferredWindow: draft.preferredWindow,
    urgency: draft.urgency,
    hazard: draft.hazard,
    missingDetails: draft.missingDetails,
    aiSource: source,
    aiRaw: rawAiResponse || null,
    editedByUser: false,
    status: "draft",
    residentName,
  });

  redirect(`/tickets/${ticketId}`);
}

export async function updateTicketAction(ticketId: string, updates: {
  summary: string;
  category: string;
  tags: string[];
  area: string;
  preferredDate: string;
  preferredWindow: string;
  urgency: string;
}) {
  await db
    .update(jobTickets)
    .set({
      summary: updates.summary,
      category: updates.category,
      tags: updates.tags,
      area: updates.area,
      preferredDate: updates.preferredDate,
      preferredWindow: updates.preferredWindow,
      urgency: updates.urgency,
      editedByUser: true,
    })
    .where(eq(jobTickets.id, ticketId));

  revalidatePath(`/tickets/${ticketId}`);
}

export async function confirmTicketAction(ticketId: string) {
  const ticketRes = await db.select().from(jobTickets).where(eq(jobTickets.id, ticketId)).limit(1);
  const ticket = ticketRes[0];
  if (!ticket) {
    throw new Error("Ticket not found.");
  }

  if (ticket.category === "unknown") {
    throw new Error("Please select a specific trade category before confirming.");
  }

  await db
    .update(jobTickets)
    .set({
      status: "confirmed",
    })
    .where(eq(jobTickets.id, ticketId));

  revalidatePath(`/tickets/${ticketId}`);
  revalidatePath(`/tickets/${ticketId}/matches`);
  redirect(`/tickets/${ticketId}/matches`);
}

export async function answerClarificationAction(ticketId: string, answer: string) {
  const ticketRes = await db.select().from(jobTickets).where(eq(jobTickets.id, ticketId)).limit(1);
  const ticket = ticketRes[0];
  if (!ticket || !ticket.clarificationQ) {
    throw new Error("Invalid clarification request.");
  }

  const intakeResult = await processIntake({
    rawText: ticket.rawText,
    area: ticket.area || undefined,
    preferredDate: ticket.preferredDate || undefined,
    preferredWindow: ticket.preferredWindow || undefined,
    clarificationQ: ticket.clarificationQ,
    clarificationA: answer,
  });

  const { draft, source } = intakeResult;

  await db
    .update(jobTickets)
    .set({
      clarificationA: answer,
      summary: draft.summary,
      category: draft.category !== "unknown" ? draft.category : ticket.category,
      tags: draft.tags.length > 0 ? draft.tags : ticket.tags,
      urgency: draft.urgency,
      hazard: draft.hazard || ticket.hazard,
      aiSource: source,
      editedByUser: true,
    })
    .where(eq(jobTickets.id, ticketId));

  revalidatePath(`/tickets/${ticketId}`);
}
