// components/Layout.jsx
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";

export default function Layout({ children, title, description }) {
  const pageTitle = title
    ? `${title} | Saiera Miraj Memorial Hospital`
    : "Saiera Miraj Memorial Hospital | Compassionate Care, Advanced Medicine";

  const pageDesc =
    description ||
    "Saiera Miraj Memorial Hospital – providing compassionate, high-quality healthcare in Lahore since 1998. Book appointments, find doctors, and access 24/7 emergency services.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a1628" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
