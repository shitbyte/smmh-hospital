// pages/contact.jsx  ── Contact Page with working Supabase-backed form
import { useState } from "react";
import Layout from "../components/Layout";
import { ContactSection } from "../components/MoreSections";
import { AppointmentSection } from "../components/MoreSections";
import { CheckCircleIcon } from "../components/Icons";

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

function ContactForm() {
  const [form, setForm]           = useState(EMPTY);
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
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
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

  if (submitted) {
    return (
      <div style={{ textAlign:"center", padding:"48px 32px", background:"white", borderRadius:16, boxShadow:"0 4px 24px rgba(10,22,40,0.08)" }}>
        <div style={{ width:72, height:72, background:"linear-gradient(135deg,#059669,#10b981)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
          <CheckCircleIcon size={36} />
        </div>
        <h3 style={{ fontSize:"1.4rem", fontWeight:700, color:"var(--navy)", marginBottom:10 }}>Message Sent!</h3>
        <p style={{ color:"var(--gray)", lineHeight:1.75 }}>
          Thank you, <strong>{form.name}</strong>. We have received your message and will respond to <strong>{form.email}</strong> within 24 hours.
        </p>
        <button onClick={() => { setSubmitted(false); setForm(EMPTY); }}
          style={{ marginTop:24, padding:"12px 32px", background:"var(--teal)", color:"white", border:"none", borderRadius:8, fontWeight:600, cursor:"pointer" }}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background:"white", borderRadius:16, padding:"36px 32px", boxShadow:"0 4px 24px rgba(10,22,40,0.08)" }}>
      <h3 style={{ fontSize:"1.3rem", fontWeight:700, color:"var(--navy)", marginBottom:24 }}>Send Us a Message</h3>
      {error && (
        <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, padding:"12px 16px", marginBottom:16, color:"#991b1b", fontSize:"0.88rem" }}>
          ⚠️ {error}
        </div>
      )}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <div>
          <label className="form-label">Full Name *</label>
          <input className="form-input" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="form-label">Email *</label>
          <input className="form-input" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <div>
          <label className="form-label">Phone</label>
          <input className="form-input" name="phone" type="tel" placeholder="03XX-XXXXXXX" value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <label className="form-label">Subject</label>
          <input className="form-input" name="subject" placeholder="How can we help?" value={form.subject} onChange={handleChange} />
        </div>
      </div>
      <div style={{ marginBottom:20 }}>
        <label className="form-label">Message *</label>
        <textarea className="form-textarea" name="message" placeholder="Write your message here..." value={form.message} onChange={handleChange} required style={{ height:120 }} />
      </div>
      <button type="submit" disabled={loading} style={{ width:"100%", padding:"14px", background:"var(--teal)", color:"white", border:"none", borderRadius:8, fontWeight:700, fontSize:"0.95rem", cursor:loading?"not-allowed":"pointer", opacity:loading?0.7:1 }}>
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <Layout title="Contact Us" description="Get in touch with Saiera Miraj Memorial Hospital. Find our address, phone numbers, and book an appointment online.">
      <div style={{ background:"linear-gradient(135deg, var(--navy), #0a3d3d)", padding:"80px 0 60px", textAlign:"center", color:"white" }}>
        <div className="container">
          <span className="section-label" style={{ color:"var(--gold-light)", background:"rgba(201,168,76,0.15)" }}>Contact Us</span>
          <h1 className="section-title" style={{ color:"white", marginTop:12 }}>We&apos;re Here for You</h1>
          <p style={{ color:"#94afc8", maxWidth:540, margin:"0 auto", fontSize:"1.05rem", lineHeight:1.75 }}>
            Reach out by phone, email, or visit us in person. Our team is available 24/7 to assist with all your healthcare needs.
          </p>
        </div>
      </div>
      <ContactSection />
      <section className="section" style={{ background:"var(--cream)" }}>
        <div className="container" style={{ maxWidth:680 }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">Send Us a Message</h2>
            <p className="section-desc">Have a question or feedback? We will respond within 24 hours.</p>
          </div>
          <ContactForm />
        </div>
      </section>
      <AppointmentSection />
    </Layout>
  );
}
