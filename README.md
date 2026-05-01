# SMMH Hospital Website v2.0 — Supabase Edition

## What Is New in v2.0

| Feature | Before | After |
|---|---|---|
| Appointment booking | Fake setTimeout | Real API → Supabase DB |
| Confirmation message | Generic text | Doctor's Hospital-style confirmation |
| Contact form | Not functional | Real API → Supabase DB |
| Careers apply | mailto link | Modal form → Supabase DB |
| Missing pages | Broken nav links | /patients, /media, /lab-results all built |
| Backend | None | 3 API routes under /api/ |
| Database | None | Supabase PostgreSQL with RLS policies |

---

## STEP 1 — Create a Free Supabase Project

1. Go to https://supabase.com and sign up (free tier is enough)
2. Click "New Project"
3. Name it: smmh-hospital
4. Choose Database Password (save it), Region: Singapore (closest to Pakistan)
5. Wait ~2 minutes for the project to provision

---

## STEP 2 — Run the Database Schema

1. Supabase Dashboard → SQL Editor → New Query
2. Open the file supabase-setup.sql from this project
3. Paste the entire file and click Run
4. This creates 3 tables: appointments, contact_messages, job_applications

### Table: appointments
Every booking request from the website goes here.
Columns: first_name, last_name, phone, email, department, preferred_date, notes, status, created_at

### Table: contact_messages
All messages submitted via the Contact page.
Columns: name, email, phone, subject, message, status, created_at

### Table: job_applications
All career applications from the Careers page modal.
Columns: name, email, phone, position, experience, cover_letter, status, created_at

---

## STEP 3 — Get Your API Keys

Supabase Dashboard → Settings (gear icon) → API

Copy:
- Project URL: https://your-project-id.supabase.co
- anon / public key (safe for browser use)
- service_role key (NEVER expose this publicly, server only)

---

## STEP 4 — Create .env.local

Create a file called .env.local in the project root:

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

IMPORTANT: Never commit .env.local to Git. It is already in .gitignore.

---

## STEP 5 — Install and Run

npm install
npm run dev

Open http://localhost:3000

---

## STEP 6 — Test the Appointment Flow

1. Go to homepage, scroll to Book an Appointment
2. Fill in the form with test data
3. Click Confirm Appointment Request
4. You will see the green confirmation screen:
   "Your appointment request has been received. Our hospital team will
   contact you as soon as possible and tell you the exact date and time."
5. Go to Supabase → Table Editor → appointments to see the new row

---

## How the Flow Works

User fills form
  → AppointmentForm.jsx sends POST /api/appointments
  → pages/api/appointments.js validates data
  → Inserts row into Supabase appointments table
  → Returns success
  → AppointmentForm shows green confirmation screen
  → Hospital staff see new row in Supabase
  → Staff calls patient to confirm exact date and time

---

## Viewing Submissions

Go to Supabase → Table Editor:
- appointments: filter status = pending to see new requests
- contact_messages: filter status = unread for new messages
- job_applications: filter status = received for new applications

You can update status directly in the table editor.

---

## Why Supabase?

- Free tier: 500MB database, unlimited API calls
- No separate server needed, works with Next.js API routes directly
- PostgreSQL: full relational DB for future expansion
- Row Level Security: public can only submit (INSERT); only admin can read
- Works perfectly from Pakistan, Singapore region has low latency

---

## Future Enhancements

1. Admin Dashboard at /admin to view and manage all appointments
2. Email Notifications via Resend or SendGrid on form submission
3. SMS via Twilio to automatically notify patients on booking
4. Doctor Profiles stored in Supabase with real availability
5. Authentication so hospital staff can log in securely
6. Appointment Calendar showing available time slots per department

---

## Project Structure

smmh/
  .env.local              (create this with your Supabase keys)
  .env.local.example      (template)
  supabase-setup.sql      (run this in Supabase SQL Editor)
  lib/
    supabaseClient.js     (Supabase browser client)
  pages/
    api/
      appointments.js     (POST: saves booking to Supabase)
      contact.js          (POST: saves message to Supabase)
      careers.js          (POST: saves job application to Supabase)
    index.jsx
    about.jsx
    services.jsx
    departments.jsx
    doctors.jsx
    contact.jsx           (now has real working contact form)
    careers.jsx           (now has real in-page apply modal)
    patients.jsx          (NEW: rights, visitor guide, insurance panels)
    media.jsx             (NEW: news and events)
    lab-results.jsx       (NEW: lab results portal)
  components/
    AppointmentForm.jsx   (now calls real API, shows proper confirmation)
