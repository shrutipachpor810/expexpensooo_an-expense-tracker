import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rbxshecejkuvvupttpxt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJieHNoZWNlamt1dnZ1cHR0cHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NTk4MDIsImV4cCI6MjA2MDQzNTgwMn0.iC6cIH6mWdVmNpX4_pIeYo3UfGKVKHRCjmtdVCXj_9A';
export const supabase = createClient(supabaseUrl, supabaseKey);
