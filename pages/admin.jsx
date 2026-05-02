// pages/admin.jsx
import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "smmh2026";
const LAB_PASSWORD   = "smmhlab2026";

const ADMIN_TABS = ["Appointments", "Job Applications", "Contact Messages", "Job Postings", "Announcements"];
const LAB_TABS   = ["Lab Results"];

const btn = (bg, color = "#fff") => ({
  background: bg, color, border: "none", borderRadius: 6,
  padding: "6px 14px", fontWeight: 600, cursor: "pointer", fontSize: "0.82rem",
});

export default function AdminDashboard() {
  const [authed, setAuthed]   = useState(false);
  const [role, setRole]       = useState("");
  const [pw, setPw]           = useState("");
  const [pwErr, setPwErr]     = useState("");
  const [tab, setTab]         = useState("Appointments");
  const [loading, setLoading] = useState(false);

  // Admin data states
  const [appointments, setAppointments]   = useState([]);
  const [applications, setApplications]   = useState([]);
  const [messages, setMessages]           = useState([]);
  const [jobPostings, setJobPostings]     = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Admin form states
  const [jobForm, setJobForm] = useState({ title: "", department: "", type: "Full-time", description: "", deadline: "" });
  const [newsForm, setNewsForm] = useState({ title: "", description: "", image_url: "" });
  const [newsImage, setNewsImage] = useState(null);
  const [posting, setPosting] = useState(false);
  const [postMsg, setPostMsg] = useState("");

  // Lab states
  const [labResults, setLabResults]   = useState([]);
  const [labLoading, setLabLoading]   = useState(false);
  const [labFile, setLabFile]         = useState(null);
  const [labUploading, setLabUploading] = useState(false);
  const [labMsg, setLabMsg]           = useState("");
  const [labForm, setLabForm]         = useState({
    mrn: "", patient_name: "", phone: "", test_name: "", expires_days: "30"
  });

  const login = () => {
    if (pw === ADMIN_PASSWORD)     { setAuthed(true); setRole("admin"); setTab("Appointments"); }
    else if (pw === LAB_PASSWORD)  { setAuthed(true); setRole("lab");   setTab("Lab Results"); }
    else setPwErr("Incorrect password.");
  };

  // ── Fetch admin data ────────────────────────────────────────────────────────
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [a, ap, m, jp, an] = await Promise.all([
        fetch("/api/appointments?admin=1").then(r => r.json()),
        fetch("/api/careers?admin=1").then(r => r.json()),
        fetch("/api/contact?admin=1").then(r => r.json()),
        fetch("/api/job-postings?admin=1").then(r => r.json()),
        fetch("/api/news?admin=1").then(r => r.json()),
      ]);
      setAppointments(a.data || []);
      setApplications(ap.data || []);
      setMessages(m.data || []);
      setJobPostings(jp.data || []);
      setAnnouncements(an.data || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  // ── Fetch lab results ───────────────────────────────────────────────────────
  const fetchLabResults = async () => {
    setLabLoading(true);
    try {
      const res = await fetch("/api/lab-results");
      const data = await res.json();
      setLabResults(data.data || []);
    } catch (e) { console.error(e); }
    setLabLoading(false);
  };

  useEffect(() => {
    if (authed && role === "admin") fetchAll();
    if (authed && role === "lab")   fetchLabResults();
  }, [authed, role]);

  const deleteRow = async (endpoint, id, setter, list) => {
    if (!confirm("Delete this record?")) return;
    await fetch(endpoint, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setter(list.filter(r => r.id !== id));
  };

  // ── Upload image for announcements ──────────────────────────────────────────
  const uploadImage = async (file) => {
    const fileName = `news/${Date.now()}_${file.name.replace(/\s/g, "_")}`;
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/uploads/${fileName}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": file.type,
      },
      body: file,
    });
    if (!res.ok) throw new Error("Image upload failed");
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;
  };

  // ── Upload lab result file ──────────────────────────────────────────────────
  const uploadLabFile = async (file) => {
    const fileName = `${Date.now()}_${file.name.replace(/\s/g, "_")}`;
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/lab-results/${fileName}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": file.type,
      },
      body: file,
    });
    if (!res.ok) throw new Error("File upload failed");
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/lab-results/${fileName}`;
  };

  const postJob = async (e) => {
    e.preventDefault();
    setPosting(true); setPostMsg("");
    const res = await fetch("/api/job-postings", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobForm),
    });
    const data = await res.json();
    if (res.ok) {
      setPostMsg("✅ Job posted successfully!");
      setJobPostings(p => [data.data[0], ...p]);
      setJobForm({ title: "", department: "", type: "Full-time", description: "", deadline: "" });
    } else setPostMsg("❌ " + data.error);
    setPosting(false);
  };

  const postNews = async (e) => {
    e.preventDefault();
    setPosting(true); setPostMsg("");
    try {
      let image_url = newsForm.image_url;
      if (newsImage) image_url = await uploadImage(newsImage);
      const res = await fetch("/api/news", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newsForm, image_url }),
      });
      const data = await res.json();
      if (res.ok) {
        setPostMsg("✅ Announcement posted!");
        setAnnouncements(p => [data.data[0], ...p]);
        setNewsForm({ title: "", description: "", image_url: "" });
        setNewsImage(null);
      } else setPostMsg("❌ " + data.error);
    } catch (err) { setPostMsg("❌ " + err.message); }
    setPosting(false);
  };

  // ── Submit lab result ───────────────────────────────────────────────────────
  const submitLabResult = async (e) => {
    e.preventDefault();
    if (!labFile) return setLabMsg("❌ Please select a file to upload.");
    setLabUploading(true); setLabMsg("");
    try {
      const file_url  = await uploadLabFile(labFile);
      const file_type = labFile.type || "application/octet-stream";
      const expires_at = new Date(Date.now() + parseInt(labForm.expires_days) * 86400000).toISOString();

      const res = await fetch("/api/lab-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mrn:          labForm.mrn,
          patient_name: labForm.patient_name,
          phone:        labForm.phone,
          test_name:    labForm.test_name,
          file_url,
          file_type,
          expires_at,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setLabMsg("✅ Lab result uploaded successfully!");
        setLabResults(p => [data.data, ...p]);
        setLabForm({ mrn: "", patient_name: "", phone: "", test_name: "", expires_days: "30" });
        setLabFile(null);
      } else setLabMsg("❌ " + data.error);
    } catch (err) { setLabMsg("❌ " + err.message); }
    setLabUploading(false);
  };

  // ── Login screen ─────────────────────────────────────────────────────────────
  if (!authed) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 40, width: 340, boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 24, color: "#1e3a5f" }}>SMMH Admin Portal</h2>
        <input type="password" placeholder="Enter password" value={pw}
          onChange={e => { setPw(e.target.value); setPwErr(""); }}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 8, marginBottom: 12, fontSize: "0.95rem", boxSizing: "border-box" }}
        />
        {pwErr && <p style={{ color: "#dc2626", fontSize: "0.85rem", marginBottom: 8 }}>{pwErr}</p>}
        <button onClick={login} style={{ width: "100%", ...btn("#1e3a5f"), padding: "11px", fontSize: "0.95rem" }}>
          Login
        </button>
      </div>
    </div>
  );

  const TABS = role === "lab" ? LAB_TABS : ADMIN_TABS;

  const tabStyle = (t) => ({
    padding: "10px 18px", border: "none", cursor: "pointer", fontWeight: 600,
    fontSize: "0.85rem", borderRadius: "8px 8px 0 0",
    background: tab === t ? "#fff" : "#e2e8f0",
    color: tab === t ? "#1e3a5f" : "#64748b",
    borderBottom: tab === t ? "2px solid #1e3a5f" : "2px solid transparent",
  });

  const card       = { background: "#fff", borderRadius: 10, border: "1px solid #e5e7eb", padding: "14px 18px", marginBottom: 12, fontSize: "0.85rem" };
  const label      = { fontWeight: 700, color: "#1e3a5f" };
  const val        = { color: "#374151", marginLeft: 6 };
  const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: "0.9rem", boxSizing: "border-box", marginBottom: 12 };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#1e3a5f", color: "#fff", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, fontSize: "1.2rem" }}>
          SMMH {role === "lab" ? "Lab" : "Admin"} Dashboard
        </h1>
        <button onClick={() => { setAuthed(false); setPw(""); setRole(""); }} style={{ ...btn("#fff", "#1e3a5f"), padding: "7px 16px" }}>Logout</button>
      </div>

      {/* Tabs */}
      <div style={{ padding: "0 32px", background: "#e2e8f0", display: "flex", gap: 4, flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button key={t} style={tabStyle(t)} onClick={() => { setTab(t); setPostMsg(""); setLabMsg(""); }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1000, margin: "0 auto" }}>
        {loading && <p>Loading data...</p>}

        {/* ── Appointments ── */}
        {tab === "Appointments" && (
          <>
            <h2 style={{ color: "#1e3a5f", marginBottom: 16 }}>Appointments ({appointments.length})</h2>
            {appointments.length === 0 && <p style={{ color: "#6b7280" }}>No appointments yet.</p>}
            {appointments.map(a => (
              <div key={a.id} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <span style={label}>{a.first_name} {a.last_name}</span>
                    <span style={val}>— {a.department}</span>
                    <span style={{ ...val, color: "#6b7280" }}> | {a.phone}</span>
                    {a.email && <span style={{ ...val, color: "#6b7280" }}> | {a.email}</span>}
                    <br />
                    <span style={label}>Date:</span><span style={val}>{a.preferred_date}</span>
                    {a.notes && <><br /><span style={label}>Notes:</span><span style={val}>{a.notes}</span></>}
                    <br />
                    <span style={{ background: "#fef3c7", color: "#92400e", padding: "2px 8px", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600 }}>{a.status}</span>
                  </div>
                  <button onClick={() => deleteRow("/api/appointments", a.id, setAppointments, appointments)} style={btn("#dc2626")}>Delete</button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── Job Applications ── */}
        {tab === "Job Applications" && (
          <>
            <h2 style={{ color: "#1e3a5f", marginBottom: 16 }}>Job Applications ({applications.length})</h2>
            {applications.length === 0 && <p style={{ color: "#6b7280" }}>No applications yet.</p>}
            {applications.map(a => (
              <div key={a.id} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <span style={label}>{a.name}</span>
                    <span style={val}>— {a.position}</span>
                    <br />
                    <span style={label}>Email:</span><span style={val}>{a.email}</span>
                    <span style={{ ...val, color: "#6b7280" }}> | {a.phone}</span>
                    {a.experience && <><br /><span style={label}>Experience:</span><span style={val}>{a.experience}</span></>}
                    {a.cover_letter && <><br /><span style={label}>Cover Letter:</span><span style={val}>{a.cover_letter}</span></>}
                    {a.cv_url && (
                      <><br /><a href={a.cv_url} target="_blank" rel="noreferrer"
                        style={{ color: "#0369a1", fontWeight: 600, fontSize: "0.82rem" }}>📄 View CV</a></>
                    )}
                    <br />
                    <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "2px 8px", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600 }}>{a.status}</span>
                  </div>
                  <button onClick={() => deleteRow("/api/careers", a.id, setApplications, applications)} style={btn("#dc2626")}>Delete</button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── Contact Messages ── */}
        {tab === "Contact Messages" && (
          <>
            <h2 style={{ color: "#1e3a5f", marginBottom: 16 }}>Contact Messages ({messages.length})</h2>
            {messages.length === 0 && <p style={{ color: "#6b7280" }}>No messages yet.</p>}
            {messages.map(m => (
              <div key={m.id} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <span style={label}>{m.name}</span>
                    <span style={val}>— {m.email}</span>
                    {m.phone && <span style={{ ...val, color: "#6b7280" }}> | {m.phone}</span>}
                    {m.subject && <><br /><span style={label}>Subject:</span><span style={val}>{m.subject}</span></>}
                    <br /><span style={label}>Message:</span><span style={val}>{m.message}</span>
                  </div>
                  <button onClick={() => deleteRow("/api/contact", m.id, setMessages, messages)} style={btn("#dc2626")}>Delete</button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── Job Postings ── */}
        {tab === "Job Postings" && (
          <>
            <h2 style={{ color: "#1e3a5f", marginBottom: 20 }}>Post a New Job</h2>
            <form onSubmit={postJob} style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb", marginBottom: 32 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Job Title *</label>
                  <input style={inputStyle} value={jobForm.title} onChange={e => setJobForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Senior Nurse" required />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Department *</label>
                  <input style={inputStyle} value={jobForm.department} onChange={e => setJobForm(p => ({ ...p, department: e.target.value }))} placeholder="e.g. ICU" required />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Type</label>
                  <select style={inputStyle} value={jobForm.type} onChange={e => setJobForm(p => ({ ...p, type: e.target.value }))}>
                    <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Application Deadline</label>
                  <input type="date" style={inputStyle} value={jobForm.deadline} onChange={e => setJobForm(p => ({ ...p, deadline: e.target.value }))} />
                </div>
              </div>
              <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Description *</label>
              <textarea style={{ ...inputStyle, height: 80, resize: "vertical" }} value={jobForm.description}
                onChange={e => setJobForm(p => ({ ...p, description: e.target.value }))} placeholder="Job description and requirements..." required />
              {postMsg && <p style={{ color: postMsg.startsWith("✅") ? "#059669" : "#dc2626", marginBottom: 8 }}>{postMsg}</p>}
              <button type="submit" disabled={posting} style={{ ...btn("#1e3a5f"), padding: "10px 24px" }}>
                {posting ? "Posting..." : "Post Job"}
              </button>
            </form>

            <h2 style={{ color: "#1e3a5f", marginBottom: 16 }}>Active Job Postings ({jobPostings.length})</h2>
            {jobPostings.length === 0 && <p style={{ color: "#6b7280" }}>No job postings yet.</p>}
            {jobPostings.map(j => (
              <div key={j.id} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <span style={label}>{j.title}</span>
                    <span style={val}>— {j.department}</span>
                    <span style={{ ...val, color: "#6b7280" }}> | {j.type}</span>
                    {j.deadline && <span style={{ ...val, color: "#6b7280" }}> | Deadline: {j.deadline}</span>}
                    <br /><span style={val}>{j.description}</span>
                  </div>
                  <button onClick={() => deleteRow("/api/job-postings", j.id, setJobPostings, jobPostings)} style={btn("#dc2626")}>Delete</button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── Announcements ── */}
        {tab === "Announcements" && (
          <>
            <h2 style={{ color: "#1e3a5f", marginBottom: 20 }}>Post an Announcement</h2>
            <form onSubmit={postNews} style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb", marginBottom: 32 }}>
              <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Title *</label>
              <input style={inputStyle} value={newsForm.title} onChange={e => setNewsForm(p => ({ ...p, title: e.target.value }))} placeholder="Announcement title" required />
              <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Description *</label>
              <textarea style={{ ...inputStyle, height: 100, resize: "vertical" }} value={newsForm.description}
                onChange={e => setNewsForm(p => ({ ...p, description: e.target.value }))} placeholder="Full announcement text..." required />
              <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Image / Poster (optional)</label>
              <input type="file" accept="image/*" onChange={e => setNewsImage(e.target.files[0])} style={{ ...inputStyle, padding: "8px" }} />
              {newsImage && <p style={{ fontSize: "0.8rem", color: "#059669", marginBottom: 8 }}>✓ {newsImage.name}</p>}
              <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Or paste image URL</label>
              <input style={inputStyle} value={newsForm.image_url} onChange={e => setNewsForm(p => ({ ...p, image_url: e.target.value }))} placeholder="https://..." />
              {postMsg && <p style={{ color: postMsg.startsWith("✅") ? "#059669" : "#dc2626", marginBottom: 8 }}>{postMsg}</p>}
              <button type="submit" disabled={posting} style={{ ...btn("#1e3a5f"), padding: "10px 24px" }}>
                {posting ? "Posting..." : "Post Announcement"}
              </button>
            </form>

            <h2 style={{ color: "#1e3a5f", marginBottom: 16 }}>Live Announcements ({announcements.length})</h2>
            {announcements.length === 0 && <p style={{ color: "#6b7280" }}>No announcements yet.</p>}
            {announcements.map(n => (
              <div key={n.id} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <span style={label}>{n.title}</span>
                    {n.image_url && (
                      <><br /><img src={n.image_url} alt="" style={{ maxWidth: 120, maxHeight: 80, borderRadius: 6, marginTop: 6, objectFit: "cover" }} /></>
                    )}
                    <br /><span style={val}>{n.description}</span>
                  </div>
                  <button onClick={() => deleteRow("/api/news", n.id, setAnnouncements, announcements)} style={btn("#dc2626")}>Delete</button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── Lab Results ── */}
        {tab === "Lab Results" && (
          <>
            <h2 style={{ color: "#1e3a5f", marginBottom: 20 }}>Upload Lab Result</h2>
            <form onSubmit={submitLabResult} style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb", marginBottom: 32 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Patient MRN *</label>
                  <input style={inputStyle} value={labForm.mrn} onChange={e => setLabForm(p => ({ ...p, mrn: e.target.value }))}
                    placeholder="e.g. SMMH-2024-00123" required />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Patient Name *</label>
                  <input style={inputStyle} value={labForm.patient_name} onChange={e => setLabForm(p => ({ ...p, patient_name: e.target.value }))}
                    placeholder="Full name" required />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Phone *</label>
                  <input style={inputStyle} value={labForm.phone} onChange={e => setLabForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="03XX-XXXXXXX" required />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Test Name *</label>
                  <input style={inputStyle} value={labForm.test_name} onChange={e => setLabForm(p => ({ ...p, test_name: e.target.value }))}
                    placeholder="e.g. CBC, LFTs, X-Ray" required />
                </div>
              </div>

              <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Result Expires After</label>
              <select style={{ ...inputStyle, width: "auto", marginBottom: 16 }} value={labForm.expires_days}
                onChange={e => setLabForm(p => ({ ...p, expires_days: e.target.value }))}>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>

              <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: 4 }}>Upload File (PDF / Image) *</label>
              <input type="file" accept=".pdf,image/*"
                onChange={e => setLabFile(e.target.files[0])}
                style={{ ...inputStyle, padding: "8px" }}
              />
              {labFile && <p style={{ fontSize: "0.8rem", color: "#059669", marginBottom: 8 }}>✓ {labFile.name}</p>}

              {labMsg && <p style={{ color: labMsg.startsWith("✅") ? "#059669" : "#dc2626", marginBottom: 8 }}>{labMsg}</p>}
              <button type="submit" disabled={labUploading} style={{ ...btn("#0d9488"), padding: "10px 24px" }}>
                {labUploading ? "Uploading..." : "Upload Result"}
              </button>
            </form>

            {/* Uploaded results list */}
            <h2 style={{ color: "#1e3a5f", marginBottom: 16 }}>
              Uploaded Results ({labResults.length})
            </h2>
            {labLoading && <p>Loading...</p>}
            {!labLoading && labResults.length === 0 && <p style={{ color: "#6b7280" }}>No lab results uploaded yet.</p>}
            {labResults.map(r => (
              <div key={r.id} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <span style={label}>{r.patient_name}</span>
                    <span style={{ ...val, color: "#6b7280" }}> | MRN: {r.mrn}</span>
                    <span style={{ ...val, color: "#6b7280" }}> | {r.phone}</span>
                    <br />
                    <span style={label}>Test:</span><span style={val}>{r.test_name}</span>
                    <br />
                    <span style={label}>Uploaded:</span>
                    <span style={val}>{new Date(r.uploaded_at).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" })}</span>
                    <span style={{ ...val, color: "#6b7280" }}> | Expires: {new Date(r.expires_at).toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" })}</span>
                    <br />
                    <a href={r.file_url} target="_blank" rel="noreferrer"
                      style={{ color: "#0369a1", fontWeight: 600, fontSize: "0.82rem" }}>
                      {r.file_type?.includes("pdf") ? "📄 View PDF" : "🖼️ View Image"}
                    </a>
                  </div>
                  <button onClick={() => deleteRow("/api/lab-results", r.id, setLabResults, labResults)} style={btn("#dc2626")}>Delete</button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
