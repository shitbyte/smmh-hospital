// pages/api/reviews.js
// Public endpoint — returns the single active review for the website

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
    .from('reviews')
    .select('name, message, posted_at')
    .eq('id', 1)
    .single();

  if (error || !data || !data.name) {
    return res.status(200).json({ review: null });
  }

  return res.status(200).json({ review: data });
}
