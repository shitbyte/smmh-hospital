
import Layout from "../components/Layout";
import { AboutSection } from "../components/Sections";

const milestones = [
  { year: "1998", event: "Hospital founded by Dr. Miraj and colleagues with 50-bed capacity." },
  { year: "2003", event: "Expanded to 150 beds with new surgical and ICU wings." },
  { year: "2008", event: "Received ISO 9001 certification for quality management." },
  { year: "2013", event: "Launched state-of-the-art cardiology and neurology departments." },
  { year: "2018", event: "Achieved JCI accreditation — first in the region." },
  { year: "2023", event: "Serving 50,000+ patients annually with 120+ specialists." },
];

const leadership = [
  { initials: "MM", name: "Prof. Dr. Miraj Khan", role: "Founder & Chairman", color: ["#0a1628", "#0d6e6e"] },
  { initials: "ZA", name: "Dr. Zara Ahmed", role: "Chief Executive Officer", color: ["#1a0a40", "#4a0d6e"] },
  { initials: "RS", name: "Dr. Raza Siddiqui", role: "Medical Director", color: ["#0a2818", "#0d6e40"] },
  { initials: "NA", name: "Ms. Nadia Ali", role: "Chief Nursing Officer", color: ["#2a1a00", "#6e4a0d"] },
];

export default function AboutPage() {
  return (
    <Layout title="About Us" description="Learn about Saiera Miraj Memorial Hospital.">

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0a1628, #0a3d3d)", padding: "80px 0 60px", textAlign: "center", color: "white" }}>
        <div className="container">
          <span style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c", padding: "6px 18px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>About Us</span>
          <h1 style={{ color: "white", marginTop: 12, fontFamily: "'Playfair Display',serif", fontSize: "2.5rem" }}>A Legacy of Healing &amp; Trust</h1>
          <p style={{ color: "#94afc8", maxWidth: 580, margin: "16px auto 0", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Founded in 1998, we have grown from a small clinic to one of Lahore&apos;s most trusted multi-specialty hospitals.
          </p>
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Mission Vision Values */}
      <section style={{ padding: "80px 0", background: "#f9f6f0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {[
              { title: "Our Mission", text: "To provide exceptional, compassionate healthcare accessible to all, utilising the latest medical technology and the highest professional standards." },
              { title: "Our Vision", text: "To be Pakistan's most trusted hospital, recognised globally for clinical excellence, patient safety, and community service." },
              { title: "Our Values", text: "Compassion · Integrity · Excellence · Respect · Innovation — these core values guide every interaction, decision, and treatment." },
            ].map((item) => (
              <div key={item.title} style={{ background: "white", borderRadius: 12, padding: "36px 28px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontSize: "1.15rem", fontFamily: "'Playfair Display',serif", marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ background: "rgba(13,110,110,0.08)", color: "#0d6e6e", padding: "6px 18px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase" }}>Our Journey</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", marginTop: 12 }}>Key Milestones</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {milestones.map((m, i) => (
              <div key={m.year} style={{ display: "flex", gap: 24, alignItems: "flex-start", paddingBottom: 28, borderLeft: i < milestones.length - 1 ? "2px solid #e5e7eb" : "2px solid transparent", paddingLeft: 24, marginLeft: 60, position: "relative" }}>
                <div style={{ position: "absolute", left: -52, background: "linear-gradient(135deg,#0d6e6e,#0d9488)", color: "white", padding: "4px 10px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 700 }}>{m.year}</div>
                <p style={{ fontSize: "0.95rem", color: "#374151", lineHeight: 1.6, paddingTop: 2 }}>{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ padding: "80px 0", background: "#f9f6f0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ background: "rgba(13,110,110,0.08)", color: "#0d6e6e", padding: "6px 18px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase" }}>Leadership</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", marginTop: 12 }}>Executive Team</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {leadership.map((p) => (
              <div key={p.name} style={{ background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ height: 140, background: `linear-gradient(135deg,${p.color[0]},${p.color[1]})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>{p.initials}</div>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: "0.82rem", color: "#0d6e6e" }}>{p.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}