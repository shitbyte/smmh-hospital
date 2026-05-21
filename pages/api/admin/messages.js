// pages/api/admin/messages.js
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

  // --- PATCH: set category/status on a message ---
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

  // --- POST: toggle posted_to_reviews on a message ---
  if (req.method === 'POST') {
    const { action, id } = req.body;

    if (action !== 'post_review' || !id) {
      return res.status(400).json({ error: 'action=post_review and id are required' });
    }

    // Check current state
    const { data: msg, error: fetchErr } = await supabase
      .from('contact_messages')
      .select('id, posted_to_reviews')
      .eq('id', id)
      .single();

    if (fetchErr || !msg) return res.status(404).json({ error: 'Message not found' });

    // Toggle: if already posted, un-post it; if not posted, post it
    const newValue = !msg.posted_to_reviews;

    const { error: updateErr } = await supabase
      .from('contact_messages')
      .update({ posted_to_reviews: newValue })
      .eq('id', id);

    if (updateErr) return res.status(500).json({ error: updateErr.message });

    return res.status(200).json({ success: true, posted: newValue });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}