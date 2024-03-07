import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabaseUrl = "https://nxuiemjdkxiqslsuddnu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54dWllbWpka3hpcXNsc3VkZG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1NjIyOTMsImV4cCI6MjAyNTEzODI5M30.Z1H1yhIuNzYBPfc_5Rd8_rWLBhA4oRIxijbkpxE60Vw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
