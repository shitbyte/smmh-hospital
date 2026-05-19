// pages/media.jsx  ── News, Events & Gallery
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function MediaPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then(r => r.json())
      .then(d => setNews(d.data || []))
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout title="News & Media" description="Latest news, events and press releases from Saiera Miraj Memorial Hospital.">

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, var(--navy), #0a3d3d)", padding: "80px 0 60px", textAlign: "center", color: "white" }}>
        <div className="container">
          <span className="section-label" style={{ color: "var(--gold-light)", background: "rgba(201,168,76,0.15)" }}>Media</span>
          <h1 className="section-title" style={{ color: "white", marginTop: 12 }}>News &amp; Events</h1>
          <p style={{ color: "#94afc8", maxWidth: 540, margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Stay updated with the latest news, events, and announcements from SMMH.
          </p>
        </div>
      </div>

      {/* News */}
      <section className="section" id="news">
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Latest Updates</span>
            <h2 className="section-title">News &amp; Press Releases</h2>
          </div>

          {loading && (
            <p style={{ textAlign: "center", color: "#6b7280" }}>Loading announcements...</p>
          )}

          {!loading && news.length === 0 && (
            <p style={{ textAlign: "center", color: "#6b7280" }}>No announcements yet. Check back soon.</p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {news.map((item) => (
              <div key={item.id} className="card reveal" style={{ padding: "28px", display: "flex", gap: 24, alignItems: "flex-start" }}>
                {/* Image */}
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    style={{ width: 120, height: 90, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--teal)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
                    📅 {new Date(item.created_at).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <h3 style={{ color: "var(--navy)", fontSize: "1.1rem", fontWeight: 700, marginBottom: 10 }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "var(--gray)", lineHeight: 1.75, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="section" id="gallery" style={{ background: "var(--cream)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Our Facility</span>
            <h2 className="section-title">Photo Gallery</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {["Emergency Wing", "Cardiac ICU", "Operation Theatre", "Maternity Suite", "Diagnostic Lab", "Paediatric Ward", "Pharmacy", "Reception"].map((label) => (
              <div key={label} style={{ background: "linear-gradient(135deg, var(--navy), var(--teal))", borderRadius: 12, height: 150, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", fontWeight: 600, textAlign: "center", padding: 12 }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}
