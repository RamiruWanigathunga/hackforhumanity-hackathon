"use server";

import { revalidatePath } from "next/cache";
import { JobTicket } from "../db/schema";
import { mockStore } from "../db/mock-store";
import { processIntake } from "../ai/intake";
import { resolveRelativeDay, getColomboToday } from "@/lib/time";

export async function createTicketAction(formData: FormData): Promise<{
  success: boolean;
  ticketId?: string;
  error?: string;
}> {
  try {
    const rawText = formData.get("rawText") as string;
    const area = formData.get("area") as string;
    const preferredDay = (formData.get("preferredDay") as string) || "tomorrow";
    const preferredWindow = (formData.get("preferredWindow") as string) || "morning";
    const residentName = (formData.get("residentName") as string) || null;

    if (!rawText || rawText.trim().length < 2) {
      return { success: false, error: "Please describe your problem in a few words." };
    }

    const preferredDate = resolveRelativeDay(preferredDay, getColomboToday());

    // Run AI Intake with Google Gemini
    const intakeResult = await processIntake({
      rawText,
      area,
      preferredDate: preferredDate || undefined,
      preferredWindow,
    });

    const { draft, source, rawAiResponse } = intakeResult;
    const ticketId = `tkt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newTicketData: JobTicket = {
      id: ticketId,
      rawText,
      clarificationQ: draft.clarifyingQuestion,
      clarificationA: null,
      detectedLanguage: draft.detectedLanguage,
      summary: draft.summary,
      category: draft.category,
      tags: draft.tags || [],
      area: draft.area || area || null,
      preferredDate: draft.preferredDate,
      preferredWindow: draft.preferredWindow,
      urgency: draft.urgency,
      hazard: draft.hazard,
      missingDetails: draft.missingDetails || [],
      aiSource: source,
      aiRaw: rawAiResponse || null,
      editedByUser: false,
      status: "draft",
      residentName,
      createdAt: new Date(),
    };

    mockStore.saveTicket(newTicketData);
    return { success: true, ticketId };
  } catch (err: unknown) {
    return {
      success: false,
      error: (err as Error)?.message || "Failed to process problem description.",
    };
  }
}

export async function updateTicketAction(ticketId: string, updates: {
  summary: string;
  category: string;
  tags: string[];
  area: string;
  preferredDate: string;
  preferredWindow: string;
  urgency: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    mockStore.updateTicket(ticketId, {
      ...updates,
      editedByUser: true,
    });
    revalidatePath(`/tickets/${ticketId}`);
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: (err as Error)?.message || "Failed to update ticket." };
  }
}

export async function confirmTicketAction(ticketId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const ticket = mockStore.getTicket(ticketId);
    if (!ticket) {
      return { success: false, error: "Ticket not found." };
    }

    if (ticket.category === "unknown") {
      return { success: false, error: "Please select a specific trade category before confirming." };
    }

    mockStore.updateTicket(ticketId, { status: "confirmed" });
    revalidatePath(`/tickets/${ticketId}`);
    revalidatePath(`/tickets/${ticketId}/matches`);
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: (err as Error)?.message || "Failed to confirm ticket." };
  }
}

export async function answerClarificationAction(ticketId: string, answer: string): Promise<{ success: boolean; error?: string }> {
  try {
    const ticket = mockStore.getTicket(ticketId);
    if (!ticket || !ticket.clarificationQ) {
      return { success: false, error: "Invalid clarification request." };
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

    mockStore.updateTicket(ticketId, {
      clarificationA: answer,
      summary: draft.summary,
      category: draft.category !== "unknown" ? draft.category : ticket.category,
      tags: draft.tags.length > 0 ? draft.tags : ticket.tags,
      urgency: draft.urgency,
      hazard: draft.hazard || ticket.hazard,
      aiSource: source,
      editedByUser: true,
    });

    revalidatePath(`/tickets/${ticketId}`);
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: (err as Error)?.message || "Failed to submit clarification." };
  }
}
