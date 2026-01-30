import { createClient } from '@supabase/supabase-js';

// In a real scenario, these would be process.env.REACT_APP_SUPABASE_URL
// For this generated code to run safely without crashing, we check existence.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

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
