import Head from "next/head";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Use | Saiera Miraj Memorial Hospital</title>
        <meta
          name="description"
          content="Terms of Use for Saiera Miraj Memorial Hospital – governing your use of our website and services."
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
        .tu-body { font-family: "DM Sans", sans-serif; background: var(--navy); color: var(--white); line-height: 1.7; margin: 0; }
        .tu-topbar { background: var(--navy-mid); border-bottom: 1px solid var(--border); padding: 8px 0; font-size: 13px; color: var(--text-muted); }
        .tu-topbar .inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
        .tu-topbar a { color: var(--text-muted); text-decoration: none; }
        .tu-topbar .emergency { color: #ff4d4d; font-weight: 600; }
        .tu-hero { background: linear-gradient(135deg, var(--navy-mid) 0%, var(--navy) 60%); border-bottom: 1px solid var(--border); padding: 72px 24px 56px; text-align: center; position: relative; overflow: hidden; }
        .tu-hero::before { content: ""; position: absolute; top: -80px; left: -80px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%); pointer-events: none; }
        .tu-badge { display: inline-block; background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3); color: var(--gold-light); font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 16px; border-radius: 20px; margin-bottom: 20px; }
        .tu-hero h1 { font-family: "Playfair Display", serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: var(--white); margin-bottom: 16px; line-height: 1.2; }
        .tu-hero h1 span { color: var(--gold); }
        .tu-hero p { color: var(--text-muted); font-size: 16px; max-width: 540px; margin: 0 auto 24px; }
        .tu-meta { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 6px; padding: 8px 16px; font-size: 13px; color: var(--text-muted); }
        .tu-meta strong { color: var(--white); }
        .tu-page-body { max-width: 1100px; margin: 0 auto; padding: 64px 24px; display: grid; grid-template-columns: 240px 1fr; gap: 48px; align-items: start; }
        .tu-toc { position: sticky; top: 88px; background: var(--navy-light); border: 1px solid var(--border); border-radius: 12px; padding: 24px; font-size: 14px; }
        .tu-toc h3 { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 16px; }
        .tu-toc ul { list-style: none; display: flex; flex-direction: column; gap: 4px; margin: 0; padding: 0; }
        .tu-toc a { display: block; padding: 7px 10px; border-radius: 6px; color: var(--text-muted); text-decoration: none; transition: all 0.2s; border-left: 2px solid transparent; }
        .tu-toc a:hover { color: var(--gold-light); background: rgba(201,168,76,0.06); border-left-color: var(--gold); }
        .tu-content section { margin-bottom: 48px; padding-bottom: 48px; border-bottom: 1px solid var(--border); }
        .tu-content section:last-child { border-bottom: none; margin-bottom: 0; }
        .tu-num { display: inline-block; width: 28px; height: 28px; line-height: 28px; text-align: center; background: rgba(201,168,76,0.12); border: 1px solid rgba(201,168,76,0.3); border-radius: 6px; font-size: 11px; font-weight: 700; color: var(--gold-light); margin-bottom: 12px; }
        .tu-content h2 { font-family: "Playfair Display", serif; font-size: 1.45rem; color: var(--white); margin-bottom: 16px; font-weight: 600; }
        .tu-content p { color: #b0c4d8; margin-bottom: 14px; font-size: 15px; }
        .tu-content ul { list-style: none; margin: 14px 0; display: flex; flex-direction: column; gap: 8px; padding: 0; }
        .tu-content ul li { color: #b0c4d8; font-size: 15px; padding-left: 20px; position: relative; }
        .tu-content ul li::before { content: "›"; position: absolute; left: 0; color: var(--gold); font-weight: 700; }
        .tu-content strong { color: var(--white); font-weight: 600; }
        .tu-highlight { background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.2); border-left: 3px solid var(--gold); border-radius: 8px; padding: 18px 20px; margin: 20px 0; }
        .tu-highlight p { color: #c9b87a; font-size: 14px; margin: 0; }
        .tu-warning { background: rgba(255,77,77,0.06); border: 1px solid rgba(255,77,77,0.2); border-left: 3px solid #ff4d4d; border-radius: 8px; padding: 18px 20px; margin: 20px 0; }
        .tu-warning p { color: #ff9999; font-size: 14px; margin: 0; }
        .tu-contact-card { background: var(--navy-light); border: 1px solid var(--border); border-radius: 10px; padding: 20px 24px; margin-top: 20px; display: flex; flex-direction: column; gap: 10px; }
        .tu-contact-card p { margin: 0; font-size: 14px; color: #b0c4d8; }
        .tu-contact-card a { color: var(--teal-light); text-decoration: none; }
        .tu-footer { background: var(--navy-mid); border-top: 1px solid var(--border); padding: 56px 24px 32px; }
        .tu-footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
        .tu-footer-brand p { color: var(--text-muted); font-size: 14px; margin-top: 12px; line-height: 1.7; }
        .tu-footer-col h4 { font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 16px; }
        .tu-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; padding: 0; margin: 0; }
        .tu-footer-col a { color: #7a92a8; font-size: 14px; text-decoration: none; transition: color 0.2s; }
        .tu-footer-col a:hover { color: var(--teal-light); }
        .tu-footer-bottom { max-width: 1200px; margin: 40px auto 0; border-top: 1px solid var(--border); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-muted); }
        .tu-footer-bottom a { color: var(--text-muted); text-decoration: none; }
        .tu-footer-bottom a:hover { color: var(--teal-light); }
        .tu-footer-legal { display: flex; gap: 24px; }
        @media (max-width: 900px) { .tu-page-body { grid-template-columns: 1fr; } .tu-toc { position: static; } .tu-footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .tu-footer-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="tu-body">
        <div className="tu-topbar">
          <div className="inner">
            <span>📍 Lahore-Jaranwala Road, Begumkot, Lahore, Punjab, Pakistan</span>
            <span>Open 24 × 7 &nbsp;|&nbsp; <span className="emergency">🚨 Emergency: <a href="tel:923322224587">+92332 2224587</a></span></span>
          </div>
        </div>

        <div className="tu-hero">
          <div className="tu-badge">Legal &amp; Compliance</div>
          <h1>Terms of <span>Use</span></h1>
          <p>Please read these terms carefully before using the Saiera Miraj Memorial Hospital website or services.</p>
          <div className="tu-meta">Last Updated: <strong>May 29, 2026</strong> &nbsp;·&nbsp; Effective: <strong>January 1, 2024</strong></div>
        </div>

        <div className="tu-page-body">
          <aside className="tu-toc">
            <h3>Contents</h3>
            <ul>
              {[
                ["#t1","1. Acceptance of Terms"],["#t2","2. Use of Website"],
                ["#t3","3. Medical Disclaimer"],["#t4","4. Appointment Booking"],
                ["#t5","5. Intellectual Property"],["#t6","6. User Conduct"],
                ["#t7","7. Third-Party Links"],["#t8","8. Limitation of Liability"],
                ["#t9","9. Privacy"],["#t10","10. Governing Law"],
                ["#t11","11. Changes to Terms"],["#t12","12. Contact Us"],
              ].map(([href, label]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </aside>

          <div className="tu-content">
            <div className="tu-highlight">
              <p>By accessing or using <strong>www.sairamerajhospital.health</strong>, you agree to be bound by these Terms of Use. If you do not agree, please do not use our website.</p>
            </div>

            <section id="t1">
              <div className="tu-num">01</div>
              <h2>Acceptance of Terms</h2>
              <p>These Terms of Use govern your access to and use of the website operated by <strong>Saiera Miraj Memorial Hospital</strong> ("SMMH"). By using this website, you confirm that you are at least 18 years of age, or are accessing it under the supervision of a parent or guardian, and that you accept these Terms in full.</p>
            </section>

            <section id="t2">
              <div className="tu-num">02</div>
              <h2>Use of This Website</h2>
              <p>You may use this website for lawful purposes only. Permitted uses include:</p>
              <ul>
                <li>Browsing hospital information, services, and doctor profiles</li>
                <li>Submitting appointment booking requests</li>
                <li>Accessing your lab results using your personal MRN</li>
                <li>Contacting the hospital via provided forms or contact details</li>
                <li>Reading health information and news published on the site</li>
              </ul>
            </section>

            <section id="t3">
              <div className="tu-num">03</div>
              <h2>Medical Disclaimer</h2>
              <div className="tu-warning">
                <p>⚠️ <strong>Important:</strong> Health information on this website is for general informational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment.</p>
              </div>
              <p>Always seek the advice of a qualified physician. In a medical emergency, call <strong>1122 (Rescue)</strong> or go directly to your nearest emergency department immediately.</p>
            </section>

            <section id="t4">
              <div className="tu-num">04</div>
              <h2>Appointment Booking</h2>
              <p>The online booking feature is a request service only. Submission does not guarantee confirmation until our team contacts you via phone or SMS.</p>
              <ul>
                <li>Appointments are subject to doctor availability</li>
                <li>SMMH reserves the right to reschedule in exceptional circumstances</li>
                <li>Patients should arrive 15 minutes before their scheduled time</li>
                <li>Cancellations should be communicated at least 2 hours in advance</li>
              </ul>
            </section>

            <section id="t5">
              <div className="tu-num">05</div>
              <h2>Intellectual Property</h2>
              <p>All content on this website — text, graphics, logos, images, videos, and design — is the property of <strong>Saiera Miraj Memorial Hospital</strong> and is protected under Pakistani and international copyright laws.</p>
              <ul>
                <li>You may not reproduce or republish any content without prior written consent</li>
                <li>You may print content for personal, non-commercial use only</li>
                <li>The SMMH name, logo, and branding may not be used without permission</li>
              </ul>
            </section>

            <section id="t6">
              <div className="tu-num">06</div>
              <h2>User Conduct</h2>
              <p>When using this website, you agree not to:</p>
              <ul>
                <li>Post false, misleading, defamatory, or harmful content</li>
                <li>Attempt to gain unauthorised access to any part of the website</li>
                <li>Use automated tools to extract data from the website</li>
                <li>Impersonate any person or SMMH staff member</li>
                <li>Interfere with or disrupt website operation</li>
                <li>Violate any applicable local or international laws</li>
              </ul>
            </section>

            <section id="t7">
              <div className="tu-num">07</div>
              <h2>Third-Party Links</h2>
              <p>Our website may contain links to external websites. These links do not imply endorsement by SMMH. We have no control over external content and accept no responsibility for third-party websites.</p>
            </section>

            <section id="t8">
              <div className="tu-num">08</div>
              <h2>Limitation of Liability</h2>
              <p>To the fullest extent permitted by Pakistani law, SMMH shall not be liable for any indirect or consequential loss arising from your use of this website, inaccuracies in published information, or decisions made based on website content without consulting a medical professional.</p>
              <div className="tu-highlight">
                <p>Liability for direct loss arising from actual medical treatment is governed separately by your patient agreement and applicable healthcare regulations in Pakistan.</p>
              </div>
            </section>

            <section id="t9">
              <div className="tu-num">09</div>
              <h2>Privacy</h2>
              <p>Your use of this website is also governed by our <Link href="/privacy" style={{color:"var(--teal-light)"}}>Privacy Policy</Link>, which is incorporated into these Terms by reference.</p>
            </section>

            <section id="t10">
              <div className="tu-num">10</div>
              <h2>Governing Law</h2>
              <p>These Terms are governed by the laws of the <strong>Islamic Republic of Pakistan</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts of <strong>Lahore, Punjab, Pakistan</strong>.</p>
            </section>

            <section id="t11">
              <div className="tu-num">11</div>
              <h2>Changes to These Terms</h2>
              <p>SMMH reserves the right to update these Terms at any time. The revised Terms will be posted on this page with an updated effective date. Continued use of the website constitutes acceptance of the new Terms.</p>
            </section>

            <section id="t12">
              <div className="tu-num">12</div>
              <h2>Contact Us</h2>
              <p>For questions regarding these Terms of Use:</p>
              <div className="tu-contact-card">
                <p>🏥 <strong>Saiera Miraj Memorial Hospital</strong></p>
                <p>📍 Lahore-Jaranwala Road, Begumkot, Lahore, Punjab, Pakistan</p>
                <p>📧 <a href="mailto:info@sairamirajhospital.com">info@sairamirajhospital.com</a></p>
                <p>📞 <a href="tel:923322224587">+92332 2224587</a></p>
                <p>🕐 Administration: Monday – Saturday, 9:00 AM – 5:00 PM</p>
              </div>
            </section>
          </div>
        </div>

        <footer className="tu-footer">
          <div className="tu-footer-grid">
            <div className="tu-footer-brand">
              <strong style={{fontSize:"16px",color:"var(--white)"}}>Saiera Miraj Memorial Hospital</strong>
              <p>Est. 1998 · Lahore, Pakistan. Providing compassionate healthcare for over 25 years.</p>
            </div>
            <div className="tu-footer-col">
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
            <div className="tu-footer-col">
              <h4>Services</h4>
              <ul>
                <li><Link href="/services#emergency">Emergency Services</Link></li>
                <li><Link href="/services#surgery">Surgical Services</Link></li>
                <li><Link href="/services#maternity">Maternity Care</Link></li>
                <li><Link href="/services#lab">Diagnostic Lab</Link></li>
              </ul>
            </div>
            <div className="tu-footer-col">
              <h4>Patient Info</h4>
              <ul>
                <li><Link href="/#appointment">Book Appointment</Link></li>
                <li><Link href="/patients#rights">Patient Rights</Link></li>
                <li><Link href="/patients#visitor">Visitor Guide</Link></li>
                <li><Link href="/lab-results">Lab Results</Link></li>
              </ul>
            </div>
          </div>
          <div className="tu-footer-bottom">
            <span>© 2026 Saiera Miraj Memorial Hospital. All rights reserved.</span>
            <div className="tu-footer-legal">
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
