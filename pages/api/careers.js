// pages/api/careers.js
// ─── POST /api/careers  — saves job application to Supabase ──────────────────
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, position, experience, coverLetter } = req.body;

  if (!name || !email || !phone || !position) {
    return res.status(400).json({ error: "Name, email, phone, and position are required." });
  }

  const { data, error } = await supabase
    .from("job_applications")
    .insert([
      {
        name,
        email,
        phone,
        position,
        experience:   experience || null,
        cover_letter: coverLetter || null,
        status:       "received",
        created_at:   new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Supabase careers error:", error);
    return res.status(500).json({ error: "Failed to submit application. Please try again." });
  }

  return res.status(200).json({ success: true, id: data.id });
}
