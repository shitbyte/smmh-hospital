// components/Footer.jsx
import Link from "next/link";
import styles from "../styles/Footer.module.css";
import { CrossIcon, FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from "./Icons";
import { HOSPITAL } from "../data/hospitalData";

const quickLinks = [
  { label: "Home",        href: "/" },
  { label: "About Us",    href: "/about" },
  { label: "Our Doctors", href: "/doctors" },
  { label: "Departments", href: "/departments" },
  { label: "Careers",     href: "/careers" },
  { label: "Contact",     href: "/contact" },
];

const serviceLinks = [
  { label: "Emergency Services", href: "/services#emergency" },
  { label: "Surgical Services",  href: "/services#surgery" },
  { label: "Maternity Care",     href: "/services#maternity" },
  { label: "Diagnostic Lab",     href: "/services#lab" },
  { label: "Cardiology",         href: "/departments" },
  { label: "Oncology",           href: "/departments" },
];

const patientLinks = [
  { label: "Book Appointment",  href: "/#appointment" },
  { label: "Patient Rights",    href: "/patients#rights" },
  { label: "Visitor Guide",     href: "/patients#visitor" },
  { label: "Insurance Panels",  href: "/patients#insurance" },
  { label: "Lab Results",       href: "/lab-results" },
  { label: "Health Tips",       href: "/patients#wellness" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          {/* Brand */}
          <div>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}>
                <CrossIcon size={22} color="white" />
              </div>
              <div>
                <div className={styles.footerLogoName}>
                  Saiera Miraj Memorial<br />Hospital
                </div>
                <div className={styles.footerLogoSub}>Est. 1998 · Lahore, Pakistan</div>
              </div>
            </div>
            <p className={styles.footerDesc}>
              Providing compassionate, high-quality healthcare to the people of Lahore
              and beyond for over 25 years. Your health is our sacred mission.
            </p>
            <div className={styles.socialLinks}>
              <a className={styles.socialLink} href="#" title="Facebook" aria-label="Facebook"><FacebookIcon /></a>
              <a className={styles.socialLink} href="#" title="Twitter"  aria-label="Twitter"><TwitterIcon /></a>
              <a className={styles.socialLink} href="#" title="Instagram" aria-label="Instagram"><InstagramIcon /></a>
              <a className={styles.socialLink} href="#" title="YouTube"  aria-label="YouTube"><YoutubeIcon /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.footerColTitle}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={styles.footerColTitle}>Services</h4>
            <ul className={styles.footerLinks}>
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Info */}
          <div>
            <h4 className={styles.footerColTitle}>Patient Info</h4>
            <ul className={styles.footerLinks}>
              {patientLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
          <span>© {year} Saiera Miraj Memorial Hospital. All rights reserved.</span>
          <div className={styles.footerBottomLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
