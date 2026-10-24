export type BookingStatus =
  | "requested"
  | "accepted"
  | "declined"
  | "alternative_proposed"
  | "cancelled"
  | "completed";

export type ActorRole = "resident" | "provider" | "system";

export type ActionType =
  | "provider_accept"
  | "provider_decline"
  | "provider_propose"
  | "resident_accept_proposal"
  | "resident_reject_proposal"
  | "resident_cancel"
  | "provider_complete";

export interface SlotEffect {
  slotId: string;
  newStatus: "available" | "held" | "booked";
}

export interface TransitionResult {
  nextStatus: BookingStatus;
  slotEffects: SlotEffect[];
  eventNote?: string;
  updatedSlotId?: string;
}

export function transitionBooking(
  currentStatus: BookingStatus,
  action: ActionType,
  actor: ActorRole,
  context: {
    currentSlotId: string;
    proposedSlotId?: string | null;
    newProposedSlotId?: string | null;
  }
): TransitionResult {
  switch (currentStatus) {
    case "requested": {
      if (action === "provider_accept" && actor === "provider") {
        return {
          nextStatus: "accepted",
          slotEffects: [{ slotId: context.currentSlotId, newStatus: "booked" }],
          eventNote: "Provider confirmed the appointment.",
        };
      }
      if (action === "provider_decline" && actor === "provider") {
        return {
          nextStatus: "declined",
          slotEffects: [{ slotId: context.currentSlotId, newStatus: "available" }],
          eventNote: "Provider declined the request.",
        };
      }
      if (action === "provider_propose" && actor === "provider") {
        if (!context.newProposedSlotId) {
          throw new Error("Proposed slot ID is required.");
        }
        return {
          nextStatus: "alternative_proposed",
          slotEffects: [
            { slotId: context.currentSlotId, newStatus: "available" },
            { slotId: context.newProposedSlotId, newStatus: "held" },
          ],
          eventNote: "Provider suggested an alternative time slot.",
        };
      }
      if (action === "resident_cancel" && actor === "resident") {
        return {
          nextStatus: "cancelled",
          slotEffects: [{ slotId: context.currentSlotId, newStatus: "available" }],
          eventNote: "Resident cancelled the booking request.",
        };
      }
      break;
    }

    case "alternative_proposed": {
      const activeProposal = context.proposedSlotId;
      if (!activeProposal) {
        throw new Error("No active proposal slot found.");
      }

      if (action === "resident_accept_proposal" && actor === "resident") {
        return {
          nextStatus: "accepted",
          updatedSlotId: activeProposal,
          slotEffects: [{ slotId: activeProposal, newStatus: "booked" }],
          eventNote: "Resident accepted proposed new time.",
        };
      }
      if (action === "resident_reject_proposal" && actor === "resident") {
        return {
          nextStatus: "cancelled",
          slotEffects: [{ slotId: activeProposal, newStatus: "available" }],
          eventNote: "Resident declined the proposed time.",
        };
      }
      if (action === "provider_propose" && actor === "provider") {
        if (!context.newProposedSlotId) {
          throw new Error("New proposed slot ID is required.");
        }
        return {
          nextStatus: "alternative_proposed",
          slotEffects: [
            { slotId: activeProposal, newStatus: "available" },
            { slotId: context.newProposedSlotId, newStatus: "held" },
          ],
          eventNote: "Provider replaced proposal with another time.",
        };
      }
      break;
    }

    case "accepted": {
      if (action === "provider_complete" && actor === "provider") {
        return {
          nextStatus: "completed",
          slotEffects: [],
          eventNote: "Provider marked the job as completed.",
        };
      }
      if (action === "resident_cancel" && (actor === "resident" || actor === "provider")) {
        return {
          nextStatus: "cancelled",
          slotEffects: [{ slotId: context.currentSlotId, newStatus: "available" }],
          eventNote: `${actor === "resident" ? "Resident" : "Provider"} cancelled the booking.`,
        };
      }
      break;
    }

    default:
      break;
  }

  throw new Error(`Invalid transition: Cannot execute ${action} by ${actor} from state ${currentStatus}`);
}
