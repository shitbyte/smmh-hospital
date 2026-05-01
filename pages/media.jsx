// pages/media.jsx  ── News, Events & Gallery
import Layout from "../components/Layout";

const news = [
  { date:"March 2025", title:"SMMH Opens New Cardiac Catheterisation Lab", summary:"A state-of-the-art cath lab with biplane imaging has been inaugurated, expanding our interventional cardiology services." },
  { date:"January 2025", title:"SMMH Hosts Annual Medical Conference", summary:"Over 300 healthcare professionals gathered for our CME-accredited conference on advances in minimally invasive surgery." },
  { date:"November 2024", title:"Free Cancer Screening Camp — 1,200 Screened", summary:"Our oncology team conducted a two-day free screening camp benefiting over 1,200 patients from across the city." },
  { date:"September 2024", title:"New Paediatric ICU Inaugurated", summary:"A 12-bed paediatric intensive care unit equipped with the latest neonatal and paediatric monitoring systems." },
];

export default function MediaPage() {
  return (
    <Layout title="News & Media" description="Latest news, events and press releases from Saiera Miraj Memorial Hospital.">
      <div style={{ background:"linear-gradient(135deg, var(--navy), #0a3d3d)", padding:"80px 0 60px", textAlign:"center", color:"white" }}>
        <div className="container">
          <span className="section-label" style={{ color:"var(--gold-light)", background:"rgba(201,168,76,0.15)" }}>Media</span>
          <h1 className="section-title" style={{ color:"white", marginTop:12 }}>News &amp; Events</h1>
          <p style={{ color:"#94afc8", maxWidth:540, margin:"0 auto", fontSize:"1.05rem", lineHeight:1.75 }}>
            Stay updated with the latest news, events, and announcements from SMMH.
          </p>
        </div>
      </div>

      {/* News */}
      <section className="section" id="news">
        <div className="container" style={{ maxWidth:820 }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-label">Latest Updates</span>
            <h2 className="section-title">News &amp; Press Releases</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {news.map((item) => (
              <div key={item.title} className="card reveal" style={{ padding:"28px 28px" }}>
                <div style={{ fontSize:"0.78rem", color:"var(--teal)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>
                  📅 {item.date}
                </div>
                <h3 style={{ color:"var(--navy)", fontSize:"1.1rem", fontWeight:700, marginBottom:10 }}>{item.title}</h3>
                <p style={{ color:"var(--gray)", lineHeight:1.75, margin:0 }}>{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="section" id="gallery" style={{ background:"var(--cream)" }}>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-label">Our Facility</span>
            <h2 className="section-title">Photo Gallery</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:16 }}>
            {["Emergency Wing","Cardiac ICU","Operation Theatre","Maternity Suite","Diagnostic Lab","Paediatric Ward","Pharmacy","Reception"].map((label) => (
              <div key={label} style={{ background:"linear-gradient(135deg, var(--navy), var(--teal))", borderRadius:12, height:150, display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.7)", fontSize:"0.88rem", fontWeight:600, textAlign:"center", padding:12 }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
