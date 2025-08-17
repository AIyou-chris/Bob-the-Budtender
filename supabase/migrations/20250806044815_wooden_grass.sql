-- 🌿 Bob the Budtender - Production Database Setup
-- Run this in your Supabase SQL Editor after creating your project

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('owner', 'admin', 'manager', 'budtender', 'viewer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create additional tables for production features

-- User profiles and team management
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  store_id text REFERENCES stores(id) ON DELETE CASCADE,
  email text NOT NULL,
  first_name text,
  last_name text,
  role user_role DEFAULT 'viewer',
  avatar_url text,
  phone text,
  is_active boolean DEFAULT true,
  invited_by uuid REFERENCES auth.users(id),
  invited_at timestamptz,
  joined_at timestamptz DEFAULT now(),
  last_active timestamptz DEFAULT now(),
  permissions jsonb DEFAULT '{
    "can_edit_knowledge": false,
    "can_manage_voice": false,
    "can_view_analytics": true,
    "can_manage_team": false,
    "can_edit_settings": false
  }'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team invitations
CREATE TABLE IF NOT EXISTS team_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id text REFERENCES stores(id) ON DELETE CASCADE,
  email text NOT NULL,
  role user_role DEFAULT 'viewer',
  permissions jsonb DEFAULT '{}',
  invited_by uuid REFERENCES auth.users(id),
  token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  expires_at timestamptz DEFAULT (now() + interval '7 days'),
  accepted_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Subscription and billing
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id text REFERENCES stores(id) ON DELETE CASCADE,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_name text DEFAULT 'free',
  status subscription_status DEFAULT 'trialing',
  current_period_start timestamptz,
  current_period_end timestamptz,
  trial_end timestamptz,
  cancel_at timestamptz,
  canceled_at timestamptz,
  features jsonb DEFAULT '{
    "max_conversations": 1000,
    "voice_enabled": true,
    "custom_personality": true,
    "team_members": 5,
    "analytics_retention": 90,
    "priority_support": false
  }'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- API usage tracking
CREATE TABLE IF NOT EXISTS api_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id text REFERENCES stores(id) ON DELETE CASCADE,
  api_provider text NOT NULL, -- 'openai', 'elevenlabs'
  endpoint text,
  tokens_used integer DEFAULT 0,
  characters_used integer DEFAULT 0,
  cost_cents integer DEFAULT 0,
  request_id text,
  response_time_ms integer,
  success boolean DEFAULT true,
  error_message text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- File uploads for knowledge base
CREATE TABLE IF NOT EXISTS knowledge_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id text REFERENCES stores(id) ON DELETE CASCADE,
  uploaded_by uuid REFERENCES auth.users(id),
  filename text NOT NULL,
  file_size integer,
  file_type text,
  file_url text,
  processing_status text DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  extracted_text text,
  knowledge_items_created integer DEFAULT 0,
  error_message text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Analytics and metrics
CREATE TABLE IF NOT EXISTS analytics_daily (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id text REFERENCES stores(id) ON DELETE CASCADE,
  date date NOT NULL,
  total_conversations integer DEFAULT 0,
  unique_users integer DEFAULT 0,
  voice_conversations integer DEFAULT 0,
  text_conversations integer DEFAULT 0,
  avg_response_time_ms integer DEFAULT 0,
  satisfaction_score decimal(3,2),
  top_questions jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  UNIQUE(store_id, date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_store_id ON user_profiles(store_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_team_invitations_store_id ON team_invitations(store_id);
CREATE INDEX IF NOT EXISTS idx_team_invitations_email ON team_invitations(email);
CREATE INDEX IF NOT EXISTS idx_team_invitations_token ON team_invitations(token);
CREATE INDEX IF NOT EXISTS idx_subscriptions_store_id ON subscriptions(store_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_store_id ON api_usage(store_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_created_at ON api_usage(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_knowledge_files_store_id ON knowledge_files(store_id);
CREATE INDEX IF NOT EXISTS idx_analytics_daily_store_date ON analytics_daily(store_id, date DESC);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_daily ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- User profiles: Users can see profiles in their store
CREATE POLICY "Users can view profiles in their store"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Team invitations: Store owners/admins can manage
CREATE POLICY "Store admins can manage invitations"
  ON team_invitations
  FOR ALL
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
    )
  );

-- Subscriptions: Store owners can view
CREATE POLICY "Store owners can view subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
    )
  );

-- API usage: Store members can view their store's usage
CREATE POLICY "Store members can view API usage"
  ON api_usage
  FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE user_id = auth.uid()
    )
  );

-- Knowledge files: Store members can manage files
CREATE POLICY "Store members can manage knowledge files"
  ON knowledge_files
  FOR ALL
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE user_id = auth.uid()
    )
  );

-- Analytics: Store members can view analytics
CREATE POLICY "Store members can view analytics"
  ON analytics_daily
  FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE user_id = auth.uid()
    )
  );

-- Create functions for common operations

-- Function to get user permissions
CREATE OR REPLACE FUNCTION get_user_permissions(user_uuid uuid, store_uuid text)
RETURNS jsonb AS $$
DECLARE
  user_permissions jsonb;
BEGIN
  SELECT permissions INTO user_permissions
  FROM user_profiles
  WHERE user_id = user_uuid AND store_id = store_uuid AND is_active = true;
  
  RETURN COALESCE(user_permissions, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track API usage
CREATE OR REPLACE FUNCTION track_api_usage(
  store_uuid text,
  provider text,
  endpoint_name text DEFAULT NULL,
  tokens integer DEFAULT 0,
  characters integer DEFAULT 0,
  cost integer DEFAULT 0,
  success_status boolean DEFAULT true,
  error_msg text DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO api_usage (
    store_id, api_provider, endpoint, tokens_used, 
    characters_used, cost_cents, success, error_message
  ) VALUES (
    store_uuid, provider, endpoint_name, tokens, 
    characters, cost, success_status, error_msg
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_knowledge_files_updated_at BEFORE UPDATE ON knowledge_files FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default subscription for demo store
INSERT INTO subscriptions (store_id, plan_name, status) 
VALUES ('demo-dispensary', 'premium', 'active')
ON CONFLICT DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '🎉 Bob the Budtender production database setup complete!';
  RAISE NOTICE '✅ All tables created with proper security';
  RAISE NOTICE '✅ Row Level Security enabled';
  RAISE NOTICE '✅ Indexes created for performance';
  RAISE NOTICE '✅ Helper functions installed';
  RAISE NOTICE '';
  RAISE NOTICE '🔧 Next steps:';
  RAISE NOTICE '1. Set up authentication in Supabase Auth settings';
  RAISE NOTICE '2. Configure your environment variables in Netlify';
  RAISE NOTICE '3. Test the API connections in the admin dashboard';
  RAISE NOTICE '4. Add your first dispensary profile and knowledge base';
END $$;