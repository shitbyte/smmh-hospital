// pages/api/job-postings.js
import { createClient } from "@supabase/supabase-js";

const getAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

export default async function handler(req, res) {
  const supabase = getAdmin();

  // GET — fetch all active job postings (public)
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("job_postings")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  }

  // POST — create new job posting (admin)
  if (req.method === "POST") {
    const { title, department, type, description, deadline } = req.body;
    if (!title || !department || !description)
      return res.status(400).json({ error: "Title, department and description are required." });

    const { data, error } = await supabase
      .from("job_postings")
      .insert([{ title, department, type, description, deadline }])
      .select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true, data });
  }

  // DELETE — remove job posting (admin)
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID required." });

    const { error } = await supabase.from("job_postings").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
