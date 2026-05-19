// components/MoreSections.jsx
// ─── Appointment · Doctors · WhyUs · Testimonials · News · Contact ────────
import { useState, useEffect } from "react";
import Link from "next/link";
import s from "../styles/Sections.module.css";
import { DOCTORS, TESTIMONIALS, WHY_US, HOSPITAL } from "../data/hospitalData";
import AppointmentForm from "./AppointmentForm";
import { CheckCircleIcon, PhoneIcon, EmailIcon, LocationIcon } from "./Icons";

/* ─── Appointment Section ───────────────────────────────────────────────── */
export function AppointmentSection() {
  return (
    <section className={s.apptSection} id="appointment">
      <div className="container">
        <div className={s.apptGrid}>
          <div className={s.apptText}>
            <span className="section-label" style={{ color: "var(--gold-light)", background: "rgba(201,168,76,0.15)" }}>
              Book Online
            </span>
            <h2 className={s.apptTitle}>Schedule Your Appointment Today</h2>
            <p className={s.apptDesc}>
              Our online booking system makes it easy to schedule appointments with
              your preferred specialist. Choose a convenient time and we&apos;ll confirm
              within 30 minutes.
            </p>
            <div className={s.apptFeatures}>
              {["Instant Confirmation", "SMS Reminders", "Free Cancellation"].map((f) => (
                <div key={f} className={s.apptFeat}>
                  <CheckCircleIcon size={18} />
                  {f}
                </div>
              ))}
            </div>
          </div>
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}

/* ─── Doctors Section ───────────────────────────────────────────────────── */
export function DoctorsSection() {
  return (
    <section className={`section ${s.doctorsBg}`} id="doctors">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">Our Team</span>
          <h2 className="section-title">Meet Our Expert Physicians</h2>
          <p className="section-desc" style={{ maxWidth: 560, margin: "0 auto" }}>
            Our team of internationally trained doctors brings decades of expertise and
            a patient-first philosophy to every consultation.
          </p>
        </div>

        <div className={s.doctorsGrid}>
          {DOCTORS.map((doc) => (
            <div key={doc.id} className={`${s.doctorCard} reveal`}>
              <div
                className={s.doctorPhoto}
                style={{ background: `linear-gradient(135deg, ${doc.color[0]}, ${doc.color[1]})` }}
              >
                {doc.image ? (
                  <img
                    src={doc.image}
                    alt={doc.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      display: "block",
                    }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <span className={s.doctorInitial}>{doc.initials}</span>
                )}
              </div>
              <div className={s.doctorInfo}>
                <h3>{doc.name}</h3>
                <div className={s.doctorSpecialty}>{doc.specialty}</div>
                <div className={s.doctorMeta}>
                  <span>{doc.experience} exp.</span>
                  <span>⭐ {doc.rating}</span>
                </div>
              </div>
              <Link href="/#appointment" className={s.doctorBtn}>
                Book Appointment
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/doctors" className="btn-primary">
            View All Doctors
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Us ────────────────────────────────────────────────────────────── */
export function WhyUsSection() {
  return (
    <section className="section" id="why-us">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">The SMMH Difference</h2>
          <p className="section-desc" style={{ maxWidth: 560, margin: "0 auto" }}>
            Six reasons why thousands of families in Lahore trust Saiera Miraj
            Memorial Hospital with their most precious asset — their health.
          </p>
        </div>

        <div className={s.whyGrid}>
          {WHY_US.map((item) => (
            <div key={item.num} className={`${s.whyCard} reveal`}
              style={{ borderTop: `4px solid ${item.color}`, background: "white" }}>
              <div className={s.whyNum} style={{ color: item.color }}>{item.num}</div>
              <h3 className={s.whyTitle}>{item.title}</h3>
              <p className={s.whyDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ──────────────────────────────────────────────────────── */
export function TestimonialsSection() {
  return (
    <section className={`section`} style={{ background: "var(--cream)" }} id="testimonials">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">Patient Stories</span>
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-desc" style={{ maxWidth: 520, margin: "0 auto" }}>
            Real experiences from real patients — their words mean more than any award.
          </p>
        </div>

        <div className={s.testiGrid}>
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className={`${s.testiCard} reveal`}>
              <div className={s.stars}>{"★".repeat(t.rating)}</div>
              <div className={s.testiQuote}>&ldquo;</div>
              <p className={s.testiText}>{t.quote}</p>
              <div className={s.testiAuthor}>
                <div className={s.testiAvatar}>{t.name.charAt(t.name.lastIndexOf(" ") + 1)}</div>
                <div>
                  <div className={s.testiName}>{t.name}</div>
                  <div className={s.testiRole}>{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── News & Announcements Section ─────────────────────────────────────── */
export function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then(r => r.json())
      .then(d => setNews(d.data || []))
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && news.length === 0) return null;

  return (
    <section className="section" id="news" style={{ background: "#f8fafc" }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">Latest Updates</span>
          <h2 className="section-title">News &amp; Announcements</h2>
          <p className="section-desc" style={{ maxWidth: 520, margin: "0 auto" }}>
            Stay informed with the latest news, events, and announcements from
            Saiera Miraj Memorial Hospital.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#6b7280" }}>
            Loading announcements...
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 28,
          }}>
            {news.map((item) => (
              <div key={item.id} className="reveal" style={{
                background: "#fff",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                border: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.07)";
                }}
              >
                {/* Image */}
                {item.image_url && (
                  <div style={{ height: 180, overflow: "hidden" }}>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => { e.target.parentElement.style.display = "none"; }}
                    />
                  </div>
                )}

                {/* Content */}
                <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Date badge */}
                  <span style={{
                    fontSize: "0.75rem", fontWeight: 600, color: "#0d9488",
                    textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8,
                  }}>
                    {new Date(item.created_at).toLocaleDateString("en-PK", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                  </span>

                  <h3 style={{
                    fontSize: "1rem", fontWeight: 700, color: "#1e3a5f",
                    marginBottom: 10, lineHeight: 1.4,
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: "0.88rem", color: "#6b7280", lineHeight: 1.6,
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {item.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div style={{ height: 3, background: "linear-gradient(90deg, #1e3a5f, #0d9488)" }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Contact Section ───────────────────────────────────────────────────── */
const contactItems = [
  {
    Icon: PhoneIcon,
    title: "Phone",
    lines: [
      { text: HOSPITAL.phone,    href: `tel:${HOSPITAL.phone.replace(/\D/g,"")}` },
      { text: HOSPITAL.phoneAlt, href: `tel:${HOSPITAL.phoneAlt.replace(/\D/g,"")}` },
    ],
    emergency: false,
  },
  {
    Icon: () => (
      <svg viewBox="0 0 24 24" width={20} height={20} fill="white">
        <path d="M15 12H13V9H11V12H9V14H11V17H13V14H15V12M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V5H19V19Z"/>
      </svg>
    ),
    title: "Emergency",
    lines: [
      { text: "1122 – Rescue",                 href: "tel:1122",                                    style: { color: "#dc2626", fontWeight: 700 } },
      { text: `Direct: ${HOSPITAL.emergency}`, href: `tel:${HOSPITAL.emergency.replace(/\D/g,"")}` },
    ],
    emergency: true,
  },
  {
    Icon: EmailIcon,
    title: "Email",
    lines: [
      { text: HOSPITAL.email,     href: `mailto:${HOSPITAL.email}` },
      { text: HOSPITAL.emailAppt, href: `mailto:${HOSPITAL.emailAppt}` },
    ],
    emergency: false,
  },
  {
    Icon: LocationIcon,
    title: "Address",
    lines: [
      { text: `${HOSPITAL.address},` },
      { text: `${HOSPITAL.city}, ${HOSPITAL.country}` },
    ],
    emergency: false,
  },
];

export function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Contact &amp; Location</h2>
          <p className="section-desc" style={{ maxWidth: 520, margin: "0 auto" }}>
            We are conveniently located in the heart of Lahore. Reach us by phone,
            email, or walk in anytime.
          </p>
        </div>

        <div className={s.contactGrid}>
          <div className={s.contactCards}>
            {contactItems.map((item) => (
              <div key={item.title} className={`${s.contactCard} ${item.emergency ? s.contactCardEmergency : ""}`}>
                <div className={s.contactCardIcon}>
                  <item.Icon size={20} />
                </div>
                <div>
                  <h4>{item.title}</h4>
                  {item.lines.map((l, i) =>
                    l.href ? (
                      <a key={i} href={l.href} style={l.style}>{l.text}</a>
                    ) : (
                      <p key={i}>{l.text}</p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Google Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13591.14671620622!2d74.24334699843983!3d31.61230454745414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191db3a43e14a7%3A0x9684836f3763f63f!2sSaira%20Miraj%20Memorial%20Hospital!5e0!3m2!1sen!2s!4v1779158785020!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: 16, minHeight: 400 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
