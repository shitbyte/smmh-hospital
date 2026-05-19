// components/AdminContactMessages.jsx
// Drop-in replacement for the Contact Messages section in your admin dashboard
// Props: none — fetches its own data

import { useState, useEffect, useCallback } from 'react';

const TABS = [
  { key: 'all', label: 'All Messages' },
  { key: 'review', label: 'Reviews' },
  { key: 'suggestion', label: 'Suggestions' },
  { key: 'complaint', label: 'Complaints' },
];

const CATEGORY_COLORS = {
  review: { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7' },
  suggestion: { bg: '#e3f2fd', text: '#1565c0', border: '#90caf9' },
  complaint: { bg: '#fce4ec', text: '#c62828', border: '#f48fb1' },
};

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [posting, setPosting] = useState(null);
  const [categorizing, setCategorizing] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {
      showToast('Failed to load messages', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const setCategory = async (id, category) => {
    setCategorizing(id);
    try {
      await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, category, status: 'read' }),
      });
      setMessages(prev =>
        prev.map(m => m.id === id ? { ...m, category, status: 'read' } : m)
      );
      showToast(`Moved to ${category}s`);
    } catch {
      showToast('Failed to update', 'error');
    } finally {
      setCategorizing(null);
    }
  };

  const postAsReview = async (msg) => {
    if (!window.confirm(`Post "${msg.name}'s" message as the live website review?\nThis will replace the current review.`)) return;
    setPosting(msg.id);
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'post_review', id: msg.id }),
      });
      if (!res.ok) throw new Error();
      setMessages(prev =>
        prev.map(m => ({ ...m, posted_to_reviews: m.id === msg.id }))
      );
      showToast('✓ Posted as live review on website!');
    } catch {
      showToast('Failed to post review', 'error');
    } finally {
      setPosting(null);
    }
  };

  const filtered = messages.filter(m => {
    if (activeTab === 'all') return true;
    return m.category === activeTab;
  });

  const counts = {
    all: messages.length,
    review: messages.filter(m => m.category === 'review').length,
    suggestion: messages.filter(m => m.category === 'suggestion').length,
    complaint: messages.filter(m => m.category === 'complaint').length,
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 9999,
          background: toast.type === 'error' ? '#c62828' : '#1b5e20',
          color: '#fff', padding: '12px 20px', borderRadius: 8,
          fontSize: 14, fontWeight: 500, boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          animation: 'fadeIn 0.2s ease',
        }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, color: '#1a2e4a', fontWeight: 600 }}>
          Contact Messages <span style={{ fontSize: 16, color: '#666', fontWeight: 400 }}>({messages.length})</span>
        </h2>
        <button
          onClick={fetchMessages}
          style={{ background: 'none', border: '1px solid #ccc', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontSize: 13, color: '#555' }}
        >
          ↻ Refresh
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, borderBottom: '2px solid #e8edf2', paddingBottom: 0 }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '10px 16px', fontSize: 14, fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? '#1a2e4a' : '#777',
              borderBottom: activeTab === tab.key ? '2px solid #1a2e4a' : '2px solid transparent',
              marginBottom: -2, borderRadius: 0, transition: 'color 0.15s',
            }}
          >
            {tab.label}
            {counts[tab.key] > 0 && (
              <span style={{
                marginLeft: 6, background: activeTab === tab.key ? '#1a2e4a' : '#dde3ea',
                color: activeTab === tab.key ? '#fff' : '#555',
                borderRadius: 10, padding: '1px 7px', fontSize: 12, fontWeight: 500,
              }}>
                {counts[tab.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#888', fontSize: 15 }}>Loading messages…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#aaa', fontSize: 15 }}>
          {activeTab === 'all' ? 'No messages yet.' : `No messages categorized as ${activeTab}s yet.`}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map(msg => (
            <MessageCard
              key={msg.id}
              msg={msg}
              onSetCategory={setCategory}
              onPostReview={postAsReview}
              categorizing={categorizing === msg.id}
              posting={posting === msg.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MessageCard({ msg, onSetCategory, onPostReview, categorizing, posting }) {
  const cat = msg.category;
  const catStyle = cat ? CATEGORY_COLORS[cat] : null;

  return (
    <div style={{
      background: '#fff',
      border: msg.status === 'unread' ? '1.5px solid #1a2e4a' : '1px solid #e0e7ef',
      borderRadius: 10,
      padding: '16px 20px',
      position: 'relative',
    }}>
      {/* Unread dot */}
      {msg.status === 'unread' && (
        <span style={{
          position: 'absolute', top: 16, right: 16,
          width: 8, height: 8, borderRadius: '50%', background: '#e53935',
        }} title="Unread" />
      )}

      {/* Posted badge */}
      {msg.posted_to_reviews && (
        <span style={{
          position: 'absolute', top: 14, right: msg.status === 'unread' ? 32 : 16,
          background: '#e8f5e9', color: '#2e7d32', border: '1px solid #a5d6a7',
          borderRadius: 10, padding: '2px 10px', fontSize: 11, fontWeight: 600,
        }}>
          ✓ Live Review
        </span>
      )}

      {/* Sender info row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%', background: '#e8edf5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 600, color: '#1a2e4a', flexShrink: 0,
        }}>
          {msg.name?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, fontSize: 15, color: '#1a2e4a' }}>{msg.name}</span>
            {cat && (
              <span style={{
                background: catStyle.bg, color: catStyle.text, border: `1px solid ${catStyle.border}`,
                borderRadius: 10, padding: '1px 9px', fontSize: 11, fontWeight: 600, textTransform: 'capitalize',
              }}>
                {cat}
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
            {msg.email}{msg.phone ? ` · ${msg.phone}` : ''}
            {' · '}{new Date(msg.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* Subject */}
      {msg.subject && (
        <div style={{ fontWeight: 500, fontSize: 13, color: '#444', marginBottom: 6 }}>
          Re: {msg.subject}
        </div>
      )}

      {/* Message body */}
      <p style={{ margin: '0 0 14px', fontSize: 14, color: '#333', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
        {msg.message}
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#999', marginRight: 4 }}>Move to:</span>

        {['review', 'suggestion', 'complaint'].map(c => (
          <button
            key={c}
            onClick={() => onSetCategory(msg.id, c)}
            disabled={categorizing || msg.category === c}
            style={{
              background: msg.category === c ? CATEGORY_COLORS[c].bg : '#f4f6fa',
              color: msg.category === c ? CATEGORY_COLORS[c].text : '#555',
              border: msg.category === c ? `1px solid ${CATEGORY_COLORS[c].border}` : '1px solid #ddd',
              borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: msg.category === c ? 'default' : 'pointer',
              fontWeight: msg.category === c ? 600 : 400,
              opacity: categorizing ? 0.6 : 1,
              textTransform: 'capitalize',
            }}
          >
            {categorizing && msg.category !== c ? '…' : c}
          </button>
        ))}

        {/* Post to Reviews — only show if categorized as review */}
        {msg.category === 'review' && (
          <button
            onClick={() => onPostReview(msg)}
            disabled={posting || msg.posted_to_reviews}
            style={{
              marginLeft: 'auto',
              background: msg.posted_to_reviews ? '#e8f5e9' : '#1a2e4a',
              color: msg.posted_to_reviews ? '#2e7d32' : '#fff',
              border: 'none', borderRadius: 6, padding: '6px 14px',
              fontSize: 12, fontWeight: 600, cursor: msg.posted_to_reviews ? 'default' : 'pointer',
              opacity: posting ? 0.7 : 1,
            }}
          >
            {posting ? 'Posting…' : msg.posted_to_reviews ? '✓ Posted to Website' : '⭐ Post as Live Review'}
          </button>
        )}
      </div>
    </div>
  );
}
