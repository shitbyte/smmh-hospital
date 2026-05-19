// pages/media.jsx  ── News, Events & Gallery
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

const GALLERY = [
  { label: "Emergency Wing",   url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop" },
  { label: "Cardiac ICU",      url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop" },
  { label: "Operation Theatre",url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop" },
  { label: "Maternity Suite",  url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop" },
  { label: "Diagnostic Lab",   url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop" },
  { label: "Paediatric Ward",  url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop" },
  { label: "Pharmacy",         url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop" },
  { label: "Reception",        url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop" },
];

export default function MediaPage() {
  const [news, setNews]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch("/api/news")
      .then(r => r.json())
      .then(d => setNews(d.data || []))
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout title="News & Media" description="Latest news, events and press releases from Saiera Miraj Memorial Hospital.">

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, cursor: "zoom-out",
        }}>
          <div style={{ textAlign: "center" }}>
            <img src={lightbox.url} alt={lightbox.label}
              style={{ maxWidth: "90vw", maxHeight: "80vh", borderRadius: 12, objectFit: "cover" }} />
            <p style={{ color: "#fff", marginTop: 12, fontSize: "1rem", fontWeight: 600 }}>{lightbox.label}</p>
          </div>
        </div>
      )}

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

          {loading && <p style={{ textAlign: "center", color: "#6b7280" }}>Loading announcements...</p>}
          {!loading && news.length === 0 && (
            <p style={{ textAlign: "center", color: "#6b7280" }}>No announcements yet. Check back soon.</p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {news.map((item) => (
              <div key={item.id} className="card reveal" style={{ padding: "28px", display: "flex", gap: 24, alignItems: "flex-start" }}>
                {item.image_url && (
                  <img src={item.image_url} alt={item.title}
                    style={{ width: 120, height: 90, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                    onError={e => { e.target.style.display = "none"; }} />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--teal)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
                    📅 {new Date(item.created_at).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <h3 style={{ color: "var(--navy)", fontSize: "1.1rem", fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ color: "var(--gray)", lineHeight: 1.75, margin: 0 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section" id="gallery" style={{ background: "var(--cream)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Our Facility</span>
            <h2 className="section-title">Photo Gallery</h2>
            <p className="section-desc" style={{ maxWidth: 520, margin: "0 auto" }}>
              A glimpse into our world-class facilities and departments at SMMH.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {GALLERY.map((item) => (
              <div key={item.label} onClick={() => setLightbox(item)} className="reveal"
                style={{ borderRadius: 12, overflow: "hidden", cursor: "zoom-in", position: "relative", height: 180, boxShadow: "0 2px 12px rgba(0,0,0,0.1)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.1)"; }}
              >
                <img src={item.url} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.65))", padding: "24px 14px 12px", color: "#fff", fontSize: "0.88rem", fontWeight: 600 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}
