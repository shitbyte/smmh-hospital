// pages/about.jsx  ── About Page
import Layout from "../components/Layout";
import { AboutSection } from "../components/Sections";
import s from "../styles/Sections.module.css";
import { ShieldIcon, CheckCircleIcon } from "../components/Icons";

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
  { initials: "ZA", name: "Dr. Zara Ahmed",     role: "Chief Executive Officer", color: ["#1a0a40", "#4a0d6e"] },
  { initials: "RS", name: "Dr. Raza Siddiqui",  role: "Medical Director", color: ["#0a2818", "#0d6e40"] },
  { initials: "NA", name: "Ms. Nadia Ali",      role: "Chief Nursing Officer", color: ["#2a1a00", "#6e4a0d"] },
];

export default function AboutPage() {
  return (
    <Layout title="About Us" description="Learn about the history, mission, and team behind Saiera Miraj Memorial Hospital.">
      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, var(--navy), #0a3d3d)",
        padding: "80px 0 60px",
        textAlign: "center",
        color: "white",
      }}>
        <div className="container">
          <span className="section-label" style={{ color: "var(--gold-light)", background: "rgba(201,168,76,0.15)" }}>
            About Us
          </span>
          <h1 className="section-title" style={{ color: "white", marginTop: 12 }}>
            A Legacy of Healing &amp; Trust
          </h1>
          <p style={{ color: "#94afc8", maxWidth: 580, margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Founded in 1998, we have grown from a small clinic to one of Lahore&apos;s most
            trusted multi-specialty hospitals — always guided by compassion and excellence.
          </p>
        </div>
      </div>

      {/* About Detail */}
      <AboutSection />

      {/* Mission & Vision */}
      <section className="section" id="mission" style={{ background: "var(--cream)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {[
              { icon: <ShieldIcon size={32} />, title: "Our Mission", text: "To provide exceptional, compassionate healthcare accessible to all, utilising the latest medical technology and the highest professional standards." },
              { icon: <CheckCircleIcon size={32} />, title: "Our Vision",  text: "To be Pakistan&apos;s most trusted hospital, recognised globally for clinical excellence, patient safety, and community service." },
              { icon: <ShieldIcon size={32} />,  title: "Our Values",  text: "Compassion · Integrity · Excellence · Respect · Innovation — these core values guide every interaction, decision, and treatment." },
            ].map((item) => (
              <div key={item.title} className="card reveal" style={{ padding: "36px 28px", textAlign: "center" }}>
                <div style={{ color: "var(--teal)", marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: "1.15rem", fontFamily: "'Playfair Display',serif", marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--gray)", lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: item.text }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section" id="message">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">Key Milestones</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {milestones.map((m, i) => (
              <div key={m.year} className="reveal" style={{
                display: "flex",
                gap: 24,
                alignItems: "flex-start",
                paddingBottom: 28,
                borderLeft: i < milestones.length - 1 ? "2px solid var(--border)" : "2px solid transparent",
                paddingLeft: 24,
                marginLeft: 60,
                position: "relative",
              }}>
                <div style={{
                  position: "absolute",
                  left: -52,
                  background: "linear-gradient(135deg,var(--teal),var(--teal-light))",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: 20,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}>{m.year}</div>
                <p style={{ fontSize: "0.95rem", color: "var(--gray-dark)", lineHeight: 1.6, paddingTop: 2 }}>{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section" id="team" style={{ background: "var(--cream)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Leadership</span>
            <h2 className="section-title">Executive Team</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {leadership.map((p) => (
              <div key={p.name} className="card reveal" style={{ overflow: "hidden" }}>
                <div style={{
                  height: 140,
                  background: `linear-gradient(135deg,${p.color[0]},${p.color[1]})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.3)",
                }}>{p.initials}</div>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--teal)" }}>{p.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
