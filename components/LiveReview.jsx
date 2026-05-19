// components/LiveReview.jsx
// Fetches and displays the single active review posted by admin
// Use this wherever you show patient reviews on the website

import { useState, useEffect } from 'react';

export default function LiveReview({ fallback = null }) {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(data => setReview(data.review))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  // If no review posted yet, show fallback (optional static review) or nothing
  if (!review || !review.name) return fallback || null;

  const initials = review.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const postedDate = new Date(review.posted_at).toLocaleDateString('en-PK', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e0e7ef',
      borderRadius: 12,
      padding: '24px',
      maxWidth: 480,
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Stars */}
      <div style={{ color: '#f59e0b', fontSize: 20, marginBottom: 12, letterSpacing: 2 }}>
        ★★★★★
      </div>

      {/* Review text */}
      <p style={{
        fontSize: 15, lineHeight: 1.7, color: '#374151',
        margin: '0 0 16px', fontStyle: 'italic',
      }}>
        "{review.message}"
      </p>

      {/* Reviewer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: '#1a2e4a', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 600, flexShrink: 0,
        }}>
          {initials}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#1a2e4a' }}>{review.name}</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Patient · {postedDate}</div>
        </div>
      </div>
    </div>
  );
}
