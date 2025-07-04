import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bcymicgfsmnfyesdpgqa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjeW1pY2dmc21uZnllc2RwZ3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzIyMTUsImV4cCI6MjA2NzIwODIxNX0.lIFIBu-eQzuz7BPH3UIiG2Cvqcvj2GHpeitToOBXUig';
export const supabase = createClient(supabaseUrl, supabaseKey);