 pages/api/contact.js
// Receives POST from contact form, saves to Supabase contact_messages table

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const { error } = await supabase
    .from('contact_messages')
    .insert([
      {
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        subject: subject?.trim() || null,
        message: message.trim(),
        status: 'unread',
        category: null,
        posted_to_reviews: false,
      },
    ]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: 'Failed to save message. Please try again.' });
  }

  return res.status(200).json({ success: true, message: 'Message received successfully.' });
}

