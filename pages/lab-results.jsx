// pages/lab-results.jsx  ── Lab Results Online
import { useState } from "react";
import Layout from "../components/Layout";

export default function LabResultsPage() {
  const [mrn, setMrn]         = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    setSearched(false);

    try {
      const res  = await fetch(`/api/lab-results?mrn=${encodeURIComponent(mrn.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResults(data.data || []);
      setSearched(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Lab Results" description="Access your lab and diagnostic results online at SMMH.">
      <div style={{ background: "linear-gradient(135deg, var(--navy), #0a3d3d)", padding: "80px 0 60px", textAlign: "center", color: "white" }}>
        <div className="container">
          <span className="section-label" style={{ color: "var(--gold-light)", background: "rgba(201,168,76,0.15)" }}>Diagnostics</span>
          <h1 className="section-title" style={{ color: "white", marginTop: 12 }}>Lab Results Online</h1>
          <p style={{ color: "#94afc8", maxWidth: 540, margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Access your diagnostic and laboratory reports securely using your Patient MRN.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 540 }}>
          <div className="card" style={{ padding: "40px 36px" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>Access Your Reports</h2>
            <p style={{ color: "var(--gray)", marginBottom: 28, fontSize: "0.9rem", lineHeight: 1.7 }}>
              Enter your Medical Record Number (MRN) to view your lab results.
              Your MRN can be found on your patient card or discharge summary.
            </p>

            <form onSubmit={handleSearch}>
              <div style={{ marginBottom: 24 }}>
                <label className="form-label">Medical Record Number (MRN) *</label>
                <input
                  className="form-input"
                  placeholder="e.g. SMMH-2024-00123"
                  value={mrn}
                  onChange={(e) => setMrn(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ width: "100%", padding: "13px", background: "var(--teal)", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Searching..." : "Search Results"}
              </button>
            </form>

            {/* Error */}
            {error && (
              <div style={{ marginTop: 20, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "14px 18px" }}>
                <p style={{ color: "#991b1b", fontWeight: 600, margin: 0 }}>⚠️ {error}</p>
              </div>
            )}

            {/* No results */}
            {searched && results.length === 0 && !error && (
              <div style={{ marginTop: 24, background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 10, padding: "18px 20px", textAlign: "center" }}>
                <p style={{ color: "#0369a1", fontWeight: 600, marginBottom: 6 }}>No results found for this MRN.</p>
                <p style={{ color: "#0284c7", fontSize: "0.88rem" }}>
                  Please double-check your MRN, or call us at{" "}
                  <a href="tel:04211178678" style={{ fontWeight: 700 }}>(042) 111 786 786</a> for assistance.
                </p>
              </div>
            )}

            {/* Results list */}
            {results.length > 0 && (
              <div style={{ marginTop: 28 }}>
                <h3 style={{ color: "var(--navy)", fontSize: "1rem", fontWeight: 700, marginBottom: 14 }}>
                  {results.length} Result{results.length > 1 ? "s" : ""} Found
                </h3>
                {results.map((r) => (
                  <div key={r.id} style={{
                    border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px",
                    marginBottom: 12, background: "#f8fafc"
                  }}>
                    <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{r.test_name}</p>
                    <p style={{ fontSize: "0.82rem", color: "#6b7280", marginBottom: 10 }}>
                      Uploaded: {new Date(r.uploaded_at).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
                      {" · "}
                      Expires: {new Date(r.expires_at).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <a
                      href={r.file_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-block", background: "var(--teal)", color: "#fff",
                        padding: "8px 18px", borderRadius: 8, fontWeight: 600,
                        fontSize: "0.88rem", textDecoration: "none"
                      }}
                    >
                      {r.file_type?.includes("pdf") ? "📄 Download PDF" : "🖼️ View Image"}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: 24, padding: "20px 24px", background: "#fff7ed", borderRadius: 12, borderLeft: "4px solid #f59e0b" }}>
            <p style={{ margin: 0, color: "#92400e", fontSize: "0.88rem", lineHeight: 1.7 }}>
              <strong>🔒 Privacy Note:</strong> Your medical reports are confidential and accessible only with your unique MRN.
              Results automatically expire after their validity period. For help, contact our diagnostic lab at ext. 302.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
