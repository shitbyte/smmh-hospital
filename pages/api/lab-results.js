export default async function handler(req, res) {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // GET - patient fetches their results
  if (req.method === "GET") {
    const { mrn, phone } = req.query;
    if (!mrn || !phone) {
      return res.status(400).json({ error: "MRN and phone are required" });
    }
    const { data, error } = await supabase
      .from("lab_results")
      .select("*")
      .eq("mrn", mrn.trim())
      .eq("phone", phone.trim())
      .gt("expires_at", new Date().toISOString())
      .order("uploaded_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ results: data });
  }

  // POST - staff uploads a result
  if (req.method === "POST") {
    const { mrn, patient_name, phone, test_name, file_url, file_type } = req.body;
    if (!mrn || !patient_name || !phone || !test_name || !file_url) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const { data, error } = await supabase
      .from("lab_results")
      .insert([{ mrn, patient_name, phone, test_name, file_url, file_type }])
      .select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true, data });
  }

  return res.status(405).json({ error: "Method not allowed" });
}