CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "full_name" varchar(120) NOT NULL,
  "phone_number" varchar(20) UNIQUE NOT NULL,
  "email" varchar(150) UNIQUE,
  "password_hash" text NOT NULL,
  "is_verified" boolean NOT NULL DEFAULT false,
  "is_active" boolean NOT NULL DEFAULT true,
  "profile_photo_url" text,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "verification_codes" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "code" varchar(8) NOT NULL,
  "type" varchar(20) NOT NULL,
  "expires_at" timestamptz NOT NULL,
  "used" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "password_resets" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "token" text UNIQUE NOT NULL,
  "expires_at" timestamptz NOT NULL,
  "used" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "user_sessions" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "refresh_token" text UNIQUE NOT NULL,
  "device_id" uuid,
  "ip_address" varchar(45),
  "expires_at" timestamptz NOT NULL,
  "revoked" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "user_devices" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "device_token" text NOT NULL,
  "platform" varchar(10) NOT NULL,
  "device_model" varchar(80),
  "app_version" varchar(20),
  "is_active" boolean NOT NULL DEFAULT true,
  "last_seen_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "user_preferences" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "user_id" uuid UNIQUE NOT NULL,
  "language" varchar(5) NOT NULL DEFAULT 'rw',
  "notifications_on" boolean NOT NULL DEFAULT true,
  "seat_preference" varchar(10),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "provinces" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" varchar(80) UNIQUE NOT NULL
);

CREATE TABLE "districts" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "province_id" uuid NOT NULL,
  "name" varchar(80) NOT NULL
);

CREATE TABLE "locations" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "district_id" uuid NOT NULL,
  "name" varchar(120) NOT NULL,
  "short_name" varchar(40),
  "lat" float NOT NULL,
  "lng" float NOT NULL,
  "is_terminal" boolean NOT NULL DEFAULT false,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "location_fares" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "origin_id" uuid NOT NULL,
  "destination_id" uuid NOT NULL,
  "base_price_rwf" float NOT NULL,
  "distance_km" float,
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "fare_rules" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" varchar(80) NOT NULL,
  "multiplier" float NOT NULL DEFAULT 1,
  "applies_from" time,
  "applies_to" time,
  "days_of_week" varchar(20),
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "public_holidays" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" varchar(80) NOT NULL,
  "date" date UNIQUE NOT NULL,
  "fare_rule_id" uuid
);

CREATE TABLE "companies" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" varchar(150) NOT NULL,
  "registration_number" varchar(50) UNIQUE NOT NULL,
  "logo_url" text,
  "contact_phone" varchar(20) NOT NULL,
  "contact_email" varchar(150),
  "headquarters_id" uuid,
  "is_approved" boolean NOT NULL DEFAULT false,
  "is_suspended" boolean NOT NULL DEFAULT false,
  "approved_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "company_documents" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "company_id" uuid NOT NULL,
  "type" varchar(40) NOT NULL,
  "file_url" text NOT NULL,
  "expires_at" date,
  "verified" boolean NOT NULL DEFAULT false,
  "uploaded_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "company_bank_accounts" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "company_id" uuid NOT NULL,
  "bank_name" varchar(80) NOT NULL,
  "account_number" varchar(30) NOT NULL,
  "is_primary" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "company_settings" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "company_id" uuid UNIQUE NOT NULL,
  "allow_group_booking" boolean NOT NULL DEFAULT true,
  "max_seats_per_booking" int NOT NULL DEFAULT 6,
  "cancellation_hours" int NOT NULL DEFAULT 2,
  "auto_confirm_booking" boolean NOT NULL DEFAULT false
);

CREATE TABLE "company_stats_cache" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "company_id" uuid UNIQUE NOT NULL,
  "total_trips" int NOT NULL DEFAULT 0,
  "total_bookings" int NOT NULL DEFAULT 0,
  "total_revenue_rwf" float NOT NULL DEFAULT 0,
  "avg_rating" float,
  "last_computed_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "buses" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "company_id" uuid NOT NULL,
  "plate_number" varchar(20) UNIQUE NOT NULL,
  "model" varchar(100),
  "total_seats" int NOT NULL,
  "status" varchar(20) NOT NULL DEFAULT 'active',
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "bus_seats" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "bus_id" uuid NOT NULL,
  "seat_number" varchar(5) NOT NULL
);

CREATE TABLE "bus_documents" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "bus_id" uuid NOT NULL,
  "type" varchar(40) NOT NULL,
  "file_url" text NOT NULL,
  "expires_at" date,
  "verified" boolean NOT NULL DEFAULT false,
  "uploaded_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "bus_maintenance_logs" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "bus_id" uuid NOT NULL,
  "type" varchar(60) NOT NULL,
  "description" text,
  "done_at" date NOT NULL,
  "next_due_at" date,
  "cost_rwf" float,
  "created_by" uuid,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "bus_inspections" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "bus_id" uuid NOT NULL,
  "inspected_by" uuid,
  "result" varchar(20) NOT NULL,
  "notes" text,
  "inspected_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "drivers" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "company_id" uuid NOT NULL,
  "phone_number" varchar(20) UNIQUE NOT NULL,
  "license_number" varchar(50) UNIQUE NOT NULL,
  "photo_url" text,
  "status" varchar(20) NOT NULL DEFAULT 'available',
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "driver_documents" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "driver_id" uuid NOT NULL,
  "type" varchar(40) NOT NULL,
  "file_url" text NOT NULL,
  "expires_at" date,
  "verified" boolean NOT NULL DEFAULT false,
  "uploaded_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "driver_ratings" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "driver_id" uuid NOT NULL,
  "trip_id" uuid NOT NULL,
  "rated_by" uuid NOT NULL,
  "score" int NOT NULL,
  "comment" text,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "driver_suspensions" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "driver_id" uuid NOT NULL,
  "reason" text NOT NULL,
  "suspended_by" uuid NOT NULL,
  "from_date" date NOT NULL,
  "to_date" date,
  "lifted" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "routes" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "company_id" uuid NOT NULL,
  "origin_id" uuid NOT NULL,
  "dest_id" uuid NOT NULL,
  "distance_km" float,
  "est_minutes" int,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "route_stops" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "route_id" uuid NOT NULL,
  "location_id" uuid NOT NULL,
  "stop_order" int NOT NULL,
  "est_minutes_from_origin" int
);

CREATE TABLE "route_schedules" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "route_id" uuid NOT NULL,
  "departure_time" time NOT NULL,
  "days_of_week" varchar(20) NOT NULL,
  "is_active" boolean NOT NULL DEFAULT true
);

CREATE TABLE "trips" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "route_id" uuid NOT NULL,
  "bus_id" uuid NOT NULL,
  "driver_id" uuid NOT NULL,
  "schedule_id" uuid,
  "departure_time" timestamptz NOT NULL,
  "arrival_time" timestamptz,
  "status" varchar(20) NOT NULL DEFAULT 'scheduled',
  "available_seats" int NOT NULL,
  "price_rwf" float NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "trip_seat_locks" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "trip_id" uuid NOT NULL,
  "bus_seat_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "locked_at" timestamptz NOT NULL DEFAULT (now()),
  "expires_at" timestamptz NOT NULL
);

CREATE TABLE "bookings" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "trip_id" uuid NOT NULL,
  "booking_reference" varchar(12) UNIQUE NOT NULL,
  "status" varchar(20) NOT NULL DEFAULT 'pending',
  "total_amount_rwf" float NOT NULL,
  "seats_count" int NOT NULL DEFAULT 1,
  "booked_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "booking_seats" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "booking_id" uuid NOT NULL,
  "bus_seat_id" uuid NOT NULL,
  "passenger_name" varchar(120)
);

CREATE TABLE "booking_cancellations" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "booking_id" uuid UNIQUE NOT NULL,
  "reason" text,
  "cancelled_by" varchar(10) NOT NULL,
  "actor_id" uuid,
  "refund_amount" float NOT NULL DEFAULT 0,
  "cancelled_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "tickets" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "booking_id" uuid NOT NULL,
  "seat_id" uuid NOT NULL,
  "qr_code" text UNIQUE NOT NULL,
  "is_used" boolean NOT NULL DEFAULT false,
  "issued_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "ticket_scans" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "ticket_id" uuid NOT NULL,
  "scanned_by" uuid,
  "scanned_at" timestamptz NOT NULL DEFAULT (now()),
  "result" varchar(20) NOT NULL,
  "location_id" uuid
);

CREATE TABLE "payments" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "booking_id" uuid UNIQUE NOT NULL,
  "provider" varchar(10) NOT NULL,
  "phone_number" varchar(20) NOT NULL,
  "status" varchar(20) NOT NULL DEFAULT 'pending',
  "amount_rwf" float NOT NULL,
  "platform_fee_rwf" float NOT NULL DEFAULT 0,
  "paid_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "mobile_money_callbacks" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "payment_id" uuid,
  "provider" varchar(10) NOT NULL,
  "raw_payload" text NOT NULL,
  "status" varchar(20) NOT NULL,
  "received_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "payment_refunds" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "payment_id" uuid NOT NULL,
  "amount_rwf" float NOT NULL,
  "reason" text,
  "status" varchar(20) NOT NULL DEFAULT 'pending',
  "initiated_by" uuid,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "platform_fees" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "payment_id" uuid UNIQUE NOT NULL,
  "company_id" uuid NOT NULL,
  "fee_rwf" float NOT NULL,
  "percentage" float NOT NULL,
  "settled" boolean NOT NULL DEFAULT false,
  "settled_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "bus_locations" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "trip_id" uuid NOT NULL,
  "lat" float NOT NULL,
  "lng" float NOT NULL,
  "speed_kmh" float,
  "heading_deg" float,
  "recorded_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "trip_waypoints" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "trip_id" uuid NOT NULL,
  "location_id" uuid NOT NULL,
  "arrived_at" timestamptz,
  "departed_at" timestamptz
);

CREATE TABLE "geofence_zones" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "location_id" uuid NOT NULL,
  "radius_m" int NOT NULL DEFAULT 200,
  "type" varchar(20) NOT NULL,
  "is_active" boolean NOT NULL DEFAULT true
);

CREATE TABLE "geofence_events" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "trip_id" uuid NOT NULL,
  "geofence_zone_id" uuid NOT NULL,
  "event_type" varchar(10) NOT NULL,
  "occurred_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "conversations" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "trip_id" uuid NOT NULL,
  "type" varchar(20) NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "conversation_participants" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "conversation_id" uuid NOT NULL,
  "user_id" uuid,
  "driver_id" uuid,
  "joined_at" timestamptz NOT NULL DEFAULT (now()),
  "is_muted" boolean NOT NULL DEFAULT false
);

CREATE TABLE "messages" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "conversation_id" uuid NOT NULL,
  "sender_role" varchar(10) NOT NULL,
  "sender_driver_id" uuid,
  "sender_user_id" uuid,
  "content" text NOT NULL,
  "type" varchar(10) NOT NULL DEFAULT 'chat',
  "is_broadcast" boolean NOT NULL DEFAULT false,
  "sent_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "message_reads" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "message_id" uuid NOT NULL,
  "reader_id" uuid NOT NULL,
  "read_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "message_attachments" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "message_id" uuid NOT NULL,
  "file_url" text NOT NULL,
  "file_type" varchar(20) NOT NULL,
  "file_size" int,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "notification_templates" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "code" varchar(60) UNIQUE NOT NULL,
  "body_rw" text NOT NULL,
  "body_en" text NOT NULL,
  "channel" varchar(20) NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "notifications" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "template_id" uuid,
  "body" text NOT NULL,
  "data" text,
  "channel" varchar(20) NOT NULL,
  "is_read" boolean NOT NULL DEFAULT false,
  "sent_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "push_tokens" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "device_id" uuid NOT NULL,
  "token" text UNIQUE NOT NULL,
  "platform" varchar(10) NOT NULL,
  "is_active" boolean NOT NULL DEFAULT true,
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "trip_reviews" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "booking_id" uuid UNIQUE NOT NULL,
  "user_id" uuid NOT NULL,
  "trip_id" uuid NOT NULL,
  "overall" int NOT NULL,
  "punctuality" int,
  "comfort" int,
  "cleanliness" int,
  "comment" text,
  "is_visible" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "company_reviews" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "company_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "score" int NOT NULL,
  "comment" text,
  "is_visible" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "review_responses" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "review_type" varchar(10) NOT NULL,
  "review_id" uuid NOT NULL,
  "responder" varchar(10) NOT NULL,
  "actor_id" uuid NOT NULL,
  "content" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "admins" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "full_name" varchar(120) NOT NULL,
  "email" varchar(150) UNIQUE NOT NULL,
  "password_hash" text NOT NULL,
  "role_id" uuid NOT NULL,
  "is_active" boolean NOT NULL DEFAULT true,
  "last_login_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "admin_roles" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" varchar(60) UNIQUE NOT NULL,
  "description" text,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "admin_role_permissions" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "role_id" uuid NOT NULL,
  "permission" varchar(80) NOT NULL
);

CREATE TABLE "admin_sessions" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "admin_id" uuid NOT NULL,
  "refresh_token" text UNIQUE NOT NULL,
  "ip_address" varchar(45),
  "expires_at" timestamptz NOT NULL,
  "revoked" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "audit_logs" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "actor_type" varchar(10) NOT NULL,
  "actor_id" uuid,
  "action" varchar(80) NOT NULL,
  "entity_type" varchar(40) NOT NULL,
  "entity_id" uuid,
  "old_data" text,
  "new_data" text,
  "ip_address" varchar(45),
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "system_logs" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "level" varchar(10) NOT NULL,
  "service" varchar(40) NOT NULL,
  "message" text NOT NULL,
  "context" text,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "api_request_logs" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "method" varchar(10) NOT NULL,
  "path" text NOT NULL,
  "status_code" int NOT NULL,
  "duration_ms" int,
  "user_id" uuid,
  "admin_id" uuid,
  "ip_address" varchar(45),
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "payment_audit_logs" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "payment_id" uuid NOT NULL,
  "event" varchar(40) NOT NULL,
  "actor_type" varchar(10),
  "actor_id" uuid,
  "details" text,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "app_settings" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "key" varchar(80) UNIQUE NOT NULL,
  "value" text NOT NULL,
  "description" text,
  "updated_by" uuid,
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "feature_flags" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" varchar(80) UNIQUE NOT NULL,
  "is_enabled" boolean NOT NULL DEFAULT false,
  "description" text,
  "updated_by" uuid,
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "supported_regions" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "province_id" uuid NOT NULL,
  "is_active" boolean NOT NULL DEFAULT true,
  "launched_at" date
);

CREATE TABLE "announcement_banners" (
  "id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "title_rw" varchar(200) NOT NULL,
  "title_en" varchar(200) NOT NULL,
  "body_rw" text NOT NULL,
  "body_en" text NOT NULL,
  "type" varchar(20) NOT NULL,
  "target" varchar(20) NOT NULL DEFAULT 'all',
  "starts_at" timestamptz NOT NULL,
  "ends_at" timestamptz,
  "created_by" uuid,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE UNIQUE INDEX ON "bus_seats" ("bus_id", "seat_number");

CREATE UNIQUE INDEX ON "route_stops" ("route_id", "stop_order");

CREATE UNIQUE INDEX ON "trip_seat_locks" ("trip_id", "bus_seat_id");

CREATE UNIQUE INDEX ON "booking_seats" ("booking_id", "bus_seat_id");

CREATE UNIQUE INDEX ON "message_reads" ("message_id", "reader_id");

CREATE UNIQUE INDEX ON "admin_role_permissions" ("role_id", "permission");

COMMENT ON COLUMN "users"."phone_number" IS 'e.g. +250788123456';

COMMENT ON COLUMN "verification_codes"."type" IS 'registration | password_reset | phone_change';

COMMENT ON COLUMN "user_devices"."device_token" IS 'FCM/APNs push token';

COMMENT ON COLUMN "user_devices"."platform" IS 'android | ios';

COMMENT ON COLUMN "user_preferences"."language" IS 'rw | en | fr';

COMMENT ON COLUMN "user_preferences"."seat_preference" IS 'window | aisle | any';

COMMENT ON COLUMN "provinces"."name" IS 'e.g. Kigali City, Southern Province';

COMMENT ON COLUMN "districts"."name" IS 'e.g. Nyarugenge, Muhanga';

COMMENT ON TABLE "locations" IS 'All named stops like Nyabugogo, Muhanga Bus Park, Gitarama live here';

COMMENT ON COLUMN "locations"."name" IS 'e.g. Nyabugogo, Muhanga Bus Park';

COMMENT ON COLUMN "locations"."short_name" IS 'Display label on map';

COMMENT ON COLUMN "locations"."is_terminal" IS 'Major bus park vs roadside stop';

COMMENT ON TABLE "location_fares" IS 'Stores approved RURA fare for every origin→destination pair. e.g. Nyabugogo→Muhanga = 1500 RWF';

COMMENT ON COLUMN "location_fares"."base_price_rwf" IS 'Government-regulated base fare';

COMMENT ON COLUMN "fare_rules"."name" IS 'e.g. Peak Hour Surcharge, Holiday Rate';

COMMENT ON COLUMN "fare_rules"."days_of_week" IS 'CSV: 1,2,3,4,5 for Mon-Fri';

COMMENT ON COLUMN "companies"."registration_number" IS 'RURA licence number';

COMMENT ON COLUMN "companies"."headquarters_id" IS 'Main terminal city';

COMMENT ON COLUMN "company_documents"."type" IS 'rura_licence | tax_clearance | insurance';

COMMENT ON COLUMN "company_settings"."cancellation_hours" IS 'Hours before trip to allow free cancel';

COMMENT ON TABLE "company_stats_cache" IS 'Materialized summary for admin dashboard. Rebuilt nightly by cron job.';

COMMENT ON COLUMN "buses"."status" IS 'active | maintenance | retired';

COMMENT ON COLUMN "bus_seats"."seat_number" IS 'e.g. 1A, 2B';

COMMENT ON COLUMN "bus_documents"."type" IS 'roadworthiness | insurance | rura_permit';

COMMENT ON COLUMN "bus_maintenance_logs"."type" IS 'routine | repair | emergency';

COMMENT ON COLUMN "bus_inspections"."result" IS 'passed | failed | conditional';

COMMENT ON COLUMN "drivers"."status" IS 'available | on_trip | off_duty | suspended';

COMMENT ON COLUMN "driver_documents"."type" IS 'national_id | driving_licence | police_clearance';

COMMENT ON COLUMN "driver_ratings"."score" IS '1 to 5';

COMMENT ON TABLE "routes" IS 'Price is NOT here — it comes from location_fares and fare_rules';

COMMENT ON COLUMN "routes"."origin_id" IS 'e.g. Nyabugogo';

COMMENT ON COLUMN "routes"."dest_id" IS 'e.g. Muhanga Bus Park';

COMMENT ON COLUMN "route_stops"."est_minutes_from_origin" IS 'Estimated travel time from origin to this stop';

COMMENT ON TABLE "route_schedules" IS 'Template used to auto-generate trips each day';

COMMENT ON COLUMN "route_schedules"."departure_time" IS 'Recurring daily time, e.g. 07:00';

COMMENT ON COLUMN "route_schedules"."days_of_week" IS 'CSV: 1,2,3,4,5,6,7';

COMMENT ON COLUMN "trips"."schedule_id" IS 'NULL = manually created trip';

COMMENT ON COLUMN "trips"."status" IS 'scheduled | boarding | in_progress | completed | cancelled';

COMMENT ON COLUMN "trips"."price_rwf" IS 'Computed from location_fares + fare_rules at trip creation';

COMMENT ON TABLE "trip_seat_locks" IS 'Temporary 10-min hold while user is in checkout. Prevents double booking.';

COMMENT ON COLUMN "bookings"."booking_reference" IS 'e.g. TGA-9F2K8';

COMMENT ON COLUMN "bookings"."status" IS 'pending | confirmed | cancelled | completed';

COMMENT ON COLUMN "booking_seats"."passenger_name" IS 'Optional: name of person on this specific seat';

COMMENT ON COLUMN "booking_cancellations"."cancelled_by" IS 'user | admin | system';

COMMENT ON COLUMN "booking_cancellations"."actor_id" IS 'user_id or admin_id who cancelled';

COMMENT ON COLUMN "tickets"."qr_code" IS 'Encoded ticket token for scanning at boarding';

COMMENT ON COLUMN "ticket_scans"."result" IS 'valid | already_used | invalid';

COMMENT ON COLUMN "ticket_scans"."location_id" IS 'Where the scan happened';

COMMENT ON COLUMN "payments"."provider" IS 'mtn | airtel';

COMMENT ON COLUMN "payments"."phone_number" IS 'MoMo number that paid';

COMMENT ON COLUMN "payments"."status" IS 'pending | success | failed | refunded';

COMMENT ON COLUMN "payments"."platform_fee_rwf" IS 'Tega commission cut';

COMMENT ON TABLE "mobile_money_callbacks" IS 'Stores every raw webhook hit from MTN/Airtel for debugging and reconciliation';

COMMENT ON COLUMN "mobile_money_callbacks"."provider" IS 'mtn | airtel';

COMMENT ON COLUMN "mobile_money_callbacks"."raw_payload" IS 'Raw JSON from provider webhook';

COMMENT ON COLUMN "payment_refunds"."status" IS 'pending | success | failed';

COMMENT ON TABLE "platform_fees" IS 'Tega takes a % from each booking. Settled to company monthly.';

COMMENT ON COLUMN "platform_fees"."percentage" IS 'e.g. 3.5 for 3.5%';

COMMENT ON TABLE "bus_locations" IS 'GPS ping every few seconds from driver app. Latest ping = live bus position.';

COMMENT ON COLUMN "bus_locations"."heading_deg" IS '0-360 compass bearing';

COMMENT ON TABLE "trip_waypoints" IS 'Records actual arrival/departure times at each stop during a live trip';

COMMENT ON COLUMN "geofence_zones"."radius_m" IS 'Radius in metres around the location';

COMMENT ON COLUMN "geofence_zones"."type" IS 'terminal | stop | restricted';

COMMENT ON TABLE "geofence_events" IS 'Triggered when bus enters or exits a terminal zone. Used for ETA updates.';

COMMENT ON COLUMN "geofence_events"."event_type" IS 'enter | exit';

COMMENT ON TABLE "conversations" IS 'Each trip has its own conversation scope. Direct = driver↔one customer. Broadcast = driver→all passengers.';

COMMENT ON COLUMN "conversations"."type" IS 'direct | broadcast';

COMMENT ON TABLE "conversation_participants" IS 'Defines who is part of a conversation. One row per participant.';

COMMENT ON COLUMN "conversation_participants"."user_id" IS 'Set for customer participants';

COMMENT ON COLUMN "conversation_participants"."driver_id" IS 'Set for driver participant';

COMMENT ON COLUMN "messages"."sender_role" IS 'driver | customer';

COMMENT ON COLUMN "messages"."sender_driver_id" IS 'Filled when driver sends';

COMMENT ON COLUMN "messages"."sender_user_id" IS 'Filled when customer sends';

COMMENT ON COLUMN "messages"."type" IS 'chat | alert | update';

COMMENT ON COLUMN "message_attachments"."file_type" IS 'image | document';

COMMENT ON COLUMN "message_attachments"."file_size" IS 'bytes';

COMMENT ON COLUMN "notification_templates"."code" IS 'e.g. BOOKING_CONFIRMED, BUS_DELAYED';

COMMENT ON COLUMN "notification_templates"."channel" IS 'push | sms | both';

COMMENT ON COLUMN "notifications"."data" IS 'JSON payload: trip_id, booking_id etc.';

COMMENT ON COLUMN "notifications"."channel" IS 'push | sms';

COMMENT ON COLUMN "push_tokens"."platform" IS 'android | ios';

COMMENT ON COLUMN "trip_reviews"."overall" IS '1-5 stars';

COMMENT ON COLUMN "trip_reviews"."punctuality" IS '1-5';

COMMENT ON COLUMN "trip_reviews"."comfort" IS '1-5';

COMMENT ON COLUMN "trip_reviews"."cleanliness" IS '1-5';

COMMENT ON COLUMN "company_reviews"."score" IS '1-5';

COMMENT ON COLUMN "review_responses"."review_type" IS 'trip | company';

COMMENT ON COLUMN "review_responses"."review_id" IS 'Points to trip_reviews or company_reviews';

COMMENT ON COLUMN "review_responses"."responder" IS 'company | admin';

COMMENT ON COLUMN "admin_roles"."name" IS 'e.g. super_admin, support, finance, inspector';

COMMENT ON COLUMN "admin_role_permissions"."permission" IS 'e.g. companies.approve, drivers.suspend, refunds.issue';

COMMENT ON TABLE "audit_logs" IS 'Immutable record of every significant change in the system';

COMMENT ON COLUMN "audit_logs"."actor_type" IS 'admin | user | system';

COMMENT ON COLUMN "audit_logs"."action" IS 'e.g. company.approved, booking.cancelled, driver.suspended';

COMMENT ON COLUMN "audit_logs"."entity_type" IS 'e.g. company | driver | trip | booking';

COMMENT ON COLUMN "audit_logs"."old_data" IS 'JSON snapshot before change';

COMMENT ON COLUMN "audit_logs"."new_data" IS 'JSON snapshot after change';

COMMENT ON TABLE "system_logs" IS 'Application-level logs. Purged after 90 days.';

COMMENT ON COLUMN "system_logs"."level" IS 'info | warn | error | critical';

COMMENT ON COLUMN "system_logs"."service" IS 'e.g. booking-service, payment-service, tracking-service';

COMMENT ON COLUMN "system_logs"."context" IS 'JSON extra data';

COMMENT ON TABLE "api_request_logs" IS 'HTTP request log for rate limiting and debugging. Purged after 30 days.';

COMMENT ON COLUMN "api_request_logs"."method" IS 'GET | POST | PUT | DELETE';

COMMENT ON TABLE "payment_audit_logs" IS 'Complete payment lifecycle trail for dispute resolution';

COMMENT ON COLUMN "payment_audit_logs"."event" IS 'initiated | callback_received | confirmed | failed | refund_requested | refunded';

COMMENT ON COLUMN "payment_audit_logs"."actor_type" IS 'user | admin | system | provider';

COMMENT ON COLUMN "payment_audit_logs"."details" IS 'JSON details specific to this event';

COMMENT ON TABLE "app_settings" IS 'Runtime config values editable by super_admin without redeployment';

COMMENT ON COLUMN "app_settings"."key" IS 'e.g. platform_fee_percent, max_booking_seats';

COMMENT ON COLUMN "feature_flags"."name" IS 'e.g. enable_group_booking, live_tracking_v2';

COMMENT ON TABLE "supported_regions" IS 'Controls which provinces the app is live in. Rolled out province by province.';

COMMENT ON COLUMN "announcement_banners"."type" IS 'info | warning | maintenance';

COMMENT ON COLUMN "announcement_banners"."target" IS 'all | customers | companies';

ALTER TABLE "verification_codes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "password_resets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_sessions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_sessions" ADD FOREIGN KEY ("device_id") REFERENCES "user_devices" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_devices" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_preferences" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "districts" ADD FOREIGN KEY ("province_id") REFERENCES "provinces" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "locations" ADD FOREIGN KEY ("district_id") REFERENCES "districts" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "location_fares" ADD FOREIGN KEY ("origin_id") REFERENCES "locations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "location_fares" ADD FOREIGN KEY ("destination_id") REFERENCES "locations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "public_holidays" ADD FOREIGN KEY ("fare_rule_id") REFERENCES "fare_rules" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "companies" ADD FOREIGN KEY ("headquarters_id") REFERENCES "locations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "company_documents" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "company_bank_accounts" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "company_settings" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "company_stats_cache" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "buses" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bus_seats" ADD FOREIGN KEY ("bus_id") REFERENCES "buses" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bus_documents" ADD FOREIGN KEY ("bus_id") REFERENCES "buses" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bus_maintenance_logs" ADD FOREIGN KEY ("bus_id") REFERENCES "buses" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bus_maintenance_logs" ADD FOREIGN KEY ("created_by") REFERENCES "admins" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bus_inspections" ADD FOREIGN KEY ("bus_id") REFERENCES "buses" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bus_inspections" ADD FOREIGN KEY ("inspected_by") REFERENCES "admins" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "drivers" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "driver_documents" ADD FOREIGN KEY ("driver_id") REFERENCES "drivers" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "driver_ratings" ADD FOREIGN KEY ("driver_id") REFERENCES "drivers" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "driver_ratings" ADD FOREIGN KEY ("trip_id") REFERENCES "trips" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "driver_ratings" ADD FOREIGN KEY ("rated_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "driver_suspensions" ADD FOREIGN KEY ("driver_id") REFERENCES "drivers" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "driver_suspensions" ADD FOREIGN KEY ("suspended_by") REFERENCES "admins" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "routes" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "routes" ADD FOREIGN KEY ("origin_id") REFERENCES "locations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "routes" ADD FOREIGN KEY ("dest_id") REFERENCES "locations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "route_stops" ADD FOREIGN KEY ("route_id") REFERENCES "routes" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "route_stops" ADD FOREIGN KEY ("location_id") REFERENCES "locations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "route_schedules" ADD FOREIGN KEY ("route_id") REFERENCES "routes" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trips" ADD FOREIGN KEY ("route_id") REFERENCES "routes" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trips" ADD FOREIGN KEY ("bus_id") REFERENCES "buses" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trips" ADD FOREIGN KEY ("driver_id") REFERENCES "drivers" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trips" ADD FOREIGN KEY ("schedule_id") REFERENCES "route_schedules" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trip_seat_locks" ADD FOREIGN KEY ("trip_id") REFERENCES "trips" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trip_seat_locks" ADD FOREIGN KEY ("bus_seat_id") REFERENCES "bus_seats" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trip_seat_locks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bookings" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bookings" ADD FOREIGN KEY ("trip_id") REFERENCES "trips" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "booking_seats" ADD FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "booking_seats" ADD FOREIGN KEY ("bus_seat_id") REFERENCES "bus_seats" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "booking_cancellations" ADD FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tickets" ADD FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tickets" ADD FOREIGN KEY ("seat_id") REFERENCES "booking_seats" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ticket_scans" ADD FOREIGN KEY ("ticket_id") REFERENCES "tickets" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ticket_scans" ADD FOREIGN KEY ("scanned_by") REFERENCES "drivers" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ticket_scans" ADD FOREIGN KEY ("location_id") REFERENCES "locations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "payments" ADD FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "mobile_money_callbacks" ADD FOREIGN KEY ("payment_id") REFERENCES "payments" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "payment_refunds" ADD FOREIGN KEY ("payment_id") REFERENCES "payments" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "payment_refunds" ADD FOREIGN KEY ("initiated_by") REFERENCES "admins" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "platform_fees" ADD FOREIGN KEY ("payment_id") REFERENCES "payments" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "platform_fees" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bus_locations" ADD FOREIGN KEY ("trip_id") REFERENCES "trips" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trip_waypoints" ADD FOREIGN KEY ("trip_id") REFERENCES "trips" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trip_waypoints" ADD FOREIGN KEY ("location_id") REFERENCES "locations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "geofence_zones" ADD FOREIGN KEY ("location_id") REFERENCES "locations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "geofence_events" ADD FOREIGN KEY ("trip_id") REFERENCES "trips" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "geofence_events" ADD FOREIGN KEY ("geofence_zone_id") REFERENCES "geofence_zones" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "conversations" ADD FOREIGN KEY ("trip_id") REFERENCES "trips" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "conversation_participants" ADD FOREIGN KEY ("conversation_id") REFERENCES "conversations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "conversation_participants" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "conversation_participants" ADD FOREIGN KEY ("driver_id") REFERENCES "drivers" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "messages" ADD FOREIGN KEY ("conversation_id") REFERENCES "conversations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "messages" ADD FOREIGN KEY ("sender_driver_id") REFERENCES "drivers" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "messages" ADD FOREIGN KEY ("sender_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "message_reads" ADD FOREIGN KEY ("message_id") REFERENCES "messages" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "message_reads" ADD FOREIGN KEY ("reader_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "message_attachments" ADD FOREIGN KEY ("message_id") REFERENCES "messages" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "notifications" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "notifications" ADD FOREIGN KEY ("template_id") REFERENCES "notification_templates" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "push_tokens" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "push_tokens" ADD FOREIGN KEY ("device_id") REFERENCES "user_devices" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trip_reviews" ADD FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trip_reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trip_reviews" ADD FOREIGN KEY ("trip_id") REFERENCES "trips" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "company_reviews" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "company_reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "admins" ADD FOREIGN KEY ("role_id") REFERENCES "admin_roles" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "admin_role_permissions" ADD FOREIGN KEY ("role_id") REFERENCES "admin_roles" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "admin_sessions" ADD FOREIGN KEY ("admin_id") REFERENCES "admins" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "api_request_logs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "api_request_logs" ADD FOREIGN KEY ("admin_id") REFERENCES "admins" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "payment_audit_logs" ADD FOREIGN KEY ("payment_id") REFERENCES "payments" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "app_settings" ADD FOREIGN KEY ("updated_by") REFERENCES "admins" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "feature_flags" ADD FOREIGN KEY ("updated_by") REFERENCES "admins" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "supported_regions" ADD FOREIGN KEY ("province_id") REFERENCES "provinces" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "announcement_banners" ADD FOREIGN KEY ("created_by") REFERENCES "admins" ("id") DEFERRABLE INITIALLY IMMEDIATE;
