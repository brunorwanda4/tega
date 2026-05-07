# Tega

Tega is a Next.js transport booking and operations application. The project contains a public landing page, mobile-style passenger screens, admin screens, and a desktop dashboard for managing transport operations.

## What The Project Does

The application is organized around four main areas:

- Public site: `/` introduces the Tega service.
- Passenger app: `/app` contains booking, route browsing, trip tracking, notifications, profile, payments, and settings screens.
- Authentication: `/auth/login`, `/auth/register`, `/auth/forgot-password`, and `/auth/verify-email` handle passenger account flows.
- Admin and dashboard: `/admin`, `/manager`, and `/d` contain operational views for clients, drivers, vehicles, payments, audit logs, tracking, and communications.

The app is also configured as a PWA. Production builds generate service-worker files into `public`, provide an `/offline` page, and cache static assets such as images, fonts, CSS, and JavaScript.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn-style UI components in `src/components/ui`
- Bun for package management and scripts
- `next-pwa` for Progressive Web App support
- MapLibre and React Map GL for map/tracking UI

## Project Structure

```text
src/
  app/
    page.tsx                 Public home page
    (mobile)/                Mobile/passenger and admin app routes
    d/                       Desktop dashboard routes
    offline/                 PWA offline page
    terms/                   Terms page
  components/
    common/                  Shared application components
    ui/                      Reusable UI primitives
  hooks/                     Shared React hooks
  lib/                       Shared utilities, fonts, and PWA helpers
public/                      Static assets and generated PWA files
database-schema/             Planned database schema documents
release/tega-portable/       Portable production build for flash disk handoff
```

## Requirements For Development

Install Bun first:

```bash
bun --version
```

Then install project dependencies:

```bash
bun install
```

## Run In Development

```bash
bun run dev
```

The development server runs on:

```text
http://localhost:4544
```

## Production Build

```bash
bun run build
```

This project uses Next.js standalone output:

```ts
output: "standalone"
```

Because of that, Next.js does not create a `dist` folder. The production build is written to:

```text
.next/
.next/standalone/
.next/static/
public/
```

Run the production server locally with:

```bash
bun run start
```

The production server runs on:

```text
http://localhost:4545
```

## Flash Disk / Portable Run

A portable build can be prepared inside:

```text
release/tega-portable/
```

That folder should contain:

```text
server.js
package.json
node_modules/
.next/
public/
runtime/node.exe
start.bat
```

To give the project to someone who does not have Node.js installed:

1. Copy `release/tega-portable` to the flash disk.
2. On the other computer, open the folder.
3. Double-click `start.bat`.
4. Open `http://localhost:4545` in the browser.

The `runtime/node.exe` file is bundled with the portable folder, so the other computer does not need a global Node.js installation.

## Database Schema

The planned database model is documented in:

```text
database-schema/Tega DB schema.sql
database-schema/Tega DB schema.pdf
```

The schema is designed for a PostgreSQL-style database. It uses UUID primary keys, timestamp fields, foreign keys, and operational tables for the main transport workflow.

Main schema areas:

- Users and authentication: `users`, `verification_codes`, `password_resets`, `user_sessions`, `user_devices`, `user_preferences`
- Geography and fares: `provinces`, `districts`, `locations`, `location_fares`, `fare_rules`, `public_holidays`
- Companies and fleet: `companies`, `company_documents`, `company_bank_accounts`, `company_settings`, `buses`, `bus_seats`, `bus_documents`, `bus_maintenance_logs`, `bus_inspections`
- Drivers: `drivers`, `driver_documents`, `driver_ratings`, `driver_suspensions`
- Routes and trips: `routes`, `route_stops`, `route_schedules`, `trips`, `trip_seat_locks`
- Bookings and tickets: `bookings`, `booking_seats`, `booking_cancellations`, `tickets`, `ticket_scans`
- Payments: `payments`, `mobile_money_callbacks`, `payment_refunds`, `platform_fees`, `payment_audit_logs`
- Tracking: `bus_locations`, `trip_waypoints`, `geofence_zones`, `geofence_events`
- Communication and notifications: `conversations`, `conversation_participants`, `messages`, `message_reads`, `message_attachments`, `notification_templates`, `notifications`, `push_tokens`
- Reviews: `trip_reviews`, `company_reviews`, `review_responses`
- Administration and system control: `admins`, `admin_roles`, `admin_role_permissions`, `admin_sessions`, `audit_logs`, `system_logs`, `api_request_logs`, `app_settings`, `feature_flags`, `supported_regions`, `announcement_banners`

The current frontend screens use static/mock data in many places. When backend work starts, these tables should be connected through API routes or a separate backend service, then the UI pages can replace mock data with real queries.

## Useful Scripts

```bash
bun run dev       # Start local development server on port 4544
bun run build     # Create the production Next.js build
bun run start     # Start production server on port 4545
bun run lint      # Run Biome checks
bun run format    # Format files with Biome
```

## Notes For Future Development

- Keep route files inside `src/app` aligned with the App Router folder structure.
- Put shared UI primitives in `src/components/ui`.
- Put reusable business components in `src/components/common` or route-level `_components` folders.
- Keep database changes synchronized with the files inside `database-schema`.
- If the project becomes fully backend-connected, document required environment variables in this README.
