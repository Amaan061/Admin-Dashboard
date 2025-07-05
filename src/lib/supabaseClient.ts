import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fycimpmarrjfincpeovd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5Y2ltcG1hcnJqZmluY3Blb3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDE0NTAsImV4cCI6MjA2NzMxNzQ1MH0.ynf20jM4uqGoki7FclmdQ8GK8W9waPkagN-pl_TEUA0';
export const supabase = createClient(supabaseUrl, supabaseKey);
