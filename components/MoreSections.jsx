// components/MoreSections.jsx
// ─── Appointment · Doctors · WhyUs · Testimonials · Contact ───────────────
import Link from "next/link";
import s from "../styles/Sections.module.css";
import { DOCTORS, TESTIMONIALS, WHY_US, HOSPITAL } from "../data/hospitalData";
import AppointmentForm from "./AppointmentForm";
import { CheckCircleIcon, PhoneIcon, EmailIcon, LocationIcon, CalendarIcon } from "./Icons";

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
                <span className={s.doctorInitial}>{doc.initials}</span>
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
            <div key={item.num} className={`${s.whyCard} reveal`}>
              <div className={s.whyNum}>{item.num}</div>
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
              <p className={s.testiText}>{t.text}</p>
              <div className={s.testiAuthor}>
                <div className={s.testiAvatar}>{t.initials}</div>
                <div>
                  <div className={s.testiName}>{t.name}</div>
                  <div className={s.testiRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
      { text: "1122 – Rescue",        href: "tel:1122",            style: { color: "#dc2626", fontWeight: 700 } },
      { text: `Direct: ${HOSPITAL.emergency}`, href: `tel:${HOSPITAL.emergency.replace(/\D/g,"")}` },
    ],
    emergency: true,
  },
  {
    Icon: EmailIcon,
    title: "Email",
    lines: [
      { text: HOSPITAL.email,      href: `mailto:${HOSPITAL.email}` },
      { text: HOSPITAL.emailAppt,  href: `mailto:${HOSPITAL.emailAppt}` },
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

          {/* Map placeholder */}
          <div className={s.mapBox}>
            <LocationIcon size={60} />
            <p>
              Saiera Miraj Memorial Hospital<br />
              {HOSPITAL.address}, Lahore
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
