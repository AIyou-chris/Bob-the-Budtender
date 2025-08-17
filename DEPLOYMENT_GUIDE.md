# 🚀 Bob the Budtender - Production Deployment Guide

## 📋 Prerequisites
- Netlify account (free tier works)
- Supabase account (free tier works)
- OpenAI API account with GPT-4 access
- ElevenLabs account for voice features

## 🗄️ Step 1: Set Up Production Supabase Database

### 1.1 Create New Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Set project name: `bob-budtender-prod`
5. Set database password (save this!)
6. Choose region closest to your users
7. Click "Create new project"

### 1.2 Get Your Supabase Credentials
Once your project is ready:
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **anon/public key** (starts with `eyJ`)

### 1.3 Run Database Migration
1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase/migrations/20250724175506_cold_harbor.sql`
4. Click "Run" to create all tables and security policies

## 🔑 Step 2: Get API Keys

### 2.1 OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in or create account
3. Go to **API Keys** section
4. Click "Create new secret key"
5. Name it "Bob Budtender Production"
6. Copy the key (starts with `sk-`)
7. **Important**: Make sure you have GPT-4 access

### 2.2 ElevenLabs API Key
1. Go to [elevenlabs.io](https://elevenlabs.io)
2. Sign up or sign in
3. Go to your **Profile** → **API Keys**
4. Copy your API key
5. Optional: Choose a specific voice ID for Bob

## 🌐 Step 3: Deploy to Netlify

### 3.1 Connect GitHub Repository
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub account
5. Select your repository
6. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### 3.2 Configure Environment Variables
In your Netlify dashboard:
1. Go to **Site settings** → **Environment variables**
2. Add these variables:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_OPENAI_API_KEY=sk-proj-...
VITE_ELEVENLABS_API_KEY=your-elevenlabs-key
VITE_ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB
```

### 3.3 Deploy
1. Click "Deploy site"
2. Wait for deployment to complete
3. Your site will be live at a Netlify URL

## 🧪 Step 4: Test Your Production Setup

### 4.1 Test Database Connection
1. Visit your live site
2. Go to `/admin` page
3. Click on **API Testing** tab
4. Check if Supabase connection shows green ✅

### 4.2 Test OpenAI Integration
1. In API Testing tab, click **Test Chat**
2. Should get a response from Bob
3. If error, check your OpenAI API key and billing

### 4.3 Test ElevenLabs Voice
1. In API Testing tab, click **Test Voice**
2. Should hear Bob's voice introduction
3. If error, check ElevenLabs API key and credits

### 4.4 Test Full Chat Experience
1. Go to `/chat` page
2. Try asking Bob about cannabis
3. Test voice chat with the floating microphone
4. Verify responses are cannabis-focused

## 🏪 Step 5: Set Up Your First Dispensary

### 5.1 Create Store Profile
1. Go to `/admin` → **Settings** → **Profile**
2. Upload your dispensary logo
3. Fill in dispensary information:
   - Name
   - License number
   - Address
   - Phone/email
   - Website

### 5.2 Add Cannabis Knowledge
1. Go to **Knowledge Base** tab
2. Add your specific strains, products, and policies
3. Use the document upload feature for menus/catalogs
4. Test knowledge with Bob

### 5.3 Customize Bob's Personality
1. Go to **Bot Personality** tab
2. Choose a personality preset or create custom
3. Add dispensary-specific instructions
4. Test the personality changes

## 👥 Step 6: Add Team Members

### 6.1 Invite Team Members
1. Go to **Settings** → **Team Access**
2. Add team member emails
3. Set appropriate permission levels:
   - **Full Access**: Managers
   - **Knowledge Only**: Budtenders who update products
   - **View Only**: Staff who just need to see analytics

## 🔒 Step 7: Security & Compliance

### 7.1 Enable Authentication (Optional)
If you want to restrict admin access:
1. In Supabase, go to **Authentication** → **Settings**
2. Configure email authentication
3. Add authorized users

### 7.2 Cannabis Compliance
- Ensure age verification is enabled
- Review all knowledge base entries for compliance
- Set up appropriate disclaimers
- Configure state-specific information

## 🎯 Step 8: Go Live!

### 8.1 Embed Bob on Your Website
1. Go to `/embed` page
2. Configure Bob's appearance
3. Copy the embed code
4. Add to your dispensary website

### 8.2 Share Direct Links
- **Customer Chat**: `https://your-site.netlify.app/chat`
- **Admin Dashboard**: `https://your-site.netlify.app/admin`
- **Client Dashboard**: `https://your-site.netlify.app/client`

## 🆘 Troubleshooting

### Common Issues:

**Bob not responding:**
- Check OpenAI API key and billing
- Verify GPT-4 access
- Check browser console for errors

**Voice not working:**
- Check ElevenLabs API key
- Verify browser microphone permissions
- Check ElevenLabs account credits

**Database errors:**
- Verify Supabase URL and key
- Check if migration ran successfully
- Verify RLS policies are enabled

**Environment variables not working:**
- Ensure variables start with `VITE_`
- Redeploy after adding variables
- Check for typos in variable names

## 📞 Support

If you need help:
1. Check the API Testing page for connection status
2. Review browser console for error messages
3. Verify all environment variables are set correctly
4. Test each API connection individually

## 🎉 Success Checklist

- [ ] Supabase database created and migrated
- [ ] All environment variables configured
- [ ] OpenAI API working (Bob responds to chat)
- [ ] ElevenLabs API working (voice chat functional)
- [ ] Dispensary profile set up
- [ ] Cannabis knowledge base populated
- [ ] Bob's personality customized
- [ ] Team members added (if needed)
- [ ] Embed code generated for website
- [ ] Full chat experience tested

**Congratulations! Bob the Budtender is now live and ready to help your dispensary customers! 🌿🤖**