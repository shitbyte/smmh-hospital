 import Head from "next/head";
 import Link from "next/link";
 
 export default function Sitemap() {
   const sections = [
     {
       icon: "🏠",
       iconClass: "icon-teal",
       title: "Main Pages",
       subtitle: "Core website sections",
       pages: [
         { label: "Home", href: "/", url: "/" },
         { label: "About Us", href: "/about", url: "/about" },
         { label: "Contact", href: "/contact", url: "/contact" },
         { label: "Careers", href: "/careers", url: "/careers" },
         { label: "Media & News", href: "/media", url: "/media" },
       ],
       subLinks: [
         { label: "Mission & Vision", href: "/about#mission" },
         { label: "Executive Team", href: "/about#team" },
         { label: "Our Facilities", href: "/about#facilities" },
         { label: "Gallery", href: "/media#gallery" },
       ],
     },
     {
       icon: "🩺",
       iconClass: "icon-red",
       title: "Care & Services",
       subtitle: "Medical services offered",
       pages: [
         { label: "All Services", href: "/services", url: "/services" },
         { label: "Departments", href: "/departments", url: "/departments" },
       ],
       subLinks: [
         { label: "Emergency Services", href: "/services#emergency" },
         { label: "Internal Medicine", href: "/services#internal" },
         { label: "Surgical Services", href: "/services#surgery" },
         { label: "Maternity & Gynecology", href: "/services#maternity" },
         { label: "Diagnostic Lab", href: "/services#lab" },
         { label: "Cardiology", href: "/services#cardiology" },
       ],
     },
     {
       icon: "👨‍⚕️",
       iconClass: "icon-blue",
       title: "Find a Doctor",
       subtitle: "Our medical specialists",
       pages: [
         { label: "All Doctors", href: "/doctors", url: "/doctors" },
       ],
       subLinks: [
         { label: "Dr. Furkh Shahzad – General Physician", href: "/doctors" },
         { label: "Dr. Wajeeha Sajjad – Gynaecologist", href: "/doctors" },
         { label: "Dr. Asif Sarwar – Pediatrician", href: "/doctors" },
         { label: "Dr. Hammad Ali Asghar – Eye Surgeon", href: "/doctors" },
         { label: "Dr. Sumaira Aziz – Physiotherapist", href: "/doctors" },
         { label: "Dr. Nimra Amjad – Dietitian", href: "/doctors" },
       ],
     },
     {
       icon: "🤝",
       iconClass: "icon-green",
       title: "Patients & Families",
       subtitle: "Patient information hub",
       pages: [
         { label: "Patient Info", href: "/patients", url: "/patients" },
         { label: "Lab Results", href: "/lab-results", url: "/lab-results" },
         { label: "Book Appointment", href: "/#appointment", url: "/#appointment" },
       ],
       subLinks: [
         { label: "Patient Rights", href: "/patients#rights" },
         { label: "Visitor Guide", href: "/patients#visitor" },
         { label: "Insurance Panels", href: "/patients#insurance" },
         { label: "Health & Wellness", href: "/patients#wellness" },
       ],
     },
     {
       icon: "📋",
       iconClass: "icon-gold",
       title: "Legal & Policies",
       subtitle: "Compliance documents",
       pages: [
         { label: "Privacy Policy", href: "/privacy", url: "/privacy" },
         { label: "Terms of Use", href: "/terms", url: "/terms" },
         { label: "Sitemap", href: "/sitemap", url: "/sitemap" },
       ],
       subLinks: [],
     },
   ];
 
   return (
     <>
       <Head>
         <title>Sitemap | Saiera Miraj Memorial Hospital</title>
         <meta
           name="description"
           content="Sitemap of Saiera Miraj Memorial Hospital – a complete directory of all pages on our website."
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
         .sm-body { font-family: "DM Sans", sans-serif; background: var(--navy); color: var(--white); line-height: 1.7; margin: 0; }
         .sm-topbar { background: var(--navy-mid); border-bottom: 1px solid var(--border); padding: 8px 0; font-size: 13px; color: var(--text-muted); }
         .sm-topbar .inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
         .sm-topbar a { color: var(--text-muted); text-decoration: none; }
         .sm-topbar .emergency { color: #ff4d4d; font-weight: 600; }
         .sm-hero { background: linear-gradient(135deg, var(--navy-mid) 0%, var(--navy) 60%); border-bottom: 1px solid var(--border); padding: 72px 24px 56px; text-align: center; position: relative; overflow: hidden; }
         .sm-hero::before { content: ""; position: absolute; bottom: -80px; right: -80px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(14,165,160,0.07) 0%, transparent 70%); pointer-events: none; }
         .sm-badge { display: inline-block; background: rgba(14,165,160,0.12); border: 1px solid rgba(14,165,160,0.3); color: var(--teal-light); font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 16px; border-radius: 20px; margin-bottom: 20px; }
         .sm-hero h1 { font-family: "Playfair Display", serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: var(--white); margin-bottom: 16px; }
         .sm-hero h1 span { color: var(--teal-light); }
         .sm-hero p { color: var(--text-muted); font-size: 16px; max-width: 540px; margin: 0 auto; }
 
         .sm-page-body { max-width: 1200px; margin: 0 auto; padding: 64px 24px; }
 
         .sm-stats { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 48px; }
         .sm-stat { background: var(--navy-light); border: 1px solid var(--border); border-radius: 8px; padding: 12px 20px; display: flex; align-items: center; gap: 10px; }
         .sm-stat strong { font-size: 22px; color: var(--teal-light); font-weight: 700; }
         .sm-stat span { font-size: 13px; color: var(--text-muted); }
 
         .sm-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
 
         .sm-card { background: var(--navy-light); border: 1px solid var(--border); border-radius: 12px; padding: 28px; transition: border-color 0.2s, transform 0.2s; }
         .sm-card:hover { border-color: rgba(14,165,160,0.3); transform: translateY(-2px); }
         .sm-card-emergency { border-color: rgba(255,77,77,0.2) !important; background: rgba(255,77,77,0.04) !important; }
         .sm-card-emergency:hover { border-color: rgba(255,77,77,0.4) !important; }
 
         .sm-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
         .sm-card-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
         .icon-teal { background: rgba(14,165,160,0.15); }
         .icon-gold { background: rgba(201,168,76,0.12); }
         .icon-blue { background: rgba(59,130,246,0.12); }
         .icon-green { background: rgba(34,197,94,0.12); }
         .icon-red { background: rgba(239,68,68,0.12); }
         .icon-emergency { background: rgba(255,77,77,0.15); }
         .sm-card-header h2 { font-size: 16px; font-weight: 600; color: var(--white); margin: 0; }
         .sm-card-header p { font-size: 12px; color: var(--text-muted); margin: 2px 0 0; }
 
         .sm-page-list { list-style: none; display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; }
         .sm-page-list li a { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 7px; color: #9ab3c8; text-decoration: none; font-size: 14px; transition: all 0.2s; }
         .sm-page-list li a:hover { color: var(--teal-light); background: rgba(14,165,160,0.07); padding-left: 14px; }
         .sm-page-list li a::before { content: "→"; color: var(--teal); font-size: 13px; flex-shrink: 0; }
         .sm-url { color: var(--text-muted); font-size: 12px; margin-left: auto; font-family: monospace; }
 
         .sm-sub-list { list-style: none; padding: 2px 0 0 20px; display: flex; flex-direction: column; gap: 1px; margin: 0; }
         .sm-sub-list li a { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 6px; color: #7a92a8; text-decoration: none; font-size: 13px; transition: all 0.2s; }
         .sm-sub-list li a:hover { color: var(--teal-light); background: rgba(14,165,160,0.05); }
         .sm-sub-list li a::before { content: "·"; color: var(--text-muted); }
 
         .sm-emergency-cta a { color: #ff8080 !important; }
         .sm-emergency-info { margin-top: 16px; padding: 12px; background: rgba(255,77,77,0.08); border-radius: 8px; font-size: 13px; color: #ff9999; }
 
         .sm-footer { background: var(--navy-mid); border-top: 1px solid var(--border); padding: 56px 24px 32px; }
         .sm-footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
         .sm-footer-brand p { color: var(--text-muted); font-size: 14px; margin-top: 12px; line-height: 1.7; }
         .sm-footer-col h4 { font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 16px; }
         .sm-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; padding: 0; margin: 0; }
         .sm-footer-col a { color: #7a92a8; font-size: 14px; text-decoration: none; transition: color 0.2s; }
         .sm-footer-col a:hover { color: var(--teal-light); }
         .sm-footer-bottom { max-width: 1200px; margin: 40px auto 0; border-top: 1px solid var(--border); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-muted); }
         .sm-footer-bottom a { color: var(--text-muted); text-decoration: none; }
         .sm-footer-bottom a:hover { color: var(--teal-light); }
         .sm-footer-legal { display: flex; gap: 24px; }
 
         @media (max-width: 900px) { .sm-grid { grid-template-columns: 1fr; } .sm-footer-grid { grid-template-columns: 1fr 1fr; } }
         @media (max-width: 560px) { .sm-footer-grid { grid-template-columns: 1fr; } }
       `}</style>
 
       <div className="sm-body">
         {/* TOP BAR */}
         <div className="sm-topbar">
           <div className="inner">
             <span>📍 Lahore-Jaranwala Road, Begumkot, Lahore, Punjab, Pakistan</span>
             <span>
               Open 24 × 7 &nbsp;|&nbsp;{" "}
               <span className="emergency">
                 🚨 Emergency: <a href="tel:923322224587">+92332 2224587</a>
               </span>
             </span>
           </div>
         </div>
 
         {/* HERO */}
         <div className="sm-hero">
           <div className="sm-badge">Navigation</div>
           <h1>Website <span>Sitemap</span></h1>
           <p>A complete directory of all pages on the Saiera Miraj Memorial Hospital website. Find what you&apos;re looking for quickly.</p>
         </div>
 
         {/* BODY */}
         <div className="sm-page-body">
 
           {/* STATS */}
           <div className="sm-stats">
             <div className="sm-stat"><strong>13</strong><span>Total Pages</span></div>
             <div className="sm-stat"><strong>6</strong><span>Main Sections</span></div>
             <div className="sm-stat"><strong>24/7</strong><span>Online Access</span></div>
           </div>
 
           {/* GRID */}
           <div className="sm-grid">
 
             {/* DYNAMIC SECTION CARDS */}
             {sections.map((section) => (
               <div className="sm-card" key={section.title}>
                 <div className="sm-card-header">
                   <div className={`sm-card-icon ${section.iconClass}`}>{section.icon}</div>
                   <div>
                     <h2>{section.title}</h2>
                     <p>{section.subtitle}</p>
                   </div>
                 </div>
                 <ul className="sm-page-list">
                   {section.pages.map((page) => (
                     <li key={page.href}>
                       <Link href={page.href}>
                         {page.label}
                         <span className="sm-url">{page.url}</span>
                       </Link>
                     </li>
                   ))}
                 </ul>
                 {section.subLinks.length > 0 && (
                   <ul className="sm-sub-list">
                     {section.subLinks.map((sub) => (
                       <li key={sub.label}>
                         <Link href={sub.href}>{sub.label}</Link>
                       </li>
                     ))}
                   </ul>
                 )}
               </div>
             ))}
 
             {/* EMERGENCY CARD */}
             <div className="sm-card sm-card-emergency">
               <div className="sm-card-header">
                 <div className="sm-card-icon icon-emergency">🚨</div>
                 <div>
                   <h2 style={{ color: "#ff8080" }}>Emergency</h2>
                   <p>Available 24 hours a day</p>
                 </div>
               </div>
               <p style={{ color: "#9ab3c8", fontSize: "14px", marginBottom: "16px" }}>
                 For life-threatening emergencies, call immediately:
               </p>
               <ul className="sm-page-list sm-emergency-cta">
                 <li><a href="tel:923322224587">Direct Line: +92332 2224587</a></li>
                 <li><a href="tel:1122">Rescue: 1122</a></li>
               </ul>
               <div className="sm-emergency-info">
                 📍 Lahore-Jaranwala Road, Begumkot, Lahore
               </div>
             </div>
 
           </div>
         </div>
 
         {/* FOOTER */}
         <footer className="sm-footer">
           <div className="sm-footer-grid">
             <div className="sm-footer-brand">
               <strong style={{ fontSize: "16px", color: "var(--white)" }}>
                 Saiera Miraj Memorial Hospital
               </strong>
               <p>Est. 1998 · Lahore, Pakistan. Providing compassionate, high-quality healthcare for over 25 years.</p>
             </div>
             <div className="sm-footer-col">
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
             <div className="sm-footer-col">
               <h4>Services</h4>
               <ul>
                 <li><Link href="/services#emergency">Emergency Services</Link></li>
                 <li><Link href="/services#surgery">Surgical Services</Link></li>
                 <li><Link href="/services#maternity">Maternity Care</Link></li>
                 <li><Link href="/services#lab">Diagnostic Lab</Link></li>
               </ul>
             </div>
             <div className="sm-footer-col">
               <h4>Patient Info</h4>
               <ul>
                 <li><Link href="/#appointment">Book Appointment</Link></li>
                 <li><Link href="/patients#rights">Patient Rights</Link></li>
                 <li><Link href="/patients#visitor">Visitor Guide</Link></li>
                 <li><Link href="/lab-results">Lab Results</Link></li>
               </ul>
             </div>
           </div>
           <div className="sm-footer-bottom">
             <span>© 2026 Saiera Miraj Memorial Hospital. All rights reserved.</span>
             <div className="sm-footer-legal">
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
 