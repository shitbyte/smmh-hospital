export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "exists" : "missing");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return res.status(500).json({ error: "Missing Supabase credentials" });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const { firstName, lastName, phone, email, department, preferredDate, notes } = req.body;

  if (!firstName || !lastName || !phone || !department || !preferredDate) {
    return res.status(400).json({ error: "Please fill in all required fields" });
  }

  const { data, error } = await supabase
    .from("appointments")
    .insert([{
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      department: department,
      preferred_date: preferredDate,
      notes: notes,
      status: "pending"
    }])
    .select();

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true, data });
}