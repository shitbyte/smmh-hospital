// components/AppointmentForm.jsx
import { useState } from "react";
import s from "../styles/Sections.module.css";
import { CheckCircleIcon } from "./Icons";
import { DEPARTMENTS } from "../data/hospitalData";

const EMPTY_FORM = {
  firstName: "", lastName: "", phone: "", email: "",
  department: "", preferredDate: "", notes: "",
};

export default function AppointmentForm() {
  const [form, setForm]         = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Success screen — matches Doctors Hospital style ─────────────────────── */
  if (submitted) {
    return (
      <div className={s.apptForm} style={{ textAlign: "center", padding: "52px 32px" }}>
        {/* Green animated circle */}
        <div style={{
          width: 80, height: 80,
          background: "linear-gradient(135deg, #059669, #10b981)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
          boxShadow: "0 8px 32px rgba(16,185,129,0.35)",
          animation: "popIn 0.4s ease",
        }}>
          <CheckCircleIcon size={40} />
        </div>

        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)", marginBottom: 10 }}>
          Appointment Request Received!
        </h3>

        {/* Primary message — mirrors Doctors Hospital */}
        <div style={{
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 20,
          textAlign: "left",
        }}>
          <p style={{ color: "#166534", fontWeight: 600, fontSize: "0.97rem", marginBottom: 8 }}>
            ✅ Your request has been successfully submitted.
          </p>
          <p style={{ color: "#15803d", fontSize: "0.9rem", lineHeight: 1.75 }}>
            Dear <strong>{form.firstName} {form.lastName}</strong>, thank you for choosing
            <strong> Saiera Miraj Memorial Hospital</strong>.<br />
            Our hospital team will contact you <strong>as soon as possible</strong> to confirm
            your appointment and inform you of the <strong>exact date and time</strong>.
          </p>
        </div>

        <div style={{
          background: "#fffbeb",
          border: "1px solid #fde68a",
          borderRadius: 10,
          padding: "14px 20px",
          marginBottom: 24,
          fontSize: "0.87rem",
          color: "#92400e",
        }}>
          📞 We will reach you at <strong>{form.phone}</strong>
          {form.email && <> or <strong>{form.email}</strong></>}.
          For urgent matters, call <strong>(042) 111 786 786</strong>.
        </div>

        <button
          className={s.submitBtn}
          onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); }}
        >
          Book Another Appointment
        </button>

        <style>{`
          @keyframes popIn {
            from { transform: scale(0.5); opacity: 0; }
            to   { transform: scale(1);   opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  /* ── Booking form ────────────────────────────────────────────────────────── */
  return (
    <form className={s.apptForm} onSubmit={handleSubmit} noValidate>
      <h3 className={s.apptFormTitle}>Book an Appointment</h3>

      {error && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fecaca",
          borderRadius: 8, padding: "12px 16px", marginBottom: 16,
          color: "#991b1b", fontSize: "0.88rem",
        }}>
          ⚠️ {error}
        </div>
      )}

      <div className={s.formRow}>
        <div className={s.formGroup}>
          <label className="form-label">First Name *</label>
          <input className="form-input" name="firstName" placeholder="Ahmed"
            value={form.firstName} onChange={handleChange} required />
        </div>
        <div className={s.formGroup}>
          <label className="form-label">Last Name *</label>
          <input className="form-input" name="lastName" placeholder="Khan"
            value={form.lastName} onChange={handleChange} required />
        </div>
      </div>

      <div className={s.formRow}>
        <div className={s.formGroup}>
          <label className="form-label">Phone Number *</label>
          <input className="form-input" name="phone" type="tel"
            placeholder="03XX-XXXXXXX" value={form.phone} onChange={handleChange} required />
        </div>
        <div className={s.formGroup}>
          <label className="form-label">Email Address</label>
          <input className="form-input" name="email" type="email"
            placeholder="example@email.com" value={form.email} onChange={handleChange} />
        </div>
      </div>

      <div className={s.formRow}>
        <div className={s.formGroup}>
          <label className="form-label">Department *</label>
          <select className="form-select" name="department" value={form.department}
            onChange={handleChange} required>
            <option value="">Select Department</option>
            {DEPARTMENTS.map((d) => (
              <option key={d.title} value={d.title}>{d.title}</option>
            ))}
            <option value="General Medicine">General Medicine</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>
        <div className={s.formGroup}>
          <label className="form-label">Preferred Date *</label>
          <input className="form-input" name="preferredDate" type="date"
            min={today} value={form.preferredDate} onChange={handleChange} required />
        </div>
      </div>

      <div className={s.formGroup}>
        <label className="form-label">Additional Notes</label>
        <textarea
          className="form-textarea" name="notes"
          placeholder="Briefly describe your symptoms or reason for visit..."
          value={form.notes} onChange={handleChange}
          style={{ height: 88 }}
        />
      </div>

      <button type="submit" className={s.submitBtn} disabled={loading}>
        {loading ? "Submitting Request…" : "Confirm Appointment Request"}
      </button>

      <p style={{ fontSize: "0.78rem", color: "var(--gray)", marginTop: 12, textAlign: "center" }}>
        * Required fields. Our team will contact you to confirm date & time.
      </p>
    </form>
  );
}
