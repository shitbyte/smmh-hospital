import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const ADMIN_PASSWORD = "smmh2026";
const LAB_PASSWORD   = "smmhlab2026";

export default function AdminDashboard() {
  const [password, setPassword]         = useState("");
  const [loggedIn, setLoggedIn]         = useState("");
  const [error, setError]               = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(false);
  const [activeTab, setActiveTab]       = useState("pending");
  const [labMrn, setLabMrn]             = useState("");
  const [labName, setLabName]           = useState("");
  const [labPhone, setLabPhone]         = useState("");
  const [labTestName, setLabTestName]   = useState("");
  const [labFile, setLabFile]           = useState(null);
  const [labUploading, setLabUploading] = useState(false);
  const [labSuccess, setLabSuccess]     = useState("");
  const [labError, setLabError]         = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD)    { setLoggedIn("admin"); setError(""); }
    else if (password === LAB_PASSWORD) { setLoggedIn("lab");   setError(""); }
    else setError("Incorrect password. Try again.");
  };

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments").select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("Fetch error:", error);
    else setAppointments(data);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("appointments").update({ status }).eq("id", id);
    if (error) alert("Error: " + error.message);
    else fetchAppointments();
  };

  const uploadLabResult = async (e) => {
    e.preventDefault();
    setLabUploading(true); setLabError(""); setLabSuccess("");
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const sb = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      const fileExt  = labFile.name.split(".").pop();
      const fileName = `${labMrn}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await sb.storage
        .from("lab-results").upload(fileName, labFile);
      if (uploadError) throw new Error(uploadError.message);
      const { data: urlData } = sb.storage
        .from("lab-results").getPublicUrl(fileName);
      const res = await fetch("/api/lab-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mrn: labMrn, patient_name: labName, phone: labPhone,
          test_name: labTestName, file_url: urlData.publicUrl,
          file_type: fileExt === "pdf" ? "pdf" : "image"
        })
      });
      if (!res.ok) throw new Error("Failed to save");
      setLabSuccess("✅ Lab result uploaded successfully!");
      setLabMrn(""); setLabName(""); setLabPhone("");
      setLabTestName(""); setLabFile(null);
    } catch (err) { setLabError("❌ " + err.message); }
    setLabUploading(false);
  };

  useEffect(() => {
    if (loggedIn === "admin") fetchAppointments();
  }, [loggedIn]);

  const pendingList   = appointments.filter(a => a.status === "pending");
  const confirmedList = appointments.filter(a => a.status === "confirmed");
  const cancelledList = appointments.filter(a => a.status === "cancelled");
  const displayed = activeTab === "pending" ? pendingList
    : activeTab === "confirmed" ? confirmedList : cancelledList;

  const tabStyle = (tab) => {
    const colors = { pending: "#d97706", confirmed: "#16a34a", cancelled: "#dc2626" };
    return {
      padding: "12px 24px", border: "none",
      borderBottom: activeTab === tab ? `3px solid ${colors[tab]}` : "3px solid transparent",
      background: "white", color: activeTab === tab ? colors[tab] : "#6b7280",
      fontWeight: activeTab === tab ? "700" : "400", fontSize: "15px", cursor: "pointer",
    };
  };

  // ── Login Screen ──────────────────────────────────────
  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0fdf4" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
          <h1 style={{ color: "#065f46", marginBottom: "8px", fontSize: "24px" }}>🏥 SMMH Portal</h1>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>Enter your staff password</p>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Enter password" value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1fae5", fontSize: "16px", marginBottom: "12px", boxSizing: "border-box" }} />
            {error && <p style={{ color: "#dc2626", marginBottom: "12px" }}>{error}</p>}
            <button type="submit" style={{ width: "100%", padding: "12px", background: "#065f46", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── LAB STAFF SCREEN (completely separate) ────────────
  if (loggedIn === "lab") {
    return (
      <div style={{ minHeight: "100vh", background: "#f0f9ff", padding: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ color: "#0369a1", fontSize: "28px", margin: 0 }}>🔬 Lab Results Portal</h1>
            <p style={{ color: "#6b7280", margin: "4px 0 0" }}>Saiera Miraj Memorial Hospital</p>
          </div>
          <button onClick={() => setLoggedIn("")} style={{ padding: "8px 16px", background: "#dc2626", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            Logout
          </button>
        </div>

        <div style={{ background: "white", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", maxWidth: "560px" }}>
          <h3 style={{ color: "#0369a1", marginBottom: "24px", fontSize: "20px" }}>⬆️ Upload Lab Result</h3>
          <form onSubmit={uploadLabResult}>
            {[
              { label: "MRN",          value: labMrn,      setter: setLabMrn,      placeholder: "SMMH-2024-00123" },
              { label: "Patient Name", value: labName,     setter: setLabName,     placeholder: "Full name" },
              { label: "Phone",        value: labPhone,    setter: setLabPhone,    placeholder: "03XX-XXXXXXX" },
              { label: "Test Name",    value: labTestName, setter: setLabTestName, placeholder: "e.g. Blood Count, X-Ray" },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontWeight: "600", color: "#374151", marginBottom: "6px", fontSize: "13px" }}>{f.label} *</label>
                <input value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.placeholder} required
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #bae6fd", fontSize: "15px", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontWeight: "600", color: "#374151", marginBottom: "6px", fontSize: "13px" }}>FILE (Image or PDF) *</label>
              <input type="file" accept="image/*,.pdf" onChange={e => setLabFile(e.target.files[0])} required
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #bae6fd", boxSizing: "border-box" }} />
            </div>
            {labError   && <p style={{ color: "#dc2626", marginBottom: "12px" }}>{labError}</p>}
            {labSuccess && <p style={{ color: "#16a34a", marginBottom: "12px" }}>{labSuccess}</p>}
            <button type="submit" disabled={labUploading} style={{ width: "100%", padding: "14px", background: "#0369a1", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}>
              {labUploading ? "Uploading..." : "⬆️ Upload Lab Result"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── ADMIN SCREEN ──────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", padding: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ color: "#065f46", fontSize: "28px", margin: 0 }}>🏥 Appointments Dashboard</h1>
          <p style={{ color: "#6b7280", margin: "4px 0 0" }}>Saiera Miraj Memorial Hospital</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={fetchAppointments} style={{ padding: "8px 16px", background: "#e0f2fe", color: "#0369a1", border: "none", borderRadius: "8px", cursor: "pointer" }}>🔄 Refresh</button>
          <button onClick={() => setLoggedIn("")} style={{ padding: "8px 16px", background: "#dc2626", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Logout</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "24px", maxWidth: "600px" }}>
        {[
          { label: "Pending",   count: pendingList.length,   color: "#d97706" },
          { label: "Confirmed", count: confirmedList.length, color: "#16a34a" },
          { label: "Cancelled", count: cancelledList.length, color: "#dc2626" },
        ].map(s => (
          <div key={s.label} style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center", borderTop: `4px solid ${s.color}` }}>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: s.color }}>{s.count}</div>
            <div style={{ color: "#6b7280", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
          <button style={tabStyle("pending")}   onClick={() => setActiveTab("pending")}>🕐 Pending ({pendingList.length})</button>
          <button style={tabStyle("confirmed")} onClick={() => setActiveTab("confirmed")}>✅ Confirmed ({confirmedList.length})</button>
          <button style={tabStyle("cancelled")} onClick={() => setActiveTab("cancelled")}>❌ Cancelled ({cancelledList.length})</button>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: "32px", color: "#6b7280" }}>Loading...</p>
        ) : displayed.length === 0 ? (
          <p style={{ textAlign: "center", padding: "32px", color: "#6b7280" }}>No {activeTab} appointments</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#065f46", color: "white" }}>
                {["Patient", "Phone", "Email", "Department", "Date", "Notes", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "14px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.map((a, i) => (
                <tr key={a.id} style={{ background: i % 2 === 0 ? "white" : "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px 16px", fontWeight: "500" }}>{a.first_name} {a.last_name}</td>
                  <td style={{ padding: "12px 16px" }}>{a.phone}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px" }}>{a.email || "—"}</td>
                  <td style={{ padding: "12px 16px" }}>{a.department}</td>
                  <td style={{ padding: "12px 16px" }}>{a.preferred_date}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px" }}>{a.notes || "—"}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {activeTab === "pending" && <>
                        <button onClick={() => updateStatus(a.id, "confirmed")} style={{ padding: "6px 14px", background: "#16a34a", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>✓ Confirm</button>
                        <button onClick={() => updateStatus(a.id, "cancelled")} style={{ padding: "6px 14px", background: "#dc2626", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>✗ Cancel</button>
                      </>}
                      {activeTab === "confirmed" && <>
                        <button onClick={() => updateStatus(a.id, "cancelled")} style={{ padding: "6px 14px", background: "#dc2626", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>✗ Cancel</button>
                        <button onClick={() => updateStatus(a.id, "pending")}   style={{ padding: "6px 14px", background: "#d97706", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>↩ Pending</button>
                      </>}
                      {activeTab === "cancelled" && (
                        <button onClick={() => updateStatus(a.id, "pending")} style={{ padding: "6px 14px", background: "#d97706", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>↩ Restore</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
