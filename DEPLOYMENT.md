# Vercel Deployment Guide

## Prerequisites
1. GitHub repository with the portfolio code
2. Vercel account connected to GitHub
3. Supabase project set up

## Environment Variables Setup

Copy the environment variables from `.env.local.example` and add them to your Vercel project:

1. **Required for Database**:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

2. **Optional for LinkedIn Import**:
   - `LINKEDIN_CLIENT_ID`: LinkedIn app client ID
   - `LINKEDIN_CLIENT_SECRET`: LinkedIn app client secret
   - `RAPIDAPI_KEY`: RapidAPI key for LinkedIn scraping
   - `PROXYCURL_API_KEY`: Proxycurl API key

## Deployment Steps

1. **Import Project to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository: `https://github.com/Rithan678/myportfolio`

2. **Configure Environment Variables**:
   - In Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add all required environment variables

3. **Set Build Command (Optional)**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

## Database Setup

1. **Run Database Schema**:
   - Connect to your Supabase project
   - Go to SQL Editor
   - Run the contents of `database/schema.sql`
   - Run the contents of `database/sample-data.sql` (optional sample data)

2. **Configure Row Level Security**:
   - The schema includes RLS policies
   - Ensure they are enabled in your Supabase dashboard

## Troubleshooting

1. **Build Errors**:
   - Check Vercel build logs
   - Ensure all TypeScript errors are resolved
   - Verify ESLint configuration

2. **Database Connection**:
   - Verify Supabase environment variables
   - Check Supabase project status
   - Ensure database schema is properly installed

3. **Missing Features**:
   - LinkedIn import requires API keys
   - Admin panel requires database connection
   - Contact form requires email service setup

## Admin Access

After deployment, access the admin panel at:
`https://your-vercel-domain.vercel.app/admin`

Use this to:
- Upload certificates and projects
- Manage experience and skills
- Update profile information
- Add/remove portfolio items

## Support

For issues with:
- **Next.js/Vercel**: Check Vercel documentation
- **Supabase**: Check Supabase documentation  
- **Portfolio Features**: Check README.md for feature details