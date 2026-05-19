// pages/api/appointments.js
import { createClient } from "@supabase/supabase-js";

const getAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

export default async function handler(req, res) {
  const supabase = getAdmin();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)
    return res.status(500).json({ error: "Missing Supabase credentials" });

  // GET — admin fetch all
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  }

  // PATCH — update status (confirm / reject)
  if (req.method === "PATCH") {
    const { id, status } = req.body;
    if (!id || !status) return res.status(400).json({ error: "ID and status required." });
    const { data, error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id)
      .select();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  }

  // DELETE
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID required." });
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  // POST — public booking
  if (req.method === "POST") {
    const { firstName, lastName, phone, email, department, preferredDate, notes } = req.body;
    if (!firstName || !lastName || !phone || !department || !preferredDate)
      return res.status(400).json({ error: "Please fill in all required fields." });

    const { data, error } = await supabase
      .from("appointments")
      .insert([{ first_name: firstName, last_name: lastName, phone, email, department, preferred_date: preferredDate, notes, status: "pending" }])
      .select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true, data });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
