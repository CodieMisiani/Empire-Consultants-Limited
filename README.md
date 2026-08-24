# Empire Consultants Limited

Production-ready Next.js marketing site and CMS backed by Supabase.

## Local setup

1. Copy `.env.example` to `.env.local` and add Supabase credentials.
2. Run `pnpm install` then `pnpm dev`.
3. Apply `supabase/migrations/202608240001_initial_schema.sql` through the Supabase CLI or dashboard migration workflow.
4. Create the first Auth user, then set its `profiles.is_admin` to `true` in a secure SQL migration/dashboard session.

## Deployment checklist

- Put every environment variable in the hosting dashboard; never commit `.env.local`.
- Run migrations as part of the deploy pipeline, before application traffic is shifted.
- Configure a Google Apps Script/Sheets webhook in `GOOGLE_SHEETS_WEBHOOK_URL`; backup errors never block lead capture.
- Configure Resend and `LEAD_NOTIFICATION_EMAIL` for lead alerts.
- Set a weekly uptime ping/alert for Supabase free projects; free projects may pause after inactivity.
- Confirm current Supabase/hosting backup, bandwidth, MAU and storage limits before launch. Use a separate Supabase project/branch for staging.
- Add Sentry through `SENTRY_DSN`, set provider usage alerts, and review Kenya Data Protection Act, 2019 language with legal counsel before publishing the privacy policy.

## Security

Admin routes are guarded by Supabase Auth and an `is_admin` profile flag; RLS policies protect admin data. The public lead endpoint uses server-side validation, a honeypot and IP rate limiting. Do not expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
