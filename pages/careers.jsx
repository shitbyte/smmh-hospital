// pages/careers.jsx  ── Careers Page with live application form
import { useState } from "react";
import Layout from "../components/Layout";
import s from "../styles/Sections.module.css";
import { CheckCircleIcon } from "../components/Icons";

const openings = [
  { title:"Senior Cardiologist",              dept:"Cardiology",    type:"Full-time" },
  { title:"Staff Nurse (ICU)",                dept:"Critical Care", type:"Full-time" },
  { title:"Medical Lab Technologist",         dept:"Diagnostics",   type:"Full-time" },
  { title:"Radiographer",                     dept:"Radiology",     type:"Full-time" },
  { title:"Receptionist / Patient Coordinator", dept:"Admin",       type:"Full-time" },
  { title:"Physiotherapist",                  dept:"Rehabilitation", type:"Part-time" },
];

const EMPTY = { name:"", email:"", phone:"", position:"", experience:"", coverLetter:"" };

function ApplyModal({ position, onClose }) {
  const [form, setForm]           = useState({ ...EMPTY, position });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res  = await fetch("/api/careers", {
        method:  "POST",
        headers: { "Content-Type":"application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong.");
      else setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(10,22,40,0.7)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"white", borderRadius:16, maxWidth:560, width:"100%", maxHeight:"90vh", overflowY:"auto", padding:"36px 32px", position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute", top:16, right:20, background:"none", border:"none", fontSize:24, cursor:"pointer", color:"var(--gray)" }}>✕</button>

        {submitted ? (
          <div style={{ textAlign:"center", padding:"24px 0" }}>
            <div style={{ width:68, height:68, background:"linear-gradient(135deg,#059669,#10b981)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" }}>
              <CheckCircleIcon size={34} />
            </div>
            <h3 style={{ fontSize:"1.35rem", fontWeight:700, color:"var(--navy)", marginBottom:10 }}>Application Received!</h3>
            <p style={{ color:"var(--gray)", lineHeight:1.75, marginBottom:24 }}>
              Thank you, <strong>{form.name}</strong>! Your application for <strong>{form.position}</strong> has been submitted.
              Our HR team will review it and contact you at <strong>{form.email}</strong>.
            </p>
            <button onClick={onClose} style={{ padding:"12px 32px", background:"var(--teal)", color:"white", border:"none", borderRadius:8, fontWeight:600, cursor:"pointer" }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize:"1.2rem", fontWeight:700, color:"var(--navy)", marginBottom:6 }}>Apply for Position</h3>
            <p style={{ color:"var(--teal)", fontWeight:600, marginBottom:24 }}>{position}</p>
            {error && (
              <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, padding:"12px 16px", marginBottom:16, color:"#991b1b", fontSize:"0.88rem" }}>
                ⚠️ {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                <div>
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="form-label">Email *</label>
                  <input className="form-input" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                <div>
                  <label className="form-label">Phone *</label>
                  <input className="form-input" name="phone" type="tel" placeholder="03XX-XXXXXXX" value={form.phone} onChange={handleChange} required />
                </div>
                <div>
                  <label className="form-label">Years of Experience</label>
                  <input className="form-input" name="experience" placeholder="e.g. 5 years" value={form.experience} onChange={handleChange} />
                </div>
              </div>
              <div style={{ marginBottom:20 }}>
                <label className="form-label">Cover Letter / Note</label>
                <textarea className="form-textarea" name="coverLetter" placeholder="Tell us why you are a great fit..." value={form.coverLetter} onChange={handleChange} style={{ height:100 }} />
              </div>
              <button type="submit" disabled={loading} style={{ width:"100%", padding:"13px", background:"var(--teal)", color:"white", border:"none", borderRadius:8, fontWeight:700, cursor:loading?"not-allowed":"pointer", opacity:loading?0.7:1 }}>
                {loading ? "Submitting…" : "Submit Application"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function CareersPage() {
  const [activeJob, setActiveJob] = useState(null);

  return (
    <Layout title="Careers" description="Join the team at Saiera Miraj Memorial Hospital. View current job openings.">
      <div style={{ background:"linear-gradient(135deg, var(--navy), #0a3d3d)", padding:"80px 0 60px", textAlign:"center", color:"white" }}>
        <div className="container">
          <span className="section-label" style={{ color:"var(--gold-light)", background:"rgba(201,168,76,0.15)" }}>Join Our Team</span>
          <h1 className="section-title" style={{ color:"white", marginTop:12 }}>Career Opportunities</h1>
          <p style={{ color:"#94afc8", maxWidth:540, margin:"0 auto", fontSize:"1.05rem", lineHeight:1.75 }}>
            Be part of a team that makes a real difference in people&apos;s lives every day.
            We offer a supportive environment, competitive compensation, and growth.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-label">Open Positions</span>
            <h2 className="section-title">Current Openings</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {openings.map((job) => (
              <div key={job.title} className="card reveal" style={{ padding:"24px 28px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
                <div>
                  <h3 style={{ fontSize:"1.05rem", fontWeight:600, marginBottom:6 }}>{job.title}</h3>
                  <div style={{ display:"flex", gap:12 }}>
                    <span style={{ fontSize:"0.82rem", color:"var(--teal)", fontWeight:500 }}>{job.dept}</span>
                    <span style={{ fontSize:"0.82rem", color:"var(--gray)" }}>•</span>
                    <span style={{ fontSize:"0.82rem", color:"var(--gray)" }}>{job.type}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveJob(job.title)}
                  style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1.5px solid var(--teal)", color:"var(--teal)", padding:"9px 20px", borderRadius:"var(--radius-sm)", fontWeight:600, fontSize:"0.88rem", background:"transparent", cursor:"pointer", transition:"all 0.25s" }}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
          <p style={{ textAlign:"center", marginTop:32, color:"var(--gray)", fontSize:"0.9rem" }}>
            Don&apos;t see your role? Send your CV to{" "}
            <a href="mailto:hr@smmh.com.pk" style={{ color:"var(--teal)", fontWeight:600 }}>hr@smmh.com.pk</a>
          </p>
        </div>
      </section>

      {activeJob && <ApplyModal position={activeJob} onClose={() => setActiveJob(null)} />}
    </Layout>
  );
}
