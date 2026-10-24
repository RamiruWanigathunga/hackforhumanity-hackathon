CREATE TABLE "booking_events" (
	"id" text PRIMARY KEY NOT NULL,
	"booking_id" text NOT NULL,
	"type" text NOT NULL,
	"actor" text NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" text PRIMARY KEY NOT NULL,
	"ticket_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"slot_id" text NOT NULL,
	"proposed_slot_id" text,
	"status" text DEFAULT 'requested' NOT NULL,
	"resident_rating" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_tickets" (
	"id" text PRIMARY KEY NOT NULL,
	"raw_text" text NOT NULL,
	"clarification_q" text,
	"clarification_a" text,
	"detected_language" text DEFAULT 'unknown' NOT NULL,
	"summary" text NOT NULL,
	"category" text DEFAULT 'unknown' NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"area" text,
	"preferred_date" date,
	"preferred_window" text,
	"urgency" text DEFAULT 'normal' NOT NULL,
	"hazard" boolean DEFAULT false NOT NULL,
	"missing_details" text[] DEFAULT '{}' NOT NULL,
	"ai_source" text DEFAULT 'ai' NOT NULL,
	"ai_raw" jsonb,
	"edited_by_user" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"resident_name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provider_slots" (
	"id" text PRIMARY KEY NOT NULL,
	"provider_id" text NOT NULL,
	"date" date NOT NULL,
	"window" text NOT NULL,
	"status" text DEFAULT 'available' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "providers" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"categories" text[] NOT NULL,
	"tags" text[] NOT NULL,
	"home_area" text NOT NULL,
	"areas_served" text[] NOT NULL,
	"languages" text[] NOT NULL,
	"rating" numeric(2, 1) DEFAULT '4.5' NOT NULL,
	"jobs_completed" integer DEFAULT 0 NOT NULL,
	"verification_status" text DEFAULT 'sample_profile' NOT NULL,
	"visit_fee_lkr" integer,
	"phone_masked" text DEFAULT '+94 7X XXX XX12' NOT NULL,
	"bio" text,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "booking_events" ADD CONSTRAINT "booking_events_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_ticket_id_job_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."job_tickets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slot_id_provider_slots_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."provider_slots"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_proposed_slot_id_provider_slots_id_fk" FOREIGN KEY ("proposed_slot_id") REFERENCES "public"."provider_slots"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_slots" ADD CONSTRAINT "provider_slots_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "booking_events_booking_created_idx" ON "booking_events" USING btree ("booking_id","created_at");--> statement-breakpoint
CREATE INDEX "bookings_provider_status_idx" ON "bookings" USING btree ("provider_id","status");--> statement-breakpoint
CREATE INDEX "bookings_ticket_idx" ON "bookings" USING btree ("ticket_id");--> statement-breakpoint
CREATE INDEX "job_tickets_status_idx" ON "job_tickets" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "provider_slot_unique_idx" ON "provider_slots" USING btree ("provider_id","date","window");--> statement-breakpoint
CREATE INDEX "provider_slots_provider_date_idx" ON "provider_slots" USING btree ("provider_id","date");--> statement-breakpoint
CREATE INDEX "providers_home_area_idx" ON "providers" USING btree ("home_area");