import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate URL format
const isValidUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    // Check if it's not a placeholder URL
    return urlObj.protocol === 'https:' && 
           !url.includes('your-project') && 
           !url.includes('your-proje') &&
           urlObj.hostname.includes('supabase.co');
  } catch {
    return false;
  }
};

// Check if environment variables are properly configured
const isConfigured = supabaseUrl && 
                    supabaseAnonKey && 
                    isValidUrl(supabaseUrl) &&
                    !supabaseAnonKey.includes('your-anon-key');

if (!isConfigured) {
  console.warn('Supabase environment variables not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
  if (supabaseUrl && supabaseUrl.includes('your-proje')) {
    console.warn('⚠️  VITE_SUPABASE_URL is still set to placeholder value. Please update with your actual Supabase project URL.');
  }
  if (supabaseAnonKey && supabaseAnonKey.includes('your-anon-key')) {
    console.warn('⚠️  VITE_SUPABASE_ANON_KEY is still set to placeholder value. Please update with your actual Supabase anonymous key.');
  }
  console.warn('The app will continue to work with demo data until Supabase is properly configured.');
}

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface Store {
  id: string;
  name: string;
  location: string;
  description?: string;
  settings: {
    voice_enabled: boolean;
    personality: string;
    custom_instructions: string;
    theme_color?: string;
    logo_url?: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  store_id: string;
  session_id: string;
  user_message: string;
  bot_response: string;
  message_type: 'text' | 'voice';
  user_ip?: string;
  user_agent?: string;
  response_time_ms: number;
  timestamp: string;
  created_at: string;
}

export interface KnowledgeBase {
  id: string;
  store_id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
  is_global: boolean;
  priority: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ConsultationRequest {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  preferred_date?: string;
  preferred_time?: string;
  goals?: string;
  source: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  notes: string;
  created_at: string;
}