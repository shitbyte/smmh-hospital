// pages/departments.jsx
import Layout from "../components/Layout";
import { DepartmentsSection } from "../components/Sections";
import { AppointmentSection } from "../components/MoreSections";

export default function DepartmentsPage() {
  return (
    <Layout title="Departments" description="Explore all medical departments at Saiera Miraj Memorial Hospital.">
      <div style={{ background: "linear-gradient(135deg, var(--navy), #0a3d3d)", padding: "80px 0 60px", textAlign: "center", color: "white" }}>
        <div className="container">
          <span className="section-label" style={{ color: "var(--gold-light)", background: "rgba(201,168,76,0.15)" }}>Departments</span>
          <h1 className="section-title" style={{ color: "white", marginTop: 12 }}>Our Medical Departments</h1>
          <p style={{ color: "#94afc8", maxWidth: 560, margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.75 }}>
            25+ specialised departments staffed by Pakistan&apos;s leading clinicians.
          </p>
        </div>
      </div>
      <DepartmentsSection />
      <AppointmentSection />
    </Layout>
  );
}
