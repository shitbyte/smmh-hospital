// pages/404.jsx
import Link from "next/link";
import Layout from "../components/Layout";

export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <div style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "60px 24px",
      }}>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "8rem",
            fontWeight: 900,
            color: "rgba(13,110,110,0.1)",
            lineHeight: 1,
            marginBottom: 8,
          }}>404</div>
          <h1 style={{ fontSize: "1.8rem", marginBottom: 14 }}>Page Not Found</h1>
          <p style={{ color: "var(--gray)", marginBottom: 32, maxWidth: 380, margin: "0 auto 32px" }}>
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/" className="btn-primary">Return to Home</Link>
        </div>
      </div>
    </Layout>
  );
}
