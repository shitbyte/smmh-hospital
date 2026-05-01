// pages/api/contact.js
// ─── POST /api/contact  — saves contact message to Supabase ─────────────────
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .insert([
      {
        name,
        email,
        phone:   phone || null,
        subject: subject || null,
        message,
        status:  "unread",
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Supabase contact error:", error);
    return res.status(500).json({ error: "Failed to send message. Please try again." });
  }

  return res.status(200).json({ success: true, id: data.id });
}
