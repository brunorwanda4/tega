# Tega Database Schema

This folder documents the planned database structure for the Tega transport booking and operations system.

## Files

```text
Tega DB schema.sql    SQL schema definition
Tega DB schema.pdf    Visual/exported schema reference
```

## Database Type

The SQL file is written for a PostgreSQL-style database. It uses:

- UUID primary keys with `gen_random_uuid()`
- `timestamptz` timestamp fields
- Foreign keys between business entities
- Tables for users, companies, buses, drivers, routes, trips, bookings, payments, tracking, messaging, notifications, reviews, and administration

## How It Fits The App

The frontend currently contains screens for passenger booking, dashboard management, tracking, payments, and admin operations. This schema is the planned backend data model for those screens.

When backend implementation starts, use this schema as the source of truth for:

- Database migrations
- API route design
- Form payloads and validation
- Dashboard data queries
- Booking and payment workflows

If the schema changes, update both the SQL file and this documentation so future developers know which model the application expects.
