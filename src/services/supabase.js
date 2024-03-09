import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://nxuiemjdkxiqslsuddnu.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54dWllbWpka3hpcXNsc3VkZG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1NjIyOTMsImV4cCI6MjAyNTEzODI5M30.Z1H1yhIuNzYBPfc_5Rd8_rWLBhA4oRIxijbkpxE60Vw";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
