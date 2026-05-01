// components/Sections.jsx
// ─── QuickAccess · Services · About · Departments ──────────────────────────
import Link from "next/link";
import s from "../styles/Sections.module.css";
import { SERVICES, DEPARTMENTS } from "../data/hospitalData";
import {
  CalendarIcon, DoctorIcon, LabIcon, PhoneIcon,
  CrossIcon, HeartIcon, GlobeIcon, EmergencyIcon, ShieldIcon,
  CheckCircleIcon, CheckIcon, serviceIcons, deptIconList,
} from "./Icons";

/* ─── Quick Access ──────────────────────────────────────────────────────── */
export function QuickAccess() {
  const items = [
    { label: "Schedule", title: "Book Appointment", href: "/#appointment", Icon: CalendarIcon },
    { label: "Specialists", title: "Find a Doctor",    href: "/doctors",      Icon: DoctorIcon },
    { label: "Diagnostics", title: "Lab Results",      href: "/lab-results",  Icon: LabIcon },
    { label: "24/7 Helpline", title: "(042) 111 786 786", href: "tel:042111786786", Icon: PhoneIcon },
  ];

  return (
    <div className={s.quickBar}>
      <div className="container">
        <div className={s.quickGrid}>
          {items.map(({ label, title, href, Icon }) => (
            <Link key={label} href={href} className={s.quickItem}>
              <div className={s.quickIcon}>
                <Icon size={24} />
              </div>
              <div>
                <div className={s.quickLabel}>{label}</div>
                <div className={s.quickTitle}>{title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Services ──────────────────────────────────────────────────────────── */
export function ServicesSection() {
  return (
    <section className={`section ${s.servicesBg}`} id="services">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Comprehensive Medical Services</h2>
          <p className="section-desc" style={{ maxWidth: 560, margin: "0 auto" }}>
            We provide a full spectrum of healthcare services, combining expert medical
            knowledge with compassionate patient-centred care.
          </p>
        </div>

        <div className={s.servicesGrid}>
          {SERVICES.map((svc) => {
            const Icon = serviceIcons[svc.icon] || CrossIcon;
            return (
              <div key={svc.id} className={`${s.serviceCard} reveal`}>
                <div className={s.serviceIcon}>
                  <Icon size={28} />
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
                <Link href={`/services#${svc.id}`} className={s.serviceLink}>
                  Learn more →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── About ─────────────────────────────────────────────────────────────── */
const aboutFeatures = [
 
  { text: <><strong>50+ specialist doctors</strong> including consultants, surgeons, and specialists</> },
  { text: <><strong>State-of-the-art 50 bedded hospital</strong> situated at Sharaqpur Road, Lahore</> },
  { text: <><strong>Founded in 2006</strong> — serving the community for over 14 years</> },
  { text: <><strong>Both indoor and outdoor services</strong> under one roof with qualified staff</> },
];


export function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className={s.aboutGrid}>
          {/* Visual */}
          <div className={`${s.aboutVisual} reveal`}>
            <div className={s.aboutImgMain}>
              <CrossIcon size={120} color="rgba(255,255,255,0.12)" />
            </div>
            <div className={s.aboutFloat}>
              <div className={s.aboutFloatNum}>14+</div>
              <div className={s.aboutFloatLabel}>Years of Excellence</div> 
            </div>
            <div className={s.aboutFloat2}>
              <ShieldIcon size={20} />
              JCI Accredited
            </div>
          </div>

          {/* Content */}
          <div className="reveal">
            <span className="section-label">About Us</span>
            <h2 className="section-title">A Legacy of Healing &amp; Trust</h2>
            <p className="section-desc">
              Founded in 1998, Saiera Miraj Memorial Hospital has been a cornerstone of
              healthcare excellence in Lahore. We are committed to providing the highest
              standard of medical care with warmth, dignity, and respect.
            </p>

            <ul className={s.aboutFeatures}>
              {aboutFeatures.map((f, i) => (
                <li key={i} className={s.aboutFeature}>
                  <div className={s.featureCheck}>
                    <CheckIcon />
                  </div>
                  <p>{f.text}</p>
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-primary">
              Discover Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Departments ───────────────────────────────────────────────────────── */
export function DepartmentsSection() {
  return (
    <section className={`section ${s.deptBg}`} id="departments">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className={`section-label ${s.deptBg}`} style={{ color: "var(--gold-light)", background: "rgba(201,168,76,0.12)" }}>
            Medical Departments
          </span>
          <h2 className="section-title" style={{ color: "white" }}>Specialised Departments</h2>
          <p className="section-desc" style={{ color: "#7a9ab8", maxWidth: 560, margin: "0 auto" }}>
            Our hospital houses over 25 specialised medical departments staffed by
            Pakistan&apos;s leading clinicians.
          </p>
        </div>

        <div className={s.deptGrid}>
          {DEPARTMENTS.map((dept, idx) => {
            const Icon = deptIconList[idx % deptIconList.length];
            return (
              <div key={dept.title} className={`${s.deptCard} reveal`}>
                <div className={s.deptIcon}>
                  <Icon size={28} />
                </div>
                <h3>{dept.title}</h3>
                <p>{dept.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
