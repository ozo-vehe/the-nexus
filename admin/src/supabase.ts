import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://cqhtlkqhtqsskkvxvevh.supabase.co";
const PUBLIC_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxaHRsa3FodHFzc2trdnh2ZXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NjY0OTQsImV4cCI6MjA1MzI0MjQ5NH0.AoCGPGtxgHtdRKspXqFF9BD4PPcAb2HJXe4t0-1SnN4";

export const supabase = createClient(PROJECT_URL, PUBLIC_ANON_KEY);
