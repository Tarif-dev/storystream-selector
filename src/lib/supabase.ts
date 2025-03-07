
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Supabase connection details are public for client-side usage
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for authentication
export const signUp = async (email: string, password: string, username: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        name,
      }
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  return await supabase.auth.getUser();
};

export const getSession = async () => {
  return await supabase.auth.getSession();
};
