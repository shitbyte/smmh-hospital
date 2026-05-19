// components/ContactForm.jsx
// Replace your existing contact form with this component
// Submits to /api/contact → saves to Supabase contact_messages

import { useState } from 'react';

const initialState = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm(initialState);
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{
        background: '#f0fdf4', border: '1.5px solid #86efac',
        borderRadius: 12, padding: '32px 24px', textAlign: 'center',
      }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
        <h3 style={{ margin: '0 0 8px', color: '#15803d', fontSize: 20 }}>Message Received!</h3>
        <p style={{ margin: '0 0 20px', color: '#166534', fontSize: 15 }}>
          Thank you for contacting SMMH. Our team will get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus('idle')}
          style={{
            background: '#15803d', color: '#fff', border: 'none',
            borderRadius: 8, padding: '10px 24px', fontSize: 14,
            cursor: 'pointer', fontWeight: 500,
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+92 300 0000000"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Message *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Write your message here…"
          style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
        />
      </div>

      {status === 'error' && (
        <div style={{
          background: '#fef2f2', border: '1px solid #fca5a5',
          borderRadius: 8, padding: '12px 16px', marginBottom: 16,
          color: '#dc2626', fontSize: 14,
        }}>
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: status === 'loading' ? '#9ca3af' : '#1a2e4a',
          color: '#fff', border: 'none', borderRadius: 8,
          padding: '12px 28px', fontSize: 15, fontWeight: 600,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          width: '100%',
        }}
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 500,
  color: '#374151', marginBottom: 6,
};

const inputStyle = {
  width: '100%', padding: '10px 12px', fontSize: 14,
  border: '1px solid #d1d5db', borderRadius: 8,
  outline: 'none', boxSizing: 'border-box',
  fontFamily: 'inherit', color: '#111827',
  background: '#fff',
};
