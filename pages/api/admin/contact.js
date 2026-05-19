// pages/api/admin/messages.js
// Admin-only endpoint — uses service role key (bypasses RLS)
// Supports: GET all messages, PATCH category, POST to reviews

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {

  // --- GET: fetch all contact messages ---
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ messages: data });
  }

  // --- PATCH: set category on a message ---
  if (req.method === 'PATCH') {
    const { id, category, status } = req.body;
    if (!id) return res.status(400).json({ error: 'id is required' });

    const updates = {};
    if (category !== undefined) updates.category = category;
    if (status !== undefined) updates.status = status;

    const { error } = await supabase
      .from('contact_messages')
      .update(updates)
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  // --- POST: post a message as the live review ---
  if (req.method === 'POST') {
    const { action, id } = req.body;

    if (action !== 'post_review' || !id) {
      return res.status(400).json({ error: 'action=post_review and id are required' });
    }

    // Fetch the message to post
    const { data: msg, error: fetchErr } = await supabase
      .from('contact_messages')
      .select('id, name, message')
      .eq('id', id)
      .single();

    if (fetchErr || !msg) return res.status(404).json({ error: 'Message not found' });

    // Upsert into reviews table (always id=1, replacing previous)
    const { error: reviewErr } = await supabase
      .from('reviews')
      .upsert({
        id: 1,
        name: msg.name,
        message: msg.message,
        message_id: msg.id,
        posted_at: new Date().toISOString(),
      });

    if (reviewErr) return res.status(500).json({ error: reviewErr.message });

    // Mark this message as posted_to_reviews and clear previous
    await supabase
      .from('contact_messages')
      .update({ posted_to_reviews: false })
      .eq('posted_to_reviews', true);

    await supabase
      .from('contact_messages')
      .update({ posted_to_reviews: true })
      .eq('id', id);

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
