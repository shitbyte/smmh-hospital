// components/Navbar.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import { CrossIcon, ChevronDownIcon, PhoneIcon, EmailIcon, ClockIcon } from "./Icons";
import { NAV_LINKS, HOSPITAL } from "../data/hospitalData";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath]);

  return (
    <>
      {/* ── Top Bar ─────────────────────────────────────────────────── */}
      <div className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <div className={styles.topbarLeft}>
            <div className={styles.topbarItem}>
              <LocationIcon />
              Lahore, Punjab, Pakistan
            </div>
            <div className={styles.topbarItem}>
              <EmailIcon size={13} />
              <a href={`mailto:${HOSPITAL.email}`}>{HOSPITAL.email}</a>
            </div>
          </div>
          <div className={styles.topbarRight}>
            <div className={styles.topbarItem}>
              <ClockIcon size={13} />
              {HOSPITAL.hours}
            </div>
            <span className={styles.emergencyBadge}>
              🚨 Emergency: {HOSPITAL.emergency}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ──────────────────────────────────────────────── */}
      <nav className={styles.navbar} style={scrolled ? { boxShadow: "0 4px 24px rgba(10,22,40,0.1)" } : {}}>
        <div className={`container ${styles.navInner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <CrossIcon size={26} color="white" />
            </div>
            <div className={styles.logoText}>
              <div className={styles.logoName}>Saiera Miraj Memorial<br />Hospital</div>
              <div className={styles.logoTagline}>{HOSPITAL.tagline}</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className={styles.navLinks}>
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${router.pathname === item.href ? styles.active : ""}`}
                >
                  {item.label}
                  {item.children && <ChevronDownIcon />}
                </Link>

                {item.children && (
                  <div className={styles.dropdown}>
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href} className={styles.dropdownLink}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li>
              <Link href="/#appointment" className={`${styles.navLink} ${styles.navCta}`}>
                Book Appointment
              </Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
          {NAV_LINKS.map((item) => (
            <Link key={item.label} href={item.href} className={styles.mobileLink}>
              {item.label}
            </Link>
          ))}
          <Link href="/#appointment" className={`${styles.mobileLink} ${styles.mobileLinkCta}`}>
            📅 Book Appointment
          </Link>
          <a href={`tel:${HOSPITAL.emergency}`} className={`${styles.mobileLink} ${styles.mobileLinkEmergency}`}>
            🚨 Emergency: {HOSPITAL.emergency}
          </a>
        </div>
      </nav>
    </>
  );
}

// Tiny inline icon (to avoid circular import for just the topbar)
function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" width={13} height={13} fill="currentColor" style={{ opacity: 0.7, flexShrink: 0 }}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );
}
