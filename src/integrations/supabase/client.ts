
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hpfaapobtilemnoruyqr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwZmFhcG9idGlsZW1ub3J1eXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDc0OTIsImV4cCI6MjA2MDQ4MzQ5Mn0.NmrCHdLa7NwgsdDY89fkUZXF1fnT5PL6HpZOA1Os1wc";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
