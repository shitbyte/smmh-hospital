// pages/patients.jsx  ── Patients & Families Page
import Layout from "../components/Layout";
import { AppointmentSection } from "../components/MoreSections";

const rights = [
  "Right to receive respectful, considerate, and dignified care at all times.",
  "Right to receive complete and current information about your diagnosis and treatment.",
  "Right to participate in decisions about your own healthcare plan.",
  "Right to have your privacy and confidentiality protected.",
  "Right to refuse treatment and be informed of medical consequences of that refusal.",
  "Right to receive a clear explanation of your bill and charges.",
];

const insurancePanels = [
  "State Life Insurance","Jubilee Life","EFU Life","IGI Insurance",
  "Adamjee Insurance","TPL Insurance","Next Care","Pak-Qatar Takaful",
  "Salama Insurance","Allianz EFU","Samba Bank","UBL Insurers",
];

export default function PatientsPage() {
  return (
    <Layout title="Patients & Families" description="Patient rights, visitor guide, insurance panels, and support services at SMMH.">
      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg, var(--navy), #0a3d3d)", padding:"80px 0 60px", textAlign:"center", color:"white" }}>
        <div className="container">
          <span className="section-label" style={{ color:"var(--gold-light)", background:"rgba(201,168,76,0.15)" }}>Patients & Families</span>
          <h1 className="section-title" style={{ color:"white", marginTop:12 }}>Your Care, Our Commitment</h1>
          <p style={{ color:"#94afc8", maxWidth:560, margin:"0 auto", fontSize:"1.05rem", lineHeight:1.75 }}>
            Everything you need to know before, during, and after your visit to SMMH.
          </p>
        </div>
      </div>

      {/* Patient Rights */}
      <section className="section" id="rights">
        <div className="container" style={{ maxWidth:820 }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-label">Know Your Rights</span>
            <h2 className="section-title">Patient Rights &amp; Responsibilities</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {rights.map((r, i) => (
              <div key={i} className="card" style={{ display:"flex", gap:16, alignItems:"flex-start", padding:"18px 22px" }}>
                <div style={{ width:32, height:32, background:"var(--teal)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"white", fontWeight:700, fontSize:"0.85rem" }}>
                  {i + 1}
                </div>
                <p style={{ margin:0, color:"var(--navy)", lineHeight:1.7 }}>{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visitor Guide */}
      <section className="section" id="visitor" style={{ background:"var(--cream)" }}>
        <div className="container" style={{ maxWidth:820 }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-label">Visiting Hours</span>
            <h2 className="section-title">Visitor Guide</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:24 }}>
            {[
              { ward:"General Wards", hours:"11:00 AM – 1:00 PM\n4:00 PM – 7:00 PM" },
              { ward:"ICU / CCU", hours:"11:00 AM – 12:00 PM\n5:00 PM – 6:00 PM\n(1 visitor at a time)" },
              { ward:"Maternity Ward", hours:"4:00 PM – 7:00 PM\n(Immediate family only)" },
              { ward:"Paediatrics", hours:"Open for parents\n24 hours" },
            ].map((v) => (
              <div key={v.ward} className="card" style={{ padding:"24px 22px" }}>
                <h4 style={{ color:"var(--teal)", fontWeight:700, marginBottom:10 }}>{v.ward}</h4>
                <p style={{ color:"var(--navy)", whiteSpace:"pre-line", fontSize:"0.92rem", lineHeight:1.7 }}>{v.hours}</p>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop:24, padding:"20px 24px", background:"#fff7ed", borderLeft:"4px solid #f59e0b" }}>
            <p style={{ margin:0, color:"#92400e", fontSize:"0.9rem", lineHeight:1.7 }}>
              <strong>Note:</strong> Maximum 2 visitors per patient at a time. Children under 12 are not permitted in ICU/CCU.
              All visitors must register at the reception desk and wear a visitor badge.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="section" id="insurance">
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-label">Cashless Treatment</span>
            <h2 className="section-title">Insurance Panels</h2>
            <p className="section-desc" style={{ maxWidth:520, margin:"0 auto" }}>
              SMMH is registered with all major insurance companies for seamless cashless treatment.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))", gap:16 }}>
            {insurancePanels.map((ins) => (
              <div key={ins} className="card reveal" style={{ padding:"18px 20px", textAlign:"center", fontWeight:600, color:"var(--navy)", fontSize:"0.92rem" }}>
                🏥 {ins}
              </div>
            ))}
          </div>
          <p style={{ textAlign:"center", marginTop:28, color:"var(--gray)", fontSize:"0.88rem" }}>
            For insurance queries, contact our billing department at{" "}
            <a href="tel:04211178678" style={{ color:"var(--teal)" }}>(042) 111 786 786</a> ext. 201
          </p>
        </div>
      </section>

      <AppointmentSection />
    </Layout>
  );
}
