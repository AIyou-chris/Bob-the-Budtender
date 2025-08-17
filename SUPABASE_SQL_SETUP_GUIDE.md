# 🗄️ Supabase SQL Setup Guide - Detailed Instructions

## 📍 Where to Run SQL Statements

### **Method 1: Supabase Dashboard SQL Editor (Recommended)**

#### **Step-by-Step Instructions:**

1. **Go to your Supabase project dashboard**
   - URL: `https://supabase.com/dashboard/project/[your-project-id]`
   - Make sure you're logged in to your Supabase account

2. **Navigate to SQL Editor**
   - In the left sidebar, click on **"SQL Editor"**
   - You'll see a code editor interface

3. **Create a new query**
   - Click **"New Query"** button (top right)
   - This opens a blank SQL editor

4. **Paste the SQL content**
   - Copy the entire content from `SUPABASE_SETUP.sql`
   - Paste it into the editor
   - The editor supports syntax highlighting

5. **Execute the query**
   - Click the **"Run"** button (or press Ctrl/Cmd + Enter)
   - You'll see execution results at the bottom

#### **What You Should See:**
```
✅ CREATE TABLE stores
✅ CREATE TABLE knowledge_base  
✅ CREATE TABLE chat_messages
✅ CREATE TABLE user_profiles
✅ CREATE TABLE team_invitations
✅ CREATE TABLE subscriptions
✅ CREATE TABLE api_usage
✅ CREATE TABLE knowledge_files
✅ CREATE TABLE analytics_daily
✅ CREATE FUNCTION update_updated_at_column
✅ Row Level Security enabled on all tables
✅ Policies created successfully
```

---

### **Method 2: Supabase CLI (Advanced Users)**

#### **Prerequisites:**
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref [your-project-ref]
```

#### **Run Migration:**
```bash
# Create migration file
supabase migration new setup_bob_database

# Copy SQL content to the migration file
# Then run:
supabase db push
```

---

### **Method 3: Direct Database Connection (Expert Level)**

#### **Connection Details:**
- **Host:** `db.[your-project-ref].supabase.co`
- **Port:** `5432`
- **Database:** `postgres`
- **Username:** `postgres`
- **Password:** [Your database password from project creation]

#### **Tools You Can Use:**
- **pgAdmin** - GUI PostgreSQL client
- **DBeaver** - Universal database client
- **psql** - Command line PostgreSQL client
- **TablePlus** - Modern database client

#### **Connection String:**
```
postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

---

## 🔍 Common Error Messages & Solutions

### **Error 1: Permission Denied**
```
ERROR: permission denied for schema public
```
**Solution:** Make sure you're using the `postgres` user, not the `anon` key.

### **Error 2: Table Already Exists**
```
ERROR: relation "stores" already exists
```
**Solution:** Either drop existing tables first, or modify the SQL to use `CREATE TABLE IF NOT EXISTS`.

### **Error 3: Function Already Exists**
```
ERROR: function "update_updated_at_column" already exists
```
**Solution:** Add `OR REPLACE` to function creation:
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
```

### **Error 4: RLS Policy Conflicts**
```
ERROR: policy "policy_name" for table "table_name" already exists
```
**Solution:** Drop existing policies first:
```sql
DROP POLICY IF EXISTS "policy_name" ON table_name;
```

### **Error 5: Connection Timeout**
```
ERROR: connection timed out
```
**Solution:** Check your internet connection and Supabase project status.

---

## 🧪 Testing Your Database Setup

### **1. Verify Tables Were Created**
Run this query in SQL Editor:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Expected Result:**
```
analytics_daily
api_usage
chat_messages
consultation_requests
knowledge_base
knowledge_files
stores
subscriptions
team_invitations
user_profiles
```

### **2. Check Row Level Security**
```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true;
```

**Expected Result:** All tables should show `rowsecurity = true`

### **3. Verify Policies**
```sql
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public';
```

**Expected Result:** Should show multiple policies for each table

### **4. Test Function**
```sql
SELECT update_updated_at_column();
```

**Expected Result:** Should return the current timestamp

---

## 🔧 Troubleshooting Steps

### **If SQL Editor Won't Load:**
1. Clear browser cache
2. Try incognito/private mode
3. Check Supabase status page
4. Try different browser

### **If Queries Fail:**
1. **Check syntax** - Copy-paste exactly from the file
2. **Run in smaller chunks** - Execute one table at a time
3. **Check project limits** - Free tier has some restrictions
4. **Verify project is active** - Not paused or suspended

### **If Connection Issues:**
1. **Check project status** in Supabase dashboard
2. **Verify project URL** and credentials
3. **Check firewall/network** restrictions
4. **Try from different network**

---

## 📱 Mobile/Tablet Setup

### **Using Supabase Mobile App:**
1. Download Supabase mobile app
2. Login to your account
3. Select your project
4. Use the SQL runner feature

### **Using Browser on Mobile:**
1. Go to `supabase.com/dashboard`
2. Login to your account
3. Navigate to SQL Editor
4. Use the mobile-optimized interface

---

## 🆘 Getting Help

### **If You're Still Stuck:**

1. **Check the exact error message** - Copy the full error text
2. **Screenshot the issue** - Visual context helps
3. **Check Supabase docs** - [supabase.com/docs](https://supabase.com/docs)
4. **Supabase Discord** - Active community support
5. **GitHub Issues** - For bug reports

### **Common Success Indicators:**
- ✅ All tables created without errors
- ✅ RLS enabled on all tables  
- ✅ Policies created successfully
- ✅ Functions created without conflicts
- ✅ No permission errors
- ✅ Test queries return expected results

---

## 🎯 Next Steps After Database Setup

1. **Copy your Supabase URL and anon key**
2. **Add to Netlify environment variables**
3. **Test the connection** using Bob's API Testing page
4. **Add your first dispensary** in the admin dashboard
5. **Invite team members** using the team management feature

The database is the foundation - once this is set up correctly, everything else will work smoothly! 🌿✨