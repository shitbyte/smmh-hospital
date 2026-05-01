-- ═══════════════════════════════════════════════════════════════════════════
--  SMMH Hospital Website — Supabase Database Setup
--  Run this entire file in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE 1: appointments
-- Stores every appointment request submitted from the website.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointments (
  id             BIGSERIAL PRIMARY KEY,
  first_name     TEXT        NOT NULL,
  last_name      TEXT        NOT NULL,
  phone          TEXT        NOT NULL,
  email          TEXT,
  department     TEXT        NOT NULL,
  preferred_date DATE        NOT NULL,
  notes          TEXT,
  status         TEXT        NOT NULL DEFAULT 'pending',
  -- status values: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Index for fast lookups by status and date
CREATE INDEX IF NOT EXISTS idx_appointments_status       ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_preferred_date ON appointments(preferred_date);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at   ON appointments(created_at DESC);


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE 2: contact_messages
-- Stores general enquiries submitted via the Contact page form.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  phone      TEXT,
  subject    TEXT,
  message    TEXT        NOT NULL,
  status     TEXT        NOT NULL DEFAULT 'unread',
  -- status values: 'unread' | 'read' | 'replied'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_status     ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages(created_at DESC);


-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE 3: job_applications
-- Stores career applications submitted via the Careers page modal.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_applications (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  phone        TEXT        NOT NULL,
  position     TEXT        NOT NULL,
  experience   TEXT,
  cover_letter TEXT,
  status       TEXT        NOT NULL DEFAULT 'received',
  -- status values: 'received' | 'shortlisted' | 'rejected' | 'hired'
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jobs_position   ON job_applications(position);
CREATE INDEX IF NOT EXISTS idx_jobs_status     ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON job_applications(created_at DESC);


-- ─────────────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- Allow anyone to INSERT (submit forms) but block public SELECT/UPDATE/DELETE.
-- Only your backend (service role key) can read all rows.
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE appointments    ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Anyone (anon) can insert a new appointment
CREATE POLICY "Allow public insert" ON appointments
  FOR INSERT TO anon WITH CHECK (true);

-- Anyone (anon) can insert a contact message
CREATE POLICY "Allow public insert" ON contact_messages
  FOR INSERT TO anon WITH CHECK (true);

-- Anyone (anon) can insert a job application
CREATE POLICY "Allow public insert" ON job_applications
  FOR INSERT TO anon WITH CHECK (true);

-- Only authenticated users (admin dashboard) can SELECT
CREATE POLICY "Allow auth select" ON appointments
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow auth select" ON contact_messages
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow auth select" ON job_applications
  FOR SELECT TO authenticated USING (true);

-- Only authenticated users can UPDATE (e.g. change status)
CREATE POLICY "Allow auth update" ON appointments
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow auth update" ON contact_messages
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow auth update" ON job_applications
  FOR UPDATE TO authenticated USING (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- VERIFY: check all three tables were created
-- ─────────────────────────────────────────────────────────────────────────────
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('appointments','contact_messages','job_applications');
