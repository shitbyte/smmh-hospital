// components/Hero.jsx
import Link from "next/link";
import styles from "../styles/Hero.module.css";
import { CalendarIcon, PlayIcon, EmergencyIcon, DoctorIcon, ShieldIcon } from "./Icons";
import { STATS } from "../data/hospitalData";

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.bgPattern} />
      <div className={styles.bgGrid} />

      <div className="container">
        <div className={styles.content}>
          {/* ── Left Column ─────────────────────────────────────── */}
          <div className={`${styles.left} fade-up`}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Trusted Healthcare Since 1998
            </div>

            <h1 className={styles.title}>
              Your Health,
              <span className={styles.titleAccent}>Our Sacred</span>
              Commitment
            </h1>

            <p className={styles.desc}>
              At Saiera Miraj Memorial Hospital, we blend compassionate care with
              cutting-edge medical technology — from routine checkups to complex
              surgical procedures. Your well-being is always our priority.
            </p>

            <div className={styles.actions}>
              <Link href="/#appointment" className="btn-primary">
                <CalendarIcon size={18} />
                Book Appointment
              </Link>
              <Link href="/services" className="btn-outline">
                <PlayIcon size={18} />
                Our Services
              </Link>
            </div>

            {/* Stats */}
            <div className={styles.stats}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className={styles.statNumber}>{s.number}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Cards ─────────────────────────────────────── */}
          <div className={`${styles.cards} fade-up delay-2`}>
            <div className={`${styles.card} ${styles.cardWide} ${styles.cardEmergency}`}>
              <div className={styles.cardIcon}>
                <EmergencyIcon size={22} />
              </div>
              <h3>24/7 Emergency Department</h3>
              <p>Immediate care around the clock. Our fully equipped emergency team is always ready for critical cases.</p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <DoctorIcon size={22} />
              </div>
              <h3>Expert Specialists</h3>
              <p>120+ board-certified doctors across all major specialties.</p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <ShieldIcon size={22} />
              </div>
              <h3>Advanced Technology</h3>
              <p>State-of-the-art diagnostics and surgical equipment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
