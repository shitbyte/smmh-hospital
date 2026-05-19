// pages/contact.jsx
import Head from 'next/head';
import ContactForm from '../components/ContactForm';
import Layout from '../components/Layout';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Saiera Miraj Memorial Hospital</title>
        <meta name="description" content="Get in touch with SMMH. Send us a message and our team will respond as soon as possible." />
      </Head>

      <Layout>
        <div style={{
          minHeight: '80vh',
          background: '#f8fafc',
          padding: '60px 20px',
        }}>
          <div style={{
            maxWidth: 760,
            margin: '0 auto',
            background: '#fff',
            borderRadius: 16,
            padding: '48px 40px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          }}>
            <h1 style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#1a2e4a',
              marginBottom: 8,
            }}>
              Send Us a Message
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: 15,
              marginBottom: 32,
            }}>
              Have a question or feedback? Fill out the form below and we'll get back to you.
            </p>

            <ContactForm />
          </div>
        </div>
      </Layout>
    </>
  );
}