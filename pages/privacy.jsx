import Head from "next/head";
import Link from "next/link";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Saiera Miraj Memorial Hospital</title>
        <meta
          name="description"
          content="Privacy Policy of Saiera Miraj Memorial Hospital – how we collect, use, and protect your personal and medical information."
        />
        <meta name="theme-color" content="#0a1628" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        :root {
          --navy: #0a1628;
          --navy-light: #112240;
          --navy-mid: #0d1f3c;
          --gold: #c9a84c;
          --gold-light: #e8c97a;
          --teal: #0ea5a0;
          --teal-light: #14c9c3;
          --white: #ffffff;
          --text-muted: #8fa3bc;
          --border: rgba(255, 255, 255, 0.08);
        }
        .pp-body {
          font-family: "DM Sans", sans-serif;
          background: var(--navy);
          color: var(--white);
          line-height: 1.7;
          margin: 0;
        }
        .pp-topbar {
          background: var(--navy-mid);
          border-bottom: 1px solid var(--border);
          padding: 8px 0;
          font-size: 13px;
          color: var(--text-muted);
        }
        .pp-topbar .inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pp-topbar a {
          color: var(--text-muted);
          text-decoration: none;
        }
        .pp-topbar .emergency {
          color: #ff4d4d;
          font-weight: 600;
        }
        .pp-hero {
          background: linear-gradient(
            135deg,
            var(--navy-mid) 0%,
            var(--navy) 60%
          );
          border-bottom: 1px solid var(--border);
          padding: 72px 24px 56px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .pp-hero::before {
          content: "";
          position: absolute;
          top: -80px;
          right: -80px;
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(14, 165, 160, 0.08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }
        .pp-badge {
          display: inline-block;
          background: rgba(14, 165, 160, 0.12);
          border: 1px solid rgba(14, 165, 160, 0.3);
          color: var(--teal-light);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 20px;
          margin-bottom: 20px;
        }
        .pp-hero h1 {
          font-family: "Playfair Display", serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--white);
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .pp-hero h1 span {
          color: var(--gold);
        }
        .pp-hero p {
          color: var(--text-muted);
          font-size: 16px;
          max-width: 540px;
          margin: 0 auto 24px;
        }
        .pp-meta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 13px;
          color: var(--text-muted);
        }
        .pp-meta strong {
          color: var(--white);
        }
        .pp-page-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 64px 24px;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 48px;
          align-items: start;
        }
        .pp-toc {
          position: sticky;
          top: 88px;
          background: var(--navy-light);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          font-size: 14px;
        }
        .pp-toc h3 {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .pp-toc ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin: 0;
          padding: 0;
        }
        .pp-toc a {
          display: block;
          padding: 7px 10px;
          border-radius: 6px;
          color: var(--text-muted);
          text-decoration: none;
          transition: all 0.2s;
          border-left: 2px solid transparent;
        }
        .pp-toc a:hover {
          color: var(--teal-light);
          background: rgba(14, 165, 160, 0.06);
          border-left-color: var(--teal);
        }
        .pp-content section {
          margin-bottom: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid var(--border);
        }
        .pp-content section:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .pp-num {
          display: inline-block;
          width: 28px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          background: rgba(14, 165, 160, 0.15);
          border: 1px solid rgba(14, 165, 160, 0.3);
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--teal-light);
          margin-bottom: 12px;
        }
        .pp-content h2 {
          font-family: "Playfair Display", serif;
          font-size: 1.45rem;
          color: var(--white);
          margin-bottom: 16px;
          font-weight: 600;
        }
        .pp-content p {
          color: #b0c4d8;
          margin-bottom: 14px;
          font-size: 15px;
        }
        .pp-content ul {
          list-style: none;
          margin: 14px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0;
        }
        .pp-content ul li {
          color: #b0c4d8;
          font-size: 15px;
          padding-left: 20px;
          position: relative;
        }
        .pp-content ul li::before {
          content: "›";
          position: absolute;
          left: 0;
          color: var(--teal);
          font-weight: 700;
        }
        .pp-content strong {
          color: var(--white);
          font-weight: 600;
        }
        .pp-highlight {
          background: rgba(14, 165, 160, 0.06);
          border: 1px solid rgba(14, 165, 160, 0.2);
          border-left: 3px solid var(--teal);
          border-radius: 8px;
          padding: 18px 20px;
          margin: 20px 0;
        }
        .pp-highlight p {
          color: #9ecfcc;
          font-size: 14px;
          margin: 0;
        }
        .pp-contact-card {
          background: var(--navy-light);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 20px 24px;
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pp-contact-card p {
          margin: 0;
          font-size: 14px;
          color: #b0c4d8;
        }
        .pp-contact-card a {
          color: var(--teal-light);
          text-decoration: none;
        }
        .pp-footer {
          background: var(--navy-mid);
          border-top: 1px solid var(--border);
          padding: 56px 24px 32px;
        }
        .pp-footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
        }
        .pp-footer-brand p {
          color: var(--text-muted);
          font-size: 14px;
          margin-top: 12px;
          line-height: 1.7;
        }
        .pp-footer-col h4 {
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .pp-footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 0;
          margin: 0;
        }
        .pp-footer-col a {
          color: #7a92a8;
          font-size: 14px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .pp-footer-col a:hover {
          color: var(--teal-light);
        }
        .pp-footer-bottom {
          max-width: 1200px;
          margin: 40px auto 0;
          border-top: 1px solid var(--border);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 13px;
          color: var(--text-muted);
        }
        .pp-footer-bottom a {
          color: var(--text-muted);
          text-decoration: none;
        }
        .pp-footer-bottom a:hover {
          color: var(--teal-light);
        }
        .pp-footer-legal {
          display: flex;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .pp-page-body {
            grid-template-columns: 1fr;
          }
          .pp-toc {
            position: static;
          }
          .pp-footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 560px) {
          .pp-footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="pp-body">
        {/* TOP BAR */}
        <div className="pp-topbar">
          <div className="inner">
            <span>📍 Lahore-Jaranwala Road, Begumkot, Lahore, Punjab, Pakistan</span>
            <span>
              Open 24 × 7 &nbsp;|&nbsp;{" "}
              <span className="emergency">
                🚨 Emergency:{" "}
                <a href="tel:923322224587">+92332 2224587</a>
              </span>
            </span>
          </div>
        </div>

        {/* HERO */}
        <div className="pp-hero">
          <div className="pp-badge">Legal &amp; Compliance</div>
          <h1>
            Privacy <span>Policy</span>
          </h1>
          <p>
            How Saiera Miraj Memorial Hospital collects, uses, and safeguards
            your personal and medical information.
          </p>
          <div className="pp-meta">
            Last Updated: <strong>May 29, 2026</strong> &nbsp;·&nbsp;
            Effective: <strong>January 1, 2024</strong>
          </div>
        </div>

        {/* BODY */}
        <div className="pp-page-body">
          {/* SIDEBAR TOC */}
          <aside className="pp-toc">
            <h3>Contents</h3>
            <ul>
              {[
                ["#s1", "1. Information We Collect"],
                ["#s2", "2. How We Use Information"],
                ["#s3", "3. Sharing of Information"],
                ["#s4", "4. Data Security"],
                ["#s5", "5. Patient Rights"],
                ["#s6", "6. Cookies & Website Data"],
                ["#s7", "7. Children's Privacy"],
                ["#s8", "8. Retention of Data"],
                ["#s9", "9. Third-Party Links"],
                ["#s10", "10. Changes to Policy"],
                ["#s11", "11. Contact Us"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </aside>

          {/* CONTENT */}
          <div className="pp-content">
            <div className="pp-highlight">
              <p>
                Your privacy and the confidentiality of your medical information
                is of the utmost importance to us. This policy explains your
                rights and our responsibilities under applicable Pakistani law
                and international healthcare standards.
              </p>
            </div>

            <section id="s1">
              <div className="pp-num">01</div>
              <h2>Information We Collect</h2>
              <p>
                When you interact with Saiera Miraj Memorial Hospital — whether
                in person, through our website, or via phone — we may collect
                the following categories of information:
              </p>
              <ul>
                <li><strong>Personal Identification:</strong> Full name, date of birth, CNIC number, gender, nationality</li>
                <li><strong>Contact Details:</strong> Phone number, email address, residential address</li>
                <li><strong>Medical Information:</strong> Medical history, diagnoses, prescriptions, lab results, imaging reports, surgical records</li>
                <li><strong>Financial Information:</strong> Insurance details, billing records, payment information</li>
                <li><strong>Website Data:</strong> IP address, browser type, pages visited, time spent on site (via cookies)</li>
                <li><strong>Appointment Data:</strong> Booking requests, preferred doctors, dates, department selections</li>
              </ul>
            </section>

            <section id="s2">
              <div className="pp-num">02</div>
              <h2>How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul>
                <li>Providing medical diagnosis, treatment, and follow-up care</li>
                <li>Processing appointment bookings and sending reminders</li>
                <li>Communicating lab results, reports, and health updates</li>
                <li>Processing billing, insurance claims, and payments</li>
                <li>Improving hospital services, training, and quality assurance</li>
                <li>Complying with legal and regulatory obligations under Pakistani law</li>
                <li>Sending health awareness information and hospital updates (with your consent)</li>
              </ul>
              <p>We will <strong>never</strong> sell your personal or medical information to any third party for commercial purposes.</p>
            </section>

            <section id="s3">
              <div className="pp-num">03</div>
              <h2>Sharing of Information</h2>
              <p>We may share your information only in the following limited circumstances:</p>
              <ul>
                <li><strong>Treating Physicians:</strong> Doctors and clinical staff directly involved in your care</li>
                <li><strong>Insurance Providers:</strong> For claim processing with your authorised insurer</li>
                <li><strong>Referral Hospitals:</strong> When you are referred to another facility for specialised care</li>
                <li><strong>Legal Authorities:</strong> When required by court order or Pakistani law</li>
                <li><strong>Emergency Situations:</strong> When disclosure is necessary to protect your life or the life of others</li>
              </ul>
            </section>

            <section id="s4">
              <div className="pp-num">04</div>
              <h2>Data Security</h2>
              <p>We implement industry-standard safeguards to protect your information:</p>
              <ul>
                <li>SSL/TLS encryption for all data transmitted through our website</li>
                <li>Secure electronic health record (EHR) systems with access controls</li>
                <li>Physical security measures at all hospital premises</li>
                <li>Regular staff training on patient confidentiality and data handling</li>
                <li>Audit logs for access to sensitive medical records</li>
              </ul>
              <div className="pp-highlight">
                <p>
                  While we take every reasonable precaution, no system is 100%
                  secure. If you suspect any unauthorised use of your
                  information, please contact us immediately at{" "}
                  <strong>info@sairamirajhospital.com</strong>.
                </p>
              </div>
            </section>

            <section id="s5">
              <div className="pp-num">05</div>
              <h2>Your Rights as a Patient</h2>
              <ul>
                <li><strong>Right to Access:</strong> Request a copy of your medical records and personal data we hold</li>
                <li><strong>Right to Correction:</strong> Request corrections to inaccurate or incomplete information</li>
                <li><strong>Right to Confidentiality:</strong> Your medical information will not be disclosed without your consent, except as required by law</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for marketing communications at any time</li>
                <li><strong>Right to Complaint:</strong> Lodge a complaint with hospital management or relevant regulatory bodies</li>
              </ul>
            </section>

            <section id="s6">
              <div className="pp-num">06</div>
              <h2>Cookies &amp; Website Data</h2>
              <p>Our website uses cookies to enhance your browsing experience:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Preference Cookies:</strong> Remember your settings across visits</li>
              </ul>
              <p>You can control cookie settings through your browser at any time.</p>
            </section>

            <section id="s7">
              <div className="pp-num">07</div>
              <h2>Children&apos;s Privacy</h2>
              <p>
                We provide medical services to patients of all ages, including
                children. When a patient is under 18 years of age, all personal
                and medical information is handled with the consent and
                involvement of a parent or legal guardian, as required by
                Pakistani family law and medical ethics.
              </p>
            </section>

            <section id="s8">
              <div className="pp-num">08</div>
              <h2>Retention of Data</h2>
              <p>
                We retain patient medical records for a minimum of{" "}
                <strong>10 years</strong> from the date of last treatment, in
                accordance with PMDC guidelines. Non-medical personal data is
                retained for up to <strong>2 years</strong>, after which it is
                securely deleted or anonymised.
              </p>
            </section>

            <section id="s9">
              <div className="pp-num">09</div>
              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices of these external
                sites and encourage you to review their privacy policies before
                submitting any personal information.
              </p>
            </section>

            <section id="s10">
              <div className="pp-num">10</div>
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The updated
                version will always be posted on this page with a revised "Last
                Updated" date. Continued use of our services after changes are
                posted constitutes acceptance of the revised policy.
              </p>
            </section>

            <section id="s11">
              <div className="pp-num">11</div>
              <h2>Contact Us</h2>
              <p>For questions regarding this Privacy Policy or your personal data:</p>
              <div className="pp-contact-card">
                <p>🏥 <strong>Saiera Miraj Memorial Hospital</strong></p>
                <p>📍 Lahore-Jaranwala Road, Begumkot, Lahore, Punjab, Pakistan</p>
                <p>📧 <a href="mailto:info@sairamirajhospital.com">info@sairamirajhospital.com</a></p>
                <p>📞 <a href="tel:923322224587">+92332 2224587</a></p>
                <p>🕐 Patient Services: Monday – Saturday, 9:00 AM – 5:00 PM</p>
              </div>
            </section>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="pp-footer">
          <div className="pp-footer-grid">
            <div className="pp-footer-brand">
              <strong style={{ fontSize: "16px", color: "var(--white)" }}>
                Saiera Miraj Memorial Hospital
              </strong>
              <p>Est. 1998 · Lahore, Pakistan. Providing compassionate, high-quality healthcare for over 25 years.</p>
            </div>
            <div className="pp-footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/doctors">Our Doctors</Link></li>
                <li><Link href="/departments">Departments</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="pp-footer-col">
              <h4>Services</h4>
              <ul>
                <li><Link href="/services#emergency">Emergency Services</Link></li>
                <li><Link href="/services#surgery">Surgical Services</Link></li>
                <li><Link href="/services#maternity">Maternity Care</Link></li>
                <li><Link href="/services#lab">Diagnostic Lab</Link></li>
              </ul>
            </div>
            <div className="pp-footer-col">
              <h4>Patient Info</h4>
              <ul>
                <li><Link href="/#appointment">Book Appointment</Link></li>
                <li><Link href="/patients#rights">Patient Rights</Link></li>
                <li><Link href="/patients#visitor">Visitor Guide</Link></li>
                <li><Link href="/lab-results">Lab Results</Link></li>
              </ul>
            </div>
          </div>
          <div className="pp-footer-bottom">
            <span>© 2026 Saiera Miraj Memorial Hospital. All rights reserved.</span>
            <div className="pp-footer-legal">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
              <Link href="/sitemap">Sitemap</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
