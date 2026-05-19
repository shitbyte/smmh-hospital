// pages/api/careers.js
import { createClient } from "@supabase/supabase-js";

const getAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

export default async function handler(req, res) {
  const supabase = getAdmin();

  // GET — admin fetch all applications
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  }

  // POST — public job application submission
  if (req.method === "POST") {
    const { name, email, phone, position, experience, cover_letter, cv_url, job_posting_id } = req.body;
    if (!name || !email || !phone || !position)
      return res.status(400).json({ error: "Name, email, phone and position are required." });

    const { data, error } = await supabase
      .from("job_applications")
      .insert([{ name, email, phone, position, experience, cover_letter, cv_url, job_posting_id }])
      .select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true, data });
  }

  // DELETE — admin remove application
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID required." });
    const { error } = await supabase.from("job_applications").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
