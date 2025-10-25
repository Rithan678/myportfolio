# 🛠️ Database Setup Guide

This guide walks you through setting up the portfolio database with Supabase.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available)
- Git repository cloned locally

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `portfolio-db`
   - **Database Password**: Generate a secure password
   - **Region**: Choose closest to your location

## Step 2: Get Credentials

Once your project is ready:

1. Go to **Settings** > **API**
2. Copy the **URL** and **anon/public** key
3. Update your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 3: Create Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New Query"
3. Copy and paste the contents of `database/schema.sql`
4. Click "Run" to create all tables

## Step 4: Populate Sample Data

### Option A: Using the Script (Recommended)

1. Install dependencies: `npm install`
2. Run the init script: `node scripts/init-database.js`
3. Check the console for success messages

### Option B: Manual SQL

1. Go back to **SQL Editor**
2. Copy and paste the contents of `database/sample-data.sql`
3. Click "Run" to insert sample data

## Step 5: Verify Setup

1. Go to **Table Editor** in Supabase
2. Check that all 5 tables exist:
   - profiles
   - experience
   - certificates
   - projects
   - skills

3. Verify data is populated in each table

## Step 6: Test Connection

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3001`
3. Check that portfolio data loads correctly
4. Visit `/admin` to test the admin panel

## Troubleshooting

### Common Issues

**"Database connection failed"**
- Verify your Supabase URL and key in `.env.local`
- Make sure the project is active (not paused)

**"Table does not exist"**
- Run the schema.sql file first
- Check for any SQL errors in the query execution

**"No data showing"**
- Run the sample-data.sql or init script
- Check Row Level Security policies in Supabase

### Database Policies

If you're using RLS (Row Level Security), you may need to add policies:

```sql
-- Allow all operations on profiles for authenticated users
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for authenticated users" ON profiles
  FOR ALL USING (true);

-- Repeat for other tables as needed
```

## Production Considerations

### Environment Variables

For Vercel deployment, add these in your project dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Security

- Enable RLS for production
- Set up proper policies
- Use service role key for admin operations only
- Regular database backups

### Performance

- Add indexes on frequently queried columns
- Monitor query performance in Supabase dashboard
- Use connection pooling for high traffic

## Next Steps

1. Customize the sample data to match your profile
2. Test the admin panel functionality
3. Deploy to Vercel
4. Set up LinkedIn integration (optional)

## Support

If you encounter issues:
1. Check the Supabase logs in your dashboard
2. Review the console for JavaScript errors
3. Open an issue in the GitHub repository