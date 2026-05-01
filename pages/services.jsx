// pages/services.jsx  ── Services Page
import Layout from "../components/Layout";
import { ServicesSection, DepartmentsSection } from "../components/Sections";
import { AppointmentSection } from "../components/MoreSections";

export default function ServicesPage() {
  return (
    <Layout title="Care & Services" description="Explore the comprehensive range of medical services offered at Saiera Miraj Memorial Hospital.">
      <div style={{ background: "linear-gradient(135deg, var(--navy), #0a3d3d)", padding: "80px 0 60px", textAlign: "center", color: "white" }}>
        <div className="container">
          <span className="section-label" style={{ color: "var(--gold-light)", background: "rgba(201,168,76,0.15)" }}>Care & Services</span>
          <h1 className="section-title" style={{ color: "white", marginTop: 12 }}>World-Class Medical Services</h1>
          <p style={{ color: "#94afc8", maxWidth: 560, margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.75 }}>
            From emergency response to specialised surgical care, our services cover
            every aspect of your health and well-being.
          </p>
        </div>
      </div>
      <ServicesSection />
      <DepartmentsSection />
      <AppointmentSection />
    </Layout>
  );
}
