/*
  # Bob the Budtender Database Schema

  1. New Tables
    - `stores` - Dispensary store information and settings
    - `knowledge_base` - Cannabis knowledge and FAQ storage
    - `chat_messages` - Chat conversation history
    - `consultation_requests` - Free consultation bookings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
    - Public read access for stores and knowledge base
    - Secure chat messages by session/store

  3. Features
    - Store-specific and global knowledge base
    - Session-based chat tracking
    - Consultation request management
    - Comprehensive indexing for performance
*/

-- Create stores table
CREATE TABLE IF NOT EXISTS stores (
  id text PRIMARY KEY,
  name text NOT NULL,
  location text NOT NULL DEFAULT '',
  description text DEFAULT '',
  settings jsonb DEFAULT '{
    "voice_enabled": true,
    "personality": "friendly",
    "custom_instructions": "",
    "theme_color": "#10b981",
    "logo_url": ""
  }'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create knowledge_base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id text REFERENCES stores(id) ON DELETE CASCADE,
  category text NOT NULL DEFAULT 'General',
  question text NOT NULL,
  answer text NOT NULL,
  tags text[] DEFAULT '{}',
  is_global boolean DEFAULT false,
  priority integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id text NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  user_message text NOT NULL,
  bot_response text NOT NULL,
  message_type text DEFAULT 'text' CHECK (message_type IN ('text', 'voice')),
  user_ip inet,
  user_agent text,
  response_time_ms integer DEFAULT 0,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create consultation_requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  preferred_date date,
  preferred_time time,
  goals text,
  source text DEFAULT 'website',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled')),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_knowledge_base_store_id ON knowledge_base(store_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_tags ON knowledge_base USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_global ON knowledge_base(is_global) WHERE is_global = true;

CREATE INDEX IF NOT EXISTS idx_chat_messages_store_id ON chat_messages(store_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_timestamp ON chat_messages(timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON consultation_requests(created_at DESC);

-- Enable Row Level Security
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Stores: Public read access, authenticated write
CREATE POLICY "Public can read active stores"
  ON stores
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage stores"
  ON stores
  FOR ALL
  TO authenticated
  USING (true);

-- Knowledge Base: Public read for active items, authenticated write
CREATE POLICY "Public can read active knowledge base"
  ON knowledge_base
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage knowledge base"
  ON knowledge_base
  FOR ALL
  TO authenticated
  USING (true);

-- Chat Messages: Public insert, authenticated read/update
CREATE POLICY "Public can insert chat messages"
  ON chat_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all chat messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update chat messages"
  ON chat_messages
  FOR UPDATE
  TO authenticated
  USING (true);

-- Consultation Requests: Public insert, authenticated read/update
CREATE POLICY "Public can submit consultation requests"
  ON consultation_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage consultation requests"
  ON consultation_requests
  FOR ALL
  TO authenticated
  USING (true);

-- Insert default demo store
INSERT INTO stores (id, name, location, description) VALUES 
('demo-dispensary', 'Demo Dispensary', 'Main Street Cannabis District', 'A friendly neighborhood dispensary showcasing Bob the Budtender AI assistant')
ON CONFLICT (id) DO NOTHING;

-- Insert sample global knowledge base entries
INSERT INTO knowledge_base (store_id, category, question, answer, tags, is_global) VALUES 
(
  'demo-dispensary',
  'Strains',
  'What is the difference between indica and sativa?',
  'Great question! Indica strains typically provide relaxing, sedating effects that are perfect for evening use or when you want to unwind. They often help with sleep, pain relief, and stress reduction. Sativa strains tend to be more energizing and uplifting, making them ideal for daytime activities, creativity, and social situations. However, remember that individual effects can vary, and many modern strains are hybrids that combine both characteristics!',
  ARRAY['strains', 'indica', 'sativa', 'effects', 'basics'],
  true
),
(
  'demo-dispensary',
  'CBD',
  'What are the benefits of CBD?',
  'CBD is amazing for wellness! It offers potential benefits including anxiety relief, pain management, anti-inflammatory effects, and improved sleep quality - all without the psychoactive effects of THC. Many customers love CBD for daily wellness routines, managing chronic conditions, or just general relaxation. We have CBD in many forms: tinctures, gummies, topicals, and flower. What specific benefits are you looking for?',
  ARRAY['cbd', 'benefits', 'wellness', 'non-psychoactive', 'anxiety', 'pain'],
  true
),
(
  'demo-dispensary',
  'Edibles',
  'How long do edibles take to work?',
  'Ah, the classic edible question! Edibles typically take 30 minutes to 2 hours to kick in, depending on your metabolism, what you''ve eaten, and the product. The golden rule is: start low, go slow! Begin with 2.5-5mg if you''re new, and wait at least 2 hours before taking more. The effects can last 4-8 hours, so plan accordingly. Trust me, patience is key with edibles - they can sneak up on you!',
  ARRAY['edibles', 'dosage', 'timing', 'effects', 'safety', 'start-low-go-slow'],
  true
),
(
  'demo-dispensary',
  'General',
  'What should I bring to the dispensary?',
  'You''ll need a valid government-issued ID showing you''re 21+ (or 18+ with a medical card in medical states). Bring cash if possible, as many dispensaries are still cash-only, though some accept debit cards. If you''re a medical patient, bring your medical marijuana card. And bring your questions - that''s what I''m here for! Don''t worry about being new; we''re here to help you find exactly what you need.',
  ARRAY['requirements', 'id', 'cash', 'medical-card', 'first-time'],
  true
)
ON CONFLICT DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON stores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_knowledge_base_updated_at BEFORE UPDATE ON knowledge_base FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultation_requests_updated_at BEFORE UPDATE ON consultation_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();