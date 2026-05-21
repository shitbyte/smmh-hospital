// pages/api/reviews.js
// Public endpoint — returns all reviews marked as posted_to_reviews = true

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .select('id, name, email, message, created_at')
    .eq('posted_to_reviews', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return res.status(200).json({ reviews: [] });
  }

  return res.status(200).json({ reviews: data || [] });
}
