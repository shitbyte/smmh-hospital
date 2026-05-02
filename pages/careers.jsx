// pages/careers.jsx
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

const EMPTY_FORM = {
  name: "", email: "", phone: "", position: "",
  experience: "", cover_letter: "",
};

export default function CareersPage() {
  const [jobs, setJobs]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [modal, setModal]         = useState(null); // selected job
  const [form, setForm]           = useState(EMPTY_FORM);
  const [cvFile, setCvFile]       = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");

  useEffect(() => {
    fetch("/api/job-postings")
      .then((r) => r.json())
      .then((d) => { setJobs(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const openModal = (job) => {
    setModal(job);
    setForm({ ...EMPTY_FORM, position: job.title });
    setSubmitted(false);
    setError("");
    setCvFile(null);
  };

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const uploadCV = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "uploads");
    formData.append("folder", "cvs");

    // Upload directly to Supabase Storage via fetch
    const fileName = `cvs/${Date.now()}_${file.name.replace(/\s/g, "_")}`;
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/uploads/${fileName}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!res.ok) throw new Error("CV upload failed");
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      let cv_url = null;
      if (cvFile) cv_url = await uploadCV(cvFile);

      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cv_url, job_posting_id: modal?.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
          Careers at SMMH
        </h1>
        <p style={{ color: "var(--gray)", marginBottom: 40 }}>
          Join our team of dedicated healthcare professionals.
        </p>

        {loading && <p>Loading opportunities...</p>}

        {!loading && jobs.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
            <p style={{ fontSize: "1.1rem" }}>No open positions at the moment.</p>
            <p>Check back soon or send your CV to <strong>hr@smmh.com.pk</strong></p>
          </div>
        )}

        <div style={{ display: "grid", gap: 20 }}>
          {jobs.map((job) => (
            <div key={job.id} style={{
              background: "#fff", border: "1px solid #e5e7eb",
              borderRadius: 12, padding: "24px 28px",
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>
                  {job.title}
                </h3>
                <div style={{ display: "flex", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "2px 10px", borderRadius: 20, fontSize: "0.8rem" }}>
                    {job.department}
                  </span>
                  <span style={{ background: "#f0fdf4", color: "#166534", padding: "2px 10px", borderRadius: 20, fontSize: "0.8rem" }}>
                    {job.type}
                  </span>
                  {job.deadline && (
                    <span style={{ background: "#fef3c7", color: "#92400e", padding: "2px 10px", borderRadius: 20, fontSize: "0.8rem" }}>
                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p style={{ color: "#4b5563", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {job.description}
                </p>
              </div>
              <button
                onClick={() => openModal(job)}
                style={{
                  marginLeft: 24, whiteSpace: "nowrap",
                  background: "var(--teal, #0d9488)", color: "#fff",
                  border: "none", borderRadius: 8, padding: "10px 20px",
                  fontWeight: 600, cursor: "pointer", fontSize: "0.9rem",
                }}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Modal */}
      {modal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, padding: 24,
        }}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: 32,
            maxWidth: 540, width: "100%", maxHeight: "90vh", overflowY: "auto",
          }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{
                  width: 64, height: 64, background: "#10b981",
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", margin: "0 auto 16px", fontSize: 28,
                }}>✓</div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
                  Application Submitted!
                </h3>
                <p style={{ color: "#4b5563", marginBottom: 20 }}>
                  Thank you for applying for <strong>{modal.title}</strong>. We will be in touch soon.
                </p>
                <button onClick={() => setModal(null)} style={{
                  background: "var(--teal, #0d9488)", color: "#fff",
                  border: "none", borderRadius: 8, padding: "10px 24px",
                  fontWeight: 600, cursor: "pointer",
                }}>Close</button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--navy)" }}>
                    Apply — {modal.title}
                  </h3>
                  <button onClick={() => setModal(null)} style={{
                    background: "none", border: "none", fontSize: 20,
                    cursor: "pointer", color: "#6b7280",
                  }}>✕</button>
                </div>

                {error && (
                  <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#991b1b", fontSize: "0.88rem" }}>
                    ⚠️ {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {[
                    { label: "Full Name *", name: "name", type: "text", placeholder: "Ahmed Khan" },
                    { label: "Email *", name: "email", type: "email", placeholder: "you@email.com" },
                    { label: "Phone *", name: "phone", type: "tel", placeholder: "03XX-XXXXXXX" },
                  ].map((f) => (
                    <div key={f.name} style={{ marginBottom: 14 }}>
                      <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: 4, color: "var(--navy)" }}>{f.label}</label>
                      <input
                        type={f.type} name={f.name} placeholder={f.placeholder}
                        value={form[f.name]} onChange={handleChange} required
                        style={{ width: "100%", padding: "9px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: "0.9rem", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: 4, color: "var(--navy)" }}>Years of Experience</label>
                    <select name="experience" value={form.experience} onChange={handleChange}
                      style={{ width: "100%", padding: "9px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: "0.9rem" }}>
                      <option value="">Select</option>
                      <option>Fresh Graduate</option>
                      <option>1-2 years</option>
                      <option>3-5 years</option>
                      <option>5-10 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: 4, color: "var(--navy)" }}>Cover Letter</label>
                    <textarea name="cover_letter" value={form.cover_letter} onChange={handleChange}
                      placeholder="Tell us why you are a good fit..."
                      style={{ width: "100%", padding: "9px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: "0.9rem", height: 80, resize: "vertical", boxSizing: "border-box" }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: 4, color: "var(--navy)" }}>Upload CV (PDF/DOC)</label>
                    <input type="file" accept=".pdf,.doc,.docx"
                      onChange={(e) => setCvFile(e.target.files[0])}
                      style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: "0.85rem" }}
                    />
                    {cvFile && <p style={{ fontSize: "0.8rem", color: "#059669", marginTop: 4 }}>✓ {cvFile.name}</p>}
                  </div>

                  <button type="submit" disabled={submitting} style={{
                    width: "100%", background: "var(--teal, #0d9488)", color: "#fff",
                    border: "none", borderRadius: 8, padding: "12px",
                    fontWeight: 700, fontSize: "0.95rem", cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                  }}>
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
