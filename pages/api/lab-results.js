// pages/api/lab-results.js
import { createClient } from "@supabase/supabase-js";

const getAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

export default async function handler(req, res) {
  const supabase = getAdmin();

  // GET — fetch all results (lab admin) or by MRN (public patient lookup)
  if (req.method === "GET") {
    const { mrn } = req.query;

    // Patient lookup by MRN — only return non-expired results
    if (mrn) {
      const { data, error } = await supabase
        .from("lab_results")
        .select("*")
        .eq("mrn", mrn)
        .gt("expires_at", new Date().toISOString())
        .order("uploaded_at", { ascending: false });

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ data });
    }

    // Lab admin — fetch all
    const { data, error } = await supabase
      .from("lab_results")
      .select("*")
      .order("uploaded_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  }

  // POST — upload new lab result (lab admin)
  if (req.method === "POST") {
    const { mrn, patient_name, phone, test_name, file_url, file_type, expires_at } = req.body;

    if (!mrn || !patient_name || !phone || !test_name || !file_url)
      return res.status(400).json({ error: "MRN, patient name, phone, test name and file are required." });

    const { data, error } = await supabase
      .from("lab_results")
      .insert([{ mrn, patient_name, phone, test_name, file_url, file_type, expires_at }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true, data });
  }

  // DELETE — remove lab result (lab admin)
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID required." });

    const { error } = await supabase.from("lab_results").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
