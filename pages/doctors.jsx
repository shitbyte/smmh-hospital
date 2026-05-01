// pages/doctors.jsx  ── Doctors Page
import Layout from "../components/Layout";
import { DoctorsSection } from "../components/MoreSections";
import { AppointmentSection } from "../components/MoreSections";

export default function DoctorsPage() {
  return (
    <Layout title="Find a Doctor" description="Meet our team of expert doctors and specialists at Saiera Miraj Memorial Hospital.">
      <div style={{ background: "linear-gradient(135deg, var(--navy), #0a3d3d)", padding: "80px 0 60px", textAlign: "center", color: "white" }}>
        <div className="container">
          <span className="section-label" style={{ color: "var(--gold-light)", background: "rgba(201,168,76,0.15)" }}>Our Specialists</span>
          <h1 className="section-title" style={{ color: "white", marginTop: 12 }}>Find Your Doctor</h1>
          <p style={{ color: "#94afc8", maxWidth: 540, margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Our 120+ board-certified specialists bring decades of expertise and a
            patient-first philosophy to every consultation.
          </p>
        </div>
      </div>
      <DoctorsSection />
      <AppointmentSection />
    </Layout>
  );
}
