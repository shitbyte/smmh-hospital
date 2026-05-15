// pages/departments.jsx — Enhanced with Background Icons & Animations
import Layout from "../components/Layout";
import { AppointmentSection } from "../components/MoreSections";
import { DEPARTMENTS } from "../data/hospitalData";

// SVG background icons for each department
const deptBgIcons = {
  "Cardiology": (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 85s-35-22-35-45a20 20 0 0 1 35-13 20 20 0 0 1 35 13c0 23-35 45-35 45z" fill="white"/>
    </svg>
  ),
  "Neurology": (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="40" r="25" fill="white"/>
      <path d="M30 65 Q50 90 70 65" stroke="white" strokeWidth="4" fill="none"/>
      <path d="M40 40 Q50 20 60 40" stroke="white" strokeWidth="3" fill="none"/>
    </svg>
  ),
  "Oncology": (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="20" fill="white"/>
      <circle cx="50" cy="20" r="8" fill="white"/>
      <circle cx="50" cy="80" r="8" fill="white"/>
      <circle cx="20" cy="50" r="8" fill="white"/>
      <circle cx="80" cy="50" r="8" fill="white"/>
    </svg>
  ),
  "Pediatrics": (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="30" r="20" fill="white"/>
      <path d="M20 90 Q20 60 50 60 Q80 60 80 90" fill="white"/>
    </svg>
  ),
  "Orthopedics": (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="44" y="10" width="12" height="80" rx="6" fill="white"/>
      <rect x="10" y="44" width="80" height="12" rx="6" fill="white"/>
    </svg>
  ),
  "Ophthalmology": (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="40" ry="22" fill="white"/>
      <circle cx="50" cy="50" r="14" fill="none" stroke="white" strokeWidth="4"/>
      <circle cx="50" cy="50" r="6" fill="white"/>
    </svg>
  ),
  "Urology": (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="35" cy="38" rx="16" ry="20" fill="white"/>
      <ellipse cx="65" cy="38" rx="16" ry="20" fill="white"/>
      <path d="M35 58 Q35 80 50 85 Q65 80 65 58" fill="white"/>
    </svg>
  ),
  "Gynecology": (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="38" r="22" fill="white"/>
      <path d="M50 60 L50 85" stroke="white" strokeWidth="5" strokeLinecap="round"/>
      <path d="M35 75 L65 75" stroke="white" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  ),
  "Dermatology": (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="4"/>
      <circle cx="50" cy="50" r="22" fill="none" stroke="white" strokeWidth="3"/>
      <circle cx="50" cy="50" r="10" fill="white"/>
    </svg>
  ),
  "Gastroenterology": (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 20 Q60 20 60 40 Q60 60 30 60 Q10 60 10 80 Q10 95 40 95 Q70 95 80 70 Q90 50 70 30 Q55 15 30 20Z" fill="white"/>
    </svg>
  ),
  "Psychiatry": (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="45" r="28" fill="white"/>
      <path d="M38 42 Q50 30 62 42" stroke="none" fill="none"/>
      <circle cx="40" cy="42" r="4" fill="none"/>
      <circle cx="60" cy="42" r="4" fill="none"/>
      <path d="M40 55 Q50 65 60 55" stroke="none" fill="none"/>
      <path d="M30 80 Q50 95 70 80" fill="white"/>
    </svg>
  ),
  "Radiology": (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="15" fill="white"/>
      <line x1="50" y1="10" x2="50" y2="30" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="50" y1="70" x2="50" y2="90" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="10" y1="50" x2="30" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="70" y1="50" x2="90" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="22" y1="22" x2="36" y2="36" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="64" y1="64" x2="78" y2="78" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="78" y1="22" x2="64" y2="36" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="36" y1="64" x2="22" y2="78" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),
};

const deptGradients = [
  ["#065f46", "#0d9488"],
  ["#1d4ed8", "#3b82f6"],
  ["#7c3aed", "#a855f7"],
  ["#be185d", "#ec4899"],
  ["#b45309", "#f59e0b"],
  ["#0f766e", "#14b8a6"],
  ["#1e40af", "#60a5fa"],
  ["#6d28d9", "#8b5cf6"],
  ["#0e7490", "#22d3ee"],
  ["#15803d", "#4ade80"],
  ["#9f1239", "#fb7185"],
  ["#92400e", "#fbbf24"],
];

export default function DepartmentsPage() {
  return (
    <Layout title="Departments" description="Explore our 25+ specialised medical departments.">

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #0a1628 0%, #0d2744 50%, #0a3d3d 100%)",
        padding: "90px 0 70px",
        textAlign: "center",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Animated circles */}
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.05)",
            width: `${200 + i * 120}px`,
            height: `${200 + i * 120}px`,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            animation: `spin ${20 + i * 8}s linear infinite`,
          }} />
        ))}

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="section-label" style={{ color: "#e8c97a", background: "rgba(201,168,76,0.15)" }}>
            Medical Departments
          </span>
          <h1 className="section-title" style={{ color: "white", marginTop: 12, fontSize: "clamp(2rem,4vw,3rem)" }}>
            Specialised Care Departments
          </h1>
          <p style={{ color: "#94afc8", maxWidth: 560, margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Our hospital houses 25+ specialised departments staffed by Pakistan&apos;s leading clinicians,
            each equipped with cutting-edge technology.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 52, flexWrap: "wrap" }}>
            {[["25+", "Departments"], ["70+", "Specialists"], ["24/7", "Emergency"], ["19+", "Years"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 700, color: "#e8c97a" }}>{num}</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
          }}>
            {DEPARTMENTS.map((dept, idx) => {
              const [g1, g2] = deptGradients[idx % deptGradients.length];
              const bgIcon = deptBgIcons[dept.title];
              return (
                <div key={dept.title} style={{
                  position: "relative",
                  overflow: "hidden",
                  background: `linear-gradient(135deg, ${g1}, ${g2})`,
                  borderRadius: 16,
                  padding: "32px 24px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 24px 48px rgba(0,0,0,0.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {/* Big background icon */}
                  {bgIcon && (
                    <div style={{
                      position: "absolute",
                      bottom: -16,
                      right: -16,
                      width: 140,
                      height: 140,
                      opacity: 0.08,
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                      pointerEvents: "none",
                    }}>
                      {bgIcon}
                    </div>
                  )}

                  {/* Small icon circle */}
                  <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                    backdropFilter: "blur(4px)",
                  }}>
                    <svg viewBox="0 0 24 24" width={24} height={24} fill="white">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                    </svg>
                  </div>

                  <h3 style={{ color: "white", fontSize: "1.05rem", fontWeight: 700, marginBottom: 6, position: "relative", zIndex: 1 }}>
                    {dept.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.85rem", lineHeight: 1.6, position: "relative", zIndex: 1 }}>
                    {dept.desc}
                  </p>

                  {/* Arrow */}
                  <div style={{
                    marginTop: 20,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    position: "relative",
                    zIndex: 1,
                  }}>
                    Learn more →
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AppointmentSection />
    </Layout>
  );
}

