import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://nlxhfhrgccjnztwmzfdd.supabase.co',
  'sb_publishable_75_vtjYNEEZK3YFYhJkMnA_KRTnOhTW',
);

export type SuccessStory = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string;
  thread_url: string;
  views: number;
  likes: number;
  comments: number;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};
