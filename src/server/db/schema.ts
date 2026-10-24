import { pgTable, text, integer, boolean, numeric, date, timestamp, jsonb, uniqueIndex, index } from "drizzle-orm/pg-core";

export const providers = pgTable(
  "providers",
  {
    id: text("id").primaryKey(),
    displayName: text("display_name").notNull(),
    categories: text("categories").array().notNull(),
    tags: text("tags").array().notNull(),
    homeArea: text("home_area").notNull(),
    areasServed: text("areas_served").array().notNull(),
    languages: text("languages").array().notNull(),
    rating: numeric("rating", { precision: 2, scale: 1 }).notNull().default("4.5"),
    jobsCompleted: integer("jobs_completed").notNull().default(0),
    verificationStatus: text("verification_status").notNull().default("sample_profile"),
    visitFeeLkr: integer("visit_fee_lkr"),
    phoneMasked: text("phone_masked").notNull().default("+94 7X XXX XX12"),
    bio: text("bio"),
    active: boolean("active").notNull().default(true),
  },
  (table) => [
    index("providers_home_area_idx").on(table.homeArea),
  ]
);

export const providerSlots = pgTable(
  "provider_slots",
  {
    id: text("id").primaryKey(),
    providerId: text("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    window: text("window").notNull(),
    status: text("status").notNull().default("available"), // available, held, booked
  },
  (table) => [
    uniqueIndex("provider_slot_unique_idx").on(table.providerId, table.date, table.window),
    index("provider_slots_provider_date_idx").on(table.providerId, table.date),
  ]
);

export const jobTickets = pgTable(
  "job_tickets",
  {
    id: text("id").primaryKey(),
    rawText: text("raw_text").notNull(),
    clarificationQ: text("clarification_q"),
    clarificationA: text("clarification_a"),
    detectedLanguage: text("detected_language").notNull().default("unknown"),
    summary: text("summary").notNull(),
    category: text("category").notNull().default("unknown"),
    tags: text("tags").array().notNull().default([]),
    area: text("area"),
    preferredDate: date("preferred_date"),
    preferredWindow: text("preferred_window"),
    urgency: text("urgency").notNull().default("normal"), // low, normal, high
    hazard: boolean("hazard").notNull().default(false),
    missingDetails: text("missing_details").array().notNull().default([]),
    aiSource: text("ai_source").notNull().default("ai"), // ai, fallback
    aiRaw: jsonb("ai_raw"),
    editedByUser: boolean("edited_by_user").notNull().default(false),
    status: text("status").notNull().default("draft"), // draft -> confirmed -> booked
    residentName: text("resident_name"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("job_tickets_status_idx").on(table.status),
  ]
);

export const bookings = pgTable(
  "bookings",
  {
    id: text("id").primaryKey(),
    ticketId: text("ticket_id")
      .notNull()
      .references(() => jobTickets.id, { onDelete: "cascade" }),
    providerId: text("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    slotId: text("slot_id")
      .notNull()
      .references(() => providerSlots.id, { onDelete: "restrict" }),
    proposedSlotId: text("proposed_slot_id").references(() => providerSlots.id, {
      onDelete: "set null",
    }),
    status: text("status").notNull().default("requested"), // requested, accepted, declined, alternative_proposed, cancelled, completed
    residentRating: integer("resident_rating"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("bookings_provider_status_idx").on(table.providerId, table.status),
    index("bookings_ticket_idx").on(table.ticketId),
  ]
);

export const bookingEvents = pgTable(
  "booking_events",
  {
    id: text("id").primaryKey(),
    bookingId: text("booking_id")
      .notNull()
      .references(() => bookings.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // requested, accepted, declined, alternative_proposed, cancelled, completed, etc.
    actor: text("actor").notNull(), // resident, provider, system
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("booking_events_booking_created_idx").on(table.bookingId, table.createdAt),
  ]
);

export type Provider = typeof providers.$inferSelect;
export type ProviderSlot = typeof providerSlots.$inferSelect;
export type JobTicket = typeof jobTickets.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type BookingEvent = typeof bookingEvents.$inferSelect;
