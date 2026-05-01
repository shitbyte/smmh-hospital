
import { useState } from "react";
import Head from "next/head";

export default function LabResults() {
  const [mrn, setMrn]     = useState("");
  const [phone, setPhone] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true); setSearched(false);
    try {
      const res = await fetch(`/api/lab-results?mrn=${mrn}&phone=${phone}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error); }
      else { setResults(data.results); setSearched(true); }
    } catch { setError("Network error. Please try again."); }
    setLoading(false);
  };

  return (
    <>
      <Head><title>Lab Results - SMMH</title></Head>
      <div style={{ minHeight: "100vh", background: "#f0fdf4", padding: "40px 20px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>

          {/* Search Form */}
          <div style={{ background: "white", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginBottom: "32px" }}>
            <h2 style={{ color: "#065f46", fontSize: "24px", marginBottom: "8px" }}>🔬 Access Your Lab Results</h2>
            <p style={{ color: "#6b7280", marginBottom: "28px" }}>Enter your Medical Record Number and registered phone number</p>

            <form onSubmit={handleSearch}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontWeight: "600", color: "#374151", marginBottom: "6px", fontSize: "13px", letterSpacing: "0.05em" }}>
                  MEDICAL RECORD NUMBER (MRN) *
                </label>
                <input
                  type="text" value={mrn} onChange={e => setMrn(e.target.value)}
                  placeholder="e.g. SMMH-2024-00123" required
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1fae5", fontSize: "15px", boxSizing: "border-box" }}
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontWeight: "600", color: "#374151", marginBottom: "6px", fontSize: "13px", letterSpacing: "0.05em" }}>
                  PHONE NUMBER *
                </label>
                <input
                  type="text" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="03XX-XXXXXXX" required
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1fae5", fontSize: "15px", boxSizing: "border-box" }}
                />
              </div>
              {error && <p style={{ color: "#dc2626", marginBottom: "16px" }}>⚠️ {error}</p>}
              <button type="submit" disabled={loading} style={{
                width: "100%", padding: "14px", background: "#065f46", color: "white",
                border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer"
              }}>
                {loading ? "Searching..." : "🔍 Search Results"}
              </button>
            </form>
          </div>

          {/* Results */}
          {searched && (
            results.length === 0 ? (
              <div style={{ background: "white", borderRadius: "16px", padding: "40px", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                <h3 style={{ color: "#374151" }}>No results found</h3>
                <p style={{ color: "#6b7280" }}>No lab results found for this MRN and phone number, or results may have expired.</p>
              </div>
            ) : (
              <div>
                <h3 style={{ color: "#065f46", marginBottom: "16px" }}>
                  Found {results.length} result{results.length > 1 ? "s" : ""} for {results[0]?.patient_name}
                </h3>
                {results.map((r) => (
                  <div key={r.id} style={{
                    background: "white", borderRadius: "12px", padding: "24px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "16px",
                    borderLeft: "4px solid #065f46"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div>
                        <h4 style={{ margin: 0, color: "#065f46", fontSize: "18px" }}>🧪 {r.test_name}</h4>
                        <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: "13px" }}>
                          Uploaded: {new Date(r.uploaded_at).toLocaleDateString()} &nbsp;|&nbsp;
                          Expires: {new Date(r.expires_at).toLocaleDateString()}
                        </p>
                      </div>
                      <a href={r.file_url} target="_blank" rel="noreferrer" style={{
                        padding: "8px 16px", background: "#065f46", color: "white",
                        borderRadius: "8px", textDecoration: "none", fontSize: "13px"
                      }}>
                        {r.file_type === "pdf" ? "📄 View PDF" : "🖼️ View Image"}
                      </a>
                    </div>
                    {r.file_type !== "pdf" && (
                      <img src={r.file_url} alt={r.test_name}
                        style={{ width: "100%", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                    )}
                  </div>
                ))}
              </div>
            )
          )}

          {/* Privacy Note */}
          <div style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: "12px", padding: "16px", marginTop: "24px" }}>
            <p style={{ margin: 0, color: "#92400e", fontSize: "13px" }}>
              🔒 <strong>Privacy Note:</strong> Your medical reports are confidential. Results are only accessible with your unique MRN and phone number. Reports are automatically deleted after 30 days.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}