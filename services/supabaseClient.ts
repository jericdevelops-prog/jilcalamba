import { createClient } from '@supabase/supabase-js';

// Access environment variables using Vite's import.meta.env
// For Vercel, ensure you add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Project Settings
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

// If credentials are valid, create real client. Otherwise null (handled by logic).
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

// Mock function to simulate auth since we might not have a backend connected
export const mockLogin = async (email: string) => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate net lag
  if (email.includes('admin')) return { role: 'ADMIN', name: 'Admin User' };
  if (email.includes('leader')) return { role: 'LEADER', name: 'Leader User' };
  return { role: 'MEMBER', name: 'Member User' };
};