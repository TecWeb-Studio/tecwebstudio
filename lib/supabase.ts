import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase configuration missing!');
  console.error('Please set the following environment variables in your .env.local file:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL=your_project_url');
  console.error('  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key');
  console.error('See SUPABASE_SETUP.md for detailed instructions.');
}

// Create client - will throw error if URL is empty, but we handle it in the form submission
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

